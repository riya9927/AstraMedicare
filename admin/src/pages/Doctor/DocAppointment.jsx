import React, { useContext, useEffect } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const DocAppointment = () => {
  const { dToken, appointments, getAppointments, completeAppointment, cancelAppointment } = useContext(DoctorContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center">All Appointments</h1>

      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-6 bg-gray-500 text-white font-medium p-4 text-sm">
          <div className="text-center">#</div>
          <div className="text-center">Patient</div>
          <div className="text-center">Payment</div>
          <div className="text-center">Date & Time</div>
          <div className="text-center">Fees</div>
          <div className="text-center">Actions</div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-200 text-sm">
          {appointments.slice().reverse().map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-6 gap-4 p-4 items-center hover:bg-gray-50 transition-colors duration-150"
            >
              <div className="text-center font-medium text-gray-700 md:block">{index + 1}</div>

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

              <div className="text-center">
                <span
                  className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${item.payment
                    ? 'bg-green-100 text-green-800'
                    : 'bg-blue-100 text-blue-800'
                    }`}
                >
                  {item.payment ? 'Online' : 'CASH'}
                </span>
              </div>

              <div className="text-center text-gray-700">
                <p>{slotDateFormat(item.slotDate)}</p>
                <p className="text-xs text-gray-500">{item.slotTime}</p>
              </div>

              <div className="text-center font-medium text-green-600">
                {currency}
                {item.amount}
              </div>

              <div className="text-center">
                {item.cancelled ? (
                  <p className="text-red-400 text-xs sm:text-sm font-medium">Cancelled</p>
                ) : item.isCompleted ? (
                  <p className="text-green-400 text-xs sm:text-sm font-medium">Completed</p>
                ) : (
                  <div className="flex justify-center space-x-3">
                    <button
                      className="text-red-600 hover:text-red-900"
                      title="Cancel Appointment"
                      onClick={() => cancelAppointment(item._id)}
                    >
                      <img src={assets.cancel_icon} alt="Cancel" className="w-7 h-7" />
                    </button>
                    <button
                      className="text-green-600 hover:text-green-900"
                      title="Approve Appointment"
                      onClick={() => completeAppointment(item._id)}
                    >
                      <img src={assets.tick_icon} alt="Approve" className="w-7 h-7" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {appointments.length === 0 && (
            <div className="p-8 text-center text-gray-500">No appointments found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocAppointment;
