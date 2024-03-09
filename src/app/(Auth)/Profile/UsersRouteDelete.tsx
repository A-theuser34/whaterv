'use client'
import { DeleteUsersRoutes } from '@/mig/userAction'
import React, { useState } from 'react'
interface deleteprops {
    rock_id:number
}
export default function UsersRouteDelete({rock_id}:deleteprops) {

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')

    async function DeleteUsersRoute(){
        const res = await DeleteUsersRoutes(rock_id)

        if (res?.error) {
        setErrorMessage(res.error);
    } else {
      setSuccess(true);
    }

    setLoading(false); 
    }
  return (
    <div>
      <button
        className={`ml-4 ${loading ? 'bg-gray-400' : success ? 'bg-green-500' : 'bg-blue-500'} hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}
        onClick={DeleteUsersRoute}
        disabled={loading}
      >
        {loading ? 'loading...' : success ? 'Deleted!' : errorMessage ? errorMessage : 'Delete'}
      </button>
      {errorMessage && <p className="text-red-600">{errorMessage}</p>}
    </div>
  )
}
