import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { 
  User, BookOpen, Clock, GraduationCap, 
  ClipboardList, Mail, List, Layers, ShieldCheck,
  CheckCircle2, AlertCircle
} from "lucide-react";
import { fetchAllStudents } from "../../redux/slices/studentSlice";
import { fetchTeacherProfile } from "../../redux/slices/teacherSlice";
import { fetchTeacherMyClasses } from "../../redux/slices/class_assainSlice"; 

const TeacherDashboard = () => {
  const dispatch = useDispatch();
  
  // Redux States
  const { profile, loading } = useSelector((state) => state.teachers);
  const { students } = useSelector((state) => state.students);
  const { myClasses } = useSelector((state) => state.classAssain); 
  console.log("class is", myClasses);
  

  useEffect(() => {
    dispatch(fetchTeacherProfile());
    dispatch(fetchAllStudents()); 
    dispatch(fetchTeacherMyClasses());
  }, [dispatch]);

  
  const stats = [
    { 
      title: "My Assigned Classes", 
      count: myClasses?.length || "0", 
      icon: <BookOpen />, 
      color: "bg-orange-500" 
    },
    { 
      title: "Total Students", 
      count: students?.length || "0", 
      icon: <GraduationCap />, 
      color: "bg-blue-500" 
    },
    { 
      title: "Authorized Sections", 
      count: myClasses ? [...new Set(myClasses.map(item => item.sectionName))].length : "0", 
      icon: <Layers />, 
      color: "bg-emerald-500" 
    },
  ];

  if (loading && !profile) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-[#f8fafc]">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-indigo-600 font-black tracking-widest uppercase text-xs">Loading Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#f8fafc] min-h-screen font-sans text-slate-900">
      {/* --- প্রোফাইল হেডার --- */}
      <header className="mb-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col md:flex-row items-center gap-8"
        >
          <div className="relative">
            <div className="h-28 w-28 rounded-3xl bg-indigo-600 flex items-center justify-center text-white shadow-xl shadow-indigo-100">
              <User size={56} />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1.5 rounded-xl border-4 border-white">
              <CheckCircle2 size={16} />
            </div>
          </div>
          
          <div className="text-center md:text-left flex-1">
            <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-2">
              Hello, {profile?.name || "Teacher"}!
            </h1>
            <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start">
              <p className="text-slate-500 font-bold flex items-center gap-2 text-sm">
                <Mail size={16} className="text-indigo-400" /> {profile?.email}
              </p>
              <span className="h-1.5 w-1.5 rounded-full bg-slate-300 hidden md:block"></span>
              <p className="text-slate-500 font-bold text-sm uppercase tracking-wider">
                Teacher ID: <span className="text-indigo-600">{profile?._id?.slice(-6)}</span>
              </p>
            </div>
            <div className="mt-5">
              <span className="px-5 py-2 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.15em] shadow-lg shadow-indigo-100 flex items-center w-fit gap-2 mx-auto md:mx-0">
                <ShieldCheck size={14} /> Verified {profile?.role}
              </span>
            </div>
          </div>
        </motion.div>
      </header>

      {/* --- স্ট্যাটাস কার্ডস --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {stats.map((item, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
            className="bg-white p-7 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-6"
          >
            <div className={`${item.color} p-5 rounded-[1.5rem] text-white shadow-2xl shadow-opacity-20`}>
              {React.cloneElement(item.icon, { size: 28 })}
            </div>
            <div>
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">{item.title}</p>
              <h3 className="text-4xl font-black text-slate-800 tracking-tighter">{item.count}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-8">
        {/* --- মাই ক্লাস রুটিন (৩ কলাম) --- */}
        <div className="lg:col-span-3 bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-black text-slate-800 flex items-center gap-3 uppercase tracking-tight">
              <Layers className="text-orange-500" size={24} /> Authorized Classes
            </h2>
            <span className="text-[10px] font-black text-slate-400 bg-slate-50 px-3 py-1 rounded-full uppercase">
              Current Session
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 overflow-y-auto max-h-[500px] pr-2 custom-scrollbar">
            {myClasses?.length > 0 ? (
              myClasses.map((item, i) => (
                <div key={i} className="group flex items-center p-6 bg-slate-50 rounded-[2rem] border border-slate-100 hover:bg-indigo-600 transition-all duration-300">
                  <div className="h-14 w-14 rounded-2xl bg-white flex items-center justify-center text-indigo-600 font-black text-xl shadow-sm group-hover:scale-90 transition-transform">
                    {item.className?.charAt(0) || "C"}
                  </div>
                  <div className="ml-5 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-black text-slate-800 group-hover:text-white text-lg transition-colors">{item.subjectName}</h4>
                      <span className="px-2 py-0.5 bg-indigo-100 text-indigo-600 text-[8px] font-black rounded uppercase group-hover:bg-indigo-500 group-hover:text-white">
                        {item.subjectType}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider group-hover:text-indigo-100">
                      Class: {item.className} • Section: {item.sectionName}
                    </p>
                  </div>
                  <div className="bg-white px-4 py-2 rounded-2xl shadow-sm text-center group-hover:bg-indigo-500 group-hover:border-transparent transition-all border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 group-hover:text-white uppercase leading-none mb-1">Year</p>
                    <p className="font-black text-slate-800 group-hover:text-white leading-none">{item.academicYear}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200">
                <AlertCircle className="mx-auto text-slate-300 mb-3" size={40} />
                <p className="text-slate-400 font-bold uppercase text-xs tracking-widest">No classes assigned to you yet.</p>
              </div>
            )}
          </div>
        </div>


        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 h-full">
            <h2 className="text-xl font-black text-slate-800 flex items-center gap-3 mb-8 uppercase tracking-tight">
              <ClipboardList className="text-indigo-600" size={24} /> Quick Management
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <button 
                disabled={!myClasses || myClasses.length === 0}
                className="flex items-center justify-between p-7 bg-indigo-600 text-white rounded-[2rem] font-black text-sm uppercase shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                <div className="text-left">
                  <span>Mark Attendance</span>
                  <p className="text-[10px] font-medium normal-case opacity-80">Only for your assigned classes</p>
                </div>
                <Clock size={24} className="group-hover:rotate-12 transition-transform" />
              </button>

              <button className="flex items-center justify-between p-7 bg-emerald-50 text-emerald-700 rounded-[2rem] font-black text-sm uppercase hover:bg-emerald-600 hover:text-white transition-all group">
                Upload Exam Marks
                <GraduationCap size={24} className="group-hover:-translate-y-1 transition-transform" />
              </button>

              <div className="p-6 bg-orange-50 rounded-[2rem] border border-orange-100">
                <p className="text-orange-800 font-black text-[10px] uppercase tracking-widest mb-2 flex items-center gap-2">
                  <AlertCircle size={14}/> Important Note
                </p>
                <p className="text-orange-700 text-xs font-medium leading-relaxed">
                  Dadu, as the class teacher, you are responsible for student attendance and academic updates for the classes listed on the left.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- স্টুডেন্ট কন্টাক্ট লিস্ট --- */}
      <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <h2 className="text-2xl font-black text-slate-800 flex items-center gap-4 uppercase tracking-tight">
            <List className="text-blue-600" size={28} /> Student Directory
          </h2>
          <div className="flex items-center bg-slate-50 p-2 rounded-2xl border border-slate-100">
            <span className="px-5 py-2 bg-white shadow-sm text-blue-600 rounded-xl text-xs font-black uppercase tracking-widest">
              {students?.length || 0} Total Students
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-400 text-[10px] uppercase font-black tracking-[0.2em] border-b border-slate-100">
                <th className="pb-6 pl-4">Full Name</th>
                <th className="pb-6">Email Address</th>
                <th className="pb-6">Status</th>
                <th className="pb-6 text-right pr-6">Management</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {students?.length > 0 ? (
                students.map((student, idx) => (
                  <tr key={idx} className="group hover:bg-slate-50/80 transition-all">
                    <td className="py-6 pl-4">
                      <div className="flex items-center gap-4">
                        <div className="h-11 w-11 rounded-2xl bg-slate-100 flex items-center justify-center font-black text-sm text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                          {student.name?.charAt(0)}
                        </div>
                        <span className="font-black text-slate-700 text-base">{student.name}</span>
                      </div>
                    </td>
                    <td className="py-6 text-slate-500 text-sm font-bold tracking-tight">
                      {student.email || <span className="text-slate-300 italic font-normal">not-assigned</span>}
                    </td>
                    <td className="py-6">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Active</span>
                      </div>
                    </td>
                    <td className="py-6 text-right pr-6">
                      <button className="px-5 py-2 bg-white border border-slate-200 text-indigo-600 font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-indigo-600 hover:text-white hover:border-transparent transition-all">
                        View Profile
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-10 text-center text-slate-400 font-bold italic uppercase text-xs">No student data found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;