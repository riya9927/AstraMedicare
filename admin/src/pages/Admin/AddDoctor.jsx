import React, { useState } from 'react';
import { assets } from '../../assets/assets';
import { useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [experience, setExperience] = useState('');
  const [fees, setFees] = useState('');
  const [about, setAbout] = useState('');
  const [speciality, setSpeciality] = useState('Select Speciality');
  const [degree, setDegree] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const { backendUrl, aToken } = useContext(AdminContext)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const doctorData = {
      name,
      email,
      password,
      image: docImg,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: {
        line1: address1,
        line2: address2,
      },
    };

    console.log('Doctor Data:', doctorData);

    try {
      if (!docImg) {
        return toast.error('Image Not Selected');
      }

      const formData = new FormData();
      formData.append('image', docImg);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('experience',  Number(experience));
      formData.append('fees', Number(fees));
      formData.append('about', about);
      formData.append('speciality', speciality);
      formData.append('degree', degree);
      formData.append('date', Date.now());
      formData.append('address', JSON.stringify({ line1: address1, line2: address2 }));

      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });

      const { data } = await axios.post(
        backendUrl + '/api/admin/add-doctor',
        formData,
        { headers: { aToken } }
      );


      if (data.success) {
        
        if (data.success) {
          toast.success(data.message)
          setDocImg(false)
          setName('')
          setPassword('')
          setEmail('')
          setAddress1('')
          setAddress2('')
          setDegree('')
          setAbout('')
          setFees('')
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message)
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
          Add Doctor
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
          <label
            htmlFor="doc-img"
            className="cursor-pointer w-40 h-40 bg-blue-50 rounded-lg flex items-center justify-center overflow-hidden border border-blue-200 hover:border-blue-400 transition"
          >
            {/* {docImg ? (
              <img
                src={URL.createObjectURL(docImg)}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <img src={assets.upload_area} alt="Upload" className="w-10" />
            )} */}

            <img src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt="Upload" className="w-full h-full object-cover" />
          </label>
          <input
            type="file"
            id="doc-img"
            name="image"
            hidden
            onChange={(e) => setDocImg(e.target.files[0])}
          />
          <p className="text-sm text-gray-600 text-center">
            Upload <br /> Doctor Picture
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 font-medium">Doctor Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter name"
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
              placeholder="Enter email"
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
            <label className="block mb-1 font-medium">Speciality</label>
            <select
              name="speciality"
              value={speciality}
              onChange={(e) => setSpeciality(e.target.value)}
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
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Degree</label>
            <input
              type="text"
              name="degree"
              placeholder="e.g. MBBS, MD"
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
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
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
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
              value={fees}
              onChange={(e) => setFees(e.target.value)}
              required
              className="w-full p-3 rounded-md bg-gray-100 text-gray-800 border border-gray-300"
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="block mb-1 font-medium">Address Line 1</label>
          <input
            type="text"
            name="address1"
            placeholder="Street address, P.O. box, etc."
            value={address1}
            onChange={(e) => setAddress1(e.target.value)}
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
            value={address2}
            onChange={(e) => setAddress2(e.target.value)}
            className="w-full p-3 rounded-md bg-gray-100 text-gray-800 border border-gray-300"
          />
        </div>

        <div className="mt-6">
          <label className="block mb-1 font-medium">About</label>
          <textarea
            name="about"
            placeholder="Brief bio or introduction"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            required
            className="w-full p-3 rounded-md bg-gray-100 text-gray-800 border border-gray-300 h-24"
          />
        </div>

        <button
          type="submit"
          className="mt-8 bg-gray-800 hover:bg-gray-600 w-full py-3 rounded-md font-semibold text-white transition duration-300"
        >
          Submit Doctor Details
        </button>
      </form>
    </div>
  );
};

export default AddDoctor;

// import React from 'react'
// import { assets } from '../../assets/assets'

// const AddDoctor = () => {
//   return (
//     <form>
//       <p>Add Doctor</p>
//       <div>
//         <div>
//           <label htmlFor='doc-img'>
//             <img src={assets.upload_area} alt='' />
//           </label>
//           <input type='file' id='doc-img' hidden />
//           <p>Upload Doctor <br /> picture</p>
//         </div>
//         <div>
//           <div>
//             <div>
//               <p>Doctor Name</p>
//               <input type='text' placeholder='Name' required />
//             </div>
//             <div>
//               <p>Doctor Email</p>
//               <input type='text' placeholder='Name' required />
//             </div>

//           </div>
//         </div>
//       </div>
//     </form>
//   )
// }

// export default AddDoctor