import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TopDoctors = () => {
    const navigate = useNavigate()
    const {doctors}=useContext(AppContext)
    return (
        <div className='flex flex-col items-center gap-6 my-16 text-[#293752] md:mx-10'>
            <h1 className='text-3xl font-semibold text-[#185fad]'>Top Doctors</h1>
            <p className='sm:w-1/3 text-center text-sm text-[#293752]'>Simply browse through our extensive list of trusted doctors.</p>
            <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 pt-5 px-4 sm:px-0'>
                {doctors.slice(0, 10).map((item, index) => (
                    <div
                        key={index}
                        onClick={() => navigate(`/appointment/${item._id}`)}
                        className='border border-[#a5bfd0] rounded-xl overflow-hidden cursor-pointer bg-white shadow-md hover:shadow-lg transform hover:-translate-y-2 transition-all duration-300'
                    >
                        <div className='h-56 md:h-60 lg:-64 overflow-hidden'>
                            <img className='bg-[#a4cff0] w-full h-full object-cover' src={item.image} alt={item.name} />
                        </div>
                        <div className='p-4'>
                            <div className='flex items-center gap-2 text-sm text-green-500'>
                                <p className='w-2 h-2 bg-green-500 rounded-full'></p>
                                <p>Available</p>
                            </div>
                            <p className='text-lg font-semibold text-[#185fad]'>{item.name}</p>
                            <p className='text-sm text-[#293752]'>{item.speciality}</p>
                        </div>
                    </div>
                ))}
            </div>
            <button
                onClick={() => { navigate('/doctors'); scrollTo(0, 0) }}
                className='bg-[#185fad] text-white px-12 py-3 rounded-full mt-10 hover:bg-[#293752] transition-all duration-300'
            >
                More
            </button>
        </div>
    )
}

export default TopDoctors
