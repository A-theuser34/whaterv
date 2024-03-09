import Link from 'next/link';
import React from 'react';

import SingOut from './Signout';
import { createServer } from '@/utils/supabase/server';
import Image from 'next/image';

export default async function Navbar() {
  const supabase = await createServer()  
  const {data:{user}} = await supabase.auth.getUser()  
  const {data:userName} = await supabase.from('users').select('username,avatar_url').eq('id',user?.id).single()
  
  
  let publicUrl = null;

  const avatar_url  = userName?.avatar_url;
  if(avatar_url){
    const parsedAvatarUrl = JSON.parse(avatar_url);
    publicUrl = parsedAvatarUrl.data.publicUrl;
  }
  
  return (
    
<div className="flex justify-between items-center bg-white py-4 px-20 border-b ">
    <div className=' flex'>
    <Link href="/" className="text-black text-2xl font-bold font-sans border-b border-gray-300">
       Home
    </Link>
    

    </div>
    <div className="flex items-center justify-center w-full gap-4 ml-auto">
       <Link href="/Profile" className="text-black font-bold text-lg font-sans">
         Profile
       </Link>
       <Link href="/Contribute" className="text-black font-bold text-lg font-sans">
         Forms
       </Link>
    </div>
    <div className="flex items-center gap-2">
       {user ? (
         <>
           {publicUrl && (
             <Image
               src={publicUrl}
               width={64}
               height={64}
               alt={publicUrl}
               className="rounded-full"
             />
           )}
           <span className="text-black">{userName?.username || user.email}</span>
           <SingOut /> 
         </>
       ) : (
         <>
           <Link href="/login" className="text-black hover:underline font-bold text-lg font-sans">
             Login
           </Link>
           <Link href="/SignUp" className="text-black hover:underline font-bold text-lg font-sans">
             Signup
           </Link>
         </>
       )}
    </div>
</div>



  );
}
