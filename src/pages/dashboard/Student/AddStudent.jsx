import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { UserPlus, ArrowLeft, BookOpen, Calendar } from "lucide-react";

import { addStudent, clearStatus } from "../../../redux/slices/studentSlice";
import { fetchAllClasses } from "../../../redux/slices/classSlice";
import { fetchAcademicYears } from "../../../redux/slices/academicYearSlice";

function AddStudent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.students || {});
  const { classes } = useSelector((state) => state.classes || { classes: [] });
  const { academicYears } = useSelector((state) => state.academicYears || { academicYears: [] });

  const [formData, setFormData] = useState({
    name: "",
    currentClass: "", 
    currentAcademicYear: "",
    section: "A",
    rollNo: "",
    guardianContact: "",
    address: "",
  });

  useEffect(() => {
    dispatch(fetchAllClasses());
    dispatch(fetchAcademicYears());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      alert("Student Added Successfully! 🎉");
      dispatch(clearStatus()); 
      navigate("/admin/dashboard");
    }
  }, [success, dispatch, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!formData.currentClass || !formData.currentAcademicYear) {
        alert("Please select both Class and Academic Year!");
        return;
    }
    dispatch(addStudent(formData));
  };

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen flex justify-center">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition"
          >
            <ArrowLeft size={20} /> Back
          </button>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <UserPlus className="text-indigo-600" /> Student Enrollment
          </h1>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="bg-white rounded-[2rem] shadow-xl p-6 md:p-10 border border-white"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Name & Roll */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-600">Full Name</label>
                  <input 
                    required 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-indigo-500 transition-all" 
                    placeholder="Enter student name" 
                  />
               </div>
               <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-600">Roll Number</label>
                  <input 
                    required 
                    name="rollNo" 
                    type="number" 
                    value={formData.rollNo} 
                    onChange={handleChange} 
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-indigo-500 transition-all" 
                    placeholder="Ex: 101" 
                  />
               </div>
            </div>

            {/* Dropdowns Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Class Dropdown */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-600 flex items-center gap-1">
                  <BookOpen size={16} /> Select Class
                </label>
                <select 
                  required 
                  name="currentClass" 
                  value={formData.currentClass} 
                  onChange={handleChange} 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-indigo-500 outline-none cursor-pointer"
                >
                  <option value="">-- Choose Class --</option>
                  {classes && classes.map((cls) => (
                    <option key={cls._id} value={cls._id}>{cls.className}</option>
                  ))}
                </select>
              </div>

              {/* Academic Year Dropdown */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-600 flex items-center gap-1">
                  <Calendar size={16} /> Academic Year
                </label>
                <select 
                  required 
                  name="currentAcademicYear" 
                  value={formData.currentAcademicYear} 
                  onChange={handleChange} 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-indigo-500 outline-none cursor-pointer"
                >
                  <option value="">-- Choose Year --</option>
                  {academicYears && academicYears.map((year) => (
                    <option key={year._id} value={year._id}>
                      {year.year} {year.isCurrent ? "(Current)" : ""}
                    </option>
                  ))}
                </select>
              </div>

              {/* Section Dropdown */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-600">Section</label>
                <select 
                  name="section" 
                  value={formData.section} 
                  onChange={handleChange} 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-indigo-500 outline-none"
                >
                  <option value="A">Section A</option>
                  <option value="B">Section B</option>
                  <option value="C">Section C</option>
                </select>
              </div>
            </div>

            {/* Contact & Address */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-600">Guardian Contact</label>
                    <input 
                      required 
                      name="guardianContact" 
                      value={formData.guardianContact} 
                      onChange={handleChange} 
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-indigo-500 transition-all" 
                      placeholder="017XXXXXXXX" 
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-600">Address</label>
                    <input 
                      name="address" 
                      value={formData.address} 
                      onChange={handleChange} 
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-indigo-500 transition-all" 
                      placeholder="Enter address" 
                    />
                </div>
            </div>

            {/* Error Message */}
            {error && (
              <motion.p 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-100"
              >
                {error}
              </motion.p>
            )}

            <button 
              disabled={loading} 
              type="submit" 
              className="w-full py-4 rounded-2xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all active:scale-95 disabled:bg-slate-400"
            >
              {loading ? "Registering Student..." : "Confirm & Enroll Student"}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default AddStudent;