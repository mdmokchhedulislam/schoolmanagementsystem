import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllStudents, deleteStudent } from "../../../redux/slices/studentSlice"; 
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaSearch, FaPlus, FaGraduationCap } from "react-icons/fa";

function StudentPage() {
  const dispatch = useDispatch();
  const { students, loading, error } = useSelector((state) => state.students);

  const [filters, setFilters] = useState({ name: "", roll: "", section: "", className: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(fetchAllStudents());
  }, [dispatch]);


  const filteredStudents = students.filter((student) => {
    return (
      student?.name?.toLowerCase().includes(filters.name.toLowerCase()) &&
      student?.rollNo?.toString().includes(filters.roll) &&
      student?.section?.toLowerCase().includes(filters.section.toLowerCase()) &&
      (student?.currentClass?.className || "").toLowerCase().includes(filters.className.toLowerCase())
    );
  });


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredStudents.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setCurrentPage(1);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this student? This action cannot be undone.")) {
      dispatch(deleteStudent(id))
        .unwrap()
        .then(() => {
          alert("Student deleted successfully!");
        })
        .catch((err) => {
          alert("Failed to delete: " + err);
        });
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <Link to={"/admin/dashboard"} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-extrabold text-gray-800 mt-1 flex items-center gap-2">
            <FaGraduationCap className="text-blue-600" /> Student Management
          </h1>
        </div>
        <Link 
          to="/admin/dashboard/students/add" 
          className="bg-green-600 text-white px-5 py-2.5 rounded-lg shadow-lg hover:bg-green-700 transition flex items-center gap-2 font-semibold"
        >
          <FaPlus size={14} /> Add New Student
        </Link>
      </div>

      {/* Filter UI */}
      <div className="bg-white p-5 rounded-xl shadow-sm mb-6 grid grid-cols-1 md:grid-cols-4 gap-4 border border-gray-200">
        <div className="relative">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input type="text" name="name" placeholder="Search by Name..." className="pl-10 border w-full p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={filters.name} onChange={handleFilterChange} />
        </div>
        <input type="number" name="roll" placeholder="Roll No..." className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={filters.roll} onChange={handleFilterChange} />
        <input type="text" name="className" placeholder="Class..." className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={filters.className} onChange={handleFilterChange} />
        <input type="text" name="section" placeholder="Section..." className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={filters.section} onChange={handleFilterChange} />
      </div>

      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      )}

      {error && <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">Error: {error}</div>}

      {!loading && currentItems.length > 0 && (
        <>
          <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-gray-100">
            <table className="min-w-full">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="py-4 px-6 text-left font-semibold">#</th>
                  <th className="py-4 px-6 text-left font-semibold">Name</th>
                  <th className="py-4 px-6 text-left font-semibold">Roll No</th>
                  <th className="py-4 px-6 text-left font-semibold">Class</th>
                  <th className="py-4 px-6 text-left font-semibold text-center">Section</th>
                  <th className="py-4 px-6 text-center font-semibold text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {currentItems.map((student, index) => (
                  <tr key={student._id} className="hover:bg-blue-50 transition-colors">
                    <td className="py-4 px-6 text-gray-600">{indexOfFirstItem + index + 1}</td>
                    <td className="py-4 px-6">
                      <Link 
                        to={`/admin/dashboard/students/${student._id}`} 
                        className="text-blue-600 font-bold hover:underline"
                      >
                        {student.name}
                      </Link>
                    </td>
                    <td className="py-4 px-6 text-gray-700 font-medium">{student.rollNo}</td>
                    <td className="py-4 px-6 text-gray-700">{student?.currentClass?.className || "N/A"}</td>
                    <td className="py-4 px-6 text-center">
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase">
                        {student.section}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex justify-center gap-4">
                        <Link 
                          to={`/admin/dashboard/students/edit/${student._id}`} 
                          className="text-yellow-500 hover:text-yellow-600 transition p-2 hover:bg-yellow-50 rounded-full"
                          title="Edit Student"
                        >
                          <FaEdit size={20} />
                        </Link>
                        <button 
                          onClick={() => handleDelete(student._id)} 
                          className="text-red-500 hover:text-red-600 transition p-2 hover:bg-red-50 rounded-full"
                          title="Delete Student"
                        >
                          <FaTrash size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col md:flex-row justify-between items-center mt-8 bg-white p-5 rounded-xl shadow-sm border border-gray-200 gap-4">
            <p className="text-sm text-gray-500 font-medium">
              Showing <span className="text-gray-800">{indexOfFirstItem + 1}</span> to <span className="text-gray-800">{Math.min(indexOfLastItem, filteredStudents.length)}</span> of <span className="text-gray-800">{filteredStudents.length}</span> students
            </p>
            <div className="flex items-center gap-3">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className={`px-5 py-2 rounded-lg font-semibold transition ${currentPage === 1 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700 shadow-md"}`}
              >
                Previous
              </button>
              <div className="bg-gray-100 px-4 py-2 rounded-lg font-bold text-blue-700 border border-blue-100">
                {currentPage} / {totalPages}
              </div>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className={`px-5 py-2 rounded-lg font-semibold transition ${currentPage === totalPages ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700 shadow-md"}`}
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}

      {!loading && currentItems.length === 0 && (
        <div className="text-center py-24 bg-white rounded-xl shadow-sm border border-dashed border-gray-300 mt-6">
          <p className="text-gray-400 text-lg">No students found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
}

export default StudentPage;