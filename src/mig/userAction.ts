'use server'

import { LoginSchema, SignUpSchema } from '@/interface/interfce'
import { createServer } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

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
  const cookieStore = cookies()
  const supabase = await createServer(cookieStore)

   await supabase.auth.signUp({email:data.email,password:data.password})


}

export async function LoginUsers(data:{email:string,password:string}){
  const result = LoginSchema.safeParse(data)
  
  if(!result.success){
    return{
      error:'invalid credentials'
    }
  }
  const cookieStore = cookies()
  const supabase = await createServer(cookieStore)


   await supabase.auth.signInWithPassword({email:data.email,password:data.password})

}
export  async function Signout (){
  
  const cookieStore = cookies()
  const supabase = await createServer(cookieStore)

   const {error} = await supabase.auth.signOut()

   return JSON.stringify(error)
  

}

export async function usersProfile(data:{username:string}){
  'use server'
  
  const cookieStore = cookies()
  const Supabase = await createServer(cookieStore)

  const {data:{user}} = await Supabase.auth.getUser()

  await Supabase
  .from('users')
  .update({'username':data.username, avatar_url:'empty',"last_changed_at":new Date()}).match({"id":user?.id});
 

  revalidatePath('/','layout')

}