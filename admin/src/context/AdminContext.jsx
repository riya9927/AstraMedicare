import { useState } from "react";
import { createContext } from "react";
import axios from 'axios'
import { toast } from 'react-toastify';

export const AdminContext = createContext()

const AdminContextProvider = (props) => {

    const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '')
    const [doctors, setDoctors] = useState([])
    const [patients, setPatients] = useState([])
    const [appointments, setAppointments] = useState([])
    const [dashData,setDashData]=useState(false)
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const getAllDoctors = async () => {
        try {
            const { data } = await axios.post(backendUrl + '/api/admin/all-doctors', {}, { headers: { aToken } })
            if (data.success) {
                setDoctors(data.doctors)


            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const deleteDoctor = async (id) => {
        try {
            const { data } = await axios.delete(`${backendUrl}/api/admin/delete-doctor/${id}`, {
                headers: {
                    aToken,
                },
            });

            if (data.success) {
                toast.success(data.message);
                getAllDoctors(); 
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error deleting doctor", error);
            toast.error("Failed to delete doctor");
        }
    };


    const updateDoctor = async (doctorId, formDataObj) => {
        try {
            const { data } = await axios.put(`${backendUrl}/api/admin/update-doctor/${doctorId}`, formDataObj, {
                headers: {
                    aToken,
                },
            });

            if (data.success) {
                toast.success(data.message || "Doctor updated successfully");
                await getAllDoctors();
                return { success: true };
            } else {
                toast.error(data.message || "Failed to update doctor");
                return { success: false };
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
            console.error("Error updating doctor:", error);
            return { success: false };
        }
    };

    const getAllAppointments = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/admin/appointments`, {
                headers: {
                    aToken,
                },
            })
            if (data.success) {
                setAppointments(data.appointments)
                console.log(data.appointments);

            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/admin/cancel-appointment', { appointmentId }, { headers: { aToken } })
            if (data.success) {
                toast.success(data.message)
                getAllAppointments()
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message)
        }

    }

    const getDashData=async()=>{
        try {
            const { data } = await axios.get(backendUrl + '/api/admin/dashboard', { headers: { aToken } })
            if (data.success) {
                setDashData(data.dashData)
                console.log(data.dashData);
                
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const getAllPatients = async () => {
        try {
            const { data } = await axios.post(backendUrl + '/api/admin/all-patient', {}, { headers: { aToken } })
            if (data.success) {
                setPatients(data.patients)
               
                
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const deletePatient = async (id) => {
        try {
            const { data } = await axios.delete(`${backendUrl}/api/admin/delete-patient/${id}`, {
                headers: {
                    aToken,
                },
            });
            if (data.success) {
                toast.success(data.message);
                getAllPatients(); 
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error deleting doctor", error);
            toast.error("Failed to delete doctor");
        }
    };

    const value = {
        aToken, setAToken,
        backendUrl, doctors,
        getAllDoctors, deleteDoctor,
        updateDoctor, setAppointments,
        appointments,
        getAllAppointments,
        cancelAppointment,
        dashData,getDashData,
        patients, getAllPatients,
        deletePatient
    }

    return (

        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>

    )
}
export default AdminContextProvider