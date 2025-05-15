import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { Calendar, Clock, CreditCard, X, Search, ChevronRight, AlertCircle, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyAppointments = () => {
  const { backendUrl, token ,getDoctorsData} = useContext(AppContext);
  const [activeFilter, setActiveFilter] = useState('upcoming');
  const [searchQuery, setSearchQuery] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = 5;
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getStatusColor = (appointment) => {
    if (appointment.cancelled) {
      return 'bg-red-100 text-red-700';
    } else if (appointment.isCompleted) {
      return 'bg-blue-100 text-blue-700';
    } else if (appointment.payment) {
      return 'bg-green-100 text-green-700';
    } else {
      return 'bg-yellow-100 text-yellow-700';
    }
  };

  const getStatusText = (appointment) => {
    if (appointment.cancelled) {
      return 'Cancelled';
    } else if (appointment.isCompleted) {
      return 'Completed';
    } else if (appointment.payment) {
      return 'Confirmed';
    } else {
      return 'Pending Payment';
    }
  };

  const getUserAppointments = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { token }
      });

      if (data.success) {
        // Handle the appointment data according to the new structure
        setAppointments(data.appointments.reverse());
        // console.log("Fetched appointments:", data.appointments);
      } else {
        setError('Failed to fetch appointments');
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setError(error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || 'Failed to load appointments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token, backendUrl]);

  // Properly define past and upcoming appointments based on current date
  const currentDate = new Date();
  const pastAppointments = appointments.filter(appointment => new Date(appointment.date) < currentDate || appointment.isCompleted);
  const upcomingAppointments = appointments.filter(appointment => new Date(appointment.date) >= currentDate && !appointment.isCompleted);

  // Apply filters
  const filteredAppointments = activeFilter === 'upcoming'
    ? upcomingAppointments
    : activeFilter === 'past'
      ? pastAppointments
      : [...upcomingAppointments, ...pastAppointments];

  // Apply search filter
  const searchedAppointments = filteredAppointments.filter(
    appointment => {
      const doctorName = appointment.docData?.name || '';
      const speciality = appointment.docData?.speciality || '';

      return doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        speciality.toLowerCase().includes(searchQuery.toLowerCase());
    }
  );

  // Pagination logic
  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = searchedAppointments.slice(indexOfFirstAppointment, indexOfLastAppointment);
  const totalPages = Math.ceil(searchedAppointments.length / appointmentsPerPage);

  // Pagination controls
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Added handlers for button actions
  const handlePayment = (appointmentId) => {
    // Implementation for payment functionality
    toast.info('Payment feature coming soon!');
  };


  const handleCancel = async (appointmentId) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      try {
        // Send cancel request to API
        const { data } =await axios.post(backendUrl + '/api/user/cancel-appointment', {appointmentId}, { headers: { token } });
         if (data.success) {
        toast.success(data.message)
        getUserAppointments()
        getDoctorsData()
      } else {
        toast.error(data.message)
      }
      } catch (error) {
        console.error('Failed to cancel appointment:', error);
        toast.error('Failed to cancel appointment');
        getUserAppointments(); // Revert to server state on error
      }
    }
  };

  const handleViewDetails = (appointmentId) => {
    navigate(`/appointment/${appointmentId}`);
  };

  const handleReschedule = (appointmentId) => {
    navigate(`/reschedule/${appointmentId}`);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">My Appointments</h1>
          <button
            onClick={() => navigate('/doctors')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition flex items-center justify-center"
          >
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
                placeholder="Search by doctor name, specialty or type"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1); // Reset to first page on search
                }}
                className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex rounded-lg border overflow-hidden">
              <button
                onClick={() => {
                  setActiveFilter('upcoming');
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 text-sm font-medium ${activeFilter === 'upcoming'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
              >
                Upcoming
              </button>
              <button
                onClick={() => {
                  setActiveFilter('past');
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 text-sm font-medium ${activeFilter === 'past'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
              >
                Past
              </button>
              <button
                onClick={() => {
                  setActiveFilter('all');
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 text-sm font-medium ${activeFilter === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
              >
                All
              </button>
            </div>
          </div>
        </div>

        {/* Status indicators */}
        <div className="flex flex-wrap gap-2 mb-6">
          <div className="text-xs flex items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-1"></span>
            <span>Confirmed</span>
          </div>
          <div className="text-xs flex items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-yellow-500 mr-1"></span>
            <span>Pending Payment</span>
          </div>
          <div className="text-xs flex items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-blue-500 mr-1"></span>
            <span>Completed</span>
          </div>
          <div className="text-xs flex items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-red-500 mr-1"></span>
            <span>Cancelled</span>
          </div>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="animate-pulse flex flex-col items-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="bg-white rounded-xl shadow-sm p-8">
            <div className="flex items-center justify-center text-red-500 mb-4">
              <AlertCircle size={24} className="mr-2" />
              <span className="font-medium">Error loading appointments</span>
            </div>
            <p className="text-center text-gray-600">{error}</p>
            <div className="text-center mt-4">
              <button
                onClick={() => getUserAppointments()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && searchedAppointments.length === 0 && (
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
                  : activeFilter === 'past'
                    ? "No past appointments found."
                    : "You don't have any appointments."}
            </p>
            {!searchQuery && activeFilter !== 'upcoming' && (
              <button
                onClick={() => setActiveFilter('upcoming')}
                className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
              >
                View upcoming appointments
              </button>
            )}
            <div className="mt-6">
              <button
                onClick={() => navigate('/doctors')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
              >
                Book an Appointment
              </button>
            </div>
          </div>
        )}

        {/* Appointments List */}
        {!loading && !error && searchedAppointments.length > 0 && (
          <div className="space-y-4">
            {currentAppointments.map((appointment) => (
              <div
                key={appointment._id}
                className="bg-white rounded-xl shadow-sm overflow-hidden transition hover:shadow-md border-l-4"
                style={{
                  borderLeftColor: appointment.cancelled ? '#EF4444' :
                    appointment.isCompleted ? '#3B82F6' :
                      appointment.payment ? '#10B981' :
                        '#F59E0B'
                }}
              >
                <div className="flex flex-col md:flex-row">
                  {/* Doctor info section */}
                  <div className="flex p-4 md:p-6 flex-1">
                    <div className="w-20 h-20 rounded-full overflow-hidden mr-4 flex-shrink-0 bg-gray-100">
                      {appointment.docData?.image ? (
                        <img
                          src={appointment.docData.image}
                          alt={appointment.docData?.name || 'Doctor'}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/placeholder-doctor.png';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-500">
                          <span className="text-lg font-bold">
                            {appointment.docData?.name?.charAt(0) || 'D'}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {appointment.docData?.name || 'Unknown Doctor'}
                        </h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(appointment)}`}>
                          {getStatusText(appointment)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{appointment.docData?.speciality || 'Specialist'}</p>

                      {appointment.docData?.rating && (
                        <div className="flex items-center mt-1 mb-3">
                          <Star size={14} className="text-yellow-500 mr-1" fill="currentColor" />
                          <span className="text-sm text-gray-700">{appointment.docData.rating}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Appointment details & actions section */}
                  <div className="bg-gray-50 p-4 md:p-6 md:w-64 flex flex-col justify-between border-t md:border-t-0 md:border-l border-gray-100">
                    <div>
                      <div className="flex items-center mb-3">
                        <Calendar size={16} className="text-blue-600 mr-2" />
                        <span className="text-sm font-medium">
                          {appointment.slotDate ? appointment.slotDate.replace(/_/g, '/') : 'Date not set'}
                        </span>
                      </div>
                      <div className="flex items-center mb-3">
                        <Clock size={16} className="text-blue-600 mr-2" />
                        <span className="text-sm font-medium">{appointment.slotTime || 'Time not set'}</span>
                      </div>
                      <div className="text-sm bg-gray-100 rounded px-2 py-1 inline-block mb-2">
                        ₹{appointment.amount || 0}
                      </div>
                    </div>

                    {/* Action buttons based on appointment status */}
                    <div className="mt-4 space-y-2">
                      {!appointment.cancelled && !appointment.isCompleted && !appointment.payment && (
                        <>
                          <button
                            onClick={() => handlePayment(appointment._id)}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center justify-center"
                          >
                            <CreditCard size={16} className="mr-2" />
                            Pay Online
                          </button>
                          <button
                            onClick={() => handleCancel(appointment._id)}
                            className="w-full bg-white border border-red-500 text-red-500 hover:bg-red-50 py-2 px-4 rounded flex items-center justify-center"
                          >
                            <X size={16} className="mr-2" />
                            Cancel
                          </button>
                        </>
                      )}

                      {!appointment.cancelled && !appointment.isCompleted && appointment.payment && (
                        <>
                          <button
                            onClick={() => handleViewDetails(appointment._id)}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center justify-center"
                          >
                            View Details
                            <ChevronRight size={16} className="ml-1" />
                          </button>
                          <button
                            onClick={() => handleCancel(appointment._id)}
                            className="w-full bg-white border border-red-500 text-red-500 hover:bg-red-50 py-2 px-4 rounded flex items-center justify-center"
                          >
                            <X size={16} className="mr-2" />
                            Cancel
                          </button>
                        </>
                      )}

                      {!appointment.cancelled && appointment.isCompleted && (
                        <button
                          onClick={() => handleViewDetails(appointment._id)}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center justify-center"
                        >
                          View Details
                          <ChevronRight size={16} className="ml-1" />
                        </button>
                      )}

                      {appointment.cancelled && (
                        <button
                          onClick={() => navigate('/doctors')}
                          className="w-full bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded flex items-center justify-center"
                        >
                          <Calendar size={16} className="mr-2" />
                          Book Again
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && !error && totalPages > 1 && (
          <div className="mt-6 flex justify-center">
            <nav className="flex items-center space-x-1">
              <button
                onClick={() => paginate(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded ${currentPage === 1 ? 'text-gray-400' : 'hover:bg-gray-100 text-gray-700'}`}
              >
                &laquo;
              </button>

              {[...Array(totalPages).keys()].map(number => (
                <button
                  key={number + 1}
                  onClick={() => paginate(number + 1)}
                  className={`px-3 py-1 rounded ${currentPage === number + 1
                      ? 'bg-blue-100 text-blue-700'
                      : 'hover:bg-gray-100 text-gray-700'
                    }`}
                >
                  {number + 1}
                </button>
              ))}

              <button
                onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded ${currentPage === totalPages ? 'text-gray-400' : 'hover:bg-gray-100 text-gray-700'}`}
              >
                &raquo;
              </button>
            </nav>
          </div>
        )}

        {/* Summary counts */}
        {!loading && !error && appointments.length > 0 && (
          <div className="mt-6 text-center text-sm text-gray-500">
            Showing {indexOfFirstAppointment + 1}-
            {Math.min(indexOfLastAppointment, searchedAppointments.length)} of {searchedAppointments.length} appointments
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAppointments;

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