import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeachers, deleteTeacher } from "../../../redux/slices/teacherSlice"; 

import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaSearch, FaPlus, FaChalkboardTeacher } from "react-icons/fa";
import { toast } from "react-hot-toast";

function TeacherPage() {
  const dispatch = useDispatch();
  const { teachers, loading, error } = useSelector((state) => state.teachers);
  console.log(teachers);
  


  const [filters, setFilters] = useState({ name: "", teacherId: "", department: "", designation: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch]);

  const filteredTeachers = teachers.filter((teacher) => {
    const name = teacher?.name || "";
    const teacherId = teacher?.teacherId || teacher?._id || "";
    const department = teacher?.department || "";
    const designation = teacher?.designation || "";

    return (
      name.toLowerCase().includes(filters.name.toLowerCase()) &&
      teacherId.toLowerCase().includes(filters.teacherId.toLowerCase()) &&
      department.toLowerCase().includes(filters.department.toLowerCase()) &&
      designation.toLowerCase().includes(filters.designation.toLowerCase())
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTeachers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredTeachers.length / itemsPerPage);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setCurrentPage(1);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this teacher profile?")) {
      dispatch(deleteTeacher(id))
        .unwrap()
        .then(() => {
          toast.success("Teacher profile deleted!");
        })
        .catch((err) => {
          toast.error("Failed to delete: " + err);
        });
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <Link to={"/admin/dashboard"} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-extrabold text-gray-800 mt-1 flex items-center gap-2">
            <FaChalkboardTeacher className="text-blue-600" /> Teacher Management
          </h1>
        </div>
        <Link 
          to="/admin/dashboard/teachers/add" 
          className="bg-blue-600 text-white px-5 py-2.5 rounded-lg shadow-lg hover:bg-blue-700 transition flex items-center gap-2 font-semibold"
        >
          <FaPlus size={14} /> Add New Teacher
        </Link>
      </div>

      <div className="bg-white p-5 rounded-xl shadow-sm mb-6 grid grid-cols-1 md:grid-cols-4 gap-4 border border-gray-200">
        <div className="relative">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input type="text" name="name" placeholder="Search by Name..." className="pl-10 border w-full p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={filters.name} onChange={handleFilterChange} />
        </div>
        <input type="text" name="teacherId" placeholder="Teacher ID..." className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={filters.teacherId} onChange={handleFilterChange} />
        <input type="text" name="department" placeholder="Department..." className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={filters.department} onChange={handleFilterChange} />
        <select name="designation" className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={filters.designation} onChange={handleFilterChange}>
            <option value="">All Designations</option>
            <option value="Principal">Principal</option>
            <option value="Lecturer">Lecturer</option>
            <option value="Assistant Teacher">Assistant Teacher</option>
        </select>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      )}

      {error && <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6 text-center">Error: {error}</div>}

      {!loading && currentItems.length > 0 && (
        <>
          <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-gray-100">
            <table className="min-w-full">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="py-4 px-6 text-left font-semibold">Teacher ID</th>
                  <th className="py-4 px-6 text-left font-semibold">Name</th>
                  <th className="py-4 px-6 text-left font-semibold">Department</th>
                  <th className="py-4 px-6 text-left font-semibold">Designation</th>
                  <th className="py-4 px-6 text-center font-semibold">Status</th>
                  <th className="py-4 px-6 text-center font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {currentItems.map((teacher) => (
                  <tr key={teacher._id} className="hover:bg-blue-50 transition-colors">
                    <td className="py-4 px-6 text-blue-700 font-bold">{teacher.teacherId || teacher._id.slice(-6)}</td>
                    <td className="py-4 px-6">
                      <Link 
                        to={`/admin/dashboard/teachers/${teacher._id}`} 
                        className="font-semibold text-gray-800 hover:text-blue-600 hover:underline transition-all cursor-pointer"
                        title="View Full Profile"
                      >
                        {teacher?.name || "N/A"}
                      </Link>
                      <div className="text-xs text-gray-400">{teacher?.email}</div>
                    </td>
                    <td className="py-4 px-6 text-gray-600">{teacher.department}</td>
                    <td className="py-4 px-6 text-gray-600">{teacher.designation}</td>
                    <td className="py-4 px-6 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${teacher.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {teacher.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex justify-center gap-3">
                        <Link 
                          to={`/admin/dashboard/teachers/edit/${teacher._id}`} 
                          className="text-yellow-500 hover:text-yellow-600 p-2 hover:bg-yellow-50 rounded-full"
                          title="Edit Profile"
                        >
                          <FaEdit size={18} />
                        </Link>
                        <button 
                          onClick={() => handleDelete(teacher._id)} 
                          className="text-red-500 hover:text-red-600 p-2 hover:bg-red-50 rounded-full"
                          title="Delete Profile"
                        >
                          <FaTrash size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center mt-8 bg-white p-5 rounded-xl shadow-sm border border-gray-200 gap-4">
            <p className="text-sm text-gray-500">
              Showing <span className="text-gray-800">{indexOfFirstItem + 1}</span> to <span className="text-gray-800">{Math.min(indexOfLastItem, filteredTeachers.length)}</span> of <span className="text-gray-800">{filteredTeachers.length}</span> Teachers
            </p>
            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className={`px-4 py-2 rounded-lg transition ${currentPage === 1 ? "bg-gray-100 text-gray-400" : "bg-blue-600 text-white hover:bg-blue-700"}`}
              >
                Prev
              </button>
              <span className="font-bold px-4">{currentPage} / {totalPages}</span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className={`px-4 py-2 rounded-lg transition ${currentPage === totalPages ? "bg-gray-100 text-gray-400" : "bg-blue-600 text-white hover:bg-blue-700"}`}
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}

      {!loading && currentItems.length === 0 && (
        <div className="text-center py-20 bg-white rounded-xl shadow-sm mt-6">
          <p className="text-gray-400">No teachers found.</p>
        </div>
      )}
    </div>
  );
}

export default TeacherPage;