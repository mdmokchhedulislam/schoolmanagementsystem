import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteStudent } from "../../../redux/slices/studentSlice";
import { FaUser, FaPhone, FaMapMarkerAlt, FaIdBadge, FaSchool, FaArrowLeft, FaEdit, FaTrash } from "react-icons/fa";

function SingleStudentPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
 
  const { students } = useSelector((state) => state.students);
  const student = students.find((s) => s._id === id);


  if (!student) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold">Student not found!</h2>
        <Link to="/admin/dashboard/students" className="text-blue-600 underline">Back to Student List</Link>
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      dispatch(deleteStudent(id));
      navigate("/admin/dashboard/students");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Back Button & Actions */}
      <div className="max-w-4xl mx-auto flex justify-between items-center mb-6">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition"
        >
          <FaArrowLeft /> Back to List
        </button>
        
        <div className="flex gap-3">
          <Link 
            to={`/admin/dashboard/students/edit/${id}`} 
            className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded shadow hover:bg-yellow-600"
          >
            <FaEdit /> Edit Profile
          </Link>
          <button 
            onClick={handleDelete}
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded shadow hover:bg-red-700"
          >
            <FaTrash /> Delete
          </button>
        </div>
      </div>

      {/* Main Profile Card */}
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header/Banner */}
        <div className="bg-blue-600 h-32 flex items-end justify-center">
          <div className="bg-white p-2 rounded-full translate-y-12 shadow-md">
            <div className="bg-gray-200 h-24 w-24 rounded-full flex items-center justify-center">
              <FaUser size={50} className="text-gray-500" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="pt-16 pb-8 px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">{student.name}</h1>
            <p className="text-blue-600 font-semibold uppercase tracking-wider">
              Student ID: {student._id.slice(-6).toUpperCase()}
            </p>
            <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold uppercase ${
              student.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {student.status}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t pt-8">
            {/* Academic Info */}
            <div>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-gray-700">
                <FaSchool className="text-blue-500" /> Academic Information
              </h3>
              <div className="space-y-3">
                <p className="flex justify-between border-b pb-1">
                  <span className="text-gray-500">Roll No:</span>
                  <span className="font-medium text-gray-800">{student.rollNo}</span>
                </p>
                <p className="flex justify-between border-b pb-1">
                  <span className="text-gray-500">Class:</span>
                  <span className="font-medium text-gray-800">{student?.currentClass?.className || "N/A"}</span>
                </p>
                <p className="flex justify-between border-b pb-1">
                  <span className="text-gray-500">Section:</span>
                  <span className="font-medium text-gray-800">{student.section}</span>
                </p>
                <p className="flex justify-between border-b pb-1">
                  <span className="text-gray-500">Academic Year:</span>
                  <span className="font-medium text-gray-800">{student?.currentAcademicYear?.year || "N/A"}</span>
                </p>
              </div>
            </div>

            {/* Personal/Contact Info */}
            <div>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-gray-700">
                <FaIdBadge className="text-blue-500" /> Contact & Personal
              </h3>
              <div className="space-y-3">
                <p className="flex items-start gap-3">
                  <FaPhone className="mt-1 text-gray-400" />
                  <div>
                    <span className="block text-xs text-gray-500">Guardian Contact</span>
                    <span className="text-gray-800 font-medium">{student.guardianContact}</span>
                  </div>
                </p>
                <p className="flex items-start gap-3">
                  <FaMapMarkerAlt className="mt-1 text-gray-400" />
                  <div>
                    <span className="block text-xs text-gray-500">Address</span>
                    <span className="text-gray-800 font-medium">{student.address || "No address provided"}</span>
                  </div>
                </p>
                <p className="flex items-start gap-3 pt-2">
                  <div className="w-full bg-gray-50 p-3 rounded text-xs text-gray-500 italic">
                    Student since: {new Date(student.createdAt).toLocaleDateString()}
                  </div>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleStudentPage;