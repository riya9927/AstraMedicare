import React, { useState, useContext } from 'react';
import { assets } from '../../assets/assets';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddPatient = () => {
  const [patientImg, setPatientImg] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('Male');
  const [dob, setDob] = useState('');
  const [bloodGroup, setBloodGroup] = useState('O+');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [address3, setAddress3] = useState('');
  const [emergencyName, setEmergencyName] = useState('');
  const [emergencyRelation, setEmergencyRelation] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');
  
  const { backendUrl, aToken } = useContext(AdminContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const patientData = {
      name,
      email,
      password,
      image: patientImg,
      phone,
      gender,
      dob,
      bloodGroup,
      address: {
        line1: address1,
        line2: address2,
        line3: address3,
      },
      emergencyContact: {
        name: emergencyName,
        relation: emergencyRelation,
        phone: emergencyPhone,
      },
    };

    // console.log('Patient Data:', patientData);

    try {
      const formData = new FormData();
      if (patientImg) {
        formData.append('image', patientImg);
      }
      
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('phone', phone);
      formData.append('gender', gender);
      formData.append('dob', dob);
      formData.append('bloodGroup', bloodGroup);
      formData.append('address', JSON.stringify({ 
        line1: address1, 
        line2: address2, 
        line3: address3 
      }));
      formData.append('emergencyContact', JSON.stringify({ 
        name: emergencyName, 
        relation: emergencyRelation, 
        phone: emergencyPhone 
      }));

      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });

      const { data } = await axios.post(
        backendUrl + '/api/admin/add-patient',
        formData,
        { headers: { aToken } }
      );

      if (data.success) {
        toast.success(data.message);
        // Reset form
        setPatientImg(false);
        setName('');
        setEmail('');
        setPassword('');
        setPhone('');
        setGender('Male');
        setDob('');
        setBloodGroup('O+');
        setAddress1('');
        setAddress2('');
        setAddress3('');
        setEmergencyName('');
        setEmergencyRelation('');
        setEmergencyPhone('');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  return (
    <div className="w-full p-6 bg-[#f0f4f8] min-h-screen text-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg max-w-5xl mx-auto border border-gray-200"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Add Patient
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
          <label
            htmlFor="patient-img"
            className="cursor-pointer w-40 h-40 bg-blue-50 rounded-lg flex items-center justify-center overflow-hidden border border-blue-200 hover:border-blue-400 transition"
          >
            <img 
              src={patientImg ? URL.createObjectURL(patientImg) : assets.upload_area} 
              alt="Upload" 
              className="w-full h-full object-cover" 
            />
          </label>
          <input
            type="file"
            id="patient-img"
            name="image"
            hidden
            onChange={(e) => setPatientImg(e.target.files[0])}
          />
          <p className="text-sm text-gray-600 text-center">
            Upload <br /> Patient Picture
          </p>
        </div>

        {/* Basic Information */}
        <h3 className="font-semibold text-lg mb-4 border-b pb-2">Basic Information</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter patient's full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-3 rounded-md bg-gray-100 text-gray-800 border border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 rounded-md bg-gray-100 text-gray-800 border border-gray-300"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 rounded-md bg-gray-100 text-gray-800 border border-gray-300"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Phone Number</label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full p-3 rounded-md bg-gray-100 text-gray-800 border border-gray-300"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Gender</label>
            <select
              name="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-100 text-gray-800 border border-gray-300"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-100 text-gray-800 border border-gray-300"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Blood Group</label>
            <select
              name="bloodGroup"
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-100 text-gray-800 border border-gray-300"
            >
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>
        </div>

        {/* Address Information */}
        <h3 className="font-semibold text-lg mb-4 mt-8 border-b pb-2">Address</h3>
        <div className="mt-2">
          <label className="block mb-1 font-medium">Address Line 1</label>
          <input
            type="text"
            name="address1"
            placeholder="Street address, P.O. box, etc."
            value={address1}
            onChange={(e) => setAddress1(e.target.value)}
            className="w-full p-3 rounded-md bg-gray-100 text-gray-800 border border-gray-300"
          />
        </div>

        <div className="mt-4">
          <label className="block mb-1 font-medium">Address Line 2</label>
          <input
            type="text"
            name="address2"
            placeholder="Apartment, suite, unit, building, etc."
            value={address2}
            onChange={(e) => setAddress2(e.target.value)}
            className="w-full p-3 rounded-md bg-gray-100 text-gray-800 border border-gray-300"
          />
        </div>

        <div className="mt-4">
          <label className="block mb-1 font-medium">Address Line 3</label>
          <input
            type="text"
            name="address3"
            placeholder="City, state, postal code, country, etc."
            value={address3}
            onChange={(e) => setAddress3(e.target.value)}
            className="w-full p-3 rounded-md bg-gray-100 text-gray-800 border border-gray-300"
          />
        </div>

        {/* Emergency Contact */}
        <h3 className="font-semibold text-lg mb-4 mt-8 border-b pb-2">Emergency Contact</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 font-medium">Contact Name</label>
            <input
              type="text"
              name="emergencyName"
              placeholder="Full name of emergency contact"
              value={emergencyName}
              onChange={(e) => setEmergencyName(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-100 text-gray-800 border border-gray-300"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Relationship</label>
            <input
              type="text"
              name="emergencyRelation"
              placeholder="e.g. Spouse, Parent, Sibling"
              value={emergencyRelation}
              onChange={(e) => setEmergencyRelation(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-100 text-gray-800 border border-gray-300"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Contact Phone</label>
            <input
              type="tel"
              name="emergencyPhone"
              placeholder="Emergency contact phone number"
              value={emergencyPhone}
              onChange={(e) => setEmergencyPhone(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-100 text-gray-800 border border-gray-300"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-8 bg-gray-800 hover:bg-gray-600 w-full py-3 rounded-md font-semibold text-white transition duration-300"
        >
          Submit Patient Details
        </button>
      </form>
    </div>
  );
};

export default AddPatient;
