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
    const [dashData, setDashData] = useState(false)
    const [administrativeStaff, setAdministrativeStaff] = useState([]);
    const [nurses, setNurses] = useState([]);
    const [pharmacist,setPharmacist] = useState([]);
    const [labTechnicians, setLabTechnicians] = useState([]);
    const [supportStaff,setSupportStaff] = useState([]);
    const [itTechnicalStaff, setItTechnicalStaff] = useState([]);
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

    const getDashData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/admin/dashboard', { headers: { aToken } })
            if (data.success) {
                setDashData(data.dashData)
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
            console.error("Error deleting patient", error);
            toast.error("Failed to delete patient");
        }
    };

    const updatePatient = async (patientId, formDataObj) => {
        try {
            const { data } = await axios.put(`${backendUrl}/api/admin/update-patient/${patientId}`, formDataObj, {
                headers: {
                    aToken,
                },
            });

            if (data.success) {
                toast.success(data.message || "Patient updated successfully");
                await getAllPatients();
                return { success: true };
            } else {
                toast.error(data.message || "Failed to update patient");
                return { success: false };
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
            console.error("Error updating Patient:", error);
            return { success: false };
        }
    };

    const getAllAdministrativeStaff = async () => {
        try {
            // console.log("Fetching administrative staff with token:", aToken);
            const { data } = await axios.post(backendUrl + '/api/admin/administrative', {}, { headers: { aToken } })

            // console.log(data);
            if (data.success) {
                // Change this line to use data.staffList instead of data.administrativeStaff
                setAdministrativeStaff(data.staffList);
                // return data.staff;
            } else {
                toast.error(data.message)
                // return [];
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
            // return [];
        }
    };

    const deleteAdministrativeStaff = async (id) => {
        try {
            const { data } = await axios.delete(`${backendUrl}/api/admin/administrative/${id}`, {
                headers: { aToken }
            });

            if (data.success) {
                toast.success(data.message || "Administrative staff deleted successfully");
                // Update the state to remove the deleted staff member
                setAdministrativeStaff(prev => prev.filter(staff => staff._id !== id));
                return { success: true };
            } else {
                toast.error(data.message || "Failed to delete administrative staff");
                return { success: false };
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
            return { success: false };
        }
    };

    const getAllNurses = async () => {
        try {
            const { data } = await axios.post(backendUrl + '/api/admin/nurses', {}, { headers: { aToken } });
            if (data.success) {
                setNurses(data.nurseList);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    const deleteNurse = async (id) => {
        try {
            const { data } = await axios.delete(`${backendUrl}/api/admin/nurses/${id}`, {
                headers: { aToken }
            });

            if (data.success) {
                toast.success(data.message || "Nurse deleted successfully");
                setNurses(prev => prev.filter(nurse => nurse._id !== id));
                return { success: true };
            } else {
                toast.error(data.message || "Failed to delete nurse");
                return { success: false };
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
            console.error("Error deleting nurse:", error);
            return { success: false };
        }
    };

    // Get all lab technicians from the backend
    const getLabTechnicians = async () => {
        try {
            const { data } = await axios.post(backendUrl + '/api/admin/lab', {}, { headers: { aToken } });
            if (data.success) {
                setLabTechnicians(data.technicianList);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    // Delete a lab technician by ID
    const deleteLabTechnician = async (id) => {
        try {
            const { data } = await axios.delete(`${backendUrl}/api/admin/lab/${id}`, {
                headers: { aToken }
            });

            if (data.success) {
                toast.success(data.message || "Lab technician deleted successfully");
                setLabTechnicians(prev => prev.filter(technician => technician._id !== id));
                return { success: true };
            } else {
                toast.error(data.message || "Failed to delete lab technician");
                return { success: false };
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
            console.error("Error deleting lab technician:", error);
            return { success: false };
        }
    };

    const getAllPharmacist = async () => {
        try {
            const { data } = await axios.post(backendUrl + '/api/admin/pharmacy', {}, { headers: { aToken } });
            if (data.success) {
                setPharmacist(data.pharmacistList);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    const deletePharmacist = async (id) => {
        try {
            const { data } = await axios.delete(`${backendUrl}/api/admin/pharmacy/${id}`, {
                headers: { aToken }
            });

            if (data.success) {
                toast.success(data.message || "Pharmacist deleted successfully");
                setPharmacist(prev => prev.filter(pharmacist => pharmacist._id !== id));
                return { success: true };
            } else {
                toast.error(data.message || "Failed to delete Pharmacist");
                return { success: false };
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
            console.error("Error deleting Pharmacist:", error);
            return { success: false };
        }
    };

     const getAllsupportStaff = async () => {
        try {
            const { data } = await axios.post(backendUrl + '/api/admin/support', {}, { headers: { aToken } });
            if (data.success) {
                setSupportStaff(data.staffList);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };
    const deleteSupportStaff = async (id) => {
        try {
            const { data } = await axios.delete(`${backendUrl}/api/admin/support/${id}`, {
                headers: { aToken }
            });

            if (data.success) {
                toast.success(data.message || "Support Staff deleted successfully");
                setSupportStaff(prev => prev.filter(supportStaff => supportStaff._id !== id));
                return { success: true };
            } else {
                toast.error(data.message || "Failed to delete Support Staff");
                return { success: false };
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
            console.error("Error deleting Support Staff:", error);
            return { success: false };
        }
    };
    const getAllItTechnicalStaff = async () => {
        try {
            const { data } = await axios.post(backendUrl + '/api/admin/it', {}, { headers: { aToken } });
            if (data.success) {
                setItTechnicalStaff(data.staffList);
                
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };
     const deleteItTechnicalStaff = async (id) => {
        try {
            const { data } = await axios.delete(`${backendUrl}/api/admin/it/${id}`, {
                headers: { aToken }
            });

            if (data.success) {
                toast.success(data.message || "It-Technical Staff deleted successfully");
                setItTechnicalStaff(prev => prev.filter(itTechnicalStaff=> itTechnicalStaff._id !== id));
                return { success: true };
            } else {
                toast.error(data.message || "Failed to delete It-Technical Staff");
                return { success: false };
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
            console.error("Error deleting It-Technical Staff:", error);
            return { success: false };
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
        dashData, getDashData,
        patients, getAllPatients,
        deletePatient, updatePatient,
        administrativeStaff,
        deleteAdministrativeStaff,
        getAllAdministrativeStaff,
        nurses,
        deleteNurse, getAllNurses,
        labTechnicians,
        getLabTechnicians, deleteLabTechnician,
        pharmacist,
        getAllPharmacist,deletePharmacist,
        supportStaff,itTechnicalStaff,
        getAllsupportStaff,getAllItTechnicalStaff,
        deleteSupportStaff,deleteItTechnicalStaff
    }

    return (

        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>

    )
}
export default AdminContextProvider