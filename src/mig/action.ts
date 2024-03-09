"use server"
import { createServer } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";


export async function handleFormSubmit(data:FormData){
    const place = data.get('place')
    const grade_level  = data.get('grade')
    const lat = data.get('lat')
    const long = data.get('long')
    const approved  = false
    
    try{
    
    const supabase = await createServer()
    const {data:{user}} = await supabase.auth.getUser()
    const {error} = await supabase.from('rocks').insert({"users_id":user?.id,place,grade_level ,lat,long,approved});
    console.log(error)
    }catch(error){
        return{error:'something went wrong'}
        
    }
    
}
export async function deleteUsersData (id:number) {
    

    try{
        const supabase = await createServer()
        await supabase.from('rocks').delete().match({id});
        revalidatePath('/dashboard')
        }catch(error){
            return{error:'could not delete usersData'}
            
        }

}
export async function UptadeUsersData (id:number) {
    

    try{
        const supabase = await createServer()
        await supabase.from('rocks').update({'approved':true}).eq('id',id);
        revalidatePath('/dashboard')
        }catch(error){
            return{error:'could not delete usersData'}
            
        }

}
