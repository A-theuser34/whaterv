'use client'
import ButtonForm from '@/app/(forms)/Contribute/ButtonForm';

import { usersProfile } from '@/mig/userAction';


import { useState } from 'react';

export default function UserProfile() {
  const [error , setError] = useState('')

  async function userProfileSubmit(data:FormData){
    const res = await usersProfile(data)
    if(res?.error){
      setError(res?.error)
    }else{
      setError('yes')
    }
  }
 
  
  return (

    <div className="relative mt-10 sm:max-w-2xl sm:mx-auto">
    <h2 className="text-3xl font-bold text-center mb-6">Profile</h2>
        <form action={userProfileSubmit} className="max-w-2xl mx-auto">
          <div className="mb-8">
            <label htmlFor="username" className="block text-lg font-medium text-gray-700">Username</label>
            <input
              type="text"
              name='username'
              placeholder="Change profile name"
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-8">
            <label htmlFor="image" className="block text-lg font-medium text-gray-700">Profile Image</label>
            <input
              type="file" 
              name="image" 
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          {error && <p className="text-base text-red-600">{error}</p>}
          <div className="mt-8">
            <ButtonForm/>
          </div>
        </form>
       
        <p className="mt-8 text-base text-gray-500">Note: You can only change your profile every 30 days.</p>
        <div className="border-t border-black my-6"></div>

      </div>
  

    
  )
}

