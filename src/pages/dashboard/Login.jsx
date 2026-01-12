import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { loginTeacher, clearTeacherError } from "../redux/slices/teacher/teacherSlice"; // নিশ্চিত করো এই স্লাইসটি আছে

function TeacherLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "", // শিক্ষকরা সাধারণত ইমেইল দিয়ে লগইন করেন
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  // Redux থেকে টিচার স্টেট নিচ্ছি
  const { loading, error, isAuthenticated } = useSelector((state) => state.teacher);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginTeacher(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/teacher/dashboard");
    }

    if (error) {
      alert(error);
      dispatch(clearTeacherError());
    }
  }, [isAuthenticated, error, navigate, dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] relative overflow-hidden px-4 font-sans text-white">
      {/* Background Glows (Teacher-এর জন্য একটু Emerald শেড) */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-600/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/5 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl p-10 border border-white/10 z-10"
      >
        <div className="text-center mb-10">
          {/* Teacher Icon */}
          <div className="w-20 h-20 bg-gradient-to-tr from-emerald-600 to-teal-500 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-2xl shadow-emerald-500/30 ring-4 ring-white/5">
            <svg 
              viewBox="0 0 24 24" 
              className="h-12 w-12 text-white" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
          </div>
          <h2 className="text-3xl font-black tracking-tight uppercase">
            Teacher Portal
          </h2>
          <p className="text-gray-400 text-sm mt-2 font-medium tracking-wide">Secure access for faculty members</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label className="text-gray-400 text-[11px] uppercase font-bold mb-2 ml-1 block tracking-widest">Official Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="teacher@school.com"
              className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none text-white transition-all placeholder:text-gray-600 font-medium"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="text-gray-400 text-[11px] uppercase font-bold mb-2 ml-1 block tracking-widest">Secret Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none text-white transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-emerald-400 hover:text-emerald-300 transition-colors uppercase"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full py-5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs tracking-[0.2em] shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all disabled:opacity-50 uppercase mt-4"
          >
            {loading ? "Authenticating..." : "Teacher Sign In"}
          </motion.button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-xs">
            Issues logging in? <span className="text-emerald-400 cursor-pointer font-bold">Contact Admin</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default TeacherLogin;