import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchTeacherById, updateTeacher, resetSingleTeacher } from "../../../redux/slices/teacherSlice";
import { toast } from "react-hot-toast";
import { FaSave, FaArrowLeft, FaUserEdit, FaMoneyCheckAlt, FaGraduationCap } from "react-icons/fa";

function UpdateTeacherPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { singleTeacher, loading } = useSelector((state) => state.teachers);
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    department: "",
    qualification: "",
    specializedSubjects: "",
    salaryInfo: { baseSalary: 0, bankAccount: "", panOrNid: "" },
    experience: { joiningDate: "", previousExperience: "" },
    status: "Active"
  });

  useEffect(() => {
    if (id) dispatch(fetchTeacherById(id));
    return () => dispatch(resetSingleTeacher());
  }, [id, dispatch]);

  useEffect(() => {
    if (singleTeacher) {
      setFormData({
        name: singleTeacher.name || "",
        designation: singleTeacher.designation || "",
        department: singleTeacher.department || "",
        qualification: singleTeacher.qualification || "",
        specializedSubjects: singleTeacher.specializedSubjects?.join(", ") || "",
        salaryInfo: {
          baseSalary: singleTeacher.salaryInfo?.baseSalary || 0,
          bankAccount: singleTeacher.salaryInfo?.bankAccount || "",
          panOrNid: singleTeacher.salaryInfo?.panOrNid || ""
        },
        experience: {
          joiningDate: singleTeacher.experience?.joiningDate?.split("T")[0] || "",
          previousExperience: singleTeacher.experience?.previousExperience || ""
        },
        status: singleTeacher.status || "Active"
      });
    }
  }, [singleTeacher]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
   
    const finalData = {
      ...formData,
      specializedSubjects: formData.specializedSubjects.split(",").map(s => s.trim())
    };

    const resultAction = await dispatch(updateTeacher({ id, teacherData: finalData }));
    
    if (updateTeacher.fulfilled.match(resultAction)) {
      toast.success("Teacher profile updated successfully!");
      navigate("/admin/dashboard/teachers");
    } else {
      toast.error(resultAction.payload || "Update failed");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-blue-600 mb-6 font-medium">
        <FaArrowLeft /> Back to List
      </button>

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-700 to-indigo-800 p-6 text-white">
          <h2 className="text-2xl font-bold flex items-center gap-2"><FaUserEdit /> Update Teacher Profile</h2>
          <p className="opacity-80">Teacher ID: {singleTeacher?.teacherId}</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* Academic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <h3 className="md:col-span-2 text-lg font-bold text-gray-800 border-b pb-2 flex items-center gap-2">
              <FaGraduationCap className="text-blue-600"/> Academic Info
            </h3>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-1">Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none" required />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Designation</label>
              <input type="text" name="designation" value={formData.designation} onChange={handleChange} className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Department</label>
              <input type="text" name="department" value={formData.department} onChange={handleChange} className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-1">Specialized Subjects (comma separated)</label>
              <input type="text" name="specializedSubjects" value={formData.specializedSubjects} onChange={handleChange} className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none" />
            </div>
          </div>

          {/* Salary Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-50 p-6 rounded-2xl">
            <h3 className="md:col-span-3 text-lg font-bold text-gray-800 border-b pb-2 flex items-center gap-2">
              <FaMoneyCheckAlt className="text-green-600"/> Salary & Bank Info
            </h3>
            <div>
              <label className="block text-sm font-semibold mb-1">Base Salary</label>
              <input type="number" name="salaryInfo.baseSalary" value={formData.salaryInfo.baseSalary} onChange={handleChange} className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-green-400 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Bank Account</label>
              <input type="text" name="salaryInfo.bankAccount" value={formData.salaryInfo.bankAccount} onChange={handleChange} className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-green-400 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">PAN / NID</label>
              <input type="text" name="salaryInfo.panOrNid" value={formData.salaryInfo.panOrNid} onChange={handleChange} className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-green-400 outline-none" />
            </div>
          </div>

          {/* Experience */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <h3 className="md:col-span-2 text-lg font-bold text-gray-800 border-b pb-2">Experience & Status</h3>
            <div>
              <label className="block text-sm font-semibold mb-1">Joining Date</label>
              <input type="date" name="experience.joiningDate" value={formData.experience.joiningDate} onChange={handleChange} className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Status</label>
              <select name="status" value={formData.status} onChange={handleChange} className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none">
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-blue-700 text-white py-4 rounded-xl font-bold hover:bg-blue-800 transition shadow-lg disabled:bg-gray-400">
            {loading ? "Processing..." : "Save Teacher Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateTeacherPage;