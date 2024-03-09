'use client'

import { Signout } from '@/mig/userAction';
import { useRouter } from "next/navigation"
import { useState } from 'react';

export default function SingOut() {
    const router = useRouter()
    const [error,seterror] = useState('')

    async function logoutButton(){
    const res = await Signout()
    const error = JSON.parse(res)

    if(!error){
      router.push('/')
      router.refresh()
    }else{
      seterror('somwehting went wrong')

    }
   }

  return (
    <div className=" font-bold text-black">
      <button className="ml-4" onClick={logoutButton}>Logout</button>
      {error}
      </div>
  )
}