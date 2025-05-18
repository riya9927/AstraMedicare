import React, { useState, useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets } from '../../assets/assets';

const UpdateAdministrativeStaff = ({ staff, onClose, onUpdateSuccess }) => {
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
        role: '',
        shiftTimings: '',
        dateOfJoining: '',
        salaryDetails: ''
    });
    const [imageFile, setImageFile] = useState(null);
    const [previewImg, setPreviewImg] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Initialize form data when staff prop changes
    useEffect(() => {
        if (staff) {
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
                    fullName: staff.fullName || '',
                    email: staff.email || '',
                    password: '', // Empty password by default
                    gender: staff.gender || '',
                    dateOfBirth: formatDate(staff.dateOfBirth),
                    contactNumber: staff.contactNumber || '',
                    addressLine1: staff.addressLine1 || '',
                    addressLine2: staff.addressLine2 || '',
                    role: staff.role || '',
                    shiftTimings: staff.shiftTimings || '',
                    dateOfJoining: formatDate(staff.dateOfJoining),
                    salaryDetails: staff.salaryDetails?.toString() || ''
                });

                // Handle staff photo
                setPreviewImg(staff.photo || '');

                console.log('Staff data loaded:', {
                    fullName: staff.fullName,
                    email: staff.email,
                    gender: staff.gender,
                    photo: staff.photo ? 'exists' : 'not found',
                    dates: {
                        birth: formatDate(staff.dateOfBirth),
                        joining: formatDate(staff.dateOfJoining),
                    }
                });
            } catch (err) {
                console.error('Error initializing form data:', err);
                toast.error('Error loading staff data');
            }
        }
    }, [staff]);

    const handleInputChange = (e) => {
        const { name, value, type } = e.target;

        if (name === 'salaryDetails') {
            setFormData({ ...formData, [name]: value === '' ? '' : Number(value) });
        } else {
            setFormData({ ...formData, [name]: value });
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
            formDataObj.append('role', formData.role);
            formDataObj.append('shiftTimings', formData.shiftTimings);
            formDataObj.append('dateOfJoining', formData.dateOfJoining);
            formDataObj.append('salaryDetails', Number(formData.salaryDetails));

            // Log the form data for debugging
            console.log('Form data being sent:', {
                fullName: formData.fullName,
                email: formData.email,
                gender: formData.gender,
                dateOfBirth: formData.dateOfBirth,
                contactNumber: formData.contactNumber,
                addressLine1: formData.addressLine1,
                addressLine2: formData.addressLine2 || '',
                role: formData.role,
                shiftTimings: formData.shiftTimings,
                dateOfJoining: formData.dateOfJoining,
                salaryDetails: Number(formData.salaryDetails),
                
            });

            const { data } = await axios.put(
                `${backendUrl}/api/admin/administrative/${staff._id}`,
                formDataObj,
                {
                    headers: {
                        aToken,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            if (data.success) {
                toast.success(data.message || 'Administrative staff updated successfully');
                onUpdateSuccess();
                onClose();
            } else {
                toast.error(data.message || 'Failed to update administrative staff');
            }
        } catch (error) {
            console.error('Error updating administrative staff:', error);

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
                    <h3 className="text-2xl font-bold text-blue-700">Edit Administrative Staff</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                    >
                        &times;
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
                        <label htmlFor="pat-img-edit" className="cursor-pointer w-40 h-40 bg-blue-50 rounded-lg flex items-center justify-center overflow-hidden border border-blue-200 hover:border-blue-400 transition">
                            <img src={previewImg || assets.upload_area} alt="Patient" className="w-full h-full object-cover" />
                        </label>
                        <input type="file" id="pat-img-edit" name="image" hidden onChange={handleFileChange} />
                        <p className="text-sm text-gray-600 text-center">
                            Click to update <br /> Staff Photo
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
                            <label className="block mb-1 font-medium">Role</label>
                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleInputChange}
                                required
                                className="w-full p-3 rounded-md bg-gray-100 text-gray-800 border border-gray-300"
                            >
                                <option value="">Select Role</option>
                                <option value="Receptionist">Receptionist</option>
                                <option value="Billing Clerk">Billing Clerk</option>
                                <option value="HR Assistant">HR Assistant</option>
                            </select>
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">Shift Timings</label>
                            <input
                                type="text"
                                name="shiftTimings"
                                placeholder="e.g. 9 AM - 5 PM"
                                value={formData.shiftTimings}
                                onChange={handleInputChange}
                                required
                                className="w-full p-3 rounded-md bg-gray-100 text-gray-800 border border-gray-300"
                            />
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

export default UpdateAdministrativeStaff;