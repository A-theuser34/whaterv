import React from 'react'

import { RockClimbing } from '@/interface/interfce'
import UptadeButton from './UptadeButton'
import DeleteButton from './DeleteButton'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';
import { createServer } from '@/utils/supabase/server'

export default async function page() {
  const cookieStore = cookies()
  const supabase = await createServer(cookieStore)

    const {data:{user}} = await supabase.auth.getUser()
    if(!user){
      redirect('/SignUp')
    }
    if(user?.email !== process.env.ADMIN_SECRET!){
      redirect('/Profile')
    }
    const {data} = await supabase.from('rocks').select('*').eq('approved',false)
  return (
    <div>{data?.map((data:RockClimbing,index)=>{
        return(
            <div key={index}>
            PLACE:{data.place}
            Longitiute:{data.long}
            Latitude:{data.lat}
            Grade level:{data.grade}
            <div>
                <UptadeButton id={data.id}/>
                <DeleteButton id={data.id}/>
            </div>
        </div>
        )
    })}</div>
  )
}
