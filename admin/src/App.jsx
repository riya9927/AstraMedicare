import React from 'react'
import Login from './pages/login'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Admin/Dashboard';
import AllAppointments from './pages/Admin/AllAppointments'
import AddDoctor from './pages/Admin/AddDoctor'
import DoctorList from './pages/Admin/DoctorList';
import UserManagement from './pages/Admin/UserManagement'
import PatientsList from './pages/Admin/PatientsList'
import Billing from './pages/Admin/Billing'
import AddPatient from './pages/Admin/AddPatient'
import UpdateDoctor from './pages/Admin/UpdateDoctor';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  const { aToken } = useContext(AdminContext)
  return aToken ? (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer />
      <Navbar />
      <div className='flex items-start'>
        <Sidebar />
        <Routes>
          <Route path='/' element={<></>} />
          <Route path='/admin-dashboard' element={<Dashboard />} />
          <Route path='/all-appointments' element={<AllAppointments />} />
          <Route path='/add-doctor' element={<AddDoctor />} />
          <Route path='/doctor-list' element={<DoctorList />} />
          <Route path='/staff-management' element={<UserManagement />} />
          <Route path='/patients-list' element={<PatientsList />} />
          <Route path='/billing' element={<Billing />} />
          <Route path='/add-patient' element={<AddPatient />} />
          <Route path='/update-doctor' element={<UpdateDoctor />} />

        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  )
}

export default App
