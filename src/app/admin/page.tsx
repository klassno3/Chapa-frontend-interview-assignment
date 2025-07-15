import UserOverview from '@/components/UserOverview'
import React from 'react'

const Page = () => {
  return (
    <div className='bg-[#f7f7f7] h-[80vh]'>
      <div className='max-w-[1400px] w-11/12 mx-auto py-10 font-sans'>
        <UserOverview />
      </div>
    </div>
  )
}

export default Page
