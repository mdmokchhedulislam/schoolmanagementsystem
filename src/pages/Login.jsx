import React, { useState } from "react";
import { Link } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
    // Backend API call kora jabe ekhane
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 px-6">
      
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl max-w-md w-full p-10 relative overflow-hidden">

        {/* Decorative background circles */}
        <div className="absolute -top-32 -left-32 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -right-32 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl"></div>

        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white text-center mb-8">
          Login to <span className="text-blue-600">SchoolManager</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg transition-all"
          >
            Login
          </button>

          <p className="mt-4 text-center text-sm text-slate-500 dark:text-slate-400">
            Don't have an account?{" "}
            <Link to ={'/signup'}>            
            <span className="text-blue-600 hover:underline cursor-pointer">
              Sign Up
            </span>
            </Link>

          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
