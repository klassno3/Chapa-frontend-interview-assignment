"use client";
import React, { useEffect, useRef, useState } from 'react'
import Logo from "../../public/logo.svg"
import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '@/context/authContext'
import { BsChevronDown } from 'react-icons/bs'

const Navigation = () => {
  const { role, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const buttonRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);




  return (
    <nav className='sticky top-0 z-50 w-full bg-white'>
      <div className="max-w-[1400px] w-11/12 font-sans mx-auto flex justify-between text-secondary items-center py-4 bg-white">
        <div className="flex w-full items-center justify-between gap-2">
          <Link href='/' >
            <Image src={ Logo } alt='logo' className='w-10 md:w-12 ' />
          </Link>
          <div className="">
            { role ?
              <div ref={ buttonRef } className='relative h-full flex items-center gap-2'>
                <div className="flex items-center gap-2 cursor-pointer" onClick={ () => setIsOpen(!isOpen) }>
                  <div className=" bg-secondary flex items-center cursor-pointer justify-center font-semibold text-sm md:text-lg text-white w-10 h-10 md:w-12 md:h-12 rounded-full">
                    { role?.charAt(0).toUpperCase() }
                  </div>
                  <BsChevronDown className={ `transition-all duration-200 ${isOpen && "-rotate-180"}` } />
                </div>
                { isOpen &&
                  <div className='absolute bottom-0 left-0 translate-y-full bg-white shadow px-4 py-5 flex flex-col gap-1.5' >
                    <button onClick={ () => { logout(); setIsOpen(false) } } className="cursor-pointer hover:text-primary">Logout</button>


                  </div>
                }
              </div>
              : <Link href="/login" className='bg-primary text-white px-4 md:px-8 py-1.5 md:py-2.5 flex items-center justify-center rounded-full'>Login</Link> }
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
