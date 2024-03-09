'use client'
import { clientServer } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

interface DeleteCommentProps {
  id: number;
 }

export default function DeleteComment({id}:DeleteCommentProps) {
  const router = useRouter()
   const [error ,setError] = useState('')
   const [loading, setLoading] = useState(false);
   const [isSuccess, setIsSuccess] = useState(false); 

    async function deleteUser(){
        const supabase = clientServer()
        const { error } = await supabase.from('comments').delete().eq('user_id', id)
        
        if(error){
            setError(error.message)
        }else{
          setIsSuccess(true); 
            router.refresh()
        }
        setLoading(false);

    }

  return  (
    <div className="flex items-center justify-center">
      <button
        className={`text-white'}`}
        onClick={deleteUser}
        disabled={loading}
      >
        {loading ? 'Deleting...' : (isSuccess ? 'Success' : 'Delete Comment')}
      </button>
      {error && (
        <div className="text-red-500 ml-4">
          {error}
        </div>
      )}
    </div>
 );
}
