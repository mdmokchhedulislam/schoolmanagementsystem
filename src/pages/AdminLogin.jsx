import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../redux/slices/authSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { adminLogin } from "../redux/slices/authSlice";

function AdminLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { admin, loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(loginAdmin(formData));
    console.log("login successfully");
    navigate("/admin/dashboard")
    
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 px-4">
      <div className="w-full max-w-md bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/30">
        <h2 className="text-3xl font-extrabold text-white text-center mb-2">
          Admin Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="text-white text-sm block mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-white text-sm block mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3 text-sm"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-300 text-sm text-center">{error}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
