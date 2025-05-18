import React, { useState, useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets } from '../../assets/assets';

const UpdateDoctor = ({ doctor, onClose, onUpdateSuccess }) => {
  const { aToken, backendUrl } = useContext(AdminContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    speciality: '',
    degree: '',
    experience: '',
    fees: '',
    about: '',
    available: true,
    address1: '',
    address2: ''
  });
  const [docImg, setDocImg] = useState(null);
  const [previewImg, setPreviewImg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Initialize form data when doctor prop changes
  useEffect(() => {
    if (doctor) {
      setFormData({
        name: doctor.name || '',
        email: doctor.email || '',
        password: '',
        speciality: doctor.speciality || '',
        degree: doctor.degree || '',
        experience: doctor.experience || '',
        fees: doctor.fees || '',
        about: doctor.about || '',
        available: doctor.available !== undefined ? doctor.available : true,
        address1: doctor.address?.line1 || '',
        address2: doctor.address?.line2 || ''
      });
      setPreviewImg(doctor.image || '');
    }
  }, [doctor]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else if (name === 'experience' || name === 'fees') {
      setFormData({ ...formData, [name]: value === '' ? '' : Number(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setDocImg(file);
      setPreviewImg(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formDataObj = new FormData();

      // Only append image if a new one was selected
      if (docImg) {
        formDataObj.append('image', docImg);
      }

      // Append all form fields
      formDataObj.append('name', formData.name);
      formDataObj.append('email', formData.email);

      // Only append password if provided
      if (formData.password) {
        formDataObj.append('password', formData.password);
      }

      formDataObj.append('experience', Number(formData.experience));
      formDataObj.append('fees', Number(formData.fees));
      formDataObj.append('about', formData.about);
      formDataObj.append('speciality', formData.speciality);
      formDataObj.append('degree', formData.degree);
      formDataObj.append('available', formData.available);
      formDataObj.append('address', JSON.stringify({
        line1: formData.address1,
        line2: formData.address2
      }));

      const { data } = await axios.put(
        `${backendUrl}/api/admin/update-doctor/${doctor._id}`,
        formDataObj,
        { headers: { aToken } }
      );

      if (data.success) {
        toast.success(data.message || 'Doctor updated successfully');
        onUpdateSuccess();
        onClose();
      } else {
        toast.error(data.message || 'Failed to update doctor');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      console.error('Error updating doctor:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 overflow-auto">
      <div className="bg-white rounded-xl p-8 w-full max-w-4xl shadow-lg animate-fade-in my-8 max-h-screen overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-blue-700">Edit Doctor</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
            <label
              htmlFor="doc-img-edit"
              className="cursor-pointer w-40 h-40 bg-blue-50 rounded-lg flex items-center justify-center overflow-hidden border border-blue-200 hover:border-blue-400 transition"
            >
              <img
                src={previewImg || assets.upload_area}
                alt="Doctor"
                className="w-full h-full object-cover"
              />
            </label>
            <input
              type="file"
              id="doc-img-edit"
              name="image"
              hidden
              onChange={handleFileChange}
            />
            <p className="text-sm text-gray-600 text-center">
              Click to update <br /> Doctor Picture
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 font-medium">Doctor Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter name"
                value={formData.name}
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
              <label className="block mb-1 font-medium">Speciality</label>
              <select
                name="speciality"
                value={formData.speciality}
                onChange={handleInputChange}
                required
                className="w-full p-3 rounded-md bg-gray-100 text-gray-800 border border-gray-300"
              >
                <option value="">Select Speciality</option>
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
                <option value="Cardiologist">Cardiologist</option>
                <option value="Orthopedic Surgeon">Orthopedic Surgeon</option>
                <option value="ENT Specialist">ENT Specialist</option>
                <option value="Psychiatrist">Psychiatrist</option>
                <option value="Radiologist">Radiologist</option>
                <option value="Pathologist">Pathologist</option>
                <option value="Plastic Surgeon">Plastic Surgeon</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium">Degree</label>
              <input
                type="text"
                name="degree"
                placeholder="e.g. MBBS, MD"
                value={formData.degree}
                onChange={handleInputChange}
                required
                className="w-full p-3 rounded-md bg-gray-100 text-gray-800 border border-gray-300"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Experience (Years)</label>
              <input
                type="number"
                name="experience"
                placeholder="e.g. 8"
                value={formData.experience}
                onChange={handleInputChange}
                required
                className="w-full p-3 rounded-md bg-gray-100 text-gray-800 border border-gray-300"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Fees (₹)</label>
              <input
                type="number"
                name="fees"
                placeholder="e.g. 2000"
                value={formData.fees}
                onChange={handleInputChange}
                required
                className="w-full p-3 rounded-md bg-gray-100 text-gray-800 border border-gray-300"
              />
            </div>

            <div>
              <label className="flex items-center space-x-2 mt-6">
                <input
                  type="checkbox"
                  name="available"
                  checked={formData.available}
                  onChange={handleInputChange}
                  className="w-4 h-4"
                />
                <span className="text-gray-700">Available for Appointments</span>
              </label>
            </div>
          </div>

          <div className="mt-6">
            <label className="block mb-1 font-medium">Address Line 1</label>
            <input
              type="text"
              name="address1"
              placeholder="Street address, P.O. box, etc."
              value={formData.address1}
              onChange={handleInputChange}
              required
              className="w-full p-3 rounded-md bg-gray-100 text-gray-800 border border-gray-300"
            />
          </div>

          <div className="mt-6">
            <label className="block mb-1 font-medium">Address Line 2</label>
            <input
              type="text"
              name="address2"
              placeholder="Apartment, suite, unit, building, etc."
              value={formData.address2}
              onChange={handleInputChange}
              className="w-full p-3 rounded-md bg-gray-100 text-gray-800 border border-gray-300"
            />
          </div>

          <div className="mt-6">
            <label className="block mb-1 font-medium">About</label>
            <textarea
              name="about"
              placeholder="Brief bio or introduction"
              value={formData.about}
              onChange={handleInputChange}
              required
              className="w-full p-3 rounded-md bg-gray-100 text-gray-800 border border-gray-300 h-24"
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

export default UpdateDoctor;