import React from 'react'
import { redirect } from 'next/navigation';
import { createServer } from '@/utils/supabase/server';




export default async function layout({children}:{children:React.ReactNode}) {
  const supabase = await createServer()
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