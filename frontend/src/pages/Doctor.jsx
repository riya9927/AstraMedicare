import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const Doctor = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)
  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    } else {
      setFilterDoc(doctors)
    }
  }
  useEffect(() => {
    applyFilter()
  }, [doctors, speciality])

  return (
    <div className="px-6 md:px-16 lg:px-24 mt-10">
      <p className="text-4xl font-semibold text-gray-800 mb-5 text-center">Find the perfect specialist for your needs—expert doctors, just a click away!</p>
      <div className='flex flex-col sm:flex-row items-start gap-6 mt-7'>
        <div className="bg-white shadow-lg rounded-lg p-5 text-gray-700 w-full sm:w-1/4">
          <p className="text-lg font-semibold mb-3 text-[#185fad] text-center">Specialities</p>
          <div className="space-y-3">
            <p onClick={() => speciality === 'General physician' ? navigate('/doctors') : navigate('/doctors/General physician')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "General physician" ? "bg-[#185fad] text-white shadow-md" : "bg-gray-100 hover:bg-[#185fad] hover:text-white"}`}>General physician</p>
            <p onClick={() => speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gynecologist" ? "bg-[#185fad] text-white shadow-md" : "bg-gray-100 hover:bg-[#185fad] hover:text-white"}`}>Gynecologist</p>
            <p onClick={() => speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Dermatologist" ? "bg-[#185fad] text-white shadow-md" : "bg-gray-100 hover:bg-[#185fad] hover:text-white"}`}>Dermatologist</p>
            <p onClick={() => speciality === 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Pediatricians" ? "bg-[#185fad] text-white shadow-md" : "bg-gray-100 hover:bg-[#185fad] hover:text-white"}`}>Pediatricians</p>
            <p onClick={() => speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Neurologist" ? "bg-[#185fad] text-white shadow-md" : "bg-gray-100 hover:bg-[#185fad] hover:text-white"}`}>Neurologist</p>
            <p onClick={() => speciality === 'Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gastroenterologist" ? "bg-[#185fad] text-white shadow-md" : "bg-gray-100 hover:bg-[#185fad] hover:text-white"}`}>Gastroenterologist</p>
            <p onClick={() => speciality === 'Cardiologist' ? navigate('/doctors') : navigate('/doctors/Cardiologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Cardiologist" ? "bg-[#185fad] text-white shadow-md" : "bg-gray-100 hover:bg-[#185fad] hover:text-white"}`}>Cardiologist</p>
            <p onClick={() => speciality === 'Orthopedic Surgeon' ? navigate('/doctors') : navigate('/doctors/Orthopedic Surgeon')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Orthopedic Surgeon" ? "bg-[#185fad] text-white shadow-md" : "bg-gray-100 hover:bg-[#185fad] hover:text-white"}`}>Orthopedic Surgeon</p>
            <p onClick={() => speciality === 'ENT Specialist' ? navigate('/doctors') : navigate('/doctors/ENT Specialist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "ENT Specialist" ? "bg-[#185fad] text-white shadow-md" : "bg-gray-100 hover:bg-[#185fad] hover:text-white"}`}>ENT Specialist</p>
            <p onClick={() => speciality === 'Psychiatrist' ? navigate('/doctors') : navigate('/doctors/Psychiatrist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Psychiatrist" ? "bg-[#185fad] text-white shadow-md" : "bg-gray-100 hover:bg-[#185fad] hover:text-white"}`}>Psychiatrist</p>
            <p onClick={() => speciality === 'Radiologist' ? navigate('/doctors') : navigate('/doctors/Radiologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Radiologist" ? "bg-[#185fad] text-white shadow-md" : "bg-gray-100 hover:bg-[#185fad] hover:text-white"}`}>Radiologist</p>
            <p onClick={() => speciality === 'Pathologist' ? navigate('/doctors') : navigate('/doctors/Pathologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Pathologist" ? "bg-[#185fad] text-white shadow-md" : "bg-gray-100 hover:bg-[#185fad] hover:text-white"}`}>Pathologist</p>
            <p onClick={() => speciality === 'Plastic Surgeon' ? navigate('/doctors') : navigate('/doctors/Plastic Surgeon')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Plastic Surgeon" ? "bg-[#185fad] text-white shadow-md" : "bg-gray-100 hover:bg-[#185fad] hover:text-white"}`}>Plastic Surgeon</p>
          </div>

        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {
            filterDoc.map((item, index) => (
              <div
                key={index}
                onClick={() => navigate(`/appointments/${item._id}`)}
                className='border border-[#a5bfd0]  rounded-xl overflow-hidden cursor-pointer bg-white shadow-md hover:shadow-lg transform hover:-translate-y-2 transition-all duration-300'
              >
                <div className='h-56 md:h-60 lg:-64 overflow-hidden'>
                  <img className='bg-[#a4cff0] w-full h-full object-cover rounded-t-lg hover:brightness-110 transition-all duration-300"' src={item.image} alt={item.name} />
                </div>
                <div className='p-4'>
                  <div className='flex items-center gap-2 text-sm text-green-500 animate-pulse'>
                    <p className='w-2 h-2 bg-green-500 rounded-full'></p>
                    <p>Available</p>
                  </div>
                  <p className='text-lg font-semibold text-[#185fad] mt-1'>{item.name}</p>
                  <p className='text-sm text-[#293752]'>{item.speciality}</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Doctor
