import React from 'react'
import { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const AllAppointments = () => {
  const { appointments, aToken, getAllAppointments, cancelAppointment } = useContext(AdminContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">All Appointments</h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-7 bg-blue-600 text-white font-medium p-4">
          <div className="text-center">#</div>
          <div className="text-center">Patient</div>
          {/* <div className="text-center">Age</div> */}
          <div className="text-center">Date & Time</div>
          <div className="text-center">Doctor</div>
          <div className="text-center">Fees</div>
          <div className="text-center">Actions</div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-200">
          {appointments.map((item, index) => (
            <div 
              key={index} 
              className="grid grid-cols-7 p-4 items-center hover:bg-gray-50 transition-colors duration-150"
            >
              <div className="text-center font-medium text-gray-700">{index + 1}</div>
              
              <div className="flex items-center justify-center space-x-2">
                <div className="h-10 w-10 rounded-full overflow-hidden flex-shrink-0">
                  <img 
                    src={item.userData.image} 
                    alt={item.userData.name} 
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="font-medium text-gray-800 truncate">{item.userData.name}</p>
              </div>
              
              {/* <div className="text-center text-gray-700">{calculateAge(item.userData.dob)}</div> */}
              
              <div className="text-center text-gray-700">
                <p>{slotDateFormat(item.slotDate)}</p>
                <p className="text-sm text-gray-500">{item.slotTime}</p>
              </div>
              
              <div className="flex items-center justify-center space-x-2">
                <div className="h-10 w-10 rounded-full overflow-hidden flex-shrink-0">
                  <img 
                    src={item.docData.image} 
                    alt={item.docData.name}
                    className="h-full w-full object-cover" 
                  />
                </div>
                <p className="font-medium text-gray-800 truncate">{item.docData.name}</p>
              </div>
              
              <div className="text-center font-medium text-green-600">
                {currency}{item.amount}
              </div>
              
              <div className="flex justify-center">
                {item.cancelled ? (
                  <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                    Cancelled
                  </span>
                ) : (
                  <button 
                    onClick={() => cancelAppointment(item._id)}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none"
                    title="Cancel Appointment"
                  >
                    <img 
                      src={assets.cancel_icon} 
                      alt="Cancel" 
                      className="h-5 w-5" 
                    />
                  </button>
                )}
              </div>
            </div>
          ))}
          
          {appointments.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No appointments found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllAppointments;