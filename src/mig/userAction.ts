'use server'

import { LoginSchema, SignUpSchema, UserProfileSchema } from '@/interface/interfce'
import { createServer } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { ZodError } from 'zod'


export async function signUpUser(data:{email:string,password:string}){
  const result = SignUpSchema.safeParse(data)
  if(!result.success){
    let errormessage = ''

    result.error.issues.forEach((issues)=>{
      errormessage =  issues.path[0] + ":" + issues.message + '.';
    })
    return{
      error:errormessage
    }
  }
  
  const supabase = await createServer()


   const {error} = await supabase.auth.signUp({email:data.email,password:data.password
    
  })
  
   console.log(error)

}

export async function LoginUsers(data:{email:string,password:string}){
  const result = LoginSchema.safeParse(data)
  
  if(!result.success){
    return{
      error:'invalid credentials'
    }
  }
 
  const supabase = await createServer()


   await supabase.auth.signInWithPassword({email:data.email,password:data.password})

}
export  async function Signout (){
  

  const supabase = await createServer()

   const {error} = await supabase.auth.signOut()

   return JSON.stringify(error)
  

}
export async function usersProfile(data:FormData){
  const username = data.get('username') as string;
  const file = data.get('image') as File;
  const arrayBuffer = await file.arrayBuffer();

  const result = UserProfileSchema.safeParse({username,image:arrayBuffer})

  if(!result.success){
    let errormessage = ''

    result.error.issues.forEach((issues)=>{
      errormessage =  issues.path[0] + ":" + issues.message + '.';
    })
    return{
      error:errormessage
    }
  }
  const Supabase = await createServer()
  const {data:{user}} = await Supabase.auth.getUser()
   
try{

  const { data: existingUser, error: userError } = await Supabase
    .from('users')
    .select('username')
    .eq('username', username);

 if (userError) {
    return { error: 'Database error' };
 }
 if (existingUser && existingUser.length > 0) {
  // A user with the same username already exists
  return { error: 'Username already taken' };
}

  await Supabase.storage.from(`avatars`).upload(`avatar_${user?.email}`,arrayBuffer)
  const avatar_url = Supabase.storage.from('avatars').getPublicUrl(`avatar_${user?.email}`);
  const {error} = await Supabase
  .from(`users`)
  .upsert({"id":user?.id,"username":username,"avatar_url":avatar_url, "last_changed_at":new Date()}).eq('id',user?.id)
  
  revalidatePath('/','layout')
  }
   catch(error){
    return { error: 'Could not update profile' };
   }
 
 

}

export async function SavedUsersRoutes(desc:string){

   const supabase = await createServer() 
   const {data:{user}} = await supabase.auth.getUser()
  try{

  const { data: existingRoute} = await supabase
    .from('saved_routes')
    .select('rock_id')
    .eq('user_id', user?.id)
    .eq('rock_id', desc);

  if (existingRoute && existingRoute.length > 0) {
    // Route already saved by the user
    return { error: 'Route already saved' };
  }
  
    const { error: saveError } = await supabase
  .from('saved_routes')
  .upsert({ 'user_id': user?.id, 'rock_id': desc });
  revalidatePath('/Profile')
  if (saveError) {
  return { error: 'Could not save route' };
  
    }
    }catch(error){
        return{error:'An unexpected error occurred'}
        
    }

  
}

export async function DeleteUsersRoutes(rock_id:number){
  const Supabase = await createServer()
  const {data:{user}} = await Supabase.auth.getUser()
  
  try{
     
  const{error} = await Supabase
  .from(`saved_routes`)
  .delete().match({'user_id':user?.id,'rock_id':rock_id})
  revalidatePath('/Profile')
  if(error){
    return {error:'could not delete route'}

  }
  }catch(error){
    return {error:'something went wrong'}
  }
 


  
}
