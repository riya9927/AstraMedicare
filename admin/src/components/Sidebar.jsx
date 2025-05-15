// import React from 'react'
// import { useContext } from 'react'
// import { AdminContext } from '../context/AdminContext'
// import {NavLink} from 'react-router-dom'
// import { assets } from '../assets/assets'

// const Sidebar = () => {
//     const {aToken} =useContext(AdminContext)
//   return (
//     <div>
//       {
//         aToken && <ul>
//             <NavLink to={'/admin-dashboard'}>
//                 <img src={assets.home_icon} alt='' />
//                 <p>Dashboard</p>
//             </NavLink>
//             <NavLink to={'/all-appointments'}>
//                 <img src={assets.appointment_icon} alt='' />
//                 <p>Appointment</p>
//             </NavLink>
//             <NavLink to={'/add-doctor'}>
//                 <img src={assets.add_icon} alt='' />
//                 <p>Add Doctor</p>
//             </NavLink>
//             <NavLink to={'/doctor-list'}>
//                 <img src={assets.people_icon} alt='' />
//                 <p>Doctor List</p>
//             </NavLink>
//         </ul>
//       }
//     </div>
//   )
// }

// export default Sidebar

import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AdminContext } from '../context/AdminContext'
import { assets } from '../assets/assets'

const Sidebar = () => {
  const { aToken } = useContext(AdminContext)

  const navItems = [
    { to: '/admin-dashboard', label: 'Dashboard', icon: assets.home_icon },
    { to: '/staff-management', label: 'Staff Management', icon: assets.people_icon },
    { to: '/all-appointments', label: 'Appointment Management', icon: assets.appointment_icon },
    { to: '/patients-list', label: 'All Patients List', icon: assets.people_icon },
    { to: '/billing', label: 'Billing & Invoicing', icon: assets.billing_icon || assets.add_icon }, // fallback icon
    { to: '/add-doctor', label: 'Add Doctor', icon: assets.add_icon },
    { to: '/add-patient', label: 'Add Patient', icon: assets.add_icon },
    { to: '/doctor-list', label: 'Doctor List', icon: assets.people_icon },
  ]

  return (
    aToken && (
      <div className="w-64 h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-xl left-0 flex flex-col py-6 px-4 z-50">
        <h2 className="text-2xl font-bold text-center mb-6">Admin Panel</h2>
        <ul className="space-y-3">
          {navItems.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-300 hover:bg-gray-700 ${
                    isActive ? 'bg-gray-700 font-semibold' : ''
                  }`
                }
              >
                {/* <img src={item.icon} alt="" className="w-5 h-5" /> */}
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    )
  )
}

export default Sidebar

