import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
// import { fetchTeacherProfile } from "../../../redux/slices/teacherSlice"; 
// import { fetchAllStudents } from "../../../redux/slices/studentSlice";
import { 
  User, BookOpen, Calendar, Clock, 
  GraduationCap, ClipboardList, Mail, List
} from "lucide-react";
import { fetchAllStudents } from "../../redux/slices/studentSlice";
import { fetchTeacherProfile } from "../../redux/slices/teacherSlice";

const TeacherDashboard = () => {
  const dispatch = useDispatch();
  
  const { profile, loading } = useSelector((state) => state.teachers);
  const { students } = useSelector((state) => state.students);
  console.log(profile);
  
  
  

  useEffect(() => {
    dispatch(fetchTeacherProfile());
    dispatch(fetchAllStudents()); 
  }, [dispatch]);

  const stats = [
    { title: "My Classes", count: "05", icon: <BookOpen />, color: "bg-orange-500" },
    { title: "Total Students", count: students?.length || "0", icon: <GraduationCap />, color: "bg-blue-500" },
    { title: "Today's Periods", count: "03", icon: <Clock />, color: "bg-emerald-500" },
  ];

  if (loading && !profile) {
    return <div className="flex justify-center items-center h-screen text-indigo-600 font-bold">Loading Profile...</div>;
  }

  return (
    <div className="p-6 bg-[#f8fafc] min-h-screen">
      {/* Header Section */}
      <header className="mb-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col md:flex-row items-center gap-6"
        >
          <div className="h-24 w-24 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg">
            <User size={48} />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-slate-800">
              Welcome, {profile?.name || "Teacher"}!
            </h1>
            <p className="text-slate-500 font-medium flex items-center gap-2 justify-center md:justify-start">
              <Mail size={16} /> {profile?.email}
            </p>
            <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
              <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold uppercase tracking-wider">
                Role: {profile?.role}
              </span>
              <span className="px-3 py-1 bg-slate-50 text-slate-600 rounded-full text-xs font-bold">
                ID: {profile?._id?.slice(-6)}
              </span>
            </div>
          </div>
        </motion.div>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {stats.map((item, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-5"
          >
            <div className={`${item.color} p-4 rounded-xl text-white shadow-lg`}>
              {item.icon}
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-400 uppercase tracking-wide">{item.title}</p>
              <h3 className="text-2xl font-bold text-slate-800">{item.count}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Today's Schedule */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-6">
            <Calendar className="text-indigo-600" /> Today's Schedule
          </h2>
          <div className="space-y-4">
            {[{ time: "09:00 AM", sub: "Maths" }, { time: "11:00 AM", sub: "English" }].map((s, i) => (
              <div key={i} className="flex items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="font-bold text-indigo-600 w-24 text-sm">{s.time}</div>
                <div className="flex-1 font-bold text-slate-800">{s.sub}</div>
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Tools */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-6">
            <ClipboardList className="text-orange-500" /> Quick Tools
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 bg-indigo-50 text-indigo-700 rounded-2xl font-bold hover:bg-indigo-100 transition-all">Attendance</button>
            <button className="p-4 bg-orange-50 text-orange-700 rounded-2xl font-bold hover:bg-orange-100 transition-all">Submit Marks</button>
          </div>
        </div>
      </div>

      {/* --- NEW: Student Email List Section --- */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <List className="text-blue-600" /> Student Contact List
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-sm uppercase">
                <th className="p-4 font-bold">Name</th>
                <th className="p-4 font-bold">Email</th>
                <th className="p-4 font-bold">Status</th>
              </tr>
            </thead>
            <tbody>
              {students?.map((student, idx) => (
                <tr key={idx} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 font-semibold text-slate-700">{student.name}</td>
                  <td className="p-4 text-slate-600 flex items-center gap-2">
                    <Mail size={14} className="text-slate-400" /> {student.email || "no-email@school.com"}
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-[10px] font-bold">ACTIVE</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;