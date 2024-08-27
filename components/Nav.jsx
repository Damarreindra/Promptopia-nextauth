"use client"

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react' 
import {signIn, signOut, useSession, getProviders} from 'next-auth/react'


const Nav = () => {
const {data:session} = useSession() 
  const [providers, setProviders] = useState(null)
  const [toggleDropdown, setToggleDropdown] = useState(false)

  useEffect(()=>{
    const setUpProviders = async () =>{
      const response = await getProviders()
      setProviders(response)
    }
    setUpProviders()
  },[])

  return (
   
    <nav className='flex-between w-full pt-3'>
      <Link href='/' className='flex gap-2'>
      <Image 
      src={'/assets/images/logo.svg'}
      width={40}
      height={40}
      alt='Promptopia Logo'
      className='object-contain'
      />
      <p className='logo_text'>Promptopia</p>
      </Link>

      <div className="sm:flex hidden">
      {
        session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href="/create-prompt" className='black_btn'>
              Create Post
            </Link>
            <button type='button' onClick={signOut} className='outline_btn'>Sign Out</button>
            <Link     href={`/${session?.user.id}`}>
              <Image
              src={session.user.image}
              width={30}
              height={30}
              className='rounded-full'
              />
            </Link>
          </div>
        ):(
          <>
          {
            providers && 
            Object.values(providers).map((provider)=>(
              <button type='button' key={provider.name} onClick={()=>signIn(provider.id)} className='black_btn'>
                Sign In
              </button>
            ))
          }
          </>
        )
      }
      </div>

      {/* mobile nav */}
      <div className='sm:hidden flex relative'>
        {
          session?.user ? (
            <div className='flex'>
               <Image
           src={session.user.image}
              width={30}
              height={30}
              className='rounded-full'
              onClick={()=>setToggleDropdown((prev)=> !prev)}
              />
              {
                toggleDropdown && (
                  <div className='dropdown'>
                    <Link 
                    href={`/${session?.user.name}`}
                    onClick={()=>setToggleDropdown(false)}
                    >
                      My Profile
                    </Link>
                    <Link 
                    href={'/create-prompt'}
                    onClick={()=>setToggleDropdown(false)}
                    >
                      Create Prompt
                    </Link>
                    <button 
                    type='button'
                    onClick={()=>{
                      setToggleDropdown(false)
                      signOut()
                  
                    }}
                    className='w-full black_btn mt-5'
                    >
                      Sign Out
                    </button>
                  </div>
                )
              }
            </div>
          ) :
          (
            <>
            {
              providers && 
              Object.values(providers).map((provider)=>(
                <button type='button' key={provider.name} onClick={()=>signIn(provider.id)} className='black_btn'>
                  Sign In
                </button>
              ))
            }
            </>
          )
        }
      </div>
    </nav>
  )
}

export default Nav