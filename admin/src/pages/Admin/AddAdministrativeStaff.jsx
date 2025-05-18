import React, { useState, useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';

const AddAdministrativeStaff = () => {
  const { backendUrl, aToken } = useContext(AdminContext);

  const [photo, setPhoto] = useState(null);
//   const [staffID, setStaffID] = useState('');
  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [shiftTimings, setShiftTimings] = useState('');
  const [dateOfJoining, setDateOfJoining] = useState('');
  const [salaryDetails, setSalaryDetails] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!photo) {
      return toast.error('Please select a photo');
    }

    try {
      const formData = new FormData();
      formData.append('image', photo);
    //   formData.append('staffID', staffID);
      formData.append('fullName', fullName);
      formData.append('gender', gender);
      formData.append('dateOfBirth', dateOfBirth);
      formData.append('contactNumber', contactNumber);
      formData.append('addressLine1', addressLine1);
      formData.append('addressLine2', addressLine2);
      formData.append('role', role);
      formData.append('email', email);
      formData.append('shiftTimings', shiftTimings);
      formData.append('dateOfJoining', dateOfJoining);
      formData.append('salaryDetails', salaryDetails);

      const { data } = await axios.post(
        backendUrl + '/api/admin/administrative/add',
        formData,
        { headers: { aToken } }
      );

      if (data.success) {
        toast.success(data.message);
        // Reset form
        setPhoto(null);
        // setStaffID('');
        setFullName('');
        setGender('');
        setDateOfBirth('');
        setContactNumber('');
        setAddressLine1('');
        setAddressLine2('');
        setRole('');
        setEmail('');
        setShiftTimings('');
        setDateOfJoining('');
        setSalaryDetails('');
         // Navigate to administrative staff page
      navigate('/staff-management/administrative');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="w-full p-6 bg-[#f0f4f8] min-h-screen text-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg max-w-5xl mx-auto border border-gray-200"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Add Administrative Staff
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
          <p className="text-sm text-gray-600 text-center">
            Upload <br /> Staff Picture
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* <div>
            <label className="block mb-1 font-medium">Staff ID</label>
            <input
              type="text"
              value={staffID}
              onChange={(e) => setStaffID(e.target.value)}
              placeholder="Enter Staff ID"
              required
              className="w-full p-3 rounded-md bg-gray-100 text-gray-800 border border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
          </div> */}

          <div>
            <label className="block mb-1 font-medium">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter full name"
              required
              className="w-full p-3 rounded-md bg-gray-100 text-gray-800 border border-gray-300"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
              className="w-full p-3 rounded-md bg-gray-100 text-gray-800 border border-gray-300"
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              required
              className="w-full p-3 rounded-md bg-gray-100 text-gray-800 border border-gray-300"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Date of Birth</label>
            <input
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              required
              className="w-full p-3 rounded-md bg-gray-100 text-gray-800 border border-gray-300"
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
              className="w-full p-3 rounded-md bg-gray-100 text-gray-800 border border-gray-300"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="w-full p-3 rounded-md bg-gray-100 text-gray-800 border border-gray-300"
            >
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="Receptionist">Receptionist</option>
              <option value="Billing Clerk">Billing Clerk</option>
              <option value="HR Assistant">HR Assistant</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Shift Timings</label>
            <input
              type="text"
              value={shiftTimings}
              onChange={(e) => setShiftTimings(e.target.value)}
              placeholder="e.g. 9 AM - 5 PM"
              required
              className="w-full p-3 rounded-md bg-gray-100 text-gray-800 border border-gray-300"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Date of Joining</label>
            <input
              type="date"
              value={dateOfJoining}
              onChange={(e) => setDateOfJoining(e.target.value)}
              required
              className="w-full p-3 rounded-md bg-gray-100 text-gray-800 border border-gray-300"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Salary Details (₹)</label>
            <input
              type="number"
              value={salaryDetails}
              onChange={(e) => setSalaryDetails(e.target.value)}
              placeholder="e.g. 25000"
              required
              className="w-full p-3 rounded-md bg-gray-100 text-gray-800 border border-gray-300"
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
            className="w-full p-3 rounded-md bg-gray-100 text-gray-800 border border-gray-300"
          />
        </div>

        <div className="mt-6">
          <label className="block mb-1 font-medium">Address Line 2</label>
          <input
            type="text"
            value={addressLine2}
            onChange={(e) => setAddressLine2(e.target.value)}
            placeholder="Apartment, suite, unit, building, etc."
            className="w-full p-3 rounded-md bg-gray-100 text-gray-800 border border-gray-300"
          />
        </div>

        <button
          type="submit"
        //   onClick={() => navigate('/staff-management/administrative')}
          className="mt-8 bg-gray-800 hover:bg-gray-600 w-full py-3 rounded-md font-semibold text-white transition duration-300"
        >
          Submit Staff Details
        </button>
      </form>
    </div>
  );
};

export default AddAdministrativeStaff;