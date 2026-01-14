import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { FiPlus, FiTrash2, FiEdit3, FiGrid } from "react-icons/fi";
import { 
  fetchSections, 
  createSection, 
  updateSection, 
  deleteSection, 
  resetSectionStatus 
} from "../../../redux/slices/sectionSlice";
import { fetchAllClasses } from "../../../redux/slices/classSlice";

const AddSection = () => {
  const dispatch = useDispatch();
  
  const { sections = [], loading, success, error } = useSelector((state) => state.sections || {});
  const { classes = [] } = useSelector((state) => state.classes || {});
  console.log(sections);
  

  const [formData, setFormData] = useState({ name: "", classId: "" });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    dispatch(fetchSections());
    dispatch(fetchAllClasses());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      toast.success(editId ? "Section updated!" : "Section created!");
      setFormData({ name: "", classId: "" });
      setEditId(null);
      dispatch(resetSectionStatus());
    }
    if (error) {
      toast.error(error);
      dispatch(resetSectionStatus());
    }
  }, [success, error, editId, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.classId) return toast.error("Please select a class");

    if (editId) {
      dispatch(updateSection({ id: editId, sectionData: formData }));
    } else {
      dispatch(createSection(formData));
    }
  };

  const handleEdit = (sec) => {
    setEditId(sec._id);
    setFormData({
      name: sec.name,
      classId: sec.classId?._id || sec.classId || "",
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this section?")) {
      dispatch(deleteSection(id));
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-10 font-sans text-left">
      <Toaster position="top-center" />

      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-indigo-600 rounded-lg shadow-lg shadow-indigo-100">
          <FiGrid className="text-white text-xl" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">Sections</h2>
          <p className="text-gray-400 text-xs font-medium">Add sections to your classes</p>
        </div>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm mb-10">
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3 items-end">
          <div className="flex-1 w-full text-left">
            <label className="text-[10px] font-bold text-gray-400 uppercase mb-1.5 block ml-1">Section Name</label>
            <input
              type="text"
              placeholder="Section"
              className="w-full p-2.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 font-semibold text-sm"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value.toUpperCase() })}
              required
            />
          </div>

          <div className="flex-1 w-full text-left">
            <label className="text-[10px] font-bold text-gray-400 uppercase mb-1.5 block ml-1">Select Class</label>
            <select
              className="w-full p-2.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-sm appearance-none"
              value={formData.classId}
              onChange={(e) => setFormData({ ...formData, classId: e.target.value })}
              required
            >
              <option value="">Choose Class</option>
              {classes && classes.map((cls) => (
                <option key={cls._id} value={cls._id}>{cls.className}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full md:w-auto px-6 py-2.5 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
              editId ? "bg-orange-500 hover:bg-orange-600" : "bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-100"
            }`}
          >
            {editId ? <FiEdit3 size={16} /> : <FiPlus size={16} />}
            <span className="text-sm">{loading ? "..." : editId ? "Update" : "Add"}</span>
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {sections && sections.length > 0 ? (
          sections.map((sec) => (
            <div key={sec._id} className="bg-white p-4 rounded-xl border border-gray-50 shadow-sm flex justify-between items-center group hover:border-indigo-100 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 font-black text-sm uppercase">
                  {sec.name ? sec.name[0] : "S"}
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-gray-700 uppercase leading-none mb-1">{sec.name}</h4>
                  <span className="text-[10px] font-bold text-indigo-400 bg-indigo-50/50 px-2 py-0.5 rounded-md uppercase tracking-wider">
                    {sec.classId?.className || "No Class"}
                  </span>
                </div>
              </div>

              <div className="flex gap-1">
                <button 
                  onClick={() => handleEdit(sec)}
                  className="p-2 text-gray-300 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-all"
                >
                  <FiEdit3 size={16} />
                </button>
                <button 
                  onClick={() => handleDelete(sec._id)}
                  className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 text-gray-400 text-sm font-medium">No sections found.</div>
        )}
      </div>
    </div>
  );
};

export default AddSection;