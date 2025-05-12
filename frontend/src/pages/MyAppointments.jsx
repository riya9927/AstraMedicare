// import React, { useContext } from 'react'
// import { AppContext } from '../context/AppContext'

// const MyAppointments = () => {
//   const { doctors } = useContext(AppContext)
//   return (
//     <div>
//       <p>My appointments</p>
//       <div>
//         {doctors.slice(0, 2).map((item, index) => (
//           <div key={index}>
//             <div>
//               <img src={item.image} alt="" />
//             </div>
//             <div>
//               <p>{item.name}</p>
//               <p>{item.speciality}</p>
//               <p>Address:</p>
//               <p>{item.address.line1}</p>
//               <p>{item.address.line2}</p>
//               <p><span>Date & Time:</span> 25, July, 2024 | 8:30 PM</p>
//             </div>
//             <div></div>
//             <div>
//               <button>Pay Online</button>
//               <button>Cancel appointment</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default MyAppointments

import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Calendar, Clock, MapPin, CreditCard, X, Search, Filter, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MyAppointments = () => {
  const { doctors } = useContext(AppContext);
  const [activeFilter, setActiveFilter] = useState('upcoming');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate =useNavigate();
  
  // Mock appointments data (in a real app, this would come from your backend)
  const appointments = doctors.slice(0, 2).map((doctor, index) => ({
    id: index + 1,
    doctor: doctor,
    date: '2024-07-25',
    time: '8:30 PM',
    status: index === 0 ? 'confirmed' : 'pending',
    paymentStatus: index === 0 ? 'paid' : 'pending',
    appointmentType: index === 0 ? 'Follow-up' : 'New Visit',
    notes: index === 0 ? 'Please bring previous test reports' : ''
  }));
  
  // More mock appointments
  const pastAppointments = [
    {
      id: 3,
      doctor: doctors[0],
      date: '2024-06-12',
      time: '4:15 PM',
      status: 'completed',
      paymentStatus: 'paid',
      appointmentType: 'Check-up',
      notes: ''
    },
    {
      id: 4,
      doctor: doctors[1],
      date: '2024-05-30',
      time: '10:00 AM',
      status: 'completed',
      paymentStatus: 'paid',
      appointmentType: 'Consultation',
      notes: ''
    }
  ];
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  const getStatusColor = (status) => {
    switch(status) {
      case 'confirmed': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'completed': return 'bg-blue-100 text-blue-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };
  
  const filteredAppointments = activeFilter === 'upcoming' 
    ? appointments 
    : activeFilter === 'past' 
      ? pastAppointments 
      : [...appointments, ...pastAppointments];
  
  const searchedAppointments = filteredAppointments.filter(
    appointment => appointment.doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  appointment.doctor.speciality.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">My Appointments</h1>
          <button onClick={() => navigate('/doctors')} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition flex items-center justify-center">
            <Calendar size={18} className="mr-2" />
            Book New Appointment
          </button>
        </div>
        
        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm mb-6 p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center relative flex-1">
              <Search size={18} className="absolute left-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search by doctor or specialty"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex rounded-lg border overflow-hidden">
              <button
                onClick={() => setActiveFilter('upcoming')}
                className={`px-4 py-2 text-sm font-medium ${
                  activeFilter === 'upcoming' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Upcoming
              </button>
              <button
                onClick={() => setActiveFilter('past')}
                className={`px-4 py-2 text-sm font-medium ${
                  activeFilter === 'past' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Past
              </button>
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-4 py-2 text-sm font-medium ${
                  activeFilter === 'all' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                All
              </button>
            </div>
          </div>
        </div>
        
        {/* Appointments List */}
        <div className="space-y-4">
          {searchedAppointments.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Calendar size={24} className="text-gray-500" />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">No appointments found</h3>
              <p className="text-gray-500 max-w-sm mx-auto">
                {searchQuery 
                  ? "Try adjusting your search criteria." 
                  : activeFilter === 'upcoming' 
                    ? "You don't have any upcoming appointments." 
                    : "No past appointments found."}
              </p>
              {!searchQuery && activeFilter !== 'upcoming' && (
                <button 
                  onClick={() => setActiveFilter('upcoming')}
                  className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
                >
                  View upcoming appointments
                </button>
              )}
            </div>
          ) : (
            searchedAppointments.map((appointment) => (
              <div 
                key={appointment.id} 
                className="bg-white rounded-xl shadow-sm overflow-hidden transition hover:shadow-md"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Doctor info section */}
                  <div className="flex p-4 md:p-6 flex-1">
                    <div className="w-20 h-20 rounded-full overflow-hidden mr-4 flex-shrink-0">
                      <img 
                        src={appointment.doctor.image} 
                        alt={appointment.doctor.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-800">{appointment.doctor.name}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(appointment.status)}`}>
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{appointment.doctor.speciality}</p>
                      
                      <div className="mt-3">
                        <p className="text-sm text-gray-500 flex items-center mb-1">
                          <MapPin size={14} className="mr-1" /> Address:
                        </p>
                        <p className="text-sm text-gray-800">{appointment.doctor.address.line1}</p>
                        <p className="text-sm text-gray-800">{appointment.doctor.address.line2}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Appointment details & actions section */}
                  <div className="bg-gray-50 p-4 md:p-6 md:w-64 flex flex-col justify-between border-t md:border-t-0 md:border-l border-gray-100">
                    <div>
                      <div className="flex items-center mb-3">
                        <Calendar size={16} className="text-blue-600 mr-2" />
                        <span className="text-sm font-medium">{formatDate(appointment.date)}</span>
                      </div>
                      <div className="flex items-center mb-3">
                        <Clock size={16} className="text-blue-600 mr-2" />
                        <span className="text-sm font-medium">{appointment.time}</span>
                      </div>
                      <div className="text-sm text-gray-600 mb-1">
                        {appointment.appointmentType}
                      </div>
                      {appointment.notes && (
                        <div className="text-xs text-gray-500 italic">
                          {appointment.notes}
                        </div>
                      )}
                    </div>
                    
                    {appointment.status !== 'completed' && appointment.status !== 'cancelled' && (
                      <div className="mt-4 space-y-2">
                        {appointment.paymentStatus === 'pending' && (
                          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center justify-center">
                            <CreditCard size={16} className="mr-2" />
                            Pay Online
                          </button>
                        )}
                        <button className="w-full bg-white border border-red-500 text-red-500 hover:bg-red-50 py-2 px-4 rounded flex items-center justify-center">
                          <X size={16} className="mr-2" />
                          Cancel
                        </button>
                      </div>
                    )}
                    
                    {appointment.status === 'completed' && (
                      <div className="mt-4">
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center justify-center">
                          <ChevronRight size={16} className="ml-1" />
                          View Details
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        {/* Pagination (simplified) */}
        {searchedAppointments.length > 0 && activeFilter === 'all' && (
          <div className="mt-6 flex justify-center">
            <nav className="flex items-center space-x-1">
              <button className="px-3 py-1 rounded hover:bg-gray-100 text-gray-700">1</button>
              <button className="px-3 py-1 rounded bg-blue-100 text-blue-700">2</button>
              <button className="px-3 py-1 rounded hover:bg-gray-100 text-gray-700">3</button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAppointments;