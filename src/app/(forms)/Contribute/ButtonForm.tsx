"use client"
import React from 'react'
import { useFormStatus } from 'react-dom'

export default function ButtonForm() {
    const { pending } = useFormStatus()
    
    return (
        <button 
          type='submit' 
          className="w-full flex justify-center py-3 px-6 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          aria-disabled={pending}
        >
          {pending ? 'Loading...' : 'Submit'}
        </button>
      )
     }