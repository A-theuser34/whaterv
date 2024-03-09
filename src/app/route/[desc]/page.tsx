import Loading from '@/app/loading'
import React, { Suspense } from 'react'
import RockRoute from './rockRoute'

interface PageProps {
  params:{desc:string}
}

export default function page({params:{desc}}:PageProps) {
  return (
    <div>
      <Suspense fallback={<Loading/>}>
      <RockRoute desc={desc}/>
      </Suspense>

    </div>
  )
}
