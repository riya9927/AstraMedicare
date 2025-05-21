
import React from 'react'
import { useContext, useEffect } from 'react';
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const DocAppointment = () => {
  const { dToken, appointments, getAppointments } = useContext(DoctorContext)
  const { slotDateFormat, currency } = useContext(AppContext);
  
  useEffect(() => {
    if (dToken) {
      getAppointments()
    }
  }, [dToken])

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">All Appointments</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Patient</th>
              <th className="py-3 px-4 text-left">Payment</th>
              <th className="py-3 px-4 text-left">Date & Time</th>
              <th className="py-3 px-4 text-left">Fees</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
            {appointments.map((item, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition duration-150">
                <td className="py-3 px-4">{index + 1}</td>
                
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    <div className="mr-2">
                      <img 
                        src={item.userData.image} 
                        alt="Patient" 
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    </div>
                    <span className="font-medium">{item.userData.name}</span>
                  </div>
                </td>
                
                <td className="py-3 px-4">
                  <span className={`py-1 px-3 rounded-full text-xs ${
                    item.payment ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {item.payment ? 'Online' : 'CASH'}
                  </span>
                </td>
                
                <td className="py-3 px-4">
                  <div className="text-sm">
                    <div>{slotDateFormat(item.slotDate)}</div>
                    <div className="text-gray-500">{item.slotTime}</div>
                  </div>
                </td>
                
                <td className="py-3 px-4 font-medium">
                  {currency}{item.amount}
                </td>
                
                <td className="py-3 px-4">
                  <div className="flex space-x-2">
                    <button className="p-1 rounded-full hover:bg-red-100 transition-colors duration-150">
                      <img src={assets.cancel_icon} alt="Cancel" className="w-5 h-5" />
                    </button>
                    <button className="p-1 rounded-full hover:bg-green-100 transition-colors duration-150">
                      <img src={assets.tick_icon} alt="Approve" className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {appointments.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No appointments found
          </div>
        )}
      </div>
    </div>
  )
}

export default DocAppointment