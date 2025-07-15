"use client"
import { useAuth } from '@/context/authContext'
import Link from 'next/link'
import React from 'react'
const Page = () => {

  const { role } = useAuth()
  return (

    <main className="flex justify-center items-center h-[80vh]  font-sans place-items-center bg-white">
      <div className="flex flex-col gap-3 md:gap-5 text-center">
        <p className="text-xl md:text-2xl font-semibold text-green-600">404</p>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">Page not found</h1>
        <p className="text-base md:text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">Sorry, we couldn’t find the page you’re looking for.</p>
        <div className="flex items-center justify-center gap-x-6">
          <Link href={ role ? `/${role}` : "/" } className="rounded bg-green-600  font-medium px-3.5 py-2.5 text-sm  text-white shadow-xs hover:bg-green-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">Go back home</Link>
          <Link href="/" className="text-sm font-medium text-gray-900">Contact support <span aria-hidden="true">&rarr;</span></Link>
        </div>
      </div>
    </main>

  )
}

export default Page
