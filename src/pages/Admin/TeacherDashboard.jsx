import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { 
  Calendar as CalendarIcon, 
  Users, 
  UserPlus, 
  ClipboardCheck, 
  BookOpen, 
  ArrowRight,
  MoreVertical
} from "lucide-react";
import { motion } from "framer-motion";

// Actions
import { getTeacherRoutine } from "../../redux/slices/routine_slice"; 

const TeacherDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { teacherRoutine, loading } = useSelector((state) => state.routine);
  const { profile } = useSelector((state) => state.teachers);

  useEffect(() => {
    dispatch(getTeacherRoutine());
  }, [dispatch]);

  const today = new Date().toLocaleDateString('en-GB', { 
    day: 'numeric', month: 'short', year: 'numeric' 
  });

  return (
    <div className="p-6 bg-[#f4f7fe] min-h-screen font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* --- Top Profile Section --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-5">
            <div className="relative">
              <img 
                src={profile?.image || "https://ui-avatars.com/api/?name=" + profile?.name} 
                alt="Teacher" 
                className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-100"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">Welcome, {profile?.name || "Teacher"}</h1>
              <p className="text-sm text-slate-500 font-medium">{profile?.designation || "Senior Instructor"} • {profile?.department || "Academic"}</p>
            </div>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-xl">
            <CalendarIcon size={18} className="text-indigo-600" />
            <span className="text-sm font-bold text-slate-600">{today}</span>
          </div>
        </div>

        {/* --- Quick Action Grid --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <QuickActionCard 
            icon={<ClipboardCheck className="text-indigo-600" />} 
            title="Add Attendance" 
            desc="Mark today's presence"
            onClick={() => navigate("/dashboard/teacher/atten")}
            color="bg-indigo-50"
          />
          <QuickActionCard 
            icon={<UserPlus className="text-emerald-600" />} 
            title="Add Marks" 
            desc="Input exam results"
            onClick={() => {}} 
            color="bg-emerald-50"
          />
          <QuickActionCard 
            icon={<Users className="text-orange-600" />} 
            title="My Students" 
            desc="View student list"
            onClick={() => {}} 
            color="bg-orange-50"
          />
          <QuickActionCard 
            icon={<BookOpen className="text-purple-600" />} 
            title="Resources" 
            desc="Upload study material"
            onClick={() => {}} 
            color="bg-purple-50"
          />
        </div>

        {/* --- Bottom Content: Routine & Stats --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Today's Classes */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-800">Today's Schedule</h3>
              <button className="text-indigo-600 text-sm font-bold hover:underline">Full Routine</button>
            </div>
            
            <div className="space-y-4">
              {teacherRoutine?.length > 0 ? (
                teacherRoutine.slice(0, 4).map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-200 transition-all group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white flex flex-col items-center justify-center shadow-sm text-indigo-600">
                        <span className="text-xs font-black leading-none">{item.periodId?.periodNumber || idx+1}</span>
                        <span className="text-[8px] uppercase font-bold text-slate-400 tracking-tighter">Period</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 text-sm group-hover:text-indigo-600 transition-colors">
                          {item.subjectId?.name || "Regular Class"}
                        </h4>
                        <p className="text-xs text-slate-500 font-medium">
                          Section: {item.sectionId?.name} • Room: {item.roomId?.roomNumber || "N/A"}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                       <p className="text-xs font-bold text-slate-700">{item.periodId?.startTime || "09:00 AM"}</p>
                       <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"><MoreVertical size={16}/></button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 border-2 border-dashed border-slate-100 rounded-2xl">
                  <p className="text-sm text-slate-400 font-medium">No classes scheduled for today.</p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Stats/Notice */}
          <div className="space-y-6">
            <div className="bg-indigo-600 rounded-3xl p-6 text-white shadow-lg shadow-indigo-100 relative overflow-hidden">
               <div className="relative z-10">
                 <p className="text-indigo-100 text-xs font-bold uppercase tracking-wider mb-1">Attendance Rate</p>
                 <h2 className="text-4xl font-black mb-4">92%</h2>
                 <p className="text-xs text-indigo-100 leading-relaxed">Overall student presence for your classes this month.</p>
               </div>
               <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
              <h3 className="text-md font-bold text-slate-800 mb-4">Quick Notice</h3>
              <div className="p-4 rounded-2xl bg-orange-50 border border-orange-100">
                 <p className="text-xs text-orange-700 font-bold leading-relaxed">
                   Faculty meeting at 02:00 PM in the Conference Hall. All teachers must attend.
                 </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

// --- Sub Component for Quick Actions ---
const QuickActionCard = ({ icon, title, desc, onClick, color }) => (
  <motion.div 
    whileHover={{ y: -3 }}
    onClick={onClick}
    className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4 cursor-pointer hover:shadow-md transition-all group"
  >
    <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
    <div className="overflow-hidden">
      <h3 className="font-bold text-slate-800 text-sm tracking-tight">{title}</h3>
      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest truncate">{desc}</p>
    </div>
    <ArrowRight size={14} className="ml-auto text-slate-300 group-hover:text-indigo-600 transition-colors" />
  </motion.div>
);

export default TeacherDashboard;