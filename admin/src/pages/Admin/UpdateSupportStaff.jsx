import React, { useState, useEffect, useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets } from '../../assets/assets';

const UpdateSupportStaff = ({ supportStaff, onClose, onUpdateSuccess }) => {
    const { aToken, backendUrl } = useContext(AdminContext);

    const [formData, setFormData] = useState({
        name: '',
        gender: '',
        dateOfBirth: '',
        contactNumber: '',
        addressLine1: '',
        addressLine2: '',
        role: '',
        shiftTimings: '',
        supervisorName: '',
        dateOfJoining: '',
        basicSalary: ''
    });

    const [imageFile, setImageFile] = useState(null);
    const [previewImg, setPreviewImg] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (supportStaff) {
            const formatDate = (dateString) => {
                if (!dateString) return '';
                const date = new Date(dateString);
                return date instanceof Date && !isNaN(date) ? date.toISOString().split('T')[0] : '';
            };

            setFormData({
                name: supportStaff.name || '',
                gender: supportStaff.gender || '',
                dateOfBirth: formatDate(supportStaff.dateOfBirth),
                contactNumber: supportStaff.contactNumber || '',
                addressLine1: supportStaff.addressLine1 || '',
                addressLine2: supportStaff.addressLine2 || '',
                role: supportStaff.role || '',
                shiftTimings: supportStaff.shiftTimings || '',
                supervisorName: supportStaff.supervisorName || '',
                dateOfJoining: formatDate(supportStaff.dateOfJoining),
                basicSalary: supportStaff.basicSalary?.toString() || ''
            });

            setPreviewImg(supportStaff.photo || '');
        }
    }, [supportStaff]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'basicSalary' ? Number(value) || '' : value
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
                if (value !== '') formDataObj.append(key, value);
            });

            const { data } = await axios.put(
                `${backendUrl}/api/admin/support/${supportStaff._id}`,
                formDataObj,
                {
                    headers: {
                        aToken,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            if (data.success) {
                toast.success(data.message || 'Support staff updated successfully');
                onUpdateSuccess();
                onClose();
            } else {
                toast.error(data.message || 'Failed to update support staff');
            }
        } catch (error) {
            console.error('Update error:', error);
            toast.error(error.response?.data?.message || 'Update failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 overflow-auto">
            <div className="bg-white rounded-xl p-8 w-full max-w-4xl shadow-lg animate-fade-in my-8 max-h-screen overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-blue-700">Edit Support Staff</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl font-bold">&times;</button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
                        <label htmlFor="support-staff-img-edit" className="cursor-pointer w-40 h-40 bg-blue-50 rounded-lg flex items-center justify-center overflow-hidden border border-blue-200 hover:border-blue-400 transition">
                            <img src={previewImg || assets.upload_area} alt="Support Staff" className="w-full h-full object-cover" />
                        </label>
                        <input type="file" id="support-staff-img-edit" name="image" hidden onChange={handleFileChange} />
                        <p className="text-sm text-gray-600 text-center">Click to update <br /> Support Staff Photo</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            { name: 'name', label: 'Full Name', type: 'text' },
                            { name: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female'] },
                            { name: 'dateOfBirth', label: 'Date of Birth', type: 'date' },
                            { name: 'dateOfJoining', label: 'Date of Joining', type: 'date' },
                            { name: 'contactNumber', label: 'Contact Number', type: 'text' },
                            { name: 'supervisorName', label: 'Supervisor Name', type: 'text' },
                            {
                                name: 'role',
                                label: 'Role',
                                type: 'select',
                                options: ['Housekeeping', 'Security', 'Canteen', 'Maintenance', 'Laundry Services', 'Supervisor', 'Electrical', 'Gardening', 'Ambulance Services', 'Ward Boy']
                            },
                            { name: 'shiftTimings', label: 'Shift Timings', type: 'select', options: ['Day', 'Night'] },
                            { name: 'basicSalary', label: 'Basic Salary (₹)', type: 'number' }
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
                                        <option value="">Select</option>
                                        {options.map(opt => (
                                            <option key={opt} value={opt}>{opt}</option>
                                        ))}
                                    </select>
                                ) : (
                                    <input
                                        type={type}
                                        name={name}
                                        value={formData[name]}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full p-3 rounded-md bg-gray-100 border border-gray-300"
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
                                placeholder={name === 'addressLine1' ? 'Street address, P.O. box, etc.' : 'Apartment, suite, etc.'}
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

export default UpdateSupportStaff;
