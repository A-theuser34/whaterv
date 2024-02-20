import { clientServer } from '@/utils/supabase/client'
import React from 'react'

export default function Oauth() {
    const supabase = clientServer()
    const LoginwithGithub = () =>{
        supabase.auth.signInWithOAuth({
            provider:'github',
            options:{
                redirectTo:`${location.origin}/auth/callback`
            }
        })
    }
    
  return (
    <button onClick={LoginwithGithub} >Github</button>
  )
}
