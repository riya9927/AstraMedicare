import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';
import UpdateLabTechnician from './UpdateLabTechnician';
import { Eye, Trash2, Search, Filter, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LabTechnician = () => {
    const {
        labTechnicians,
        aToken,
        getLabTechnicians,
        deleteLabTechnician,
    } = useContext(AdminContext);

    const [searchTerm, setSearchTerm] = useState('');
    const [viewTechnician, setViewTechnician] = useState(null);
    const [filterOptions, setFilterOptions] = useState({
        gender: '',
        shift: ''
    });
    const [showFilterMenu, setShowFilterMenu] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [editLabTechnician, setEditLabTechnician] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLabTechnicians = async () => {
            if (aToken) {
                await getLabTechnicians();
                setLoading(false); // Set loading to false after data is fetched
            }
        };

        fetchLabTechnicians();
    }, [aToken, getLabTechnicians]);

    // Debug log to check filtered results
    // useEffect(() => {
    //     console.log("Current filter options:", filterOptions);
    // }, [filterOptions]);

    const handleView = (technician) => setViewTechnician(technician);
    const handleCloseView = () => setViewTechnician(null);

    const handleDelete = (id) => setDeleteId(id);
    const confirmDelete = async () => {
        if (deleteId) {
            try {
                await deleteLabTechnician(deleteId);
                setDeleteId(null);
            } catch (error) {
                console.error("Error deleting technician:", error);
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
            shift: ''
        });
    };

    // Apply filters to technician data
    const getFilteredTechnicians = () => {
        if (!Array.isArray(labTechnicians)) {
            return [];
        }

        return labTechnicians.filter(technician => {
            // Check if technician record exists and has the required properties
            if (!technician) return false;

            // Gender filter (case-insensitive)
            if (filterOptions.gender &&
                technician.gender &&
                technician.gender.toLowerCase() !== filterOptions.gender.toLowerCase()) {
                return false;
            }

            // Shift filter (case-insensitive)
            if (filterOptions.shift &&
                technician.shiftDetails &&
                technician.shiftDetails.toLowerCase() !== filterOptions.shift.toLowerCase()) {
                return false;
            }

            // Search term filter (case-insensitive)
            if (searchTerm) {
                const term = searchTerm.toLowerCase();
                const nameMatch = technician.name && technician.name.toLowerCase().includes(term);
                const idMatch = technician.technicianID && technician.technicianID.toLowerCase().includes(term);

                if (!nameMatch && !idMatch) {
                    return false;
                }
            }

            return true;
        });
    };

    const filteredTechnicians = getFilteredTechnicians();

    return (
        <div className="max-w-7xl mx-auto px-4 py-10 text-gray-800">

            <h2 className="text-4xl font-bold text-blue-800 mb-10 text-center">Lab Technicians</h2>
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <div className="relative w-full md:w-1/2">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search by name or technician ID..."
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
                        Filter {(filterOptions.gender || filterOptions.shift) && '(Active)'}
                    </button>

                    {/* Add Technician Button */}
                    <button
                        onClick={() => navigate('/staff-management/add-lab')}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-md shadow transition duration-200"
                    >
                        + Add Technician
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
                                <label className="block text-sm font-medium text-gray-600 mb-1">Shift</label>
                                <select
                                    name="shift"
                                    value={filterOptions.shift}
                                    onChange={handleFilterChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                >
                                    <option value="">All Shifts</option>
                                    <option value="day">Day</option>
                                    <option value="night">Night</option>
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

            {editLabTechnician && (
                <UpdateLabTechnician
                    technician={editLabTechnician}
                    onClose={() => setEditLabTechnician(null)}
                    onUpdateSuccess={() => {
                        getLabTechnicians();
                        setEditLabTechnician(null);
                    }}
                />
            )}

            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
                    {filteredTechnicians.length === 0 ? (
                        <p className="col-span-full text-center text-gray-500 py-10">
                            {searchTerm || filterOptions.gender || filterOptions.shift ?
                                "No technicians found matching your search/filter criteria." :
                                "No lab technicians found. Add technicians using the button above."}
                        </p>
                    ) : (
                        filteredTechnicians.map((technician, index) => (
                            <div key={technician?._id || index}
                                className="bg-white border border-gray-200 shadow-md rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg flex flex-col h-full">
                                <div className="p-4 flex flex-col items-center">
                                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden mb-3">
                                        <img
                                            src={technician.photo}
                                            alt={technician.name}
                                            className="w-full h-full object-cover"
                                            onError={(e) => { e.target.src = '/placeholder-avatar.png' }}
                                        />
                                    </div>
                                    <h3 className="text-base sm:text-lg font-bold text-gray-800 line-clamp-1">{technician?.name || 'Unknown'}</h3>
                                    <p className="text-xs sm:text-sm text-gray-600">ID: {technician?.technicianID || 'N/A'}</p>
                                    <p className="text-xs sm:text-sm text-gray-600 capitalize">Gender: {technician?.gender || 'N/A'}</p>
                                    <p className="text-xs sm:text-sm text-blue-600 font-medium">Shift: {technician?.shiftDetails || 'N/A'}</p>
                                </div>

                                <div className="mt-auto p-3 pt-4 border-t border-gray-100 bg-gray-50">
                                    <div className="flex flex-wrap justify-center gap-2">
                                        <button
                                            onClick={() => handleView(technician)}
                                            className="px-3 py-1.5 text-xs sm:text-sm bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center gap-1 transition-colors"
                                        >
                                            <Eye size={16} className="hidden xs:inline" />
                                            <span>View</span>
                                        </button>
                                        <button
                                            onClick={() => setEditLabTechnician(technician)}
                                            className="px-3 py-1.5 text-xs sm:text-sm bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg flex items-center gap-1 transition-colors"
                                        >
                                            <Edit size={16} className="hidden xs:inline" />
                                            <span>Edit</span>
                                        </button>
                                        <button
                                            onClick={() => handleDelete(technician?._id)}
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
                        <p className="mb-5 sm:mb-6 text-sm sm:text-base text-gray-600">Are you sure you want to delete this lab technician? This action cannot be undone.</p>
                        <div className="flex justify-end gap-2">
                            <button onClick={() => setDeleteId(null)} className="px-3 sm:px-4 py-1.5 sm:py-2 border rounded-md text-sm sm:text-base text-gray-700">Cancel</button>
                            <button onClick={confirmDelete} className="px-3 sm:px-4 py-1.5 sm:py-2 bg-red-600 text-white rounded-md text-sm sm:text-base">Delete</button>
                        </div>
                    </div>
                </div>
            )}

            {/* View Modal */}
            {viewTechnician && (
                <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 overflow-auto px-4 py-6">
                    <div className="bg-white rounded-xl shadow-lg max-w-3xl w-full p-4 sm:p-8 relative">
                        <button onClick={handleCloseView} className="absolute top-2 right-3 sm:top-3 sm:right-4 text-2xl text-gray-500 hover:text-gray-700">&times;</button>
                        <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
                            <div className="md:w-1/3">
                                <img
                                    src={viewTechnician?.photo || '/placeholder-avatar.png'}
                                    alt={viewTechnician?.name}
                                    className="rounded-lg w-full object-cover"
                                    onError={(e) => { e.target.src = '/placeholder-avatar.png' }}
                                />
                            </div>
                            <div className="md:w-2/3 space-y-2 sm:space-y-3 text-sm sm:text-base">
                                <h3 className="text-xl sm:text-2xl font-bold text-blue-700 mb-2">{viewTechnician?.name}</h3>
                                <p><strong>Technician ID:</strong> {viewTechnician?.technicianID}</p>
                                <p><strong>Gender:</strong> {viewTechnician?.gender}</p>
                                <p><strong>DOB: </strong>{viewTechnician?.dateOfBirth ? new Date(viewTechnician?.dateOfBirth).toLocaleDateString() : 'Not available'}</p>
                                <p><strong>Email:</strong> {viewTechnician?.email || 'Not provided'}</p>
                                <p><strong>Phone:</strong> {viewTechnician?.contactNumber || 'Not provided'}</p>
                                <p><strong>Address:</strong><br />
                                    {viewTechnician.addressLine1 ? (
                                        <>
                                            {viewTechnician.addressLine1}<br />
                                            {viewTechnician.addressLine2 && (
                                                <>
                                                    {viewTechnician.addressLine2}<br />
                                                </>
                                            )}
                                        </>
                                    ) : (
                                        'No address provided'
                                    )}
                                </p>
                                <p><strong>Qualifications: </strong> {viewTechnician?.qualifications || 'Not available'}</p>
                                <p><strong>Shift Details: </strong>{viewTechnician?.shiftDetails}</p>
                                <p><strong>Salary Details: </strong>{viewTechnician?.salaryDetails}</p>
                                <p><strong>Supervised Doctors: </strong>
                                {viewTechnician?.supervisedDoctors && viewTechnician.supervisedDoctors.length > 0 ?
                                viewTechnician.supervisedDoctors.map(doctor => doctor.name || 'Unnamed Doctor').join(', ') :
                                        'None assigned'
                                }</p>
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

export default LabTechnician;