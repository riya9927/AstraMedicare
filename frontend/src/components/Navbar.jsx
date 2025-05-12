// import React, { useState } from 'react'
// import { assets } from '../assets/assets'
// import { NavLink, useNavigate } from 'react-router-dom'

// const Navbar = () => {
//   const navigate = useNavigate();
//   const [showMenu, setShowMenu] = useState(false);
//   const [token, setToken] = useState(true);
//   return (
//     <div className='flex items-center justify-between text-sm py-4 mb-5 border-b-gray-400'>
//       <img className='w-44 cursor-pointer' src={assets.logo} alt='' />
//       <ul className='hidden md:flex items-start gap-5 font-medium'>
//         <NavLink to='/'>
//           <li className='py-1'>Home</li>
//           <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
//         </NavLink>
//         <NavLink to='/doctors'>
//           <li>All Doctors</li>
//           <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
//         </NavLink>
//         <NavLink to='/about'>
//           <li>About</li>
//           <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
//         </NavLink>
//         <NavLink to='/contact'>
//           <li>Contact</li>
//           <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
//         </NavLink>
//       </ul>
//       <div>
//         {
//           token ? <div className='flex items-center gap-2 cursor-pointer group relative'>
//             <img className='w-8 rounded-full' src={assets.profile_pic} alt='' />
//             <img className='w-2.5' src={assets.dropdown_icon} alt='' />
//             <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
//               <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
//                 <p onClick={()=>navigate('my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
//                 <p onClick={()=>navigate('my-appoitnments')} className='hover:text-black cursor-pointer'>My Appointments</p>
//                 <p onClick={()=>setToken(false)} className='hover:text-black cursor-pointer'>Logout</p>
//               </div>
//             </div>
//           </div>
//             : <button onClick={() => navigate('/login')} className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'>Create account</button>
//         }
//       </div>
//     </div>
//   )
// }

// export default Navbar


// import React, { useState } from 'react';
// import { assets } from '../assets/assets';
// import { NavLink } from 'react-router-dom';

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   return (
//     <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-gray-300 px-4 md:px-10 lg:px-20">
//       {/* Logo */}
//       <img className="w-36 cursor-pointer transition-transform duration-300 hover:scale-105" src={assets.logo} alt="Logo" />

//       {/* Navigation Links */}
//       <ul className="hidden md:flex items-center gap-8 font-medium text-gray-700">
//         {[
//           { to: '/', label: 'Home' },
//           { to: '/doctors', label: 'All Doctors' },
//           { to: '/about', label: 'About' },
//           { to: '/contact', label: 'Contact' },
//         ].map((link) => (
//           <NavLink
//             key={link.to}
//             to={link.to}
//             className={({ isActive }) =>
//               `relative py-1 transition-all duration-300 hover:text-gray-900 ${isActive ? 'text-gray-900' : ''}`
//             }
//           >
//             <li className="group">
//               {link.label}
//               <hr className="absolute left-0 bottom-0 h-0.5 w-0 bg-gray-500 transition-all duration-300 group-hover:w-full" />
//             </li>
//           </NavLink>
//         ))}
//       </ul>

//       {/* Create Account Button */}
//       <div>
//         <button className="hidden md:block bg-gray-700 text-white px-6 py-2 rounded-full font-light transition-all duration-300 hover:bg-gray-800 hover:shadow-md">
//           Create account
//         </button>
//       </div>

//       {/* Mobile Menu Toggle */}
//       <div className="md:hidden flex items-center">
//         <button
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//           className="text-gray-700 focus:outline-none transition-transform duration-300 hover:scale-110"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth="2"
//             stroke="currentColor"
//             className="w-6 h-6"
//           >
//             {isMenuOpen ? (
//               <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//             ) : (
//               <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
//             )}
//           </svg>
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {isMenuOpen && (
//         <div className="absolute top-16 left-0 w-full bg-gray-100 shadow-lg z-50">
//           <ul className="flex flex-col items-center gap-4 py-4 text-gray-700">
//             {[
//               { to: '/', label: 'Home' },
//               { to: '/doctors', label: 'All Doctors' },
//               { to: '/about', label: 'About' },
//               { to: '/contact', label: 'Contact' },
//             ].map((link) => (
//               <NavLink
//                 key={link.to}
//                 to={link.to}
//                 onClick={() => setIsMenuOpen(false)}
//                 className={({ isActive }) =>
//                   `block py-2 px-4 rounded transition-all duration-300 hover:bg-gray-200 ${
//                     isActive ? 'bg-gray-200 text-gray-900' : ''
//                   }`
//                 }
//               >
//                 {link.label}
//               </NavLink>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Navbar;

import React, { useState, useRef, useEffect } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [token, setToken] = useState(true);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="sticky top-0 z-50 bg-white shadow-md">
      <div className="flex items-center justify-between text-sm py-4 border-b border-gray-300 px-4 md:px-10 lg:px-20">
        <img onClick={()=>navigate('/')} className="w-36 cursor-pointer transition-transform duration-300 hover:scale-105" src={assets.logo} alt="Logo" />

        <ul className="hidden md:flex items-center gap-8 font-medium text-gray-700">
          {[
            { to: '/', label: 'Home' },
            { to: '/doctors', label: 'All Doctors' },
            { to: '/about', label: 'About' },
            { to: '/contact', label: 'Contact' },
          ].map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `relative py-1 transition-all duration-300 hover:text-gray-900 ${isActive ? 'text-gray-900' : ''}`
              }
            >
              <li className="group">
                {link.label}
                <hr className="absolute left-0 bottom-0 h-0.5 w-0 bg-gray-500 transition-all duration-300 group-hover:w-full" />
              </li>
            </NavLink>
          ))}
        </ul>

        <div>
          {token ? (
            <div
              ref={dropdownRef}
              className="flex items-center gap-2 cursor-pointer relative"
              onMouseEnter={() => setShowDropdown(true)}
            >
              <img
                className="w-8 h-8 rounded-full transition-transform duration-300 hover:scale-110"
                src={assets.profile_pic}
                alt="Profile"
              />
              <img
                className={`w-2.5 transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`}
                src={assets.dropdown_icon}
                alt="Dropdown"
              />
              {showDropdown && (
                <div className="absolute top-12 right-0 pt-2 text-base font-medium text-gray-600 z-20">
                  <div className="min-w-48 bg-gray-100 rounded-lg shadow-lg flex flex-col gap-2 p-4">
                    <p
                      onClick={() => {
                        navigate('my-profile');
                        setShowDropdown(false);
                      }}
                      className="hover:text-black cursor-pointer transition-colors duration-300"
                    >
                      My Profile
                    </p>
                    <p
                      onClick={() => {
                        navigate('my-appoitnments');
                        setShowDropdown(false);
                      }}
                      className="hover:text-black cursor-pointer transition-colors duration-300"
                    >
                      My Appointments
                    </p>
                    <p
                      onClick={() => {
                        setToken(false);
                        setShowDropdown(false);
                      }}
                      className="hover:text-black cursor-pointer transition-colors duration-300"
                    >
                      Logout
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="bg-gray-700 text-white px-6 py-2 rounded-full font-light transition-all duration-300 hover:bg-gray-800 hover:shadow-md hidden md:block"
            >
              Create account
            </button>
          )}
        </div>

        <div className="md:hidden flex items-center">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="text-gray-700 focus:outline-none transition-transform duration-300 hover:scale-110"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              {showMenu ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>

        {showMenu && (
          <div className="absolute top-16 left-0 w-full bg-gray-100 shadow-lg z-50 md:hidden">
            <ul className="flex flex-col items-center gap-4 py-4 text-gray-700">
              {[
                { to: '/', label: 'Home' },
                { to: '/doctors', label: 'All Doctors' },
                { to: '/about', label: 'About' },
                { to: '/contact', label: 'Contact' },
              ].map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setShowMenu(false)}
                  className={({ isActive }) =>
                    `block py-2 px-4 rounded transition-all duration-300 hover:bg-gray-200 ${
                      isActive ? 'bg-gray-200 text-gray-900' : ''
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;