import React from "react";
import { FaUserPlus, FaChalkboardTeacher, FaCalendarCheck, FaFileInvoiceDollar } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // 👈 import useNavigate

const actions = [
  { title: "Student", icon: <FaUserPlus size={24} />, color: "bg-blue-500 hover:bg-blue-600", path: "/dashboard/student" },
  { title: "Teacher", icon: <FaChalkboardTeacher size={24} />, color: "bg-green-500 hover:bg-green-600", path: "/dashboard/teacher" },
  { title: "Mark Attendance", icon: <FaCalendarCheck size={24} />, color: "bg-purple-500 hover:bg-purple-600", path: "/dashboard/attendance" },
  { title: "Generate Report", icon: <FaFileInvoiceDollar size={24} />, color: "bg-yellow-400 hover:bg-yellow-500", path: "/dashboard/report" },
];

function DashboardQuickActions() {
  const navigate = useNavigate(); // 👈 hook to navigate programmatically

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
        Quick Actions
      </h2>
      <div className="grid md:grid-cols-4 gap-6">
        {actions.map((item, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            onClick={() => navigate(item.path)} // 👈 navigate on click
            className={`${item.color} text-white rounded-xl p-6 flex flex-col items-center justify-center shadow-lg hover:scale-105 transform transition`}
          >
            {item.icon}
            <span className="mt-2 font-semibold">{item.title}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

export default DashboardQuickActions;
