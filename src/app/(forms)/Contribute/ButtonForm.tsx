"use client"
import React from 'react'
import { useFormStatus } from 'react-dom'

export default function ButtonForm() {
    const { pending } = useFormStatus()
    
    return (
        <button 
          type='submit' 
          className="transition duration-500 transform hover:bg-slate-600 bg-slate-400 text-black p-2 rounded-xl"
          aria-disabled={pending}
        >
          {pending ? 'Loading...' : 'Submit'}
        </button>
      )
     }