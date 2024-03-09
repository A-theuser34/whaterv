import React from 'react'
import UserProfile from './UserProfile'
import UserComments from './UserComments'
import UsersRoutes from './UsersRoutes'


export default function page() {
  return (
    <div >
      <UserProfile  />
      <UserComments />
      <UsersRoutes  />
    </div>
  )
}
