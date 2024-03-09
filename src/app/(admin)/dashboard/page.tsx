import React from 'react'

import { RockClimbing } from '@/interface/interfce'
import UptadeButton from './UptadeButton'
import DeleteButton from './DeleteButton'
import { redirect } from 'next/navigation';
import { createServer } from '@/utils/supabase/server'

export default async function page() {
  const supabase = await createServer()

    const {data:{user}} = await supabase.auth.getUser()
    if(!user){
      redirect('/SignUp')
    }
    if(user?.email !== process.env.ADMIN_SECRET!){
      redirect('/Profile')
    }
    const {data} = await supabase.from('rocks').select('*').eq('approved',false)
  return (
    <div>
    {data?.map((data: RockClimbing, index) => (
       <article key={data.id} className="mb-4 p-4 border border-gray-200 rounded bg-gray-100">
         <h3 className="text-lg font-semibold">PLACE: {data.place}</h3>
         <p>Longitude: {data.long}</p>
         <p>Latitude: {data.lat}</p>
         <p>Grade level: {data.grade}</p>
         <p>Description: {data.description}</p>
         <div className="mt-2">
           <UptadeButton id={data.id}/>
           <DeleteButton id={data.id} />
         </div>
       </article>
     ))}
   </div>
   
  )
}
