import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { fetchSchoolProfile } from "../redux/slices/schoolSlice";

function Navbar() {
  const [open, setOpen] = useState(false); // Mobile menu
  const [dark, setDark] = useState(false); // Dark mode
  const [dropdown, setDropdown] = useState(false); // Profile dropdown
  const dropdownRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux state
  const { token, admin } = useSelector((state) => state.auth);
  const { school } = useSelector((state) => state.school);

  // Fetch school profile
  useEffect(() => {
    if (token) dispatch(fetchSchoolProfile());
  }, [token, dispatch]);

  // Dark mode toggle
  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Logout handler
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const menuItems = ["Features", "Pricing", "Contact"];

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b dark:border-slate-700">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-extrabold">
            <span className="text-blue-600">School</span>
            <span className="text-slate-800 dark:text-white">Manager</span>
          </h1>
        </div>

        {/* Center: Menu */}
        <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
          {menuItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="hover:text-blue-600 transition"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Right: School Name + Profile + Dark Mode */}
        <div className="flex items-center gap-4">

          {/* School Name */}
          {school && (
            <div className="hidden md:block font-semibold text-slate-700 dark:text-slate-200">
              {school.name}
            </div>
          )}

          {/* Dark Mode */}
          <button
            onClick={() => setDark(!dark)}
            className="text-xl"
          >
            {dark ? "🌙" : "☀️"}
          </button>

          {/* Profile Dropdown */}
          {admin && (
            <div className="relative" ref={dropdownRef}>
              <img
                onClick={() => setDropdown(!dropdown)}
                src={admin.avatar || "https://i.pravatar.cc/40"}
                alt="admin"
                className="w-9 h-9 rounded-full cursor-pointer border"
              />
              <AnimatePresence>
                {dropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-3 w-52 bg-white dark:bg-slate-800 rounded-xl shadow-lg border dark:border-slate-700 overflow-hidden"
                  >
                    <div className="px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                      {admin.name || "Admin"}
                    </div>
                    {school && (
                      <div className="px-4 py-1 text-xs text-slate-500 dark:text-slate-300">
                        School: {school.name}
                      </div>
                    )}
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/admin/dashboard"
                      className="block px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-500 hover:bg-slate-100 dark:hover:bg-slate-700"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-2xl dark:text-white"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="md:hidden px-6 py-4 bg-white dark:bg-slate-900 border-t dark:border-slate-700 space-y-3"
          >
            {menuItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block py-1"
              >
                {item}
              </a>
            ))}
            {school && (
              <div className="py-1 font-semibold text-slate-700 dark:text-slate-200">
                {school.name}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
