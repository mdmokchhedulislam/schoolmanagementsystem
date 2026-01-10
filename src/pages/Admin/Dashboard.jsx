import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fetchAllStudents } from "../../redux/slices/studentSlice";
import DashboardStats from "../../components/Dashboard/Stats";
import { PlusCircle, Users, School, UserPlus } from "lucide-react"; // আইকন লাইব্রেরি

function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { students } = useSelector((state) => state.students);

  useEffect(() => {
    dispatch(fetchAllStudents());
  }, [dispatch]);

  // কুইক অ্যাকশন বাটন লিস্ট
  const quickActions = [
    { title: "Add Student", path: "/admin/dashboard/addstudent", icon: <UserPlus />, color: "bg-blue-600" },
    { title: "Add Teacher", path: "/admin/dashboard/addteacher", icon: <Users />, color: "bg-indigo-600" },
    { title: "Add Class", path: "/admin/dashboard/addclass", icon: <School />, color: "bg-emerald-600" },
  ];

  return (
    <div className="p-8 bg-[#f8fafc] min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">Admin Dashboard</h1>
          <p className="text-slate-500 mt-1">Welcome back! Here's what's happening today.</p>
        </div>
        
        {/* Quick Action Buttons - Desktop */}
        <div className="flex gap-3 mt-4 md:mt-0">
          {quickActions.map((action, idx) => (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(action.path)}
              className={`flex items-center gap-2 ${action.color} text-white px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-indigo-200 transition-all`}
            >
              {action.icon}
              <span>{action.title}</span>
            </motion.button>
          ))}
        </div>
      </div>

      <DashboardStats students={students} />

      {/* Quick Access Grid - Visual Cards (Optional but looks great) */}
      <div className="mt-10">
        <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <PlusCircle className="text-indigo-600" size={24} />
          Management Shortcuts
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickActions.map((action, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              onClick={() => navigate(action.path)}
              className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl cursor-pointer transition-all flex items-center gap-5 group"
            >
              <div className={`${action.color} text-white p-4 rounded-2xl group-hover:rotate-12 transition-transform`}>
                {action.icon}
              </div>
              <div>
                <h3 className="font-bold text-slate-800">{action.title}</h3>
                <p className="text-sm text-slate-500">Create new entry</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;