// import React from 'react'
// import { useContext } from 'react'
// import { AdminContext } from '../context/AdminContext'
// import { assets } from '../assets/assets'
// import {useNavigate} from 'react-router-dom'

// const Navbar = () => {
//     const {aToken,setAToken} = useContext(AdminContext)
//     const navigate=useNavigate()

//     const logout=()=>{
//         navigate('/')
//         aToken && setAToken('')
//         aToken && localStorage.removeItem('aToken')
//     }
//   return (
//     <div>
//       <div>
//         <img src={assets.logo} alt='' />
//         <p>{aToken ? 'Admin' : 'Doctor'}</p>
//       </div>
//       <button onClick={logout}>Logout</button>
//     </div>
//   )
// }

// export default Navbar

import React, { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const navigate = useNavigate();

  const logout = () => {
    navigate('/');
    if (aToken) {
      setAToken('');
      localStorage.removeItem('aToken');
    }
  };

  return (
    <nav className="w-full bg-white shadow-md px-4 py-3 md:px-8 flex items-center justify-between animate-fade-in">
      {/* Left: Logo and Role */}
      <div className="flex items-center gap-3 sm:gap-5">
        <img
          src={assets.logo}
          alt="Logo"
          className="h-10 w-auto object-contain hover:scale-105 transition-transform duration-300"
        />
        <p className="text-sm sm:text-base md:text-lg font-medium text-gray-700">
          {aToken ? 'Admin' : 'Doctor'}
        </p>
      </div>

      {/* Right: Logout Button */}
      <button
        onClick={logout}
        className="bg-red-500 text-white text-sm sm:text-base px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg shadow hover:bg-red-600 transition-all duration-300"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
