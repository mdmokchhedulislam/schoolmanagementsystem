import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { getMyProfile } from "../../redux/slices/student/studentSlice";
import { 
  BookOpen, 
  Calendar, 
  FileText, 
  ShieldCheck, 
  User as UserIcon,
  GraduationCap
} from "lucide-react";

function StudentProfile() {
  const dispatch = useDispatch();
  const { student, loading, error } = useSelector((state) => state.student);

  useEffect(() => {
    if (!student) {
      dispatch(getMyProfile());
    }
  }, [dispatch, student]);

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

  if (!student) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a] text-white p-6">
        <div className="text-center bg-white/5 p-8 rounded-3xl border border-white/10 max-w-sm w-full">
          <p className="text-red-400 font-bold mb-4">{error || "Profile not found!"}</p>
          <button onClick={() => dispatch(getMyProfile())} className="w-full py-3 bg-indigo-600 rounded-xl text-sm font-bold uppercase tracking-widest">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] py-8 px-4 sm:px-6 lg:px-8 font-sans text-white relative">
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] bg-purple-600/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] bg-indigo-600/10 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto space-y-8">
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
                <GraduationCap size={14}/> ID: {student?._id}
              </span>
              <span className="px-4 py-1.5 bg-emerald-500/10 text-emerald-400 rounded-full text-[10px] font-bold tracking-widest uppercase border border-emerald-500/10">
                {student?.status || "Active"}
              </span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <ActionCard icon={<BookOpen size={20}/>} title="Results" color="from-blue-600 to-cyan-500" />
          <ActionCard icon={<Calendar size={20}/>} title="Routine" color="from-purple-600 to-pink-500" />
          <ActionCard icon={<FileText size={20}/>} title="Marksheet" color="from-orange-600 to-yellow-500" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-8">
            <InfoCard title="Academic Details" icon={<GraduationCap size={18}/>} color="text-indigo-400">
              <InfoRow label="Class" value={student?.classId?.className || student?.classId} />
              <InfoRow label="Section" value={student?.sectionId?.sectionName || student?.sectionId?.name || student?.sectionId} />
              <InfoRow label="Roll No" value={student?.rollNo} />
              <InfoRow label="Session" value={student?.academicYearId?.year || student?.academicYearId} />
            </InfoCard>

            <InfoCard title="School Admin Info" icon={<ShieldCheck size={18}/>} color="text-emerald-400">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                <p className="text-[10px] font-bold text-gray-500 uppercase">Assigned School</p>
                <p className="text-sm font-bold text-emerald-400 mt-1 uppercase">{student?.schoolId?.name || "N/A"}</p>
                <button className="mt-3 w-full py-2 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] font-bold uppercase transition-all">Contact Office</button>
              </div>
            </InfoCard>
          </div>

          <div className="space-y-8">
            <InfoCard title="Contact Info" icon={<UserIcon size={18}/>} color="text-purple-400">
              <InfoRow label="Email" value={student?.email} />
              <InfoRow label="Phone" value={student?.phone} />
              <InfoRow label="Gender" value={student?.gender} />
              <InfoRow label="Birth Date" value={student?.dateOfBirth ? new Date(student.dateOfBirth).toLocaleDateString() : "N/A"} />
            </InfoCard>

            <InfoCard title="Guardian Details" icon={<UserIcon size={18}/>} color="text-pink-400">
              <InfoRow label="Guardian" value={student?.guardianName} />
              <InfoRow label="Relationship" value="Father" />
              <InfoRow label="Emergency" value={student?.guardianContact} />
            </InfoCard>
          </div>

          <div className="space-y-8">
            <InfoCard title="Current Address" icon={<FileText size={18}/>} color="text-orange-400">
              <div className="space-y-4">
                <AddressBox label="Village" value={student?.address?.village} />
                <AddressBox label="Upazila" value={student?.address?.upazila} />
                <AddressBox label="District" value={student?.address?.district} />
              </div>
            </InfoCard>

            <div className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 p-6 rounded-[2rem] border border-white/10 backdrop-blur-lg">
              <h4 className="text-sm font-black uppercase tracking-widest mb-4">Quick Marksheet View</h4>
              <div className="flex items-center justify-between bg-black/20 p-4 rounded-2xl">
                <span className="text-xs text-gray-400">Latest Exam:</span>
                <span className="text-sm font-bold text-indigo-400 uppercase">Final Exam</span>
              </div>
              <button className="w-full mt-4 py-3 bg-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-indigo-500/20 active:scale-95 transition-all">Download PDF</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActionCard({ icon, title, color }) {
  return (
    <motion.div 
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-white/5 border border-white/10 p-4 rounded-[1.5rem] flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-white/10 transition-all"
    >
      <div className={`p-3 rounded-xl bg-gradient-to-br ${color} shadow-lg`}>{icon}</div>
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
    if (typeof val === "object") {
      return val.name || val.className || val.sectionName || val.year || "N/A";
    }
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

function AddressBox({ label, value }) {
  return (
    <div className="flex flex-col">
      <span className="text-[8px] text-gray-500 uppercase font-black mb-1">{label}</span>
      <span className="text-sm text-gray-200 font-bold">{value || "N/A"}</span>
    </div>
  );
}

export default StudentProfile;