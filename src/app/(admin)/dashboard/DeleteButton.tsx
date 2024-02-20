"use client"
import {deleteUsersData } from '@/mig/action'
import React from 'react'
import { useFormStatus } from "react-dom"
export default function DeleteButton({id}:{id:number}) {
    const { pending } = useFormStatus()

    return (
    <div>
        <div>
        <button aria-disabled={pending} onClick={async()=> await deleteUsersData(id)}>Delete</button>
    </div>
    </div>
  )
}
