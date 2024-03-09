import { clientServer } from '@/utils/supabase/client'
import React from 'react'

export default function Oauth() {
    const supabase = clientServer()
    const LoginwithGithub = () => {
        supabase.auth.signInWithOAuth({
            provider:'github',
            options:{
                redirectTo:`${location.origin}/auth/callback`
            }
        })
    }
    
  return (
          <button  
            onClick={LoginwithGithub} 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
            Login with GitHub
        </button>  )
}
