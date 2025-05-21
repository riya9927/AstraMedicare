import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { DoctorContext } from '../context/DoctorContext';

const Login = () => {
  const [state, setState] = useState('Admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const {setAToken, backendUrl} = useContext(AdminContext)
  const {setDToken} = useContext(DoctorContext)

  const onSubmitHandler = async(event) => {
    event.preventDefault();
    try {
        if(state === 'Admin'){
            const {data} = await axios.post(backendUrl + '/api/admin/login', {email, password})
             if (data.success) {
                localStorage.setItem('aToken', data.token);
                setAToken(data.token);
                // Navigate to admin dashboard on successful admin login
                navigate('/admin-dashboard');
                toast.success('Admin login successful');
             } else {
                toast.error(data.message);
             }
        } else {
          const {data} = await axios.post(backendUrl + '/api/doctor/login', {email, password})
             if (data.success) {
                // Note: Fixed to store dToken for doctor login
                localStorage.setItem('dToken', data.token);
                setDToken(data.token);
                // Navigate to doctor dashboard on successful doctor login
                navigate('/doctor-dashboard');
                toast.success('Doctor login successful');
             } else {
                toast.error(data.message);
             }
        }
    } catch (error) {
        toast.error('Login failed. Please check your credentials.');
        console.error('Login error:', error);
    }
  }

  return (
    <form onSubmit={onSubmitHandler}>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100 px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl animate-fade-in transition-all duration-500">
        <div className="flex justify-center mb-6">
          <img
            src={assets.logo}
            alt="Logo"
            className="w-28 h-auto object-contain shadow-md hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6 animate-slide-in">
          {state} Login
        </h2>

        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Email</label>
          <input
            onChange={(e)=>setEmail(e.target.value)} 
            value={email}
            type="email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label className="block text-gray-600 mb-1">Password</label>
          <input
            onChange={(e)=>setPassword(e.target.value)} 
            value={password}
            type="password"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          />
        </div>

        {/* Login Button */}
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white py-2 rounded-xl font-semibold hover:bg-blue-600 transition-all duration-300"
        >
          Login
        </button>

        {/* Toggle Login Role */}
        <p className="mt-4 text-center text-sm text-gray-600">
          {state === 'Admin' ? (
            <>
              Doctor Login?{' '}
              <span
                onClick={() => setState('Doctor')}
                className="text-blue-500 font-medium cursor-pointer hover:underline"
              >
                Click Here
              </span>
            </>
          ) : (
            <>
              Admin Login?{' '}
              <span
                onClick={() => setState('Admin')}
                className="text-blue-500 font-medium cursor-pointer hover:underline"
              >
                Click Here
              </span>
            </>
          )}
        </p>
      </div>
    </div>
    </form>
  );
};

export default Login;