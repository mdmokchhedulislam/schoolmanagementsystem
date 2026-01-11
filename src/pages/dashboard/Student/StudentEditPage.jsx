import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { updateStudent, clearStatus } from "../../../redux/slices/studentSlice";
import { toast } from "react-hot-toast"; 

function StudentEditPage() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const { students, loading, success, error } = useSelector((state) => state.students);

  const [formData, setFormData] = useState({
    name: "",
    section: "",
    rollNo: "",
    guardianContact: "",
    address: "",
    status: "active",
  });

  useEffect(() => {
    const studentToEdit = students.find((s) => s._id === id);
    if (studentToEdit) {
      setFormData({
        name: studentToEdit.name || "",
        section: studentToEdit.section || "",
        rollNo: studentToEdit.rollNo || "",
        guardianContact: studentToEdit.guardianContact || "",
        address: studentToEdit.address || "",
        status: studentToEdit.status || "active",
      });
    }
  }, [id, students]);

  useEffect(() => {
    if (success) {
      toast.success("Student updated successfully!");
      dispatch(clearStatus());
      navigate("/admin/dashboard/students");
    }
    if (error) {
      toast.error(error);
    }
  }, [success, error, dispatch, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateStudent({ id, updatedData: formData }));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Edit Student Information</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <div className="flex flex-col">
            <label className="mb-1 font-semibold text-gray-700">Student Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
          </div>

          {/* Roll No */}
          <div className="flex flex-col">
            <label className="mb-1 font-semibold text-gray-700">Roll Number</label>
            <input
              type="number"
              name="rollNo"
              value={formData.rollNo}
              onChange={handleChange}
              className="border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
          </div>

          {/* Section */}
          <div className="flex flex-col">
            <label className="mb-1 font-semibold text-gray-700">Section</label>
            <input
              type="text"
              name="section"
              value={formData.section}
              onChange={handleChange}
              className="border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
          </div>

          {/* Guardian Contact */}
          <div className="flex flex-col">
            <label className="mb-1 font-semibold text-gray-700">Guardian Contact</label>
            <input
              type="text"
              name="guardianContact"
              value={formData.guardianContact}
              onChange={handleChange}
              className="border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
          </div>

          {/* Status */}
          <div className="flex flex-col">
            <label className="mb-1 font-semibold text-gray-700">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="dropped">Dropped</option>
              <option value="graduated">Graduated</option>
            </select>
          </div>

          {/* Address */}
          <div className="flex flex-col md:col-span-2">
            <label className="mb-1 font-semibold text-gray-700">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
              rows="3"
            ></textarea>
          </div>

          {/* Action Buttons */}
          <div className="md:col-span-2 flex gap-4 mt-4">
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 py-2 px-4 rounded text-white font-bold transition-all ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 shadow-lg"
              }`}
            >
              {loading ? "Updating..." : "Update Student"}
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 py-2 px-4 rounded bg-gray-200 text-gray-700 font-bold hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudentEditPage;