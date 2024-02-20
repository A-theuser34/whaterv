import { createServer } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export default function page() {
   
  async function usersProfile(data:FormData){
    'use server'
    const username = data.get('username')
    const cookieStore = cookies()
    const Supabase = await createServer(cookieStore)
  
    const {data:{user}} = await Supabase.auth.getUser()

    await Supabase
    .from('users')
    .update({'username':username, avatar_url:'empty',"last_changed_at":new Date()}).match({"id":user?.id});
   

    revalidatePath('/','layout')

  }
 

  return (
    <div>
        <div>
          <h1>Profile Page</h1>
          <form action={usersProfile}>
            <input name='username' placeholder=' chnage profile name '/>
            <button>change name</button>
          </form>

        </div>
    </div>
  )
}
