import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import Logo from "../../public/logo-green.svg"
const Footer = () => {

  return (
    <footer className='bg-secondary text-white text-center py-4 font-sans font-light' >
      <div className="max-w-[1400px] w-11/12 mx-auto">
        <div className="flex flex-col items-start gap-3">
          <Link href='/' >
            <Image src={ Logo } alt='logo' className='w-10 md:w-12 ' />
          </Link>
          <p className='font-light text-sm md:text-base text-left w-4/5 md:w-3/5'>Powering seamless, secure, and fast payments helping businesses grow and customers pay with confidence</p >
        </div>
        <p className='flex justify-center mx-auto pt-7 md:pt-10 font-thin text-xs md:text-sm text-left'>© 2025 Bankly. All rights reserved.</p>
      </div>
    </footer >
  )
}

export default Footer
