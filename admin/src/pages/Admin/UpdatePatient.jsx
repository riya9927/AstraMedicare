import React, { useState, useEffect, useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets } from '../../assets/assets';

const UpdatePatient = ({ patient, onClose, onUpdateSuccess }) => {
  const { aToken, backendUrl } = useContext(AdminContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    gender: '',
    dob: '',
    bloodGroup: '',
    address1: '',
    address2: '',
    address3: '',
    emergencyName: '',
    emergencyRelation: '',
    emergencyPhone: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [previewImg, setPreviewImg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (patient) {
      setFormData({
        name: patient.name || '',
        email: patient.email || '',
        password: '',
        phone: patient.phone || '',
        gender: patient.gender || '',
        dob: patient.dob ? new Date(patient.dob).toISOString().substr(0, 10) : '',
        bloodGroup: patient.bloodGroup || '',
        address1: patient.address?.line1 || '',
        address2: patient.address?.line2 || '',
        address3: patient.address?.line3 || '',
        emergencyName: patient.emergencyContact?.name || '',
        emergencyRelation: patient.emergencyContact?.relation || '',
        emergencyPhone: patient.emergencyContact?.phone || ''
      });
      setPreviewImg(patient.image || '');
    }
  }, [patient]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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

      formDataObj.append('name', formData.name);
      formDataObj.append('email', formData.email);
      if (formData.password) formDataObj.append('password', formData.password);
      formDataObj.append('phone', formData.phone);
      formDataObj.append('gender', formData.gender);
      formDataObj.append('dob', formData.dob);
      formDataObj.append('bloodGroup', formData.bloodGroup);

      const address = {
        line1: formData.address1,
        line2: formData.address2,
        line3: formData.address3
      };
      formDataObj.append('address', JSON.stringify(address));

      const emergencyContact = {
        name: formData.emergencyName,
        relation: formData.emergencyRelation,
        phone: formData.emergencyPhone
      };
      formDataObj.append('emergencyContact', JSON.stringify(emergencyContact));

      const { data } = await axios.put(
        `${backendUrl}/api/admin/update-patient/${patient._id}`,
        formDataObj,
        { headers: { aToken } }
      );

      if (data.success) {
        toast.success(data.message || 'Patient updated successfully');
        onUpdateSuccess();
        onClose();
      } else {
        toast.error(data.message || 'Failed to update patient');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      console.error('Error updating patient:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 overflow-auto">
      <div className="bg-white rounded-xl p-8 w-full max-w-4xl shadow-lg my-8 max-h-screen overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-blue-700">Edit Patient</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl font-bold">
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
            <label htmlFor="pat-img-edit" className="cursor-pointer w-40 h-40 bg-blue-50 rounded-lg flex items-center justify-center overflow-hidden border border-blue-200 hover:border-blue-400 transition">
              <img src={previewImg || assets.upload_area} alt="Patient" className="w-full h-full object-cover" />
            </label>
            <input type="file" id="pat-img-edit" name="image" hidden onChange={handleFileChange} />
            <p className="text-sm text-gray-600 text-center">Click to update <br /> Patient Picture</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { label: "Patient Name", name: "name", type: "text" },
              { label: "Email", name: "email", type: "email" },
              { label: "Password (leave blank to keep unchanged)", name: "password", type: "password" },
              { label: "Phone", name: "phone", type: "text" },
              { label: "Gender", name: "gender", type: "select", options: ["Male", "Female", "Other"] },
              { label: "Date of Birth", name: "dob", type: "date" },
              { label: "Blood Group", name: "bloodGroup", type: "select", options: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"] },
              { label: "Address Line 1", name: "address1", type: "text" },
              { label: "Address Line 2", name: "address2", type: "text" },
              { label: "Address Line 3", name: "address3", type: "text" },
              { label: "Emergency Contact Name", name: "emergencyName", type: "text" },
              { label: "Emergency Relation", name: "emergencyRelation", type: "text" },
              { label: "Emergency Phone", name: "emergencyPhone", type: "text" }
            ].map((field, index) => (
              <div key={index}>
                <label className="block mb-1 font-medium">{field.label}</label>
                {field.type === "select" ? (
                  <select
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 rounded-md bg-gray-100 border border-gray-300"
                  >
                    <option value="">Select {field.label}</option>
                    {field.options.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.label}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    required={field.name !== 'password'}
                    className="w-full p-3 rounded-md bg-gray-100 border border-gray-300"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-100">
              Cancel
            </button>
            <button type="submit" disabled={isLoading} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium disabled:bg-blue-400">
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePatient;
