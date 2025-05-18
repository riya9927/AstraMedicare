import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext)
  const { slotDateFormat } = useContext(AppContext)
  
  useEffect(() => {
    if (aToken) {
      getDashData()
    }
  }, [aToken])

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Stats Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Doctors Card */}
        <div className="bg-white rounded-lg shadow-md p-6 transition-all hover:shadow-lg">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full mr-4">
              <img src={assets.doctor_icon} alt="Doctors" className="w-10 h-10" />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-800">{dashData.doctors}</p>
              <p className="text-gray-500 font-medium">Doctors</p>
            </div>
          </div>
        </div>

        {/* Appointments Card */}
        <div className="bg-white rounded-lg shadow-md p-6 transition-all hover:shadow-lg">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full mr-4">
              <img src={assets.appointments_icon} alt="Appointments" className="w-10 h-10" />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-800">{dashData.appointments}</p>
              <p className="text-gray-500 font-medium">Appointments</p>
            </div>
          </div>
        </div>

        {/* Patients Card */}
        <div className="bg-white rounded-lg shadow-md p-6 transition-all hover:shadow-lg">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-full mr-4">
              <img src={assets.patients_icon} alt="Patients" className="w-10 h-10" />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-800">{dashData.patients}</p>
              <p className="text-gray-500 font-medium">Patients</p>
            </div>
          </div>
        </div>

         {/* Administrative Staff Card */}
        <div className="bg-white rounded-lg shadow-md p-6 transition-all hover:shadow-lg">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-full mr-4">
              <img src={assets.patients_icon} alt="Patients" className="w-10 h-10" />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-800">{dashData.administaff}</p>
              <p className="text-gray-500 font-medium">Administrative Staff</p>
            </div>
          </div>
        </div>

        {/* Nurse Card */}
        <div className="bg-white rounded-lg shadow-md p-6 transition-all hover:shadow-lg">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-full mr-4">
              <img src={assets.patients_icon} alt="Patients" className="w-10 h-10" />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-800">{dashData.nurse}</p>
              <p className="text-gray-500 font-medium">Nurse</p>
            </div>
          </div>
        </div>
      </div>

      

      {/* Latest Bookings Section */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="border-b border-gray-200 px-6 py-4 flex items-center">
          <div className="p-2 bg-gray-100 rounded-full mr-3">
            <img src={assets.list_icon} alt="List" className="w-5 h-5" />
          </div>
          <p className="text-xl font-semibold text-gray-800">Latest Bookings</p>
        </div>
        
        <div className="divide-y divide-gray-200">
          {dashData.latestAppointments && dashData.latestAppointments.map((item, index) => (
            <div key={index} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
              <div className="flex items-center">
                <img 
                  src={item.docData.image} 
                  alt={item.docData.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <p className="font-medium text-gray-800">{item.docData.name}</p>
                  <p className="text-sm text-gray-500">{slotDateFormat(item.slotDate)}</p>
                </div>
              </div>

              {item.cancelled ? (
                <span className="px-3 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                  Cancelled
                </span>
              ) : (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="p-2 text-gray-500 hover:text-red-500 focus:outline-none transition-colors"
                  title="Cancel Appointment"
                >
                  <img
                    src={assets.cancel_icon}
                    alt="Cancel"
                    className="w-5 h-5"
                  />
                </button>
              )}
            </div>
          ))}
          
          {/* Show message if no appointments */}
          {(!dashData.latestAppointments || dashData.latestAppointments.length === 0) && (
            <div className="px-6 py-8 text-center text-gray-500">
              No appointments found
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard