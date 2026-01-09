import React, { useState } from "react";

function AdminLogin() {
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
    console.log(formData);
    // later -> API call here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 px-4">
      
      <div className="w-full max-w-md bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/30">
        
        <h2 className="text-3xl font-extrabold text-white text-center mb-2">
          Admin Login
        </h2>
        <p className="text-center text-white/80 mb-8">
          Login to School Management System
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Email */}
          <div>
            <label className="text-white text-sm mb-1 block">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="admin@email.com"
              required
              className="w-full px-4 py-3 rounded-xl bg-white/80 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-500 transition"
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
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 rounded-xl bg-white/80 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-500 transition"
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
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-lg hover:scale-[1.02] hover:shadow-xl transition"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-6 space-y-2">
          <p className="text-white/80 text-sm">
            Forgot password?
            <span className="underline font-semibold cursor-pointer ml-1">
              Reset
            </span>
          </p>

          <p className="text-white/80 text-sm">
            Don’t have an admin account?
            <span className="underline font-semibold cursor-pointer ml-1">
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
