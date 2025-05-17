import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';
import UpdateDoctor from './UpdateDoctor';
import { Eye, Pencil, Trash2, Search, Filter } from 'lucide-react';

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, deleteDoctor } = useContext(AdminContext);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [editDoctor, setEditDoctor] = useState(null);
  const [viewDoctor, setViewDoctor] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSpeciality, setFilterSpeciality] = useState('');

  useEffect(() => {
    if (aToken) getAllDoctors();
  }, [aToken, getAllDoctors]);

  const handleDeleteClick = (doctorId) => setDeleteConfirmation(doctorId);
  const confirmDelete = () => {
    if (deleteConfirmation) {
      deleteDoctor(deleteConfirmation);
      setDeleteConfirmation(null);
    }
  };
  const cancelDelete = () => setDeleteConfirmation(null);

  const handleEditClick = (doctor) => setEditDoctor(doctor);
  const handleEditClose = () => setEditDoctor(null);

  const handleViewClick = (doctor) => setViewDoctor(doctor);
  const handleViewClose = () => setViewDoctor(null);

  const handleUpdateSuccess = () => {
    getAllDoctors();
  };

  // Apply search and filter
  const filteredDoctors = doctors.filter((doctor) => {
    const matchesName = doctor.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpeciality = filterSpeciality
      ? doctor.speciality === filterSpeciality
      : true;
    return matchesName && matchesSpeciality;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 text-gray-800">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="relative w-full md:w-1/2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search doctor by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 p-3 rounded-md bg-gray-100 text-gray-800 border border-gray-300"
          />
        </div>

        <div className="relative w-full md:w-1/3">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <select
            value={filterSpeciality}
            onChange={(e) => setFilterSpeciality(e.target.value)}
            className="w-full pl-10 pr-4 p-3 rounded-md bg-gray-100 text-gray-800 border border-gray-300"
          >
            <option value="">Filter by Speciality</option>
            <option value="General physician">General physician</option>
            <option value="Gynecologist">Gynecologist</option>
            <option value="Dermatologist">Dermatologist</option>
            <option value="Pediatricians">Pediatricians</option>
            <option value="Neurologist">Neurologist</option>
            <option value="Gastroenterologist">Gastroenterologist</option>
          </select>
        </div>
      </div>


      <h1 className="text-4xl font-bold text-blue-800 mb-10 text-center">Doctor Directory</h1>

      {/* Delete Confirmation Modal */}
      {deleteConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-lg animate-fade-in">
            <h3 className="text-xl font-semibold mb-4 text-red-600">Confirm Deletion</h3>
            <p className="mb-6 text-gray-600">
              Are you sure you want to delete this doctor? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Doctor Modal */}
      {viewDoctor && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 overflow-auto">
          <div className="bg-white rounded-xl p-8 w-full max-w-3xl shadow-lg animate-fade-in my-8 max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-blue-700">Doctor Details</h3>
              <button onClick={handleViewClose} className="text-gray-400 hover:text-gray-600 text-2xl font-bold">
                &times;
              </button>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <div className="rounded-lg overflow-hidden border border-gray-200 shadow-md">
                  <img
                    src={viewDoctor.image}
                    alt={viewDoctor.name}
                    className="w-full h-auto object-cover"
                  />
                </div>

                <div className="mt-4 p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center mb-2">
                    <span className={`inline-block w-3 h-3 rounded-full mr-2 ${viewDoctor.available ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    <span className="text-gray-600">
                      {viewDoctor.available ? 'Available' : 'Not Available'}
                    </span>
                  </div>
                  <div className="text-lg font-semibold">{viewDoctor.name}, {viewDoctor.degree}</div>
                  <div className="text-blue-600">{viewDoctor.speciality}</div>
                </div>
              </div>

              <div className="md:w-2/3">
                <div>
                  <span className="text-gray-500 text-sm">Email</span>
                  <p className="text-gray-800">{viewDoctor.email}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <span className="text-gray-500 text-sm">Experience</span>
                    <p className="text-gray-800">{viewDoctor.experience} years</p>
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm">Fees</span>
                    <p className="text-gray-800">₹{viewDoctor.fees}</p>
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm">Joined</span>
                    <p className="text-gray-800">{new Date(viewDoctor.date).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <span className="text-gray-500 text-sm">Address</span>
                  <p className="text-gray-800">
                    {viewDoctor.address?.line1}<br />
                    {viewDoctor.address?.line2}
                  </p>
                </div>

                <div>
                  <span className="text-gray-500 text-sm">About</span>
                  <p className="text-gray-800">{viewDoctor.about}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Update Doctor Modal */}
      {editDoctor && (
        <UpdateDoctor
          doctor={editDoctor}
          onClose={handleEditClose}
          onUpdateSuccess={handleUpdateSuccess}
        />
      )}

      {/* Doctor Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredDoctors.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">No doctors found.</p>
        ) : (
          filteredDoctors.map((doctor, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
            >
              <div className="h-52 overflow-hidden bg-gray-100">
                <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-5">
                <h2 className="text-xl font-bold text-gray-800 mb-1">{doctor.name}</h2>
                <p className="text-blue-600 font-medium mb-2">{doctor.speciality}</p>
                <div className="flex items-center mb-4">
                  <span className={`inline-block w-3 h-3 rounded-full mr-2 ${doctor.available ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  <span className="text-sm text-gray-600">
                    {doctor.available ? 'Available' : 'Not Available'}
                  </span>
                </div>
                <div className="flex justify-end space-x-2 mt-3">
                  <button
                    onClick={() => handleViewClick(doctor)}
                    className="p-2 bg-gray-50 text-gray-600 hover:bg-gray-100 rounded-lg text-sm flex items-center gap-1"
                  >
                    <Eye size={16} /> View
                  </button>
                  <button
                    onClick={() => handleEditClick(doctor)}
                    className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-sm flex items-center gap-1"
                  >
                    <Pencil size={16} /> Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(doctor._id)}
                    className="p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-sm flex items-center gap-1"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>

              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DoctorsList;
