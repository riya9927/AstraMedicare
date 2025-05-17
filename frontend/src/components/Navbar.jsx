import React, { useState, useRef, useEffect, useContext } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken, userData } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
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

  const handleLogout = () => {
    // Clear token from context
    setToken(false);
    localStorage.removeItem('token');
  };

  // Get the profile image from userData if available, otherwise use default
  const profileImage = userData && userData.image ? userData.image : assets.profile_pic;

  return (
    <div className="sticky top-0 z-50 bg-white shadow-md">
      <div className="flex items-center justify-between text-sm py-4 border-b border-gray-300 px-4 md:px-10 lg:px-20">
        <img
          onClick={() => navigate('/')}
          className="w-36 cursor-pointer transition-transform duration-300 hover:scale-105"
          src={assets.logo}
          alt="Logo"
        />

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
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <img
                className="w-10 h-10 rounded-full object-cover transition-transform duration-300 hover:scale-110"
                src={profileImage}
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
                        navigate('my-appointments');
                        setShowDropdown(false);
                      }}
                      className="hover:text-black cursor-pointer transition-colors duration-300"
                    >
                      My Appointments
                    </p>
                    <p
                      onClick={handleLogout}
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
                    `block py-2 px-4 rounded transition-all duration-300 hover:bg-gray-200 ${isActive ? 'bg-gray-200 text-gray-900' : ''
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              {!token && (
                <button
                  onClick={() => {
                    navigate('/login');
                    setShowMenu(false);
                  }}
                  className="bg-gray-700 text-white px-6 py-2 rounded-full font-light transition-all duration-300 hover:bg-gray-800 hover:shadow-md mt-4"
                >
                  Create account
                </button>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
