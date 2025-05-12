// import React, { useState } from 'react'
// import { assets } from '../assets/assets'

// const MyProfile = () => {
//   const [userData, setUserData] = useState({
//     name: "Anjan Sharam",
//     image: assets.profile_pic,
//     email: "anajn123@gmail.com",
//     phone: '+91 2345428904',
//     address: {
//       line1: "17,Shanti Heights, 2nd Floor",
//       line2: "Opp. BMC Garden, S.V. Road",
//       line3: "Goregaon West, Mumbai, Maharashtra – 400104"
//     },
//     gender: "Female",
//     dob: "2000-12-12"
//   })
//   const [isEdit, setIsEdit] = useState(false)
//   return (
//     <div>
//       <img src={userData.image} alt='' />
//       {
//         isEdit ? <input type='text' value={userData.name} onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))} />
//           : <p>{userData.name}</p>
//       }

//       <hr />
//       <div>
//         <p>CONTACT INFORMATION</p>
//         <div>
//           <p>Email id:</p>
//           <p>{userData.email}</p>
//           <p>Phone:</p>
//           {
//             isEdit ? <input type='text' value={userData.phone} onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))} />
//               : <p>{userData.phone}</p>
//           }
//           <p>Address:</p>
//           {
//             isEdit ? <p>
//               <input onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={userData.address.line1} type='text' />
//               <br />
//               <input onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={userData.address.line2} type='text' />
//               <br />
//               <input onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line3: e.target.value } }))} value={userData.address.line3} type='text' />
//             </p> : <p>
//               {userData.address.line1}
//               <br />
//               {userData.address.line2}
//               <br />
//               {userData.address.line3}
//             </p>
//           }
//         </div>
//       </div>
//       <div>
//         <p>BAsic Information</p>
//         <p>Gender:</p>
//         {
//           isEdit ? <select onChange={e => setUserData(prev => ({ ...prev, gender: e.target.value }))} value={userData.gender}>
//             <option value="Male">Male</option>
//             <option value="Female">Female</option>
//           </select>
//             : <p>{userData.gender}</p>
//         }
//         <p>Birthday:</p>
//         {
//           isEdit ? <input type='date' onChange={e => setUserData(prev => ({ ...prev, dob: e.target.value }))} value={userData.dob} /> : <p>{userData.dob}</p>
//         }
//       </div>
//       <div>
//         {
//           isEdit 
//           ? <button onClick={()=>setIsEdit(false)}>Save Information</button>
//           : <button onClick={()=>setIsEdit(true)}>Edit</button>
//         }
//       </div>
//     </div>
//   )
// }

