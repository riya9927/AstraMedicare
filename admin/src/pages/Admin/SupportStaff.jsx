import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { Eye, Trash2, Search, Filter, Edit } from 'lucide-react';
import UpdateSupportStaff from './UpdateSupportStaff';
import { useNavigate } from 'react-router-dom';

const SupportStaff = () => {
  const {
    supportStaff,
    aToken,
    getAllsupportStaff,
    deleteSupportStaff,
  } = useContext(AdminContext);

  const [searchTerm, setSearchTerm] = useState('');
  const [viewStaff, setViewStaff] = useState(null);
  const [filterOptions, setFilterOptions] = useState({
    gender: '',
    role: '',
    shift: ''
  });
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editStaff, setEditStaff] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSupportStaff = async () => {
      if (aToken) {
        await getAllsupportStaff();
        
        setLoading(false);
      }
    };

    fetchSupportStaff();
  }, [aToken, getAllsupportStaff]);

  const handleView = (item) => setViewStaff(item);
  const handleCloseView = () => setViewStaff(null);
  const handleDelete = (id) => setDeleteId(id);

  const confirmDelete = async () => {
    if (deleteId) {
      await deleteSupportStaff(deleteId);
      setDeleteId(null);
    }
  };

  const handleFilterChange = (e) => {
    setFilterOptions({
      ...filterOptions,
      [e.target.name]: e.target.value
    });
  };

  const clearFilters = () => {
    setFilterOptions({ gender: '', role: '', shift: '' });
  };

  const getFilteredStaff = () => {
    if (!Array.isArray(supportStaff)) return [];

    return supportStaff.filter(item => {
      if (!item) return false;

      if (filterOptions.gender && item.gender?.toLowerCase() !== filterOptions.gender.toLowerCase()) {
        return false;
      }

      if (filterOptions.role && item.role?.toLowerCase() !== filterOptions.role.toLowerCase()) {
        return false;
      }

      if (filterOptions.shift && item.shiftTimings?.toLowerCase() !== filterOptions.shift.toLowerCase()) {
        return false;
      }

      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        const nameMatch = item.name?.toLowerCase().includes(term);
        const idMatch = item.staffID?.toLowerCase().includes(term);
        if (!nameMatch && !idMatch) return false;
      }

      return true;
    });
  };

  const filteredStaff = getFilteredStaff();

  // Get unique roles for filter dropdown
  const getRoles = () => {
    if (!Array.isArray(supportStaff)) return [];
    const roles = supportStaff
      .filter(staff => staff && staff.role)
      .map(staff => staff.role);
    return [...new Set(roles)];
  };

  const roles = getRoles();

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 text-gray-800">
      <h2 className="text-4xl font-bold text-blue-800 mb-10 text-center">Support Staff</h2>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="relative w-full md:w-1/2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by name or staff ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 p-3 rounded-md bg-gray-100 border border-gray-300"
          />
        </div>

        <div className="flex justify-end mb-4 relative">
          <button
            onClick={() => setShowFilterMenu(!showFilterMenu)}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium px-4 py-2 rounded-md shadow-sm flex items-center gap-2 mr-2"
          >
            <Filter size={18} />
            Filter {(filterOptions.gender || filterOptions.role || filterOptions.shift) && '(Active)'}
          </button>

          <button
            onClick={() => navigate('/staff-management/add-support')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-md shadow"
          >
            + Add Support Staff
          </button>

          {showFilterMenu && (
            <div className="absolute top-12 right-0 z-10 bg-white shadow-lg rounded-lg border border-gray-200 p-4 w-64">
              <h4 className="font-medium text-gray-700 mb-3">Filter Options</h4>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-600 mb-1">Gender</label>
                <select name="gender" value={filterOptions.gender} onChange={handleFilterChange} className="w-full p-2 border border-gray-300 rounded-md">
                  <option value="">All</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-600 mb-1">Role</label>
                <select name="role" value={filterOptions.role} onChange={handleFilterChange} className="w-full p-2 border border-gray-300 rounded-md">
                  <option value="">All Roles</option>
                  {roles.map(role => (
                    <option key={role} value={role.toLowerCase()}>{role}</option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-600 mb-1">Shift</label>
                <select name="shift" value={filterOptions.shift} onChange={handleFilterChange} className="w-full p-2 border border-gray-300 rounded-md">
                  <option value="">All Shifts</option>
                  <option value="day">Day</option>
                  <option value="night">Night</option>
                </select>
              </div>

              <div className="flex justify-between">
                <button onClick={clearFilters} className="text-sm text-blue-600 hover:text-blue-800">Clear Filters</button>
                <button onClick={() => setShowFilterMenu(false)} className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm">Apply</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {editStaff && (
        <UpdateSupportStaff
          supportStaff={editStaff}
          onClose={() => setEditStaff(null)}
          onUpdateSuccess={() => {
            getAllsupportStaff();
            setEditStaff(null);
          }}
        />
      )}

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredStaff.length === 0 ? (
            <p className="col-span-full text-center text-gray-500 py-10">
              {searchTerm || filterOptions.gender || filterOptions.role || filterOptions.shift
                ? "No support staff match your criteria."
                : "No support staff found. Add one using the button above."}
            </p>
          ) : (
            filteredStaff.map((item) => (
              <div key={item._id} className="bg-white border shadow rounded-xl overflow-hidden flex flex-col">
                <div className="p-4 flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-3">
                    <img src={item.photo} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                  <p className="text-sm text-gray-600">ID: {item.staffID}</p>
                  <p className="text-sm text-gray-600 capitalize">Gender: {item.gender}</p>
                  <p className="text-sm text-blue-600 font-medium">Role: {item.role}</p>
                  <p className="text-sm text-blue-600 font-medium">Shift: {item.shiftTimings}</p>
                </div>
                <div className="mt-auto p-3 border-t bg-gray-50 flex justify-center gap-2">
                  <button onClick={() => handleView(item)} className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded">View</button>
                  <button onClick={() => setEditStaff(item)} className="text-sm bg-blue-100 text-blue-700 hover:bg-blue-200 px-3 py-1 rounded">Edit</button>
                  <button onClick={() => handleDelete(item._id)} className="text-sm bg-red-100 text-red-600 hover:bg-red-200 px-3 py-1 rounded">Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full">
            <h3 className="text-xl font-semibold text-red-600 mb-4">Confirm Delete</h3>
            <p className="text-sm text-gray-600 mb-5">Are you sure you want to delete this support staff member? This action cannot be undone.</p>
            <div className="flex justify-end gap-2">
              <button onClick={() => setDeleteId(null)} className="px-4 py-2 border rounded text-gray-700">Cancel</button>
              <button onClick={confirmDelete} className="px-4 py-2 bg-red-600 text-white rounded">Delete</button>
            </div>
          </div>
        </div>
      )}

      {viewStaff && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 overflow-auto p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-3xl w-full p-6 relative">
            <button onClick={handleCloseView} className="absolute top-2 right-4 text-2xl text-gray-600">&times;</button>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <img src={viewStaff?.photo || '/placeholder-avatar.png'} alt={viewStaff?.name} className="rounded-lg w-full object-cover" />
              </div>
              <div className="md:w-2/3 space-y-2 text-sm">
                <h3 className="text-2xl font-bold text-blue-700">{viewStaff?.name}</h3>
                <p><strong>ID:</strong> {viewStaff?.staffID}</p>
                <p><strong>Email:</strong> {viewStaff?.emailID}</p>
                <p><strong>Phone:</strong> {viewStaff?.contactNumber}</p>
                <p><strong>Gender:</strong> {viewStaff?.gender}</p>
                <p><strong>DOB:</strong> {new Date(viewStaff?.dateOfBirth).toLocaleDateString()}</p>
                <p><strong>Date of Joining:</strong> {new Date(viewStaff?.dateOfJoining).toLocaleDateString()}</p>
                <p><strong>Address:</strong> {viewStaff?.addressLine1}<br />{viewStaff?.addressLine2}</p>
                <p><strong>Role:</strong> {viewStaff?.role}</p>
                <p><strong>Shift Timings:</strong> {viewStaff?.shiftTimings}</p>
                <p><strong>Supervisor:</strong> {viewStaff?.supervisorName}</p>
                <p><strong>Salary:</strong> ₹{viewStaff?.basicSalary}</p>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button onClick={handleCloseView} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportStaff;