import React, { useState } from "react";

function AdminSignup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    schoolId: "",
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
          Admin Registration
        </h2>
        <p className="text-center text-white/80 mb-8">
          Register admin for school system
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
          <div>
            <label className="text-white text-sm mb-1 block">Admin Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Admin Name"
              required
              className="w-full px-4 py-3 rounded-xl bg-white/80 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

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
                placeholder="Admin@123"
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

          {/* School ID */}
          <div>
            <label className="text-white text-sm mb-1 block">School ID</label>
            <input
              type="text"
              name="schoolId"
              value={formData.schoolId}
              onChange={handleChange}
              placeholder="6960c1fbd99cf54eea7a30d1"
              required
              className="w-full px-4 py-3 rounded-xl bg-white/80 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-lg hover:scale-[1.02] hover:shadow-xl transition"
          >
            Register Admin
          </button>
        </form>

        <p className="text-center text-white/80 mt-6 text-sm">
          Already registered?{" "}
          <span className="underline font-semibold cursor-pointer">
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default AdminSignup;
