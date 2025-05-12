import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-[#185fad] rounded-lg px-6 md:px-10 lg:px-20 shadow-lg overflow-hidden relative'>
        {/* Left Side */}
        <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px] animate-fadeIn'>
            <p className='text-2xl md:text-3xl lg:text-4xl text-[#bbbbbb] font-bold leading-tight md:leading-tight lg:leading-tight tracking-wide'>
                Your Health, Our Mission
                <br /> Book Instantly with Top Experts
            </p>
            <div className='flex flex-col md:flex-row items-center gap-3 text-[#a5bfd0] text-sm font-light'>
                <img className='w-28' src={assets.group_profiles} alt='' />
                <p>
                   Find trusted specialists & book appointments hassle-free.
                   <br className='hidden sm:block' /> Your wellness journey starts here!
                </p>
            </div>
            <a href='#speciality' className='flex items-center gap-2 bg-[#a4cff0] px-8 py-3 rounded-full text-[#293752] text-sm m-auto md:m-0 hover:scale-110 transition-transform duration-300 shadow-md'>
                Get Started <img className='w-3' src={assets.arrow_icon} alt='' />
            </a>
        </div>
        <div className='md:w-1/2 relative animate-slideIn flex items-end'>
          <img className='w-full rounded-lg drop-shadow-lg' src={assets.header_img} alt='' />
        </div>
    </div>
  )
}

export default Header