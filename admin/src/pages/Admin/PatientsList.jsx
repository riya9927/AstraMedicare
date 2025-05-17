import React, { useState, useEffect, useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';
import UpdatePatient from './UpdatePatient';
import { Search, Filter, SortAsc, SortDesc, Trash2, X, Phone, Mail,  Calendar } from 'lucide-react';

const PatientsList = () => {
  const { patients, getAllPatients, aToken, deletePatient } = useContext(AdminContext);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewPatient, setViewPatient] = useState(null);
  const [editPatient, setEditPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });
  const [filterOptions, setFilterOptions] = useState({
    gender: '',
    bloodGroup: ''
  });
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    const fetchPatients = async () => {
      if (aToken) {
        await getAllPatients();
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchPatients();
  }, [aToken, getAllPatients]);

  const handleViewClick = (patient) => {
    setViewPatient(patient);
  };

  const handleCloseViewModal = () => {
    setViewPatient(null);
  };

  const handleDeleteClick = (patientId) => setDeleteConfirmation(patientId);

  const confirmDelete = () => {
    if (deleteConfirmation) {
      deletePatient(deleteConfirmation);
      setDeleteConfirmation(null);
    }
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleFilterChange = (e) => {
    setFilterOptions({
      ...filterOptions,
      [e.target.name]: e.target.value
    });
  };

  const clearFilters = () => {
    setFilterOptions({
      gender: '',
      bloodGroup: ''
    });
    setShowFilterMenu(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not Available';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const calculateAge = (dob) => {
    if (!dob) return 'N/A';
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  // Apply sorting, filtering, and searching
  const filteredAndSortedPatients = () => {
    if (!patients || patients.length === 0) {
      return [];
    }

    let filtered = [...patients];

    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(patient =>
        patient.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.patientId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.phone?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply filters
    if (filterOptions.gender) {
      filtered = filtered.filter(patient => patient.gender === filterOptions.gender);
    }
    if (filterOptions.bloodGroup) {
      filtered = filtered.filter(patient => patient.bloodGroup === filterOptions.bloodGroup);
    }

    // Apply sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        const valueA = a[sortConfig.key] || '';
        const valueB = b[sortConfig.key] || '';

        if (valueA < valueB) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (valueA > valueB) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Patients List</h2>

      {/* Search and filter bar */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="relative w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search by name, email, patient ID..."
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          <button
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors"
            onClick={() => setShowFilterMenu(!showFilterMenu)}
          >
            <Filter size={18} />
            Filters
          </button>

          <button
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors"
            onClick={() => handleSort('name')}
          >
            {sortConfig.direction === 'ascending' ? <SortAsc size={18} /> : <SortDesc size={18} />}
            Sort
          </button>
        </div>
      </div>

      {/* Filter menu */}
      {showFilterMenu && (
        <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <select
                name="gender"
                value={filterOptions.gender}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
              <select
                name="bloodGroup"
                value={filterOptions.bloodGroup}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={clearFilters}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation modal */}
      {deleteConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Confirm Deletion</h3>
            <p className="mb-6">Are you sure you want to delete this patient? This action cannot be undone.</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setDeleteConfirmation(null)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                disabled={deleteLoading}
              >
                {deleteLoading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Patient View Modal */}
      {viewPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-y-auto">
            <div className="sticky top-0 bg-white p-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-800">Patient Details</h3>
              <button
                onClick={handleCloseViewModal}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              {/* Patient Header */}
              <div className="flex flex-col md:flex-row items-start md:items-center mb-8 gap-6">
                <div className="h-24 w-24 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                  <img
                    src={viewPatient.image || '/placeholder-avatar.png'}
                    alt={viewPatient.name}
                    className="h-full w-full object-cover"
                    onError={(e) => { e.target.src = '/placeholder-avatar.png' }}
                  />
                </div>
                <div>
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                    <h2 className="text-2xl font-bold text-gray-800">{viewPatient.name}</h2>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {viewPatient.patientId || 'No ID'}
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-3">
                    {viewPatient.email && (
                      <div className="flex items-center text-gray-600">
                        <Mail size={16} className="mr-1" />
                        {viewPatient.email}
                      </div>
                    )}
                    {viewPatient.phone && (
                      <div className="flex items-center text-gray-600">
                        <Phone size={16} className="mr-1" />
                        {viewPatient.phone}
                      </div>
                    )}
                    <div className="flex items-center text-gray-600">
                      <Calendar size={16} className="mr-1" />
                      Registered on {formatDate(viewPatient.createdAt)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Patient Info Sections */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Information */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <span className="font-medium text-gray-700 w-24">Age:</span>
                      <span className="text-gray-600">{calculateAge(viewPatient.dob)} years</span>
                    </div>
                    <div className="flex items-start">
                      <span className="font-medium text-gray-700 w-24">Date of Birth:</span>
                      <span className="text-gray-600">{formatDate(viewPatient.dob)}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="font-medium text-gray-700 w-24">Gender:</span>
                      <span className="text-gray-600">{viewPatient.gender || 'Not specified'}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="font-medium text-gray-700 w-24">Blood Group:</span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        {viewPatient.bloodGroup || 'Not specified'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <span className="font-medium text-gray-700 w-24">Address:</span>
                      <div className="text-gray-600">
                        {viewPatient.address?.line1 && (
                          <>
                            <div>{viewPatient.address.line1}</div>
                            {viewPatient.address.line2 && <div>{viewPatient.address.line2}</div>}
                            {viewPatient.address.line3 && <div>{viewPatient.address.line3}</div>}
                          </>
                        ) || 'No address provided'}
                      </div>
                    </div>
                    <div className="flex items-start">
                      <span className="font-medium text-gray-700 w-24">Email:</span>
                      <span className="text-gray-600">{viewPatient.email || 'Not provided'}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="font-medium text-gray-700 w-24">Phone:</span>
                      <span className="text-gray-600">{viewPatient.phone || 'Not provided'}</span>
                    </div>
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Emergency Contact</h3>
                  {viewPatient.emergencyContact?.name ? (
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <span className="font-medium text-gray-700 w-24">Name:</span>
                        <span className="text-gray-600">{viewPatient.emergencyContact.name}</span>
                      </div>
                      <div className="flex items-start">
                        <span className="font-medium text-gray-700 w-24">Relation:</span>
                        <span className="text-gray-600">{viewPatient.emergencyContact.relation || 'Not specified'}</span>
                      </div>
                      <div className="flex items-start">
                        <span className="font-medium text-gray-700 w-24">Phone:</span>
                        <span className="text-gray-600">{viewPatient.emergencyContact.phone || 'Not provided'}</span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">No emergency contact provided</p>
                  )}
                </div>

                {/* Medical Records */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Medical Information</h3>
                  {viewPatient.medicalRecords ? (
                    <div className="space-y-2">
                      {Object.entries(viewPatient.medicalRecords).map(([key, value]) => (
                        <div key={key} className="flex items-start">
                          <span className="font-medium text-gray-700 w-32 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                          <span className="text-gray-600">{typeof value === 'object' ? JSON.stringify(value) : value.toString()}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">No medical records available</p>
                  )}
                </div>
              </div>

              {/* Appointments Section */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Appointment History</h3>
                {viewPatient.appointments && viewPatient.appointments.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {viewPatient.appointments.map((appointment, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatDate(appointment.date)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appointment.time}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{appointment.doctor}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appointment.department}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                ${appointment.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                  appointment.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                                    'bg-yellow-100 text-yellow-800'}`}>
                                {appointment.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-gray-500 italic">No appointment history</p>
                )}
              </div>
            </div>

            <div className="sticky bottom-0 bg-gray-50 p-4 border-t border-gray-200 flex justify-end">
              <button
                onClick={handleCloseViewModal}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {editPatient && (
        <UpdatePatient
          patient={editPatient}
          onClose={() => setEditPatient(null)}
          onUpdateSuccess={() => {
            getAllPatients();
            setEditPatient(null);
          }}
        />
      )}

      {/* Loading state */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : filteredAndSortedPatients().length === 0 ? (
        <div className="bg-gray-50 p-8 rounded-lg text-center">
          <p className="text-gray-600 text-lg">No patients found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('patientId')}
                >
                  ID
                  {sortConfig.key === 'patientId' && (
                    <span className="ml-1">
                      {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                    </span>
                  )}
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('name')}
                >
                  Name
                  {sortConfig.key === 'name' && (
                    <span className="ml-1">
                      {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                    </span>
                  )}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Demographics
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Medical
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAndSortedPatients().map((patient) => (
                <tr key={patient._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{patient.patientId || 'N/A'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-100">
                        <img
                          src={patient.image || '/placeholder-avatar.png'}
                          alt={patient.name}
                          className="h-full w-full object-cover"
                          onError={(e) => { e.target.src = '/placeholder-avatar.png' }}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                        <div className="text-sm text-gray-500">{formatDate(patient.createdAt)}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{patient.email || 'No email'}</div>
                    <div className="text-sm text-gray-500">{patient.phone || 'No phone'}</div>
                    <div className="text-xs text-gray-500 truncate max-w-xs">
                      {patient.address?.line1 ?
                        `${patient.address.line1}${patient.address.line2 ? ', ' + patient.address.line2 : ''}`
                        : 'No address'
                      }
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      <span className="font-medium">Age:</span> {calculateAge(patient.dob)}
                    </div>
                    <div className="text-sm text-gray-500">
                      <span className="font-medium">Gender:</span> {patient.gender || 'Not specified'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${patient.bloodGroup ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                        Blood: {patient.bloodGroup || 'N/A'}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      <span className="font-medium">Appointments:</span> {patient.appointments?.length || 0}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        className="text-blue-600 hover:text-blue-900"
                        onClick={() => handleViewClick(patient)}
                      >
                        View
                      </button>
                      <button
                        className="text-green-600 hover:text-green-900"
                        onClick={() => setEditPatient(patient)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900 flex items-center"
                        onClick={() => handleDeleteClick(patient._id)}
                        disabled={deleteLoading}
                      >
                        <Trash2 size={16} className="mr-1" />Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PatientsList;