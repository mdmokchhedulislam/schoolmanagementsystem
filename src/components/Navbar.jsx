import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice"; // Admin logout
import { logoutStudent } from "../redux/slices/student/studentSlice"; // Student logout
import { fetchSchoolProfile } from "../redux/slices/schoolSlice";
import { 
  User, 
  LogOut, 
  LayoutDashboard, 
  ChevronDown, 
  Sun, 
  Moon, 
  LogIn,
  School as SchoolIcon 
} from "lucide-react";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const { token: adminToken, admin, isAuthenticated: isAdminAuth } = useSelector((state) => state.auth);
  const { student, token: studentToken, isAuthenticated: isStudentAuth } = useSelector((state) => state.student);

  
  const { school } = useSelector((state) => state.school);


  const isAuthenticated = isAdminAuth || isStudentAuth;
  const userType = isAdminAuth ? "admin" : isStudentAuth ? "student" : null;
  const currentUser = isAdminAuth ? admin : student;

  useEffect(() => {
    if (adminToken) dispatch(fetchSchoolProfile());
  }, [adminToken, dispatch]);

  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    if (userType === "admin") {
      dispatch(logout());
    } else {
      dispatch(logoutStudent());
    }
    setDropdown(false);
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b dark:border-slate-700">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Left: Branding */}
        <div className="flex items-center gap-2">
          <Link to="/" className="text-2xl font-extrabold flex items-center gap-1 group">
            <span className="text-blue-600 group-hover:scale-105 transition-transform duration-200">School</span>
            <span className="text-slate-800 dark:text-white">Manager</span>
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <button onClick={() => setDark(!dark)} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            {dark ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-slate-600" />}
          </button>

          <div className="relative" ref={dropdownRef}>
            {isAuthenticated ? (
              <button
                onClick={() => setDropdown(!dropdown)}
                className="flex items-center gap-2 px-2 py-1.5 rounded-xl bg-blue-50/50 dark:bg-slate-800/50 border border-blue-100 dark:border-slate-700 hover:shadow-sm transition-all active:scale-95"
              >
              
                {userType === "admin" ? (
                  <>
                    <div className="bg-blue-600 p-1.5 rounded-lg text-white">
                      <SchoolIcon size={18} />
                    </div>
                    <span className="font-bold text-slate-700 dark:text-slate-200 hidden sm:block max-w-[150px] truncate ml-1">
                      {school?.name || "Admin"}
                    </span>
                  </>
                ) : (
                  <div className="flex items-center gap-2">
                    <img 
                      src={currentUser?.image || "https://via.placeholder.com/150"} 
                      alt="User" 
                      className="w-8 h-8 rounded-lg object-cover border border-blue-200 dark:border-slate-600"
                    />
                    <span className="font-bold text-slate-700 dark:text-slate-200 hidden sm:block max-w-[120px] truncate">
                      {currentUser?.name?.split(' ')[0]}
                    </span>
                  </div>
                )}
                <ChevronDown size={14} className={`text-slate-400 transition-transform duration-300 ml-1 ${dropdown ? 'rotate-180' : ''}`} />
              </button>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 dark:shadow-none active:scale-95"
              >
                <LogIn size={18} />
                <span>Login</span>
              </Link>
            )}

            <AnimatePresence>
              {dropdown && isAuthenticated && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 15, scale: 0.95 }}
                  className="absolute right-0 mt-3 w-60 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 py-2 overflow-hidden z-[60]"
                >
                  <div className="px-4 py-3 border-b dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 mb-1">
                    <p className="text-[10px] text-blue-600 dark:text-blue-400 uppercase font-black tracking-widest">
                      Logged in as {userType}
                    </p>
                    <p className="text-sm font-bold text-slate-800 dark:text-white truncate">
                      {userType === "admin" ? (admin?.name || "School Admin") : student?.name}
                    </p>
                  </div>

                  <div className="px-2 space-y-1">
                    <Link 
                      to={userType === "admin" ? "/admin/dashboard" : "/student/profile"} 
                      onClick={() => setDropdown(false)} 
                      className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-600 rounded-lg transition-colors"
                    >
                      <LayoutDashboard size={18} /> Dashboard
                    </Link>
                    <Link 
                      to={userType === "admin" ? "/profile" : "/student/profile"} 
                      onClick={() => setDropdown(false)} 
                      className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-600 rounded-lg transition-colors"
                    >
                      <User size={18} /> My Profile
                    </Link>
                  </div>

                  <div className="border-t dark:border-slate-700 my-2 mx-2"></div>

                  <div className="px-2">
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                      <LogOut size={18} /> Logout
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;