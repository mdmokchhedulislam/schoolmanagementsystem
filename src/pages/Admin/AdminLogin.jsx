import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
// import { loginTeacher, clearTeacherError } from "../redux/slices/teacher/teacherSlice";

function TeacherLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const roles = [
    { id: "head_teacher", label: "Head Teacher" },
    { id: "teacher", label: "Assistant Teacher" },
    { id: "accountant", label: "Accountant" },
  ];

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "teacher", 
  });

  const [showPassword, setShowPassword] = useState(false);

  // const { loading, error, isAuthenticated } = useSelector((state) => state.teacher);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch(loginTeacher(formData));
  };

  // useEffect(() => {
  //   // if (isAuthenticated) {
  //   //   navigate("/teacher/dashboard");
  //   // }
  //   // if (error) {
  //   //   alert(error);
  //   //   dispatch(clearTeacherError());
  //   // }
  // }, [isAuthenticated, error, navigate, dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] relative overflow-hidden px-4 font-sans text-white">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-600/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/5 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl p-8 sm:p-10 border border-white/10 z-10"
      >
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-tr from-emerald-600 to-teal-500 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-2xl shadow-emerald-500/30 ring-4 ring-white/5">
            <svg viewBox="0 0 24 24" className="h-12 w-12 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
          </div>
          <h2 className="text-3xl font-black tracking-tight uppercase leading-none">Teacher Portal</h2>
          <p className="text-gray-400 text-[10px] mt-3 font-bold uppercase tracking-[0.2em]">Select your role and sign in</p>
        </div>

        {/* Role Selector Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 bg-black/40 p-1.5 rounded-2xl">
          {roles.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => setFormData({ ...formData, role: r.id })}
              className={`relative flex-1 py-2 px-1 rounded-xl text-[9px] font-black uppercase tracking-widest z-10 transition-colors duration-300 ${
                formData.role === r.id ? "text-emerald-900" : "text-white/60 hover:text-white"
              }`}
            >
              {formData.role === r.id && (
                <motion.div 
                  layoutId="activeTeacherRole"
                  className="absolute inset-0 bg-emerald-400 rounded-xl z-[-1]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              {r.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <div>
            <label className="text-gray-400 text-[10px] uppercase font-black mb-2 ml-1 block tracking-widest">Official Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="name@school.com"
              className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none text-white transition-all placeholder:text-gray-600 text-sm"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="text-gray-400 text-[10px] uppercase font-black mb-2 ml-1 block tracking-widest">Secret Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none text-white transition-all text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-emerald-400 uppercase"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            // disabled={loading}
            className="w-full py-5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-[11px] tracking-[0.2em] shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all disabled:opacity-50 uppercase mt-2"
          >
            {/* {loading ? "Verifying..." : `Sign In as ${formData.role.replace('_', ' ')}`} */}
          </motion.button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">
            Authorization required. <span className="text-emerald-400 cursor-pointer">Help?</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default TeacherLogin;