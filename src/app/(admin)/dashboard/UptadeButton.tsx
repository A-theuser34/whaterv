"use client"
import { UptadeUsersData } from '@/mig/action'
import React from 'react'
import { useFormStatus } from "react-dom"
export default function UptadeButton({id}:{id:number}) {
    const { pending } = useFormStatus()

    return (
    <div>
        <div>
        <button aria-disabled={pending} onClick={async()=> await UptadeUsersData(id)}>Uptade</button>
    </div>
    </div>
  )
}
