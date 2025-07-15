import React from 'react'
import { FaLock } from 'react-icons/fa6'

const Page = () => {
  return (
    <main className='h-[80vh] flex flex-col gap-2 md:gap-4 items-center justify-center font-sans py-20 '>
      <FaLock className='text-4xl md:text-6xl text-primary/90' />
      <h1 className="text-lg md:text-3xl text-primary/90 font-semibold"> You are not authorized
      </h1>
      <p className="text-sm md:text-xl text-secondary/70 text-center">  You tried to access a page you did not have prior authorization for.</p>
    </main>
  )
}

export default Page
