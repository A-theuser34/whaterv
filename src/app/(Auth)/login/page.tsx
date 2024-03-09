'use client'

import { useState } from "react"
import { useRouter } from "next/navigation";
import {LoginUsers} from "@/mig/userAction";
import ButtonForm from "@/app/(forms)/Contribute/ButtonForm";
import Oauth from "../SignUp/oauth";

export default function page() {
  const router = useRouter()

  const [error , setError] = useState('')
  
  async function clientUser(form:FormData){
    
    
    const data = {
      email: form.get('email') as string,
      password: form.get('password') as string,
    };

    const res = await LoginUsers(data)

    if(res?.error){
      setError(res?.error)
    }else{
      router.push('/Profile')
      router.refresh()
    }

  }
 


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
 <form action={clientUser} className="w-full max-w-lg">
    <div className="mb-4">
      <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
      <input required type="email" name='email' id="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-lg h-12" />
    </div>
    <div className="mb-4">
      <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
      <input required type='text' name='password' id="password" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-lg h-12" />
    </div>
    <ButtonForm />
    {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
 </form>
 <div className=" p-3">
   <Oauth/>
 </div>

 

</div>



  )
}
