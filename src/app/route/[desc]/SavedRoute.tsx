'use client'
import { SavedUsersRoutes } from '@/mig/userAction'
import React, { useState } from 'react'
interface saveRoute {
    desc:string
  }

export default function SavedRoute({desc}:saveRoute) {

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); 
  const [success, setSuccess] = useState(false);

  async function SaveusersRoute() {
    setLoading(true); 
    setError(''); 
    setSuccess(false); 

    const res = await SavedUsersRoutes(desc);
    if (res?.error) {
      setError(res.error);
    } else {
      setSuccess(true);
    }

    setLoading(false); 
 }

  return (
    <div className="flex justify-end">
 <button
    onClick={SaveusersRoute}
    className="bg-gray-700 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
    disabled={loading} // Disable the button while loading
 >
    {loading ? 'Saving...' : success ? 'Saved!' : error ? error : 'Save Route'}
 </button>
</div>

  )
}
