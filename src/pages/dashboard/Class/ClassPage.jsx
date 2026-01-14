import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSections, deleteSection } from "../../../redux/slices/sectionSlice"; 
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaSearch, FaPlus, FaSchool } from "react-icons/fa";
import { toast } from "react-hot-toast";

function ClassPage() {
  const dispatch = useDispatch();
  const { sections, loading, error } = useSelector((state) => state.sections);

  const [filters, setFilters] = useState({ className: "", section: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(fetchSections());
  }, [dispatch]);

  const filteredSections = sections.filter((sec) => {
    const className = sec.classId?.className || "";
    const sectionName = sec.name || "";

    return (
      className.toLowerCase().includes(filters.className.toLowerCase()) &&
      sectionName.toLowerCase().includes(filters.section.toLowerCase())
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSections.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredSections.length / itemsPerPage);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setCurrentPage(1);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this section?")) {
      dispatch(deleteSection(id))
        .unwrap()
        .then(() => {
          toast.success("Section deleted successfully!");
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
            <FaSchool className="text-blue-600" /> Class & Section Management
          </h1>
        </div>
        <Link 
          to="/admin/dashboard/addsection" 
          className="bg-blue-600 text-white px-5 py-2.5 rounded-lg shadow-lg hover:bg-blue-700 transition flex items-center gap-2 font-semibold"
        >
          <FaPlus size={14} /> Add New Section
        </Link>
      </div>

      <div className="bg-white p-5 rounded-xl shadow-sm mb-6 grid grid-cols-1 md:grid-cols-2 gap-4 border border-gray-200">
        <div className="relative">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input 
            type="text" 
            name="className" 
            placeholder="Search by Class Name..." 
            className="pl-10 border w-full p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
            value={filters.className} 
            onChange={handleFilterChange} 
          />
        </div>
        <input 
          type="text" 
          name="section" 
          placeholder="Search by Section..." 
          className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
          value={filters.section} 
          onChange={handleFilterChange} 
        />
      </div>

      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      )}

      {error && <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6 text-center">{error}</div>}

      {!loading && currentItems.length > 0 && (
        <>
          <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-gray-100">
            <table className="min-w-full">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="py-4 px-6 text-left font-semibold">Class Name</th>
                  <th className="py-4 px-6 text-left font-semibold">Section</th>
                  <th className="py-4 px-6 text-center font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {currentItems.map((sec) => (
                  <tr key={sec._id} className="hover:bg-blue-50 transition-colors">
                    <td className="py-4 px-6 text-blue-700 font-bold uppercase">
                      {sec.classId?.className || "N/A"}
                    </td>
                    <td className="py-4 px-6">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold border border-green-200 uppercase">
                        {sec.name}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex justify-center gap-3">
                        <Link 
                          to={`/admin/dashboard/edit-section/${sec._id}`} 
                          className="text-yellow-500 hover:text-yellow-600 p-2 hover:bg-yellow-50 rounded-full"
                        >
                          <FaEdit size={18} />
                        </Link>
                        <button 
                          onClick={() => handleDelete(sec._id)} 
                          className="text-red-500 hover:text-red-600 p-2 hover:bg-red-50 rounded-full"
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
              Showing <span className="text-gray-800">{indexOfFirstItem + 1}</span> to <span className="text-gray-800">{Math.min(indexOfLastItem, filteredSections.length)}</span> of <span className="text-gray-800">{filteredSections.length}</span> Items
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
          <p className="text-gray-400">No data found.</p>
        </div>
      )}
    </div>
  );
}

export default ClassPage;