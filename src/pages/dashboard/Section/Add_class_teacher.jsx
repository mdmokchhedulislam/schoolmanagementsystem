import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { FiUserCheck, FiTrash2 } from "react-icons/fi";

import { fetchSections, updateSection, resetSectionStatus } from "../../../redux/slices/sectionSlice"; 
import { fetchAllClasses } from "../../../redux/slices/classSlice";
import { fetchTeachers } from "../../../redux/slices/teacherSlice"; 

const Add_class_teacher = () => {
  const dispatch = useDispatch();
  
  // Redux States
  const { sections, loading, success, error } = useSelector((state) => state.sections);
  const { classes } = useSelector((state) => state.classes);
  const { teachers } = useSelector((state) => state.teachers); 

  const [formData, setFormData] = useState({
    classId: "",
    sectionId: "",
    classTeacher: "",
  });

  const [filteredSections, setFilteredSections] = useState([]);

  useEffect(() => {
    dispatch(fetchSections());
    dispatch(fetchAllClasses());
    dispatch(fetchTeachers()); 
  }, [dispatch]);


  useEffect(() => {
    if (formData.classId) {
      const filtered = sections.filter(sec => 
        (sec.classId?._id || sec.classId) === formData.classId
      );
      setFilteredSections(filtered);
    } else {
      setFilteredSections([]);
    }
  }, [formData.classId, sections]);


  useEffect(() => {
    if (success) {
      toast.success("Teacher assigned successfully!");
      setFormData({ classId: "", sectionId: "", classTeacher: "" });
      dispatch(resetSectionStatus());
    }
    if (error) {
      toast.error(error);
      dispatch(resetSectionStatus());
    }
  }, [success, error, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.sectionId || !formData.classTeacher) {
      return toast.error("Please select both Section and Teacher");
    }
    
    dispatch(updateSection({ 
      id: formData.sectionId, 
      sectionData: { classTeacher: formData.classTeacher } 
    }));
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-10 font-sans">
      <Toaster position="top-center" />

      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-blue-600 rounded-lg shadow-lg shadow-blue-100">
          <FiUserCheck className="text-white text-xl" />
        </div>
        <div className="text-left">
          <h2 className="text-xl font-bold text-gray-800">Assign Class Teacher</h2>
          <p className="text-gray-400 text-xs font-medium">Link teachers to specific sections</p>
        </div>
      </div>

      {/* --- Smart Assignment Form --- */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-10">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          
          <div className="text-left">
            <label className="text-[10px] font-bold text-gray-400 uppercase mb-1.5 block ml-1">1. Class</label>
            <select
              className="w-full p-2.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 font-medium text-sm"
              value={formData.classId}
              onChange={(e) => setFormData({ ...formData, classId: e.target.value, sectionId: "" })}
              required
            >
              <option value="">Choose Class</option>
              {classes?.map(cls => <option key={cls._id} value={cls._id}>{cls.className}</option>)}
            </select>
          </div>

          <div className="text-left">
            <label className="text-[10px] font-bold text-gray-400 uppercase mb-1.5 block ml-1">2. Section</label>
            <select
              className="w-full p-2.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 font-medium text-sm"
              value={formData.sectionId}
              onChange={(e) => setFormData({ ...formData, sectionId: e.target.value })}
              disabled={!formData.classId}
              required
            >
              <option value="">Choose Section</option>
              {filteredSections.map(sec => <option key={sec._id} value={sec._id}>{sec.name}</option>)}
            </select>
          </div>

          <div className="text-left">
            <label className="text-[10px] font-bold text-gray-400 uppercase mb-1.5 block ml-1">3. Teacher</label>
            <select
              className="w-full p-2.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 font-medium text-sm"
              value={formData.classTeacher}
              onChange={(e) => setFormData({ ...formData, classTeacher: e.target.value })}
              required
            >
              <option value="">Choose Teacher</option>
       
              {teachers?.map(t => (
                <option key={t._id} value={t._id}>{t.name}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold p-2.5 rounded-xl transition-all shadow-lg shadow-blue-100 text-sm"
          >
            {loading ? "Assigning..." : "Assign Teacher"}
          </button>
        </form>
      </div>

      {/* --- Assigned List --- */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden text-left">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="p-4 font-bold text-gray-500 uppercase text-[10px]">Class & Section</th>
              <th className="p-4 font-bold text-gray-500 uppercase text-[10px]">Assigned Teacher</th>
              <th className="p-4 font-bold text-gray-500 uppercase text-[10px] text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {sections?.filter(s => s.classTeacher).map((sec) => (
              <tr key={sec._id} className="hover:bg-blue-50/30 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-700">{sec.classId?.className}</span>
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-600 rounded text-[10px] font-black uppercase">{sec.name}</span>
                  </div>
                </td>
                <td className="p-4 font-semibold text-gray-600">
                  {sec.classTeacher?.name || "Unknown Teacher"}
                </td>
                <td className="p-4 text-center">
                  <button 
                    onClick={() => dispatch(updateSection({ id: sec._id, sectionData: { classTeacher: null } }))}
                    className="text-gray-300 hover:text-red-500 transition-colors"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {sections?.filter(s => s.classTeacher).length === 0 && (
              <tr>
                <td colSpan="3" className="p-10 text-center text-gray-400 font-medium italic">
                  No teachers assigned yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Add_class_teacher;