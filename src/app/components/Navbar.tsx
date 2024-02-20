import Link from 'next/link';
import React from 'react';

import SingOut from './Signout';
import { cookies } from 'next/headers';
import { createServer } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function Navbar() {
  const cookieStore = cookies()
  const supabase = await createServer(cookieStore)  
  const {data:{user}} = await supabase.auth.getUser()  
  const {data:userName} = await supabase.from('users').select('username').eq('id',user?.id).single()



  return (
    <div className="flex justify-between items-center">
      <Link href="/"> home</Link>
      {user ? (
        <div className='flex gap-4'>
          <span>{userName?.username|| user.email}</span>
          <Link href='/dashboard'> my dashboard</Link>
          <SingOut />
        </div>
      ) : (
        <div className='flex gap-4 sm:flex'>
          <Link href="/login">
            Login
          </Link>
          <Link href="/SignUp">
            Signup
          </Link>
        </div>
      )}
      <Link href={'/Contribute'}>Forms</Link>
    </div>
  );
}