// export default MyProfile
import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { Camera, Mail, Phone, MapPin, User, Calendar, Edit, Save, Clock } from 'lucide-react';

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: "Anjan Sharma",
    image: assets.profile_pic,
    email: "anajn123@gmail.com",
    phone: '+91 2345428904',
    address: {
      line1: "17, Shanti Heights, 2nd Floor",
      line2: "Opp. BMC Garden, S.V. Road",
      line3: "Goregaon West, Mumbai, Maharashtra – 400104"
    },
    gender: "Male",
    dob: "2000-12-12",
    bloodGroup: "O+",
    emergencyContact: {
      name: "Ravi Sharma",
      relation: "Father",
      phone: "+91 9876543210"
    },
    appointments: [
      {
        date: "2025-05-20",
        time: "10:30 AM",
        doctor: "Dr. Priya Mehta",
        department: "Cardiology",
        status: "Upcoming"
      },
      {
        date: "2025-04-15",
        time: "02:00 PM",
        doctor: "Dr. Rajesh Kumar",
        department: "General Medicine",
        status: "Completed"
      }
    ]
  });
  
  const [isEdit, setIsEdit] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  
  const handleSave = () => {
    setIsEdit(false);
    // Here you would typically save the data to your backend
  };
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header with profile picture and name */}
        <div className="bg-blue-600 text-white p-6 relative">
          <div className="flex flex-col md:flex-row items-center">
            <div className="relative group mb-4 md:mb-0">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white mx-auto md:mx-0">
                <img 
                  src={userData.image} 
                  alt={userData.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              {isEdit && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <Camera size={24} />
                </div>
              )}
            </div>
            <div className="ml-0 md:ml-6 text-center md:text-left">
              {isEdit ? (
                <input 
                  type="text" 
                  value={userData.name} 
                  onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))}
                  className="bg-white text-gray-800 text-xl font-bold px-3 py-2 rounded w-full md:w-auto"
                />
              ) : (
                <h1 className="text-2xl font-bold">{userData.name}</h1>
              )}
              <p className="text-blue-100">Patient ID: ASTRA-20245</p>
            </div>
            <div className="ml-auto mt-4 md:mt-0">
              {isEdit ? (
                <button 
                  onClick={handleSave}
                  className="flex items-center bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
                >
                  <Save size={18} className="mr-2" />
                  Save
                </button>
              ) : (
                <button 
                  onClick={() => setIsEdit(true)}
                  className="flex items-center bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition"
                >
                  <Edit size={18} className="mr-2" />
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* Navigation tabs */}
        <div className="flex border-b">
          <button 
            onClick={() => setActiveTab("personal")}
            className={`flex-1 py-4 font-medium text-sm ${activeTab === "personal" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-blue-500"}`}
          >
            Personal Info
          </button>
          <button 
            onClick={() => setActiveTab("medical")}
            className={`flex-1 py-4 font-medium text-sm ${activeTab === "medical" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-blue-500"}`}
          >
            Medical History
          </button>
          <button 
            onClick={() => setActiveTab("appointments")}
            className={`flex-1 py-4 font-medium text-sm ${activeTab === "appointments" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-blue-500"}`}
          >
            Appointments
          </button>
        </div>
        
        {/* Content area */}
        <div className="p-6">
          {activeTab === "personal" && (
            <div className="space-y-8">
              {/* Contact Information Section */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                  <Mail size={20} className="mr-2 text-blue-600" />
                  CONTACT INFORMATION
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Email:</p>
                    <p className="font-medium">{userData.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Phone:</p>
                    {isEdit ? (
                      <input 
                        type="text" 
                        value={userData.phone} 
                        onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                        className="border rounded w-full px-3 py-2"
                      />
                    ) : (
                      <p className="font-medium">{userData.phone}</p>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-500 mb-1">Address:</p>
                    {isEdit ? (
                      <div className="space-y-2">
                        <input 
                          type="text"
                          value={userData.address.line1} 
                          onChange={e => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}
                          className="border rounded w-full px-3 py-2"
                          placeholder="Address Line 1"
                        />
                        <input 
                          type="text"
                          value={userData.address.line2} 
                          onChange={e => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))}
                          className="border rounded w-full px-3 py-2"
                          placeholder="Address Line 2"
                        />
                        <input 
                          type="text"
                          value={userData.address.line3} 
                          onChange={e => setUserData(prev => ({ ...prev, address: { ...prev.address, line3: e.target.value } }))}
                          className="border rounded w-full px-3 py-2"
                          placeholder="Address Line 3"
                        />
                      </div>
                    ) : (
                      <p className="font-medium">
                        {userData.address.line1}<br />
                        {userData.address.line2}<br />
                        {userData.address.line3}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Basic Information Section */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                  <User size={20} className="mr-2 text-blue-600" />
                  BASIC INFORMATION
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Gender:</p>
                    {isEdit ? (
                      <select 
                        value={userData.gender}
                        onChange={e => setUserData(prev => ({ ...prev, gender: e.target.value }))}
                        className="border rounded w-full px-3 py-2"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    ) : (
                      <p className="font-medium">{userData.gender}</p>
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Date of Birth:</p>
                    {isEdit ? (
                      <input 
                        type="date" 
                        value={userData.dob}
                        onChange={e => setUserData(prev => ({ ...prev, dob: e.target.value }))}
                        className="border rounded w-full px-3 py-2"
                      />
                    ) : (
                      <p className="font-medium">{formatDate(userData.dob)}</p>
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Blood Group:</p>
                    {isEdit ? (
                      <select 
                        value={userData.bloodGroup}
                        onChange={e => setUserData(prev => ({ ...prev, bloodGroup: e.target.value }))}
                        className="border rounded w-full px-3 py-2"
                      >
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                      </select>
                    ) : (
                      <p className="font-medium">{userData.bloodGroup}</p>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Emergency Contact Section */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                  <Phone size={20} className="mr-2 text-blue-600" />
                  EMERGENCY CONTACT
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Name:</p>
                    {isEdit ? (
                      <input 
                        type="text" 
                        value={userData.emergencyContact.name} 
                        onChange={e => setUserData(prev => ({ 
                          ...prev, 
                          emergencyContact: { 
                            ...prev.emergencyContact, 
                            name: e.target.value 
                          } 
                        }))}
                        className="border rounded w-full px-3 py-2"
                      />
                    ) : (
                      <p className="font-medium">{userData.emergencyContact.name}</p>
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Relation:</p>
                    {isEdit ? (
                      <input 
                        type="text" 
                        value={userData.emergencyContact.relation} 
                        onChange={e => setUserData(prev => ({ 
                          ...prev, 
                          emergencyContact: { 
                            ...prev.emergencyContact, 
                            relation: e.target.value 
                          } 
                        }))}
                        className="border rounded w-full px-3 py-2"
                      />
                    ) : (
                      <p className="font-medium">{userData.emergencyContact.relation}</p>
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Phone:</p>
                    {isEdit ? (
                      <input 
                        type="text" 
                        value={userData.emergencyContact.phone} 
                        onChange={e => setUserData(prev => ({ 
                          ...prev, 
                          emergencyContact: { 
                            ...prev.emergencyContact, 
                            phone: e.target.value 
                          } 
                        }))}
                        className="border rounded w-full px-3 py-2"
                      />
                    ) : (
                      <p className="font-medium">{userData.emergencyContact.phone}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === "medical" && (
            <div className="text-center py-10">
              <div className="bg-blue-50 p-8 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Medical History</h3>
                <p className="text-gray-600 mb-4">Your medical records are stored securely.</p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition">
                  View Medical Records
                </button>
              </div>
            </div>
          )}
          
          {activeTab === "appointments" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-700">Your Appointments</h2>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition">
                  Book New Appointment
                </button>
              </div>
              
              <div className="space-y-4">
                {userData.appointments.map((appointment, index) => (
                  <div key={index} className={`border-l-4 ${appointment.status === "Upcoming" ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-gray-50"} p-4 rounded-lg`}>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="mb-2 md:mb-0">
                        <p className="text-sm text-gray-500">
                          <Calendar size={16} className="inline mr-1" /> {formatDate(appointment.date)}
                        </p>
                        <p className="text-sm text-gray-500">
                          <Clock size={16} className="inline mr-1" /> {appointment.time}
                        </p>
                      </div>
                      <div className="mb-2 md:mb-0">
                        <p className="font-medium">{appointment.doctor}</p>
                        <p className="text-sm text-gray-500">{appointment.department}</p>
                      </div>
                      <div className="flex items-center">
                        <span className={`text-sm px-2 py-1 rounded-full ${appointment.status === "Upcoming" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"}`}>
                          {appointment.status}
                        </span>
                        {appointment.status === "Upcoming" && (
                          <button className="ml-4 text-sm text-red-600 hover:text-red-800">
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <button className="text-blue-600 hover:text-blue-800 font-medium">
                  View All Appointments
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;