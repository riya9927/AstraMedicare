import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div className='bg-[#293752] text-[#bbbbbb] py-12 px-6 md:px-16 lg:px-24 mt-16 relative overflow-hidden'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-10 animate-fadeIn'>
        {/* Left Section */}
        <div className='space-y-4'>
          <img className='w-40' src={assets.logo} alt='Astra Medicare Logo' />
          <p className='text-sm leading-relaxed'>
            Providing compassionate, advanced healthcare solutions to ensure your wellness and peace of mind.
          </p>
        </div>
        
        {/* Center Section */}
        <div className='space-y-4'>
          <p className='text-lg font-semibold text-[#a4cff0] tracking-wider'>Astra Medicare</p>
          <ul className='space-y-2 text-sm'>
            <li className='hover:text-[#a4cff0] cursor-pointer transition-all duration-300'>Home</li>
            <li className='hover:text-[#a4cff0] cursor-pointer transition-all duration-300'>About Us</li>
            <li className='hover:text-[#a4cff0] cursor-pointer transition-all duration-300'>Contact Us</li>
            <li className='hover:text-[#a4cff0] cursor-pointer transition-all duration-300'>Privacy Policy</li>
          </ul>
        </div>
        
        {/* Right Section */}
        <div className='space-y-4'>
          <p className='text-lg font-semibold text-[#a4cff0] uppercase tracking-wider'>Get In Touch</p>
          <ul className='space-y-3 text-sm'>
            <li>
              <a href='tel:9999999999' className='flex items-center gap-2 hover:text-[#a4cff0] transition-all duration-300'>
                <img className='w-5' src={assets.Phone} alt='' /> 9999999999
              </a>
            </li>
            <li>
              <a href='mailto:astramedicare123@gmail.com' className='flex items-center gap-2 hover:text-[#a4cff0] transition-all duration-300'>
                <img className='w-5' src={assets.Mail} alt='' /> astramedicare123@gmail.com
              </a>
            </li>
            <li>
              <a href='https://www.facebook.com/' className='flex items-center gap-2 hover:text-[#a4cff0] hover:scale-110 transition-all duration-300'>
                <img className='w-6' src={assets.Facebook} alt='Facebook' />Facebook
              </a>
            </li>
            <li>
              <a href='https://www.instagram.com/' className='flex items-center gap-2 hover:text-[#a4cff0] hover:scale-110 transition-all duration-300'>
                <img className='w-6' src={assets.Instagram} alt='Instagram' />Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/* Copyright text */}
      <div className='mt-8 text-center text-sm border-t border-[#bbbbbb] pt-4'>
        <p>&copy; 2025 Astra Medicare - All Rights Reserved</p>
      </div>
    </div>
  );
};

export default Footer;