import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllStudents } from "../../../redux/slices/studentSlice";
import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchAllStudents } from "../../redux/slices/studentSlice";
// import DashboardStats from "../../components/Dashboard/Stats";

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
      student.name.toLowerCase().includes(filters.name.toLowerCase()) &&
      student.rollNo.toString().includes(filters.roll) &&
      student.section.toLowerCase().includes(filters.section.toLowerCase()) &&
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

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Link to={"/admin/dashboard"}>go to dashboard</Link>
      <h1 className="text-3xl font-bold mb-6">Student page</h1>
      {/* <DashboardStats students={students} /> */}

      {/* Filter UI */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <input type="text" name="name" placeholder="Search by Name..." className="border p-2 rounded" value={filters.name} onChange={handleFilterChange} />
        <input type="number" name="roll" placeholder="Roll No..." className="border p-2 rounded" value={filters.roll} onChange={handleFilterChange} />
        <input type="text" name="className" placeholder="Class..." className="border p-2 rounded" value={filters.className} onChange={handleFilterChange} />
        <input type="text" name="section" placeholder="Section..." className="border p-2 rounded" value={filters.section} onChange={handleFilterChange} />
      </div>

      {loading && <p>Loading...</p>}

      {!loading && currentItems.length > 0 && (
        <>
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="py-2 px-4 text-left">#</th>
                  <th className="py-2 px-4 text-left">Name</th>
                  <th className="py-2 px-4 text-left">Roll</th>
                  <th className="py-2 px-4 text-left">Class</th>
                  <th className="py-2 px-4 text-left">Section</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((student, index) => (
                  <tr key={student._id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4">{indexOfFirstItem + index + 1}</td>
                    <td className="py-2 px-4">{student.name}</td>
                    <td className="py-2 px-4">{student.rollNo}</td>
                    <td className="py-2 px-4">{student?.currentClass?.className}</td>
                    <td className="py-2 px-4">{student.section}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

     
          <div className="flex justify-between items-center mt-6 bg-white p-4 rounded shadow">
            <p className="text-sm text-gray-600">
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredStudents.length)} of {filteredStudents.length} students
            </p>
            <div className="flex gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className={`px-4 py-2 rounded ${currentPage === 1 ? "bg-gray-200" : "bg-blue-600 text-white hover:bg-blue-700"}`}
              >
                Previous
              </button>
              
              <span className="px-4 py-2 font-bold">Page {currentPage} of {totalPages}</span>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className={`px-4 py-2 rounded ${currentPage === totalPages ? "bg-gray-200" : "bg-blue-600 text-white hover:bg-blue-700"}`}
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default StudentPage;