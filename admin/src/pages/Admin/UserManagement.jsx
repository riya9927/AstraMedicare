import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserManagement = () => {
  const navigate = useNavigate();
  
  const staffCategories = [
    {
      title: 'Administrative Staff',
      description: 'Hospital management and administration personnel',
      icon: '📋',
      path: '/staff-management/administrative',
      color: 'bg-blue-100 hover:bg-blue-200',
      borderColor: 'border-blue-300'
    },
    {
      title: 'Nurses',
      description: 'Nursing staff including RNs, LPNs, and nurse practitioners',
      icon: '🩺',
      path: '/staff-management/nurse',
      color: 'bg-green-100 hover:bg-green-200',
      borderColor: 'border-green-300'
    },
    {
      title: 'Lab Technicians',
      description: 'Medical laboratory and diagnostic staff',
      icon: '🧪',
      path: '/staff-management/lab',
      color: 'bg-purple-100 hover:bg-purple-200',
      borderColor: 'border-purple-300'
    },
    {
      title: 'Support Staff',
      description: 'Maintenance, cleaning, and facility support personnel',
      icon: '🔧',
      path: '/staff-management/support',
      color: 'bg-yellow-100 hover:bg-yellow-200', 
      borderColor: 'border-yellow-300'
    },
    {
      title: 'Pharmacists',
      description: 'Pharmacy staff and medication specialists',
      icon: '💊',
      path: '/staff-management/pharmacy',
      color: 'bg-red-100 hover:bg-red-200',
      borderColor: 'border-red-300'
    },
    {
      title: 'IT & Technical Staff',
      description: 'Technology, systems, and technical support personnel',
      icon: '💻',
      path: '/staff-management/it',
      color: 'bg-indigo-100 hover:bg-indigo-200',
      borderColor: 'border-indigo-300'
    }
  ];

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">User Management</h1>
        <p className="text-gray-600">Select a staff category to manage users</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {staffCategories.map((category, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(category.path)}
            className={`cursor-pointer rounded-lg border-2 ${category.borderColor} ${category.color} p-6 shadow-md transition-transform duration-300 transform hover:scale-105`}
          >
            <div className="flex items-center mb-4">
              <span className="text-4xl mr-4">{category.icon}</span>
              <h2 className="text-xl font-semibold text-gray-800">{category.title}</h2>
            </div>
            <p className="text-gray-600 mb-4">{category.description}</p>
            <div className="flex justify-end">
              <span className="text-sm font-medium text-gray-700 flex items-center">
                View Details
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserManagement;