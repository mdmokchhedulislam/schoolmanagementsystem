import React from "react";
import { FaUserPlus, FaChalkboardTeacher, FaCalendarCheck, FaDollarSign } from "react-icons/fa";
import { motion } from "framer-motion";

const activities = [
  { text: "New student added: John Doe", icon: <FaUserPlus className="text-blue-500" />, time: "2 mins ago" },
  { text: "Teacher assigned to Class 5A: Mrs. Smith", icon: <FaChalkboardTeacher className="text-green-500" />, time: "10 mins ago" },
  { text: "Attendance marked for Class 6B", icon: <FaCalendarCheck className="text-purple-500" />, time: "30 mins ago" },
  { text: "Fees collected: $500 from Class 4C", icon: <FaDollarSign className="text-yellow-500" />, time: "1 hour ago" },
];

function RecentActivities() {
  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
        Recent Activity
      </h2>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">
        <ul>
          {activities.map((item, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2, duration: 0.4 }}
              className="flex items-center justify-between py-3 border-b last:border-b-0 border-slate-200 dark:border-slate-700"
            >
              <div className="flex items-center gap-3">
                <div className="text-2xl">{item.icon}</div>
                <span className="text-sm text-slate-700 dark:text-slate-300">{item.text}</span>
              </div>
              <span className="text-xs text-slate-400 dark:text-slate-500">{item.time}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default RecentActivities;
