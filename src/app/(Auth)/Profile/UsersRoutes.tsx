import { userRoutes } from '@/interface/interfce';
import { createServer } from '@/utils/supabase/server';
import Link from 'next/link';
import React from 'react'
import UsersRouteDelete from './UsersRouteDelete';

export default async function UsersRoutes() {
    const supabase = await createServer()
    const {data:{user}} = await supabase.auth.getUser()

    const { data:savedRoutes,error } = await supabase
    .from('saved_routes')
    .select(`*,rocks(*)`)
    .eq('user_id',user?.id);
    console.log(error)
    
    return (
     
<div className="absolute top-32 right-20">
  <div className="max-w-sm">
    <div className="px-4 py-2">
      <h1 className="text-xl font-bold mb-4">Saved Routes</h1>
      <div className="space-y-4">
        {savedRoutes?.map((route: any) => (
          <div key={route.id} className="flex items-center">
            <Link href={`route/${route.rock_id}`} className="text-blue-500 hover:text-blue-700">
              {route.rocks.place}
            </Link>
            <UsersRouteDelete rock_id={route.rock_id} />
          </div>
        ))}
      </div>
    </div>
  </div>
</div>

       
  )
}
