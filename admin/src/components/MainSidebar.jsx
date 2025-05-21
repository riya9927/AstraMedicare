import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'
import AdminSidebar from './Sidebar.jsx' // Assuming your current Sidebar is for admin
import DoctorSidebar from './DoctorSidebar.jsx'

const MainSidebar = () => {
  const { aToken } = useContext(AdminContext)
  const { dToken } = useContext(DoctorContext)

  // Determine which sidebar to show based on which token is present
  const renderSidebar = () => {
    if (aToken) {
      return <AdminSidebar />
    } else if (dToken) {
      return <DoctorSidebar />
    } else {
      return null // No sidebar if not logged in
    }
  }

  return renderSidebar()
}

export default MainSidebar