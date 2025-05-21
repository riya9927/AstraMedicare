import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'
import { assets } from '../assets/assets'

const DoctorSidebar = () => {
    const { dToken } = useContext(DoctorContext)

    const navItems = [
        { to: '/doctor-dashboard', label: 'Dashboard', icon: assets.home_icon },
        { to: '/doctor-appointments', label: 'My Appointments', icon: assets.appointment_icon },
        // { to: '/doctor-patients', label: 'My Patients', icon: assets.people_icon },
        // { to: '/doctor-schedule', label: 'My Schedule', icon: assets.calendar_icon || assets.appointment_icon },
        // { to: '/doctor-prescriptions', label: 'Prescriptions', icon: assets.prescription_icon || assets.add_icon },
        { to: '/doctor-profile', label: 'My Profile', icon: assets.profile_icon || assets.people_icon },
    ]

    return (
        dToken && (
            <div className="w-64 h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-xl left-0 flex flex-col py-6 px-4 z-50">
                <h2 className="text-2xl font-bold text-center mb-6">Doctor Portal</h2>
                <ul className="space-y-3">
                    {navItems.map((item, index) => (
                        <li key={index}>
                            <NavLink
                                to={item.to}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-300 hover:bg-gray-700 ${isActive ? 'bg-gray-700 font-semibold' : ''
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

export default DoctorSidebar