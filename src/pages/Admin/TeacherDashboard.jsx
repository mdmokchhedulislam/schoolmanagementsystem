import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { 
  Calendar as CalendarIcon, 
  Users, 
  UserPlus, 
  ClipboardCheck, 
  BookOpen, 
  ArrowRight,
  Clock,
  Lock
} from "lucide-react";
import { motion } from "framer-motion";
import { getTeacherRoutine } from "../../redux/slices/routine_slice"; 

const TeacherDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showFullWeek, setShowFullWeek] = useState(false);

  const { teacherRoutine, loading } = useSelector((state) => state.routine);
  const { profile } = useSelector((state) => state.teachers);

  useEffect(() => {
    dispatch(getTeacherRoutine());
  }, [dispatch]);

  const todayName = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const displayDate = new Date().toLocaleDateString('en-GB', { 
    day: 'numeric', month: 'short', year: 'numeric' 
  });

  // Period active kina check korar function
  const isPeriodActive = (startTime, endTime, day) => {
    if (day !== todayName) return false;

    const now = new Date();
    const [startH, startM] = startTime.split(':').map(Number);
    const [endH, endM] = endTime.split(':').map(Number);
    
    const start = new Date();
    start.setHours(startH, startM, 0);
    
    const end = new Date();
    end.setHours(endH, endM, 0);

    return now >= start && now <= end;
  };

  const filteredRoutine = showFullWeek 
    ? teacherRoutine 
    : teacherRoutine?.filter(day => day._id === todayName);

  return (
    <div className="p-6 bg-[#f4f7fe] min-h-screen font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* --- Header --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-5">
            <div className="relative">
              <img 
                src={profile?.image || `https://ui-avatars.com/api/?name=${profile?.name || "Teacher"}&background=6366f1&color=fff`} 
                alt="Teacher" 
                className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-100"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">Welcome, {profile?.name || "Teacher"}</h1>
              <p className="text-sm text-slate-500 font-medium">{profile?.designation || "Faculty"} • {profile?.department || "Academic"}</p>
            </div>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-xl">
            <CalendarIcon size={18} className="text-indigo-600" />
            <span className="text-sm font-bold text-slate-600">{displayDate} ({todayName})</span>
          </div>
        </div>

        {/* --- Stats --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <QuickActionCard icon={<ClipboardCheck className="text-indigo-600" />} title="Attendance" desc="Quick Link" onClick={() => navigate("/dashboard/teacher/atten")} color="bg-indigo-50" />
          <QuickActionCard icon={<UserPlus className="text-emerald-600" />} title="Add Marks" desc="Input results" onClick={() => {}} color="bg-emerald-50" />
          <QuickActionCard icon={<Users className="text-orange-600" />} title="Students" desc="View list" onClick={() => {}} color="bg-orange-50" />
          <QuickActionCard icon={<BookOpen className="text-purple-600" />} title="Resources" desc="Study material" onClick={() => {}} color="bg-purple-50" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-800">
                {showFullWeek ? "Full Weekly Routine" : "Today's Schedule"}
              </h3>
              <button 
                onClick={() => setShowFullWeek(!showFullWeek)}
                className="px-4 py-1.5 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-full border border-indigo-100 hover:bg-indigo-100 transition-colors"
              >
                {showFullWeek ? "Show Today" : "Weekly View"}
              </button>
            </div>
            
            <div className="space-y-6">
              {loading ? (
                <div className="text-center py-10"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div></div>
              ) : filteredRoutine?.length > 0 ? (
                filteredRoutine.map((dayGroup) => (
                  <div key={dayGroup._id} className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${dayGroup._id === todayName ? 'bg-emerald-500' : 'bg-indigo-400'}`}></div>
                      <h4 className="text-sm font-black text-slate-500 uppercase tracking-widest">
                        {dayGroup._id} {dayGroup._id === todayName && <span className="text-[10px] text-emerald-600 ml-2">(Today)</span>}
                      </h4>
                    </div>
                    
                    <div className="grid gap-3">
                      {dayGroup.myClasses?.map((cls) => {
                        const active = isPeriodActive(cls.startTime, cls.endTime, dayGroup._id);
                        
                        return (
                          <div key={cls._id} className={`flex items-center justify-between p-4 rounded-2xl border transition-all group ${active ? 'bg-indigo-50 border-indigo-200' : 'bg-slate-50 border-slate-100'}`}>
                            <div className="flex items-center gap-4">
                              <div className={`w-10 h-10 rounded-xl flex flex-col items-center justify-center shadow-sm border ${active ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-indigo-600 border-slate-100'}`}>
                                <span className="text-xs font-black">{cls.periodNumber}</span>
                                <span className="text-[6px] uppercase font-bold opacity-80">Period</span>
                              </div>
                              <div>
                                <h4 className="font-bold text-slate-800 text-sm">Class: {cls.className?.toUpperCase()} ({cls.sectionName})</h4>
                                <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                                  <Clock size={12} className={active ? "text-indigo-500" : "text-slate-400"} />
                                  <span className={active ? "text-indigo-700 font-bold" : ""}>{cls.startTime} - {cls.endTime}</span>
                                  {active && <span className="ml-2 px-1.5 py-0.5 bg-indigo-100 text-indigo-600 rounded text-[9px] animate-pulse uppercase">Live Now</span>}
                                </div>
                              </div>
                            </div>
                            
                            <button 
                              disabled={!active}
                              onClick={() => navigate("/dashboard/teacher/atten")} 
                              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                                active 
                                ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-100' 
                                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                              }`}
                            >
                              {active ? <ClipboardCheck size={14} /> : <Lock size={14} />}
                              {active ? "Take Attendance" : "Locked"}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 border-2 border-dashed border-slate-100 rounded-2xl">
                  <p className="text-sm text-slate-400 font-medium">No classes scheduled.</p>
                </div>
              )}
            </div>
          </div>

          {/* --- Right Sidebar --- */}
          <div className="space-y-6">
            <div className="bg-indigo-600 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
               <div className="relative z-10">
                 <p className="text-indigo-100 text-xs font-bold uppercase tracking-wider">Attendance Rate</p>
                 <h2 className="text-4xl font-black my-2">92%</h2>
                 <p className="text-[10px] text-indigo-200 uppercase font-bold tracking-tight">Updated for this month</p>
               </div>
               <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
              <h3 className="text-md font-bold text-slate-800 mb-4 text-center">Quick Notice</h3>
              <div className="p-4 rounded-2xl bg-orange-50 border border-orange-100">
                 <p className="text-xs text-orange-700 font-bold leading-relaxed text-center">
                   Faculty meeting at 02:00 PM today.
                 </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const QuickActionCard = ({ icon, title, desc, onClick, color }) => (
  <motion.div whileHover={{ y: -3 }} onClick={onClick} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 cursor-pointer group">
    <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>{icon}</div>
    <div className="overflow-hidden">
      <h3 className="font-bold text-slate-800 text-xs tracking-tight">{title}</h3>
      <p className="text-[9px] text-slate-400 font-bold uppercase truncate">{desc}</p>
    </div>
  </motion.div>
);

export default TeacherDashboard;