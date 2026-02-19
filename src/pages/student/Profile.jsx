import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { getMyProfile } from "../../redux/slices/student/studentSlice";
import { getMyPaymentHistory } from "../../redux/slices/payment_slice";
import { getStudentOwnResult } from "../../redux/slices/result_slice"; 
import { getStudentRoutine } from "../../redux/slices/routine_slice"; 
import {
  BookOpen, Calendar, FileText, ShieldCheck,
  User as UserIcon, GraduationCap, CreditCard,
  Download, Mail, Phone, ArrowLeft, Zap, Star, AlertCircle
} from "lucide-react";

function StudentProfile() {
  const dispatch = useDispatch();
  const [view, setView] = useState("profile"); 

  const { student, loading } = useSelector((state) => state.student);
  const { payments, loading: paymentLoading } = useSelector((state) => state.payment);
  

  const { marks = [], loading: resultLoading } = useSelector((state) => state.marks || {});
  
  const { studentRoutine, loading: routineLoading } = useSelector((state) => state.routine || {});
  console.log("studentRoutine", studentRoutine);
  

  useEffect(() => {
    if (!student) dispatch(getMyProfile());
  }, [dispatch, student]);

  const handlePaymentClick = () => {
    setView("payments");
    dispatch(getMyPaymentHistory());
  };

  const handleResultClick = () => {
    setView("results");
    if (!marks || marks.length === 0) {
      dispatch(getStudentOwnResult("LATEST_EXAM_ID")); 
    }
  };

  const handleRoutineClick = () => {
    setView("routine");
    dispatch(getStudentRoutine());
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-[#020617]"><Zap className="text-indigo-500 animate-pulse" size={48} /></div>;
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans pb-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 pt-10 space-y-10">
        
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="relative overflow-hidden bg-white/[0.03] backdrop-blur-2xl rounded-[3rem] border border-white/10 p-8 shadow-2xl">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <img src={student?.image || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"} className="w-40 h-40 rounded-[2rem] object-cover border-4 border-white/10 bg-slate-900" alt="Profile" />
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-black text-white uppercase">{student?.name}</h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
                <Badge icon={<Mail size={12} />} text={student?.email} />
                <Badge icon={<Zap size={12} />} text={`ID: ${student?._id?.slice(-6)}`} color="bg-purple-500/10 text-purple-400" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* NAV GRID */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <NavCard icon={<BookOpen />} label="Results" sub="Grade Sheet" color="from-blue-500 to-indigo-600" onClick={handleResultClick} active={view === "results"} />
          <NavCard icon={<Calendar />} label="Routine" sub="Class Time" color="from-violet-500 to-purple-600" onClick={handleRoutineClick} active={view === "routine"} />
          <NavCard icon={<FileText />} label="Archive" sub="Documents" color="from-fuchsia-500 to-pink-600" />
          <NavCard icon={<CreditCard />} label="Payments" sub="Billing" color="from-emerald-500 to-teal-600" onClick={handlePaymentClick} active={view === "payments"} />
        </div>

        {/* CONTENT */}
        <AnimatePresence mode="wait">
          {view === "profile" && (
            <motion.div key="profile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <DataCard title="Academic" icon={<GraduationCap className="text-indigo-400" />}>
                <DataRow label="Class" value={student?.classId?.className} />
                <DataRow label="Roll No" value={student?.rollNo} />
                <DataRow label="Section" value={student?.sectionId?.sectionName} />
              </DataCard>
              <DataCard title="Communication" icon={<Phone className="text-purple-400" />}>
                <DataRow label="Phone" value={student?.phone} />
                <DataRow label="Guardian" value={student?.guardianName} />
              </DataCard>
              <DataCard title="Status" icon={<ShieldCheck className="text-emerald-400" />}>
                <DataRow label="Status" value="Active Student" />
                <DataRow label="Admission" value="2025-26" />
              </DataCard>
            </motion.div>
          )}

          {view === "results" && (
            <ContentWrapper title="Academic Results" onClose={() => setView("profile")} icon={<Star className="text-yellow-400" />}>
               {resultLoading ? <Loader /> : <ResultTable results={marks} />}
            </ContentWrapper>
          )}

          {view === "routine" && (
            <ContentWrapper title="Class Routine" onClose={() => setView("profile")} icon={<Calendar className="text-violet-400" />}>
               {routineLoading ? <Loader /> : <RoutineTable routines={studentRoutine} />}
            </ContentWrapper>
          )}

          {view === "payments" && (
            <ContentWrapper title="Payment History" onClose={() => setView("profile")} icon={<CreditCard className="text-emerald-400" />}>
               {paymentLoading ? <Loader /> : <PaymentTable payments={payments} />}
            </ContentWrapper>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// --- TABLE COMPONENTS ---

const ResultTable = ({ results }) => (
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead>
        <tr className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] border-b border-white/5">
          <th className="pb-4 text-left px-4">Subject</th>
          <th className="pb-4 text-center px-4">Total</th>
          <th className="pb-4 text-right px-4">Grade</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-white/[0.02]">
        {results?.length > 0 ? results.map((res, i) => (
          <tr key={i} className="hover:bg-white/[0.02]">
            <td className="py-5 px-4 font-bold text-slate-200">{res.subjectId?.name}</td>
            <td className="py-5 px-4 text-center font-black text-indigo-400">{res.totalMarks}</td>
            <td className="py-5 px-4 text-right">
              <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 rounded-lg font-black">{res.grade}</span>
            </td>
          </tr>
        )) : <tr><td colSpan="3" className="py-10 text-center opacity-50">No results found.</td></tr>}
      </tbody>
    </table>
  </div>
);

const RoutineTable = ({ routines }) => (
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead>
        <tr className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] border-b border-white/5">
          <th className="pb-4 text-left px-4">Day</th>
          <th className="pb-4 text-left px-4">Subject</th>
          <th className="pb-4 text-left px-4">Time</th>
          <th className="pb-4 text-right px-4">Room</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-white/[0.02]">
        {routines?.length > 0 ? routines.map((item, i) => (
          <tr key={i} className="hover:bg-white/[0.02]">
            <td className="py-5 px-4 font-bold text-indigo-400 uppercase">{item.day}</td>
            <td className="py-5 px-4 text-slate-200 font-semibold">{item.subjectId?.name}</td>
            <td className="py-5 px-4 text-slate-400">{item.startTime} - {item.endTime}</td>
            <td className="py-5 px-4 text-right text-emerald-400 font-bold">{item.roomNo || "N/A"}</td>
          </tr>
        )) : <tr><td colSpan="4" className="py-10 text-center opacity-50">Routine not available.</td></tr>}
      </tbody>
    </table>
  </div>
);

const PaymentTable = ({ payments }) => (
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead>
        <tr className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] border-b border-white/5">
          <th className="pb-4 text-left px-4">Date</th>
          <th className="pb-4 text-left px-4">Amount</th>
          <th className="pb-4 text-right px-4">Status</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-white/[0.02]">
        {payments?.map((pay, i) => (
          <tr key={i}>
            <td className="py-5 px-4 text-slate-400 text-xs">{new Date(pay.createdAt).toLocaleDateString()}</td>
            <td className="py-5 px-4 font-black text-indigo-400">{pay.amount} BDT</td>
            <td className="py-5 px-4 text-right uppercase text-[10px] font-bold">{pay.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// --- HELPERS ---
const ContentWrapper = ({ title, icon, children, onClose }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/[0.03] border border-white/10 rounded-[3rem] p-8 backdrop-blur-xl">
    <div className="flex justify-between items-center mb-10">
      <h2 className="text-3xl font-black text-white uppercase flex items-center gap-3">{icon} {title}</h2>
      <button onClick={onClose} className="px-6 py-2 bg-white/5 rounded-2xl text-xs font-bold border border-white/10 flex items-center gap-2"><ArrowLeft size={14}/> Back</button>
    </div>
    {children}
  </motion.div>
);

const Badge = ({ icon, text, color = "bg-indigo-500/10 text-indigo-400" }) => (
  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/5 text-[11px] font-bold ${color}`}>{icon} {text}</div>
);

const NavCard = ({ icon, label, sub, color, onClick, active }) => (
  <button onClick={onClick} className={`p-6 rounded-[2rem] border transition-all text-left ${active ? 'bg-indigo-500/10 border-indigo-500/40' : 'bg-white/[0.03] border-white/5 hover:border-white/10'}`}>
    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-white mb-4`}>{icon}</div>
    <h4 className="text-white font-black uppercase text-xs">{label}</h4>
    <p className="text-slate-500 text-[10px]">{sub}</p>
  </button>
);

const DataCard = ({ title, icon, children }) => (
  <div className="bg-white/[0.03] border border-white/5 rounded-[2.5rem] p-8">
    <div className="flex items-center gap-3 mb-8">{icon}<h3 className="text-xs font-black uppercase text-slate-400">{title}</h3></div>
    <div className="space-y-5">{children}</div>
  </div>
);

const DataRow = ({ label, value }) => (
  <div className="flex flex-col gap-1">
    <span className="text-[9px] font-black uppercase text-slate-500">{label}</span>
    <span className="text-sm font-bold text-slate-200">{value || "N/A"}</span>
  </div>
);

const Loader = () => <div className="h-64 flex items-center justify-center"><div className="w-10 h-10 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div></div>;

export default StudentProfile;