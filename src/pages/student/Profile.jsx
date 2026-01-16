import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { getMyProfile } from "../../redux/slices/student/studentSlice";
import { getMyPaymentHistory } from "../../redux/slices/payment_slice";
import { 
  BookOpen, Calendar, FileText, ShieldCheck, 
  User as UserIcon, GraduationCap, CreditCard, 
  CheckCircle2, Clock, AlertCircle, Download
} from "lucide-react";

function StudentProfile() {
  const dispatch = useDispatch();
  const [showPayments, setShowPayments] = useState(false); // Payment toggle state
  
  const { student, loading, error } = useSelector((state) => state.student);
  const { payments, loading: paymentLoading } = useSelector((state) => state.payment);

  useEffect(() => {
    if (!student) {
      dispatch(getMyProfile());
    }
  }, [dispatch, student]);

  // Payment Fetch Logic
  const handlePaymentClick = () => {
    setShowPayments(true);
    dispatch(getMyPaymentHistory());
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a] text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="animate-pulse font-bold tracking-widest text-indigo-400 uppercase">Loading Student Data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] py-8 px-4 sm:px-6 lg:px-8 font-sans text-white relative">
      {/* Background Glows */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] bg-purple-600/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] bg-indigo-600/10 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Profile Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-6 sm:p-8 border border-white/10 shadow-2xl flex flex-col md:flex-row items-center gap-8"
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <img 
              src={student?.image || "https://via.placeholder.com/150"} 
              alt={student?.name} 
              className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-[1.8rem] object-cover border-2 border-white/10 shadow-2xl bg-slate-800"
            />
            <div className="absolute -bottom-1 -right-1 bg-emerald-500 w-6 h-6 rounded-full border-4 border-[#0f172a] shadow-lg"></div>
          </div>
          
          <div className="text-center md:text-left flex-1">
            <p className="text-indigo-400 text-[10px] font-black tracking-[0.3em] uppercase mb-2">Student Identity</p>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-3 uppercase leading-none">{student?.name}</h1>
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <span className="flex items-center gap-2 px-4 py-1.5 bg-white/5 rounded-full text-[10px] font-bold tracking-widest uppercase border border-white/10">
                <GraduationCap size={14}/> ID: {student?._id?.slice(-6)}
              </span>
              <span className="px-4 py-1.5 bg-emerald-500/10 text-emerald-400 rounded-full text-[10px] font-bold tracking-widest uppercase border border-emerald-500/10">
                {student?.status || "Active"}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ActionCard icon={<BookOpen size={20}/>} title="Results" color="from-blue-600 to-cyan-500" />
          <ActionCard icon={<Calendar size={20}/>} title="Routine" color="from-purple-600 to-pink-500" />
          <ActionCard icon={<FileText size={20}/>} title="Marksheet" color="from-orange-600 to-yellow-500" />
          <ActionCard 
            icon={<CreditCard size={20}/>} 
            title="Payments" 
            color="from-emerald-600 to-teal-500" 
            onClick={handlePaymentClick}
          />
        </div>

        {/* Conditionally Show Payment History or Student Details */}
        <AnimatePresence mode="wait">
          {!showPayments ? (
            <motion.div 
              key="details"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
               {/* Academic, Contact, Address Cards (Your existing code) */}
               <div className="space-y-8">
                <InfoCard title="Academic Details" icon={<GraduationCap size={18}/>} color="text-indigo-400">
                  <InfoRow label="Class" value={student?.classId?.className} />
                  <InfoRow label="Section" value={student?.sectionId?.sectionName} />
                  <InfoRow label="Roll No" value={student?.rollNo} />
                  <InfoRow label="Session" value={student?.academicYearId?.year} />
                </InfoCard>
               </div>
               <div className="space-y-8">
                <InfoCard title="Contact Info" icon={<UserIcon size={18}/>} color="text-purple-400">
                  <InfoRow label="Email" value={student?.email} />
                  <InfoRow label="Phone" value={student?.phone} />
                </InfoCard>
               </div>
               <div className="space-y-8">
                <InfoCard title="Guardian Info" icon={<ShieldCheck size={18}/>} color="text-orange-400">
                  <InfoRow label="Guardian" value={student?.guardianName} />
                  <InfoRow label="Contact" value={student?.guardianContact} />
                </InfoCard>
               </div>
            </motion.div>
          ) : (
            <motion.div 
              key="payments"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/10 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl font-black uppercase tracking-tight">Payment History</h2>
                  <p className="text-indigo-400 text-[10px] font-bold tracking-widest uppercase">Manage your transactions</p>
                </div>
                <button 
                  onClick={() => setShowPayments(false)}
                  className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full text-[10px] font-black uppercase transition-all"
                >
                  Back to Profile
                </button>
              </div>

              {paymentLoading ? (
                <div className="py-20 text-center animate-pulse text-indigo-400 font-bold uppercase tracking-widest">
                  Fetching Records...
                </div>
              ) : payments.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-gray-500 text-[10px] font-black uppercase tracking-widest border-b border-white/10">
                        <th className="pb-4 px-4">Receipt</th>
                        <th className="pb-4 px-4">Date</th>
                        <th className="pb-4 px-4">Amount</th>
                        <th className="pb-4 px-4">Status</th>
                        <th className="pb-4 px-4">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {payments.map((pay, idx) => (
                        <tr key={idx} className="group hover:bg-white/5 transition-all">
                          <td className="py-5 px-4">
                            <p className="text-sm font-bold text-gray-200 uppercase">#{pay._id?.slice(-8)}</p>
                            <p className="text-[9px] text-gray-500 uppercase">{pay.paymentType || "Manual"}</p>
                          </td>
                          <td className="py-5 px-4 text-xs font-medium text-gray-400">
                            {new Date(pay.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-5 px-4">
                            <span className="text-sm font-black text-indigo-400">{pay.amount} BDT</span>
                          </td>
                          <td className="py-5 px-4">
                            <StatusBadge status={pay.status} />
                          </td>
                          <td className="py-5 px-4">
                            <button className="p-2 bg-white/5 hover:bg-indigo-600 rounded-lg transition-all">
                              <Download size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="py-20 text-center flex flex-col items-center gap-4">
                  <AlertCircle size={40} className="text-gray-600" />
                  <p className="text-gray-500 font-bold uppercase tracking-widest">No payment records found</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Helper Components
function StatusBadge({ status }) {
  const isPaid = status === 'paid' || status === 'completed' || status === 'Approved';
  const isPending = status === 'pending';

  return (
    <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
      isPaid ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
      isPending ? "bg-amber-500/10 text-amber-400 border-amber-500/20" :
      "bg-red-500/10 text-red-400 border-red-500/20"
    }`}>
      {isPaid ? <CheckCircle2 size={10}/> : isPending ? <Clock size={10}/> : <AlertCircle size={10}/>}
      {status}
    </span>
  );
}

function ActionCard({ icon, title, color, onClick }) {
  return (
    <motion.div 
      whileHover={{ y: -5, scale: 1.02 }}
      onClick={onClick}
      className="bg-white/5 border border-white/10 p-4 rounded-[1.5rem] flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-white/10 transition-all group"
    >
      <div className={`p-3 rounded-xl bg-gradient-to-br ${color} shadow-lg transition-transform group-hover:rotate-12`}>
        {icon}
      </div>
      <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">{title}</span>
    </motion.div>
  );
}

function InfoCard({ title, children, color, icon }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white/5 backdrop-blur-lg rounded-[2.2rem] p-7 border border-white/10 shadow-xl"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className={`${color} opacity-80`}>{icon}</div>
        <h3 className={`text-[12px] font-black uppercase tracking-[0.2em] ${color}`}>{title}</h3>
      </div>
      <div className="space-y-4">{children}</div>
    </motion.div>
  );
}

function InfoRow({ label, value }) {
  const displayValue = (val) => {
    if (!val) return "N/A";
    if (typeof val === "object") return val.className || val.sectionName || val.year || "N/A";
    return val;
  };

  return (
    <div className="flex justify-between items-center group">
      <span className="text-gray-500 text-[9px] uppercase font-black tracking-tighter">{label}</span>
      <span className="text-gray-200 font-bold text-xs truncate max-w-[150px]">
        {displayValue(value)}
      </span>
    </div>
  );
}

export default StudentProfile;