import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';
import UpdateNurse from './UpdateNurse';
import { Eye, Trash2, Search, Filter, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Nurse = () => {
    const {
        nurses,
        aToken,
        getAllNurses,
        deleteNurse,
    } = useContext(AdminContext);

    const [searchTerm, setSearchTerm] = useState('');
    const [viewNurse, setViewNurse] = useState(null);
    const [filterOptions, setFilterOptions] = useState({
        gender: '',
        department: '',
        shiftDetails: ''
    });
    const [showFilterMenu, setShowFilterMenu] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [editNurse, setEditNurse] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNurses = async () => {
            if (aToken) {
                await getAllNurses();
                setLoading(false); // Set loading to false after data is fetched
            }
        };

        fetchNurses();
    }, [aToken, getAllNurses]);

    const handleView = (nurse) => setViewNurse(nurse);
    const handleCloseView = () => setViewNurse(null);

    const handleDelete = (id) => setDeleteId(id);
    const confirmDelete = async () => {
        if (deleteId) {
            try {
                await deleteNurse(deleteId);
                setDeleteId(null);
            } catch (error) {
                console.error("Error deleting nurse:", error);
            }
        }
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
            department: '',
            shiftDetails: ''
        });
    };

    // Apply filters to nurse data
    const getFilteredNurses = () => {
        if (!Array.isArray(nurses)) {
            return [];
        }

        return nurses.filter(nurse => {
            // Check if nurse record exists and has the required properties
            if (!nurse) return false;

            // Gender filter (case-insensitive)
            if (filterOptions.gender &&
                nurse.gender &&
                nurse.gender.toLowerCase() !== filterOptions.gender.toLowerCase()) {
                return false;
            }

            // Department filter (case-insensitive)
            if (filterOptions.department &&
                nurse.department &&
                nurse.department !== filterOptions.department) {
                return false;
            }

            // Shift details filter (case-insensitive)
            if (filterOptions.shiftDetails &&
                nurse.shiftDetails &&
                nurse.shiftDetails !== filterOptions.shiftDetails) {
                return false;
            }

            // Search term filter (case-insensitive)
            if (searchTerm) {
                const term = searchTerm.toLowerCase();
                const nameMatch = nurse.fullName && nurse.fullName.toLowerCase().includes(term);
                const idMatch = nurse.staffID && nurse.staffID.toLowerCase().includes(term);

                if (!nameMatch && !idMatch) {
                    return false;
                }
            }

            return true;
        });
    };

    const filteredNurses = getFilteredNurses();

    return (
        <div className="max-w-7xl mx-auto px-4 py-10 text-gray-800">
            <h2 className="text-4xl font-bold text-blue-800 mb-10 text-center">Nursing Staff</h2>
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <div className="relative w-full md:w-1/2">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search by name or Nurse ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 p-3 rounded-md bg-gray-100 text-gray-800 border border-gray-300"
                    />
                </div>
                {/* Filter Menu Button */}
                <div className="flex justify-end mb-4 relative">
                    <button
                        onClick={() => setShowFilterMenu(!showFilterMenu)}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium px-4 py-2 rounded-md shadow-sm transition duration-200 flex items-center gap-2 mr-2"
                    >
                        <Filter size={18} />
                        Filter {(filterOptions.gender || filterOptions.department || filterOptions.shiftDetails) && '(Active)'}
                    </button>

                    {/* Add Nurse Button */}
                    <button
                        onClick={() => navigate('/staff-management/add-nurse')}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-md shadow transition duration-200"
                    >
                        + Add Nurse
                    </button>

                    {/* Filter Menu Dropdown */}
                    {showFilterMenu && (
                        <div className="absolute top-12 right-0 z-10 bg-white shadow-lg rounded-lg border border-gray-200 p-4 w-64">
                            <h4 className="font-medium text-gray-700 mb-3">Filter Options</h4>

                            <div className="mb-3">
                                <label className="block text-sm font-medium text-gray-600 mb-1">Gender</label>
                                <select
                                    name="gender"
                                    value={filterOptions.gender}
                                    onChange={handleFilterChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                >
                                    <option value="">All</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>

                            <div className="mb-3">
                                <label className="block text-sm font-medium text-gray-600 mb-1">Department</label>
                                <select
                                    name="department"
                                    value={filterOptions.department}
                                    onChange={handleFilterChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                >
                                    <option value="">All Departments</option>
                                    <option value="ICU">ICU</option>
                                    <option value="General Ward">General Ward</option>
                                    <option value="Emergency Ward">Emergency Ward</option>
                                    <option value="Surgical Ward">Surgical Ward</option>
                                    <option value="Maternity Ward">Maternity Ward</option>
                                    <option value="Operation Theater (OT)">Operation Theater (OT)</option>
                                    <option value="Outpatient Department (OPD)">Outpatient Department (OPD)</option>
                                </select>
                            </div>

                            <div className="mb-3">
                                <label className="block text-sm font-medium text-gray-600 mb-1">Shift</label>
                                <select
                                    name="shiftDetails"
                                    value={filterOptions.shiftDetails}
                                    onChange={handleFilterChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                >
                                    <option value="">All Shifts</option>
                                    <option value="Day">Day</option>
                                    <option value="Night">Night</option>
                                </select>
                            </div>

                            <div className="flex justify-between">
                                <button
                                    onClick={clearFilters}
                                    className="text-sm text-blue-600 hover:text-blue-800"
                                >
                                    Clear Filters
                                </button>
                                <button
                                    onClick={() => setShowFilterMenu(false)}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm"
                                >
                                    Apply
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {editNurse && (
                <UpdateNurse
                    nurse={editNurse}
                    onClose={() => setEditNurse(null)}
                    onUpdateSuccess={() => {
                        getAllNurses();
                        setEditNurse(null);
                    }}
                />
            )}

            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
                    {filteredNurses.length === 0 ? (
                        <p className="col-span-full text-center text-gray-500 py-10">
                            {searchTerm || filterOptions.gender || filterOptions.department || filterOptions.shiftDetails ?
                                "No nurses found matching your search/filter criteria." :
                                "No nursing staff found. Add nurses using the button above."}
                        </p>
                    ) : (
                        filteredNurses.map((nurse, index) => (
                            <div key={nurse?._id || index}
                                className="bg-white border border-gray-200 shadow-md rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg flex flex-col h-full">
                                <div className="p-4 flex flex-col items-center">
                                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden mb-3">
                                        <img
                                            src={nurse.photo}
                                            alt={nurse.fullName}
                                            className="w-full h-full object-cover"
                                            onError={(e) => { e.target.src = '/placeholder-avatar.png' }}
                                        />
                                    </div>
                                    <h3 className="text-base sm:text-lg font-bold text-gray-800 line-clamp-1">{nurse?.fullName || 'Unknown'}</h3>
                                    <p className="text-xs sm:text-sm text-gray-600">ID: {nurse?.staffID || 'N/A'}</p>
                                    <p className="text-xs sm:text-sm text-gray-600 capitalize">Gender: {nurse?.gender || 'N/A'}</p>
                                    <p className="text-xs sm:text-sm text-blue-600 font-medium">{nurse?.department || 'Department'}</p>
                                    <p className="text-xs sm:text-sm text-gray-600">Shift: {nurse?.shiftDetails || 'N/A'}</p>
                                </div>

                                <div className="mt-auto p-3 pt-4 border-t border-gray-100 bg-gray-50">
                                    <div className="flex flex-wrap justify-center gap-2">
                                        <button
                                            onClick={() => handleView(nurse)}
                                            className="px-3 py-1.5 text-xs sm:text-sm bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center gap-1 transition-colors"
                                        >
                                            <Eye size={16} className="hidden xs:inline" />
                                            <span>View</span>
                                        </button>
                                        <button
                                            onClick={() => setEditNurse(nurse)}
                                            className="px-3 py-1.5 text-xs sm:text-sm bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg flex items-center gap-1 transition-colors"
                                        >
                                            <Edit size={16} className="hidden xs:inline" />
                                            <span>Edit</span>
                                        </button>
                                        <button
                                            onClick={() => handleDelete(nurse?._id)}
                                            className="px-3 py-1.5 text-xs sm:text-sm bg-red-100 hover:bg-red-200 text-red-600 rounded-lg flex items-center gap-1 transition-colors"
                                        >
                                            <Trash2 size={16} className="hidden xs:inline" />
                                            <span>Delete</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            {/* Delete Confirmation */}
            {deleteId && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
                    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg max-w-sm w-full">
                        <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-red-600">Confirm Delete</h3>
                        <p className="mb-5 sm:mb-6 text-sm sm:text-base text-gray-600">Are you sure you want to delete this nurse? This action cannot be undone.</p>
                        <div className="flex justify-end gap-2">
                            <button onClick={() => setDeleteId(null)} className="px-3 sm:px-4 py-1.5 sm:py-2 border rounded-md text-sm sm:text-base text-gray-700">Cancel</button>
                            <button onClick={confirmDelete} className="px-3 sm:px-4 py-1.5 sm:py-2 bg-red-600 text-white rounded-md text-sm sm:text-base">Delete</button>
                        </div>
                    </div>
                </div>
            )}

            {/* View Modal */}
            {viewNurse && (
                <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 overflow-auto px-4 py-6">
                    <div className="bg-white rounded-xl shadow-lg max-w-3xl w-full p-4 sm:p-8 relative">
                        <button onClick={handleCloseView} className="absolute top-2 right-3 sm:top-3 sm:right-4 text-2xl text-gray-500 hover:text-gray-700">&times;</button>
                        <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
                            <div className="md:w-1/3">
                                <img
                                    src={viewNurse?.photo || '/placeholder-avatar.png'}
                                    alt={viewNurse?.fullName}
                                    className="rounded-lg w-full object-cover"
                                    onError={(e) => { e.target.src = '/placeholder-avatar.png' }}
                                />
                            </div>
                            <div className="md:w-2/3 space-y-2 sm:space-y-3 text-sm sm:text-base">
                                <h3 className="text-xl sm:text-2xl font-bold text-blue-700 mb-2">{viewNurse?.fullName}</h3>
                                <p><strong>Staff ID:</strong> {viewNurse?.staffID}</p>
                                <p><strong>Gender:</strong> {viewNurse?.gender}</p>
                                <p><strong>DOB: </strong>{viewNurse?.dateOfBirth ? new Date(viewNurse?.dateOfBirth).toLocaleDateString() : 'Not available'}</p>
                                <p><strong>Department:</strong> {viewNurse?.department}</p>
                                <p><strong>Shift:</strong> {viewNurse?.shiftDetails}</p>
                                <p><strong>Email:</strong> {viewNurse?.email || 'Not provided'}</p>
                                <p><strong>Phone:</strong> {viewNurse?.contactNumber || 'Not provided'}</p>
                                <p><strong>Address:</strong><br />
                                    {viewNurse.addressLine1 ? (
                                        <>
                                            {viewNurse.addressLine1}<br />
                                            {viewNurse.addressLine2 && (
                                                <>
                                                    {viewNurse.addressLine2}<br />
                                                </>
                                            )}
                                        </>
                                    ) : (
                                        'No address provided'
                                    )}
                                </p>
                                <p><strong>Joined On: </strong> {viewNurse?.dateOfJoining ? new Date(viewNurse.dateOfJoining).toLocaleDateString() : 'Not available'}</p>
                                <p><strong>Salary: </strong>${viewNurse?.salaryDetails}</p>
                                <p><strong>Assigned Doctors: </strong>
                                    {viewNurse?.assignedDoctors && viewNurse.assignedDoctors.length > 0 ?
                                        viewNurse.assignedDoctors.map(doctor => doctor.name || 'Unnamed Doctor').join(', ') :
                                        'None assigned'}
                                </p>
                            </div>
                        </div>
                        <div className="mt-4 sm:mt-6 flex justify-end">
                            <button
                                onClick={handleCloseView}
                                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md text-sm sm:text-base"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>

    );
};

export default Nurse;