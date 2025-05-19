import React, { useState, useEffect, useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets } from '../../assets/assets';

const UpdatePharmacist = ({ pharmacist, onClose, onUpdateSuccess }) => {
    const { aToken, backendUrl } = useContext(AdminContext);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        gender: '',
        dateOfBirth: '',
        dateOfJoining: '',
        contactNumber: '',
        addressLine1: '',
        addressLine2: '',
        qualifications: '',
        shiftDetails: '',
        salaryDetails: ''
    });

    const [imageFile, setImageFile] = useState(null);
    const [previewImg, setPreviewImg] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (pharmacist) {
            const formatDate = (date) => {
                if (!date) return '';
                const d = new Date(date);
                return d instanceof Date && !isNaN(d) ? d.toISOString().split('T')[0] : '';
            };

            setFormData({
                name: pharmacist.name || '',
                email: pharmacist.email || '',
                password: '',
                gender: pharmacist.gender || '',
                dateOfBirth: formatDate(pharmacist.dateOfBirth),
                dateOfJoining: formatDate(pharmacist.dateOfJoining),
                contactNumber: pharmacist.contactNumber || '',
                addressLine1: pharmacist.addressLine1 || '',
                addressLine2: pharmacist.addressLine2 || '',
                qualifications: pharmacist.qualifications || '',
                shiftDetails: pharmacist.shiftDetails || '',
                salaryDetails: pharmacist.salaryDetails?.toString() || ''
            });

            setPreviewImg(pharmacist.photo || '');
        }
    }, [pharmacist]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'salaryDetails' ? Number(value) || '' : value
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
            formDataObj.append('name', formData.name);
            formDataObj.append('email', formData.email);
            if (formData.password) formDataObj.append('password', formData.password);
            formDataObj.append('gender', formData.gender);
            formDataObj.append('dateOfBirth', formData.dateOfBirth);
            formDataObj.append('dateOfJoining', formData.dateOfJoining);
            formDataObj.append('contactNumber', formData.contactNumber);
            formDataObj.append('addressLine1', formData.addressLine1);
            formDataObj.append('addressLine2', formData.addressLine2);
            formDataObj.append('qualifications', formData.qualifications);
            formDataObj.append('shiftDetails', formData.shiftDetails);
            formDataObj.append('salaryDetails', Number(formData.salaryDetails));

            const { data } = await axios.put(
                `${backendUrl}/api/admin/pharmacy/${pharmacist._id}`,
                formDataObj,
                {
                    headers: {
                        aToken,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            if (data.success) {
                toast.success(data.message || 'Pharmacist updated successfully');
                onUpdateSuccess();
                onClose();
            } else {
                toast.error(data.message || 'Failed to update pharmacist');
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Error updating pharmacist');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 overflow-auto">
            <div className="bg-white rounded-xl p-8 w-full max-w-4xl shadow-lg animate-fade-in my-8 max-h-screen overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-blue-700">Edit Pharmacist</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl font-bold">&times;</button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
                        <label htmlFor="pharmacist-img-edit" className="cursor-pointer w-40 h-40 bg-blue-50 rounded-lg flex items-center justify-center overflow-hidden border border-blue-200 hover:border-blue-400 transition">
                            <img src={previewImg || assets.upload_area} alt="Pharmacist" className="w-full h-full object-cover" />
                        </label>
                        <input type="file" id="pharmacist-img-edit" name="image" hidden onChange={handleFileChange} />
                        <p className="text-sm text-gray-600 text-center">Click to update <br /> Pharmacist Photo</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            { name: 'name', label: 'Full Name', type: 'text' },
                            { name: 'email', label: 'Email', type: 'email' },
                            { name: 'password', label: 'Password (leave blank to keep unchanged)', type: 'password' },
                            { name: 'gender', label: 'Gender', type: 'select', options: ['', 'Male', 'Female'] },
                            { name: 'dateOfBirth', label: 'Date of Birth', type: 'date' },
                            { name: 'dateOfJoining', label: 'Date of Joining', type: 'date' },
                            { name: 'contactNumber', label: 'Contact Number', type: 'text' },
                            { name: 'qualifications', label: 'Qualifications', type: 'text' },
                            { name: 'shiftDetails', label: 'Shift Details', type: 'select', options: ['', 'Day', 'Night'] },
                            { name: 'salaryDetails', label: 'Salary Details (₹)', type: 'number' }
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
                                        required={name !== 'password' && name !== 'addressLine2'}
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

export default UpdatePharmacist;
