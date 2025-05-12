import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
    return (
        <div className='flex flex-col items-center gap-6 pt-8 w-full  py-10' id='speciality'>
            <h1 className='text-3xl font-semibold text-[#185fad]'>Find by Speciality</h1>
            <p className='sm:w-1/3 text-center text-sm text-[#293752]'>Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p>
            <div className='flex sm:justify-center gap-6 pt-5 w-full overflow-x-auto px-4 sm:px-0 scrollbar-hide'>
                {specialityData.map((item, index) => (
                    <Link 
                        onClick={() => scrollTo(0, 0)} 
                        className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 bg-[#b8dcf8] p-4 rounded-lg shadow-lg transform hover:-translate-y-3 transition-all duration-300 hover:shadow-xl' 
                        key={index} 
                        to={`/doctors/${item.speciality}`}>
                        <img className='w-16 sm:w-24 mb-2' src={item.image} alt={item.speciality} />
                        <p className='text-[#185fad] font-medium'>{item.speciality}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default SpecialityMenu
