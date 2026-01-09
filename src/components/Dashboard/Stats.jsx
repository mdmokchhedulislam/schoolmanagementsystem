import React from "react";
import { motion } from "framer-motion";

const stats = [
  { title: "Students", value: 2500, icon: "🎓", color: "from-blue-500 to-indigo-500" },
  { title: "Teachers", value: 150, icon: "👩‍🏫", color: "from-green-500 to-teal-500" },
  { title: "Classes", value: 75, icon: "🏫", color: "from-purple-500 to-pink-500" },
  { title: "Attendance", value: "98%", icon: "📅", color: "from-yellow-400 to-orange-500" },
];

function DashboardStats() {
  return (
    <div className="grid md:grid-cols-4 gap-6">
      {stats.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2, duration: 0.6 }}
          className={`bg-gradient-to-r ${item.color} text-white rounded-2xl p-6 shadow-lg hover:scale-105 transform transition`}
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold">{item.title}</h2>
              <p className="text-2xl font-bold mt-2">{item.value.toLocaleString()}</p>
            </div>
            <div className="text-4xl">{item.icon}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default DashboardStats;
