"use server"
import { createServer } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function handleFormSubmit(data:FormData){
    const place = data.get('place')
    const grade = data.get('grade')
    const lat = data.get('lat')
    const long = data.get('long')
    const approved = false
    const cookieStore = cookies()
    try{
    
    const supabase = await createServer(cookieStore)
    await supabase.from('rocks').insert({place,grade,lat,long,approved});
    
    }catch(error){
        return{error:'something went wrong'}
        
    }
    
}
export async function deleteUsersData (id:number) {
    const cookieStore = cookies()

    try{
        const supabase = await createServer(cookieStore)
        await supabase.from('rocks').delete().match({id});
        revalidatePath('/dashboard')
        }catch(error){
            return{error:'could not delete usersData'}
            
        }

}
export async function UptadeUsersData (id:number) {
    const cookieStore = cookies()

    try{
        const supabase = await createServer(cookieStore)
        await supabase.from('rocks').update({'approved':true}).eq('id',id);
        revalidatePath('/dashboard')
        }catch(error){
            return{error:'could not delete usersData'}
            
        }

}