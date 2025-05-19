import React, { useState, useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';

const AddItTechnicalStaff = () => {
  const { backendUrl, aToken } = useContext(AdminContext);
  const navigate = useNavigate();

  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [emailID, setEmailID] = useState('');
  const [role, setRole] = useState('');
  const [dateOfJoining, setDateOfJoining] = useState('');
  const [salary, setSalary] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!photo) return toast.error('Please select a photo');

    try {
      const formData = new FormData();
      formData.append('image', photo);
      formData.append('name', name);
      formData.append('gender', gender);
      formData.append('dateOfBirth', dateOfBirth);
      formData.append('contactNumber', contactNumber);
      formData.append('emailID', emailID);  // Changed to match backend expectation
      formData.append('role', role);
      formData.append('dateOfJoining', dateOfJoining);
      formData.append('salary', salary);
      formData.append('addressLine1', addressLine1);
      formData.append('addressLine2', addressLine2);

      // Log the form data to verify what's being sent
      for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }

      const { data } = await axios.post(
        `${backendUrl}/api/admin/it/add`,
        formData,
        { 
          headers: { 
            aToken,
            'Content-Type': 'multipart/form-data'  // Explicitly set content type
          } 
        }
      );

      if (data.success) {
        toast.success(data.message);
        setPhoto(null);
        setName('');
        setGender('');
        setDateOfBirth('');
        setContactNumber('');
        setEmailID('');
        setRole('');
        setDateOfJoining('');
        setSalary('');
        setAddressLine1('');
        setAddressLine2('');
        navigate('/staff-management/it');
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="w-full p-6 bg-[#f0f4f8] min-h-screen text-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg max-w-5xl mx-auto border border-gray-200"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Add IT Technical Staff
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
          <label
            htmlFor="staff-img"
            className="cursor-pointer w-40 h-40 bg-blue-50 rounded-lg flex items-center justify-center overflow-hidden border border-blue-200 hover:border-blue-400 transition"
          >
            <img
              src={photo ? URL.createObjectURL(photo) : assets.upload_area}
              alt="Upload"
              className="w-full h-full object-cover"
            />
          </label>
          <input
            type="file"
            id="staff-img"
            hidden
            onChange={(e) => setPhoto(e.target.files[0])}
          />
          <p className="text-sm text-gray-600 text-center">Upload Staff Picture</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 font-medium">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter full name"
              required
              className="w-full p-3 rounded-md bg-gray-100 border border-gray-300"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
              className="w-full p-3 rounded-md bg-gray-100 border border-gray-300"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              value={emailID}
              onChange={(e) => setEmailID(e.target.value)}
              placeholder="Enter email"
              required
              className="w-full p-3 rounded-md bg-gray-100 border border-gray-300"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Date of Birth</label>
            <input
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              required
              className="w-full p-3 rounded-md bg-gray-100 border border-gray-300"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Contact Number</label>
            <input
              type="text"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              placeholder="Enter contact number"
              required
              className="w-full p-3 rounded-md bg-gray-100 border border-gray-300"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="w-full p-3 rounded-md bg-gray-100 border border-gray-300"
            >
              <option value="">Select Role</option>
              <option value="IT Support Technician">IT Support Technician</option>
              <option value="Network Administrator">Network Administrator</option>
              <option value="System Administrator">System Administrator</option>
              <option value="Hardware Technician">Hardware Technician</option>
              <option value="Software Engineer">Software Engineer</option>
              <option value="EMR/EHR Specialist (Electronic Medical Records)">EMR/EHR Specialist</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Date of Joining</label>
            <input
              type="date"
              value={dateOfJoining}
              onChange={(e) => setDateOfJoining(e.target.value)}
              required
              className="w-full p-3 rounded-md bg-gray-100 border border-gray-300"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Salary (₹)</label>
            <input
              type="number"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              placeholder="e.g. 30000"
              required
              className="w-full p-3 rounded-md bg-gray-100 border border-gray-300"
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="block mb-1 font-medium">Address Line 1</label>
          <input
            type="text"
            value={addressLine1}
            onChange={(e) => setAddressLine1(e.target.value)}
            placeholder="Street address, P.O. box, etc."
            required
            className="w-full p-3 rounded-md bg-gray-100 border border-gray-300"
          />
        </div>

        <div className="mt-6">
          <label className="block mb-1 font-medium">Address Line 2</label>
          <input
            type="text"
            value={addressLine2}
            onChange={(e) => setAddressLine2(e.target.value)}
            placeholder="Apartment, suite, etc."
            className="w-full p-3 rounded-md bg-gray-100 border border-gray-300"
          />
        </div>

        <button
          type="submit"
          className="mt-8 bg-gray-800 hover:bg-gray-600 w-full py-3 rounded-md font-semibold text-white transition duration-300"
        >
          Submit IT Staff Details
        </button>
      </form>
    </div>
  );
};

export default AddItTechnicalStaff;
