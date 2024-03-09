import { createServer } from '@/utils/supabase/server'
import { Comments} from '@/interface/interfce'

import React from 'react'
import DeleteComment from './deleteComment'
import { revalidatePath } from 'next/cache'
import Image from 'next/image';
import ButtonForm from '@/app/(forms)/Contribute/ButtonForm'

interface page {
  desc:string
}

export default async  function CommentSections({desc}:page) {
  
    const supabase = createServer()
    const {data:{user}} = await supabase.auth.getUser()
    const { data: commentSection } = await supabase
    .from('comments')
    .select(`*, users(*)`)
    .eq('rock_id', desc);

    const commentsWithAvatar = commentSection?.map(comment => {
      let publicUrl = null;
      const avatar_url = comment.users?.avatar_url;
      if (avatar_url) {
        const parsedAvatarUrl = JSON.parse(avatar_url);
        publicUrl = parsedAvatarUrl.data.publicUrl;
      }
      return { ...comment, publicUrl }; 
    }) || [];
  

     async function submitcomment(form:FormData){
      "use server"
      const supabase = createServer()
      const {data:{user}} = await supabase.auth.getUser()
      try{
      const comment = form.get('com')
     await supabase.from('comments').insert({'user_id':user?.id,'rock_id':desc,'content':comment})
     
     revalidatePath(`/route/${desc}`)
    }catch(error){
      return{error:'something went wrong'}
      }
    }
    
    return (
      <div className="space-y-4">
        <div className='flex items-center space-x-2 p-3'> {/* Use 'flex' to make the div a flex container */}
          <h1 className="text-3xl font-bold">Comments</h1>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
            </svg>
        </div>

      {user ? (
          <form action={submitcomment} className="space-y-4">
              <textarea name='com' placeholder='Write a comment' rows={3} className="w-full p-2 border border-gray-300 rounded" />
              <ButtonForm  />
          </form>
      ) : (
          <p className="text-gray-500 dark:text-gray-400">Log in to submit a comment</p>
      )}
  
      {commentsWithAvatar.map((comments) => (
          <div key={comments.rock_id} className="flex items-center space-x-4">
              {comments.users?.username && (
                  <div className="font-bold text-lg">{comments.users.username}</div>
              )}
              {comments.publicUrl && (
                  <Image
                      src={comments.publicUrl}
                      width={100}
                      height={100}
                      alt={comments.publicUrl}
                      className="rounded-full"
                  />
              )}
              <div>
                  <p className="text-sm">{comments.content}</p>
                  {user?.id === comments.user_id && (
                      <DeleteComment id={comments.user_id}  />
                  )}
              </div>
          </div>
      ))}
  </div>
  
  
    )
}
