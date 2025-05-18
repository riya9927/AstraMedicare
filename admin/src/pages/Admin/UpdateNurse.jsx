import React, { useState, useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets } from '../../assets/assets';

const UpdateNurse = ({ nurse, onClose, onUpdateSuccess }) => {
    const { aToken, backendUrl } = useContext(AdminContext);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        gender: '',
        dateOfBirth: '',
        contactNumber: '',
        addressLine1: '',
        addressLine2: '',
        department: '',
        shiftDetails: '',
        dateOfJoining: '',
        salaryDetails: ''
    });
    const [imageFile, setImageFile] = useState(null);
    const [previewImg, setPreviewImg] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [assignedDoctors, setAssignedDoctors] = useState([]);
    const [availableDoctors, setAvailableDoctors] = useState([]);

    // Initialize form data when nurse prop changes
    useEffect(() => {
        if (nurse) {
            try {
                // Format dates properly for date inputs
                const formatDate = (dateString) => {
                    if (!dateString) return '';
                    try {
                        const date = new Date(dateString);
                        return date instanceof Date && !isNaN(date)
                            ? date.toISOString().split('T')[0]
                            : '';
                    } catch (e) {
                        console.error('Date formatting error:', e);
                        return '';
                    }
                };

                setFormData({
                    fullName: nurse.fullName || '',
                    email: nurse.email || '',
                    password: '', // Empty password by default
                    gender: nurse.gender || '',
                    dateOfBirth: formatDate(nurse.dateOfBirth),
                    contactNumber: nurse.contactNumber || '',
                    addressLine1: nurse.addressLine1 || '',
                    addressLine2: nurse.addressLine2 || '',
                    department: nurse.department || '',
                    shiftDetails: nurse.shiftDetails || '',
                    dateOfJoining: formatDate(nurse.dateOfJoining),
                    salaryDetails: nurse.salaryDetails?.toString() || ''
                });

                // Set assigned doctors
                if (nurse.assignedDoctors && Array.isArray(nurse.assignedDoctors)) {
                    setAssignedDoctors(nurse.assignedDoctors.map(doc =>
                        typeof doc === 'object' ? doc._id : doc
                    ));
                }
                // Handle nurse photo
                setPreviewImg(nurse.photo || '');
            } catch (err) {
                console.error('Error initializing form data:', err);
                toast.error('Error loading nurse data');
            }
        }
    }, [nurse]);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
            const { data } = await axios.post(backendUrl + '/api/admin/all-doctors', {}, { headers: { aToken } })
            console.log(data);
            
            if (data.success) {
                setAvailableDoctors(data.doctors)


            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
        };

        fetchDoctors();
    }, [aToken, backendUrl]);

    const handleInputChange = (e) => {
        const { name, value, type } = e.target;

        if (name === 'salaryDetails') {
            setFormData({ ...formData, [name]: value === '' ? '' : Number(value) });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleDoctorChange = (e) => {
        const doctorId = e.target.value;
        const isChecked = e.target.checked;

        if (isChecked) {
            setAssignedDoctors([...assignedDoctors, doctorId]);
        } else {
            setAssignedDoctors(assignedDoctors.filter(id => id !== doctorId));
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            setPreviewImg(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const formDataObj = new FormData();

            if (imageFile) {
                formDataObj.append('image', imageFile);
            }

            // Append all form fields
            formDataObj.append('fullName', formData.fullName);
            formDataObj.append('email', formData.email);

            // Only append password if provided
            if (formData.password) {
                formDataObj.append('password', formData.password);
            }

            formDataObj.append('gender', formData.gender);
            formDataObj.append('dateOfBirth', formData.dateOfBirth);
            formDataObj.append('contactNumber', formData.contactNumber);
            formDataObj.append('addressLine1', formData.addressLine1);
            formDataObj.append('addressLine2', formData.addressLine2 || '');
            formDataObj.append('department', formData.department);
            formDataObj.append('shiftDetails', formData.shiftDetails);
            formDataObj.append('dateOfJoining', formData.dateOfJoining);
            formDataObj.append('salaryDetails', Number(formData.salaryDetails));

            // Append assigned doctors as array
            assignedDoctors.forEach(doctorId => {
                formDataObj.append('assignedDoctors[]', doctorId);
            });

            // Log the form data for debugging
            console.log('Form data being sent:', {
                fullName: formData.fullName,
                email: formData.email,
                gender: formData.gender,
                dateOfBirth: formData.dateOfBirth,
                contactNumber: formData.contactNumber,
                addressLine1: formData.addressLine1,
                addressLine2: formData.addressLine2 || '',
                department: formData.department,
                shiftDetails: formData.shiftDetails,
                dateOfJoining: formData.dateOfJoining,
                salaryDetails: Number(formData.salaryDetails),
                assignedDoctors: assignedDoctors
            });

            const { data } = await axios.put(
                `${backendUrl}/api/admin/nurses/${nurse._id}`,
                formDataObj,
                {
                    headers: {
                        aToken,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            if (data.success) {
                toast.success(data.message || 'Nurse updated successfully');
                onUpdateSuccess();
                onClose();
            } else {
                toast.error(data.message || 'Failed to update nurse');
            }
        } catch (error) {
            console.error('Error updating nurse:', error);

            // More detailed error logging
            if (error.response) {
                // The server responded with a status code outside the 2xx range
                console.error('Server responded with error:', {
                    status: error.response.status,
                    data: error.response.data
                });
                toast.error(error.response.data?.message || 'Server error occurred. Please try again.');
            } else if (error.request) {
                // The request was made but no response was received
                console.error('No response received:', error.request);
                toast.error('No response from server. Please check your connection.');
            } else {
                // Something happened in setting up the request
                console.error('Error setting up request:', error.message);
                toast.error(error.message || 'An error occurred while processing your request.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 overflow-auto">
            <div className="bg-white rounded-xl p-8 w-full max-w-4xl shadow-lg animate-fade-in my-8 max-h-screen overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-blue-700">Edit Nurse</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                    >
                        &times;
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
                        <label htmlFor="nurse-img-edit" className="cursor-pointer w-40 h-40 bg-blue-50 rounded-lg flex items-center justify-center overflow-hidden border border-blue-200 hover:border-blue-400 transition">
                            <img src={previewImg || assets.upload_area} alt="Nurse" className="w-full h-full object-cover" />
                        </label>
                        <input type="file" id="nurse-img-edit" name="image" hidden onChange={handleFileChange} />
                        <p className="text-sm text-gray-600 text-center">
                            Click to update <br /> Nurse Photo
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block mb-1 font-medium">Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                placeholder="Enter full name"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                required
                                className="w-full p-3 rounded-md bg-gray-100 text-gray-800 border border-gray-300 focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                className="w-full p-3 rounded-md bg-gray-100 text-gray-800 border border-gray-300"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">Password (leave blank to keep unchanged)</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter new password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="w-full p-3 rounded-md bg-gray-100 text-gray-800 border border-gray-300"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">Gender</label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleInputChange}
                                required
                                className="w-full p-3 rounded-md bg-gray-100 text-gray-800 border border-gray-300"
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">Date of Birth</label>
                            <input
                                type="date"
                                name="dateOfBirth"
                                value={formData.dateOfBirth}
                                onChange={handleInputChange}
                                required
                                className="w-full p-3 rounded-md bg-gray-100 text-gray-800 border border-gray-300"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">Contact Number</label>
                            <input
                                type="text"
                                name="contactNumber"
                                placeholder="Enter contact number"
                                value={formData.contactNumber}
                                onChange={handleInputChange}
                                required
                                className="w-full p-3 rounded-md bg-gray-100 text-gray-800 border border-gray-300"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">Department</label>
                            <select
                                name="department"
                                value={formData.department}
                                onChange={handleInputChange}
                                required
                                className="w-full p-3 rounded-md bg-gray-100 text-gray-800 border border-gray-300"
                            >
                                <option value="">Select Department</option>
                                <option value="ICU">ICU</option>
                                <option value="General Ward">General Ward</option>
                                <option value="Emergency Ward">Emergency Ward</option>
                                <option value="Surgical Ward">Surgical Ward</option>
                                <option value="Maternity Ward">Maternity Ward</option>
                                <option value="Operation Theater (OT)">Operation Theater (OT)</option>
                                <option value="Outpatient Department (OPD)">Outpatient Department (OPD)</option>
                            </select>
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">Shift Details</label>
                            <select
                                name="shiftDetails"
                                value={formData.shiftDetails}
                                onChange={handleInputChange}
                                required
                                className="w-full p-3 rounded-md bg-gray-100 text-gray-800 border border-gray-300"
                            >
                                <option value="">Select Shift</option>
                                <option value="Day">Day</option>
                                <option value="Night">Night</option>
                            </select>
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">Date of Joining</label>
                            <input
                                type="date"
                                name="dateOfJoining"
                                value={formData.dateOfJoining}
                                onChange={handleInputChange}
                                required
                                className="w-full p-3 rounded-md bg-gray-100 text-gray-800 border border-gray-300"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">Salary Details (₹)</label>
                            <input
                                type="number"
                                name="salaryDetails"
                                placeholder="e.g. 30000"
                                value={formData.salaryDetails}
                                onChange={handleInputChange}
                                required
                                className="w-full p-3 rounded-md bg-gray-100 text-gray-800 border border-gray-300"
                            />
                        </div>
                    </div>

                    <div className="mt-6">
                        <label className="block mb-1 font-medium">Address Line 1</label>
                        <input
                            type="text"
                            name="addressLine1"
                            placeholder="Street address, P.O. box, etc."
                            value={formData.addressLine1}
                            onChange={handleInputChange}
                            required
                            className="w-full p-3 rounded-md bg-gray-100 text-gray-800 border border-gray-300"
                        />
                    </div>

                    <div className="mt-6">
                        <label className="block mb-1 font-medium">Address Line 2</label>
                        <input
                            type="text"
                            name="addressLine2"
                            placeholder="Apartment, suite, unit, building, etc."
                            value={formData.addressLine2}
                            onChange={handleInputChange}
                            className="w-full p-3 rounded-md bg-gray-100 text-gray-800 border border-gray-300"
                        />
                    </div>

                    <div className="mt-6">
                        <label className="block mb-3 font-medium">Assigned Doctors</label>
                        <div className="grid md:grid-cols-2 gap-3 border border-gray-300 rounded-md p-4 bg-gray-50">
                            {availableDoctors && availableDoctors.length > 0 ? (
                                availableDoctors.map(doctor => (
                                    <div key={doctor._id} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id={`doctor-${doctor._id}`}
                                            value={doctor._id}
                                            checked={assignedDoctors.includes(doctor._id)}
                                            onChange={handleDoctorChange}
                                            className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                        />
                                        <label htmlFor={`doctor-${doctor._id}`} className="text-sm">
                                            {doctor.name} ({doctor.speciality})
                                        </label>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500">No doctors available.</p>
                            )}
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium disabled:bg-blue-400"
                        >
                            {isLoading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateNurse;