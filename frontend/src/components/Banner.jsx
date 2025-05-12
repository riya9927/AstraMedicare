import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
    const navigate = useNavigate()
    return (
        <div className='flex bg-[#185fad] rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10 shadow-lg overflow-hidden relative'>
            {/* Left Side */}
            <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5 animate-fadeIn'>
                <div className='text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold text-[#a5bfd0] tracking-wide'>
                    <p>Your Health, Your Priority</p>
                    <p className='mt-4 text-[#a4cff0]'>100+ Experts, One Click Away!</p>
                </div>
                <button 
                    onClick={() => { navigate('/login'); scrollTo(0,0) }} 
                    className='bg-[#a4cff0] text-sm sm:text-base text-[#293752] px-8 py-3 rounded-full mt-6 hover:scale-110 hover:bg-[#bbbbbb] transition-transform duration-300 shadow-md'
                >
                    Get Started Now
                </button>
            </div>
            {/* Right Side */}
            <div className='hidden md:block md:w-1/2 lg:w-[370px] relative animate-slideIn'>
                <img className='w-full md:h-full object-cover object-right-bottom rounded-lg drop-shadow-lg' src={assets.appointment_img} alt='' /> 
            </div>
            
            {/* Floating Decorations */}
            <div className='absolute top-10 left-10 w-16 h-16 bg-[#a4cff0] opacity-50 rounded-full animate-pulse'></div>
            <div className='absolute bottom-10 right-10 w-24 h-24 bg-[#bbbbbb] opacity-30 rounded-full animate-bounce'></div>
        </div>
    )
}

export default Banner