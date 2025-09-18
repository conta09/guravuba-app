import React from 'react'
import Image from 'next/image'

const Navbar = () => {

  return (
    <div className='flex items-center px-4 md:px-8 py-3 justify-between border-b'>
      <Image 
        
        className='w-28 lg:w-32 cursor-pointer' 
        src="/logo.svg" 
        alt="Logo" 
        width={128}
        height={64}
        priority
      />
      <button className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>
        Logout
      </button>
    </div>
  )
}

export default Navbar