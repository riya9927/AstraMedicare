import React from 'react'
import Login from './pages/Login'
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
import AdministrativeStaff from './pages/Admin/AdministrativeStaff';
import AddAdministrativeStaff from './pages/Admin/AddAdministrativeStaff';
import Nurse from './pages/Admin/Nurse';
import AddNurse from './pages/Admin/AddNurse';
import LabTechnician from './pages/Admin/LabTechnician';
import AddLabTechnician from './pages/Admin/AddLabTechnician';
import Pharmacist from './pages/Admin/Pharmacist';
import AddPharmacist from './pages/Admin/AddPharmacist';
import ItTechnicalStaff from './pages/Admin/ItTechnicalStaff'
import AddItTechnicalStaff from './pages/Admin/AddItTechnicalStaff'
import SupportStaff from './pages/Admin/SupportStaff'
import AddSupportStaff from './pages/Admin/AddSupportStaff'
import { DoctorContext } from './context/DoctorContext'; 
import DocDashboard from './pages/Doctor/DocDashboard';
import DocAppointment from './pages/Doctor/DocAppointment';
import DocProfile from './pages/Doctor/DocProfile';
import MainSidebar from './components/MainSidebar';


const App = () => {
  const { aToken } = useContext(AdminContext)
  const { dToken } = useContext (DoctorContext) 
  return aToken || dToken ? (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer />
      <Navbar />
      <div className='flex items-start'>
        <MainSidebar />
        <Routes>
          <Route path='/' element={<></>} />
          <Route path='/login' element={<Login />} />
          <Route path='/admin-dashboard' element={<Dashboard />} />
          <Route path='/all-appointments' element={<AllAppointments />} />
          <Route path='/add-doctor' element={<AddDoctor />} />
          <Route path='/doctor-list' element={<DoctorList />} />
          <Route path='/staff-management' element={<UserManagement />} />
          <Route path='/patients-list' element={<PatientsList />} />
          <Route path='/billing' element={<Billing />} />
          <Route path='/add-patient' element={<AddPatient />} />
          <Route path='/update-doctor' element={<UpdateDoctor />} />
          <Route path='/staff-management/administrative' element={<AdministrativeStaff />}/>
          <Route path='/staff-management/add-administrative' element={<AddAdministrativeStaff />} />
          <Route path='/staff-management/nurse' element={<Nurse />}/>
          <Route path='/staff-management/add-nurse' element={<AddNurse />} />
          <Route path='/staff-management/lab' element={<LabTechnician />} />
          <Route path='/staff-management/add-lab' element={<AddLabTechnician />} />
          <Route path='/staff-management/pharmacy' element={<Pharmacist />} />
          <Route path='/staff-management/add-pharmacy' element={<AddPharmacist />} />
          <Route path='/staff-management/support' element={<SupportStaff />} />
          <Route path='/staff-management/add-support' element={<AddSupportStaff />} />
          <Route path='/staff-management/it' element={<ItTechnicalStaff />} />
          <Route path='/staff-management/add-it' element={<AddItTechnicalStaff />} />
          <Route path='/doctor-dashboard' element={<DocDashboard />} /> 
          <Route path='/doctor-appointments' element={<DocAppointment />} /> 
          <Route path='/doctor-profile' element={<DocProfile />} />


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
