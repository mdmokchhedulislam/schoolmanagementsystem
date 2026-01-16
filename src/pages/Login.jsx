import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { loginStudent, clearError as clearStudentError } from "../redux/slices/student/studentSlice";
import { loginTeacher, clearError as clearTeacherError } from "../redux/slices/teacherSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [role, setRole] = useState("student");
  const [formData, setFormData] = useState({ 
    phone: "", 
    email: "", 
    password: "" 
  });
  const [showPassword, setShowPassword] = useState(false);

  const studentAuth = useSelector((state) => state.student);
  const teacherAuth = useSelector((state) => state.teachers);

  const loading = role === "student" ? studentAuth.loading : teacherAuth.loading;
  const error = role === "student" ? studentAuth.error : teacherAuth.error;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (role === "student") {
      dispatch(loginStudent({ 
        phone: formData.phone, 
        password: formData.password 
      }));
    } else {
      dispatch(loginTeacher({ 
        email: formData.email, 
        password: formData.password 
      }));
    }
  };

  useEffect(() => {
    if (studentAuth.isAuthenticated) {
      toast.success("Student Login Successful!");
      setTimeout(() => navigate("/student/profile"), 1000);
    }

    if (teacherAuth.isAuthenticated) {
      toast.success("Welcome Teacher! Redirecting to Dashboard...");
      setTimeout(() => navigate("/dashboard/teacher"), 1000);
    }

  
    if (error) {
      toast.error(error);
      dispatch(role === "student" ? clearStudentError() : clearTeacherError());
    }
  }, [studentAuth.isAuthenticated, teacherAuth.isAuthenticated, error, navigate, dispatch, role]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] relative overflow-hidden px-4 text-white font-sans">
      <Toaster position="top-right" reverseOrder={false} />
      
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="w-full max-w-md bg-white/5 backdrop-blur-2xl rounded-[2.5rem] p-10 border border-white/10 z-10 shadow-2xl"
      >
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-black uppercase tracking-tighter text-indigo-400">Portal Access</h2>
          <p className="text-gray-400 text-[10px] mt-2 font-bold tracking-[0.2em] uppercase">School Management SaaS</p>
        </div>

        {/* Role Switcher */}
        <div className="flex bg-white/5 p-1.5 rounded-2xl mb-8 border border-white/5 shadow-inner">
          <button
            type="button"
            onClick={() => setRole("student")}
            className={`flex-1 py-3 rounded-xl text-xs font-black transition-all ${role === "student" ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30" : "text-gray-500 hover:text-gray-300"}`}
          >STUDENT</button>
          <button
            type="button"
            onClick={() => setRole("teacher")}
            className={`flex-1 py-3 rounded-xl text-xs font-black transition-all ${role === "teacher" ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30" : "text-gray-500 hover:text-gray-300"}`}
          >TEACHER</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {role === "student" ? (
            <div className="space-y-2">
              <label className="text-gray-400 text-[10px] uppercase font-bold ml-1 tracking-widest">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="01XXXXXXXXX"
                className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all text-sm"
              />
            </div>
          ) : (
            <div className="space-y-2">
              <label className="text-gray-400 text-[10px] uppercase font-bold ml-1 tracking-widest">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="teacher@gmail.com"
                className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all text-sm"
              />
            </div>
          )}

          <div className="space-y-2">
            <label className="text-gray-400 text-[10px] uppercase font-bold ml-1 tracking-widest">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-indigo-400 hover:text-indigo-300 uppercase transition-colors"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full py-5 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-xs tracking-[0.2em] shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all uppercase mt-4 disabled:opacity-50"
          >
            {loading ? "Authenticating..." : `Login as ${role}`}
          </motion.button>
        </form>

        <p className="mt-8 text-center text-gray-500 text-[10px] font-medium italic">
          Authorized personal only. For support contact IT office.
        </p>
      </motion.div>
    </div>
  );
}

export default Login;