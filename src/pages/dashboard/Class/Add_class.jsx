import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { 
  fetchAllClasses, 
  addClass, 
  deleteClass, 
  resetClassStatus 
} from "../../../redux/slices/classSlice";

const AddClass = () => {
  const [className, setClassName] = useState("");
  const dispatch = useDispatch();
  const { classes, loading, success, error } = useSelector((state) => state.classes);

  useEffect(() => {
    dispatch(fetchAllClasses());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      toast.success("Class created!");
      setClassName("");
      dispatch(resetClassStatus());
    }
    if (error) {
      toast.error(error);
      dispatch(resetClassStatus());
    }
  }, [success, error, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (classes.some(c => c.className.toLowerCase() === className.trim().toLowerCase())) {
      return toast.error("Class already exists!");
    }
    dispatch(addClass({ className: className.trim() }));
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this class?")) {
      // রিলোড ছাড়া ডিলিট করতে dispatch এর পর then ব্যবহার করার দরকার নেই, 
      // স্লাইস ঠিক থাকলে এমনিতেই চলে যাবে।
      dispatch(deleteClass(id));
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-10 font-sans">
      <Toaster position="top-center" />
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Classes</h2>
        <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-bold">
          Total: {classes.length}
        </span>
      </div>

      {/* --- Small Smart Input --- */}
      <form onSubmit={handleSubmit} className="flex gap-2 mb-8 bg-white p-2 rounded-lg shadow-sm border border-gray-100">
        <input
          type="text"
          placeholder="New class name..."
          className="flex-1 p-2 outline-none text-sm font-medium"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          required
        />
        <button
          disabled={loading}
          className="bg-gray-900 text-white px-5 py-2 rounded-md text-sm font-semibold hover:bg-black transition-all"
        >
          {loading ? "..." : "Add"}
        </button>
      </form>

      {/* --- Minimal List --- */}
      <div className="space-y-3">
        {classes.length > 0 ? (
          classes.map((cls) => (
            <div 
              key={cls._id} 
              className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:border-blue-200 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-xs font-bold text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-all">
                  CL
                </div>
                <span className="font-bold text-gray-700 uppercase tracking-wide">{cls.className}</span>
              </div>
              
              <button
                onClick={() => handleDelete(cls._id)}
                className="text-gray-400 hover:text-red-500 p-2 transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400 text-sm mt-10">No classes found.</p>
        )}
      </div>
    </div>
  );
};

export default AddClass;