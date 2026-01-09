import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const attendanceData = [
  { month: "Jan", attendance: 95 },
  { month: "Feb", attendance: 96 },
  { month: "Mar", attendance: 97 },
  { month: "Apr", attendance: 98 },
  { month: "May", attendance: 97 },
  { month: "Jun", attendance: 99 },
];

const feesData = [
  { month: "Jan", fees: 50000 },
  { month: "Feb", fees: 60000 },
  { month: "Mar", fees: 55000 },
  { month: "Apr", fees: 70000 },
  { month: "May", fees: 65000 },
  { month: "Jun", fees: 72000 },
];

function DashboardCharts() {
  return (
    <div className="mt-10 grid md:grid-cols-2 gap-6">

      {/* Attendance Trend */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
          Attendance Trend
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={attendanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
            <XAxis dataKey="month" stroke="#8884d8" />
            <YAxis stroke="#8884d8" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="attendance"
              stroke="#4f46e5"
              strokeWidth={3}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Fees Collection */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
          Fees Collection
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={feesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
            <XAxis dataKey="month" stroke="#8884d8" />
            <YAxis stroke="#8884d8" />
            <Tooltip />
            <Bar dataKey="fees" fill="#4f46e5" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

export default DashboardCharts;
