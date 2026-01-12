import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { loginStudent, clearError } from "../../redux/slices/student/studentSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    phone: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const { loading, error, isAuthenticated } = useSelector((state) => state.student);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginStudent({ phone: formData.phone, password: formData.password }));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/student/profile");
    }

    if (error) {
      alert(error);
      dispatch(clearError());
    }
  }, [isAuthenticated, error, navigate, dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] relative overflow-hidden px-4 font-sans text-white">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/5 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl p-10 border border-white/10 z-10"
      >
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-indigo-600 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-2xl shadow-indigo-500/20">
            <svg
              viewBox="0 0 24 24"
              className="h-14 w-14 text-white"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22 10L12 5L2 10L12 15L22 10Z"
                fill="currentColor"
                fillOpacity="0.2"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 12V17C6 17 8 20 12 20C16 20 18 17 18 17V12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M22 10V15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="12"
                cy="13"
                r="4"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M7 21C7 19 8.5 17.5 10 17L12 18.5L14 17C15.5 17.5 17 19 17 21"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-black tracking-tight uppercase">
            Student Portal
          </h2>
          <p className="text-gray-400 text-sm mt-2 font-medium tracking-wide">Enter your details to access your profile</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Phone Input */}
          <div>
            <label className="text-gray-400 text-[11px] uppercase font-bold mb-2 ml-1 block tracking-widest">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="01XXXXXXXXX"
              className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none text-white transition-all placeholder:text-gray-600 font-medium"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="text-gray-400 text-[11px] uppercase font-bold mb-2 ml-1 block tracking-widest">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none text-white transition-all placeholder:text-gray-600"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-indigo-400 hover:text-indigo-300 transition-colors uppercase tracking-tighter"
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
            className="w-full py-5 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-xs tracking-[0.2em] shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all disabled:opacity-50 uppercase mt-4"
          >
            {loading ? "Verifying..." : "Login"}
          </motion.button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-xs">
            Forgot your password? <span className="text-indigo-400 cursor-pointer font-bold">Contact Office</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;