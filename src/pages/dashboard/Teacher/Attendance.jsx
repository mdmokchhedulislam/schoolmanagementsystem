import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Search, Save, CheckCircle2, ArrowLeft, Users, Mail, Hash, Info 
} from "lucide-react";

import { fetchAllStudents } from "../../../redux/slices/studentSlice";
import { submitAttendance, resetAttendanceState } from "../../../redux/slices/attendance_slice";

const TeacherAttendance = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { students } = useSelector((state) => state.students);
  const { profile } = useSelector((state) => state.teachers);
  const { success: attendanceSuccess, loading: submitLoading } = useSelector((state) => state.attendance);

  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchAllStudents());
  }, [dispatch]);

  useEffect(() => {
    if (students?.length > 0) {
      const initialData = students.map(s => ({
        studentId: s._id,
        name: s.name,
        roll: s.rollNo || "N/A", 
        email: s.email, 
        status: 'Present'
      }));
      setAttendanceRecords(initialData);
    }
  }, [students]);

  useEffect(() => {
    if (attendanceSuccess) {
      const timer = setTimeout(() => {
        dispatch(resetAttendanceState());
        navigate(-1); 
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [attendanceSuccess, dispatch, navigate]);

  const updateStatus = (id, newStatus) => {
    setAttendanceRecords(prev => prev.map(r => 
      r.studentId === id ? { ...r, status: newStatus } : r
    ));
  };

  const handleSaveAttendance = () => {
    if (attendanceRecords.length === 0) return alert("No students to mark!");
    const payload = {
      teacherId: profile?._id,
      date: new Date().toISOString().split('T')[0],
      records: attendanceRecords.map(({ studentId, status }) => ({ studentId, status }))
    };
    dispatch(submitAttendance(payload));
  };

  const filteredAttendance = attendanceRecords.filter(r => 
    r.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.roll?.toString().includes(searchTerm)
  );

  return (
    <div className="p-4 md:p-10 bg-[#f8fafc] min-h-screen font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(-1)} 
              className="p-3 bg-white rounded-2xl shadow-sm border border-slate-200 hover:bg-slate-50 transition-all text-slate-600"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter">Attendance Register</h1>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span> 
                {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <input 
                type="text" 
                placeholder="Quick search student..." 
                className="w-full py-3 pl-10 pr-4 bg-white rounded-2xl text-xs font-bold outline-none border border-slate-200 focus:border-indigo-500 transition-all shadow-sm"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            </div>
            <div className="bg-indigo-600 text-white px-5 py-3 rounded-2xl shadow-lg shadow-indigo-100 flex items-center gap-2">
               <Users size={16} />
               <span className="font-black text-xs">{filteredAttendance.length}</span>
            </div>
          </div>
        </div>

        {/* Table Container */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden"
        >
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-100">
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center"><Hash size={14} className="mx-auto"/></th>
                  <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Student Info</th>
                  <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status / Marking</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredAttendance.map((s, index) => (
                  <tr key={s.studentId} className="hover:bg-slate-50/50 transition-colors group">
                    {/* Roll No */}
                    <td className="px-8 py-5">
                      <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center font-black text-slate-600 text-sm group-hover:bg-indigo-600 group-hover:text-white transition-all">
                        {s.roll}
                      </div>
                    </td>
                    
                    {/* Name & Email */}
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-slate-800 uppercase tracking-tight">{s.name}</span>
                        <span className="text-[10px] font-bold text-slate-400 lowercase flex items-center gap-1">
                          <Mail size={10} /> {s.email}
                        </span>
                      </div>
                    </td>

                    {/* Attendance Controls */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        {[
                          { label: 'Present', color: 'bg-emerald-500', light: 'bg-emerald-50 text-emerald-600' },
                          { label: 'Late', color: 'bg-orange-500', light: 'bg-orange-50 text-orange-600' },
                          { label: 'Absent', color: 'bg-red-500', light: 'bg-red-50 text-red-600' }
                        ].map((btn) => (
                          <button
                            key={btn.label}
                            onClick={() => updateStatus(s.studentId, btn.label)}
                            className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-tighter transition-all border-2 ${
                              s.status === btn.label 
                              ? `${btn.color} text-white border-transparent shadow-md scale-105` 
                              : `bg-white border-slate-100 text-slate-400 hover:border-slate-200`
                            }`}
                          >
                            {btn.label}
                          </button>
                        ))}
                      </div>
                    </td>

                    {/* Indicator */}
                    <td className="px-8 py-5 text-right">
                       <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[8px] font-black uppercase ${
                         s.status === 'Present' ? 'bg-emerald-100 text-emerald-700' : 
                         s.status === 'Late' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'
                       }`}>
                         <div className={`w-1 h-1 rounded-full ${
                           s.status === 'Present' ? 'bg-emerald-500' : 
                           s.status === 'Late' ? 'bg-orange-500' : 'bg-red-500'
                         }`}></div>
                         {s.status}
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredAttendance.length === 0 && (
              <div className="py-20 text-center">
                <Users size={40} className="mx-auto text-slate-200 mb-2" />
                <p className="text-slate-400 font-black uppercase text-[10px] tracking-[0.2em]">No students found in this list</p>
              </div>
            )}
          </div>

          {/* Table Footer / Submit Section */}
          <div className="p-8 bg-slate-50/50 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-slate-500">
               <Info size={16} />
               <p className="text-[10px] font-bold uppercase">Please review all records before final submission.</p>
            </div>
            
            <button 
              onClick={handleSaveAttendance}
              disabled={submitLoading || attendanceSuccess}
              className={`w-full md:w-72 py-5 rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl transition-all flex items-center justify-center gap-3 text-xs ${
                attendanceSuccess ? 'bg-emerald-500 text-white' : 'bg-slate-900 text-white hover:bg-indigo-700 shadow-slate-200'
              }`}
            >
              {attendanceSuccess ? (
                <><CheckCircle2 size={18} /> Recorded!</>
              ) : (
                <><Save size={18} /> {submitLoading ? "Processing..." : "Save Register"}</>
              )}
            </button>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { height: 6px; width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
      `}</style>
    </div>
  );
};

export default TeacherAttendance;