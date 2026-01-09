import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Dark Mode
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

  return (
    <header className="sticky top-0 z-50 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-b dark:border-slate-700">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <h1 className="text-2xl font-extrabold">
          <span className="text-blue-600">School</span>
          <span className="text-slate-800 dark:text-white">Manager</span>
        </h1>

        {/* Menu */}
        <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
          {["Features", "Pricing", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="hover:text-blue-600 transition"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-4">

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDark(!dark)}
            className="text-xl"
          >
            {dark ? "🌙" : "☀️"}
          </button>

          {/* Profile */}
          <div className="relative" ref={dropdownRef}>
            <img
              onClick={() => setDropdown(!dropdown)}
              src="https://i.pravatar.cc/40"
              alt="user"
              className="w-9 h-9 rounded-full cursor-pointer border"
            />

            <AnimatePresence>
              {dropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-3 w-44 bg-white dark:bg-slate-800 rounded-xl shadow-lg border dark:border-slate-700 overflow-hidden"
                >
                  <Link to={"/profile"} className="block px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700">
                    Profile
                  </Link>
                  <Link to={'/dashboard'} className="block px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700">
                    Dashboard
                  </Link>
                  <a className="block px-4 py-2 text-red-500 hover:bg-slate-100 dark:hover:bg-slate-700">
                    Logout
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Menu */}
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
            <a className="block">Features</a>
            <a className="block">Pricing</a>
            <a className="block">Contact</a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
