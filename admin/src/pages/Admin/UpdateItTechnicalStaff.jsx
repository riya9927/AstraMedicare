import React, { useState, useEffect, useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets } from '../../assets/assets';

const UpdateItTechnicalStaff = ({ staff, onClose, onUpdateSuccess }) => {
    const { aToken, backendUrl } = useContext(AdminContext);

    const [formData, setFormData] = useState({
        name: '',
        emailID: '',
        gender: '',
        dateOfBirth: '',
        dateOfJoining: '',
        contactNumber: '',
        addressLine1: '',
        addressLine2: '',
        role: '',
        salary: ''
    });

    const [imageFile, setImageFile] = useState(null);
    const [previewImg, setPreviewImg] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (staff) {
            const formatDate = (date) => {
                if (!date) return '';
                const d = new Date(date);
                return d instanceof Date && !isNaN(d) ? d.toISOString().split('T')[0] : '';
            };

            setFormData({
                name: staff.name || '',
                emailID: staff.emailID || '',
                gender: staff.gender || '',
                dateOfBirth: formatDate(staff.dateOfBirth),
                dateOfJoining: formatDate(staff.dateOfJoining),
                contactNumber: staff.contactNumber || '',
                addressLine1: staff.addressLine1 || '',
                addressLine2: staff.addressLine2 || '',
                role: staff.role || '',
                salary: staff.salary?.toString() || ''
            });

            setPreviewImg(staff.photo || '');
        }
    }, [staff]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'salary' ? Number(value) || '' : value
        }));
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
            if (imageFile) formDataObj.append('image', imageFile);

            Object.entries(formData).forEach(([key, value]) => {
                formDataObj.append(key, value);
            });

            const { data } = await axios.put(
                `${backendUrl}/api/admin/it/${staff._id}`,
                formDataObj,
                {
                    headers: {
                        aToken,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            if (data.success) {
                toast.success(data.message || 'Staff updated successfully');
                onUpdateSuccess();
                onClose();
            } else {
                toast.error(data.message || 'Failed to update staff');
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Error updating staff');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 overflow-auto">
            <div className="bg-white rounded-xl p-8 w-full max-w-4xl shadow-lg animate-fade-in my-8 max-h-screen overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-blue-700">Edit IT Technical Staff</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl font-bold">&times;</button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
                        <label htmlFor="staff-img-edit" className="cursor-pointer w-40 h-40 bg-blue-50 rounded-lg flex items-center justify-center overflow-hidden border border-blue-200 hover:border-blue-400 transition">
                            <img src={previewImg || assets.upload_area} alt="Staff" className="w-full h-full object-cover" />
                        </label>
                        <input type="file" id="staff-img-edit" name="image" hidden onChange={handleFileChange} />
                        <p className="text-sm text-gray-600 text-center">Click to update <br /> Staff Photo</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            { name: 'name', label: 'Full Name', type: 'text' },
                            { name: 'emailID', label: 'Email', type: 'email' },
                            { name: 'gender', label: 'Gender', type: 'select', options: ['', 'Male', 'Female'] },
                            { name: 'dateOfBirth', label: 'Date of Birth', type: 'date' },
                            { name: 'dateOfJoining', label: 'Date of Joining', type: 'date' },
                            { name: 'contactNumber', label: 'Contact Number', type: 'text' },
                            {
                                name: 'role', label: 'Role', type: 'select', options: [
                                    '', 'IT Support Technician', 'Network Administrator', 'System Administrator',
                                    'Hardware Technician', 'Software Engineer', 'EMR/EHR Specialist (Electronic Medical Records)'
                                ]
                            },
                            { name: 'salary', label: 'Salary (₹)', type: 'number' }
                        ].map(({ name, label, type, options }) => (
                            <div key={name}>
                                <label className="block mb-1 font-medium">{label}</label>
                                {type === 'select' ? (
                                    <select
                                        name={name}
                                        value={formData[name]}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full p-3 rounded-md bg-gray-100 border border-gray-300"
                                    >
                                        {options.map(option => (
                                            <option key={option} value={option}>{option || 'Select'}</option>
                                        ))}
                                    </select>
                                ) : (
                                    <input
                                        type={type}
                                        name={name}
                                        value={formData[name]}
                                        placeholder={`Enter ${label.toLowerCase()}`}
                                        onChange={handleInputChange}
                                        className="w-full p-3 rounded-md bg-gray-100 border border-gray-300"
                                        required
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    {['addressLine1', 'addressLine2'].map(name => (
                        <div className="mt-6" key={name}>
                            <label className="block mb-1 font-medium">{name === 'addressLine1' ? 'Address Line 1' : 'Address Line 2'}</label>
                            <input
                                type="text"
                                name={name}
                                placeholder={name === 'addressLine1' ? 'Street address, P.O. box, etc.' : 'Apartment, suite, unit, etc.'}
                                value={formData[name]}
                                onChange={handleInputChange}
                                required={name === 'addressLine1'}
                                className="w-full p-3 rounded-md bg-gray-100 border border-gray-300"
                            />
                        </div>
                    ))}

                    <div className="mt-8 flex justify-end space-x-3">
                        <button type="button" onClick={onClose} className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-100">Cancel</button>
                        <button type="submit" disabled={isLoading} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium disabled:bg-blue-400">
                            {isLoading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateItTechnicalStaff;
