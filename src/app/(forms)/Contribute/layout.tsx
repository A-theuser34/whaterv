import React from 'react'
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { createServer } from '@/utils/supabase/server';



export default async function layout({children}:{children:React.ReactNode}) {
  const cookieStore = cookies()  
  const supabase = await createServer(cookieStore)
    const {data} = await supabase.auth.getUser()

    if(!data.user){
        redirect('/SignUp')
    }
  return (
    <div>
        {children}
    </div>
  )
}