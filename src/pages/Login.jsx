import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../redux/slices/authSlice";


function AdminLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, token } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginAdmin(formData));
  };

  
  useEffect(() => {
    if (token) {
      navigate("/admin/dashboard");
    }
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 px-4">
      <div className="w-full max-w-md bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/30">
        <h2 className="text-3xl font-extrabold text-white text-center mb-2">
          Admin Login
        </h2>
        <p className="text-center text-white/80 mb-8">
          Login to School Management System
        </p>

        {error && (
          <p className="bg-red-500/80 text-white text-sm p-3 rounded-lg mb-4 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="text-white text-sm mb-1 block">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/80 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-white text-sm mb-1 block">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-white/80 focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3 text-sm text-indigo-600 font-semibold"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-lg hover:scale-[1.02] transition disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
