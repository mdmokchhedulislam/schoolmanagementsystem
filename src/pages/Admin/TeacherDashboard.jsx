import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { 
  Calendar as CalendarIcon, 
  Users, 
  UserPlus, 
  ClipboardCheck, 
  BookOpen, 
  Clock,
  Lock,
  ChevronRight,
  Save,
  ArrowLeft,
  Wallet
} from "lucide-react";
import { motion } from "framer-motion";
import { getTeacherRoutine } from "../../redux/slices/routine_slice"; 
import { getTeacherExams } from "../../redux/slices/examSlice"; 
import { getMarksBySubject } from "../../redux/slices/result_slice";
import { fetchTeacherProfile } from "../../redux/slices/teacherSlice";

const TeacherDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showFullWeek, setShowFullWeek] = useState(false);

  const { teacherRoutine, loading } = useSelector((state) => state.routine);
  const { profile } = useSelector((state) => state.teachers);

  useEffect(() => {
    dispatch(getTeacherRoutine());
    if (!profile) {
      dispatch(fetchTeacherProfile());
    }
  }, [dispatch, profile]);

  const todayName = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const displayDate = new Date().toLocaleDateString('en-GB', { 
    day: 'numeric', month: 'short', year: 'numeric' 
  });

  const isAccountant = profile?.role?.toLowerCase() === "accountant";

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
              <p className="text-sm text-slate-500 font-medium uppercase">{profile?.role} • {profile?.designation}</p>
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-xl">
            <CalendarIcon size={18} className="text-indigo-600" />
            <span className="text-sm font-bold text-slate-600">{displayDate}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <QuickActionCard icon={<ClipboardCheck className="text-indigo-600" />} title="Attendance" desc="Quick Link" onClick={() => navigate("/dashboard/teacher/atten")} color="bg-indigo-50" />
          <QuickActionCard icon={<UserPlus className="text-emerald-600" />} title="Add Marks" desc="Input results" onClick={() => navigate("/dashboard/teacher/exams-for-marks")} color="bg-emerald-50" />
          
          {isAccountant && (
            <QuickActionCard 
              icon={<Wallet className="text-rose-600" />} 
              title="Account Record" 
              desc="Financials" 
              onClick={() => navigate("/dashboard/teacher/accounts")} 
              color="bg-rose-50" 
            />
          )}

          <QuickActionCard icon={<Users className="text-orange-600" />} title="Students" desc="View list" onClick={() => {}} color="bg-orange-50" />
          {!isAccountant && <QuickActionCard icon={<BookOpen className="text-purple-600" />} title="Resources" desc="Study material" onClick={() => {}} color="bg-purple-50" />}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-800">{showFullWeek ? "Weekly Routine" : "Today's Schedule"}</h3>
              <button onClick={() => setShowFullWeek(!showFullWeek)} className="px-4 py-1.5 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-full border border-indigo-100">
                {showFullWeek ? "Show Today" : "Weekly View"}
              </button>
            </div>
            <div className="space-y-6">
              {loading ? <Loader /> : filteredRoutine?.map((dayGroup) => (
                <div key={dayGroup._id} className="space-y-3">
                  <h4 className="text-sm font-black text-slate-500 uppercase tracking-widest">{dayGroup._id}</h4>
                  <div className="grid gap-3">
                    {dayGroup.myClasses?.map((cls) => {
                      const active = isPeriodActive(cls.startTime, cls.endTime, dayGroup._id);
                      return (
                        <div key={cls._id} className={`flex items-center justify-between p-4 rounded-2xl border ${active ? 'bg-indigo-50 border-indigo-200' : 'bg-slate-50 border-slate-100'}`}>
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-xl flex flex-col items-center justify-center border ${active ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600'}`}>
                              <span className="text-xs font-black">{cls.periodNumber}</span>
                              <span className="text-[6px] uppercase font-bold">Period</span>
                            </div>
                            <div>
                              <h4 className="font-bold text-slate-800 text-sm">{cls.className?.toUpperCase()} ({cls.sectionName})</h4>
                              <p className="text-[12px]">{cls.subjectName}</p>
                              <div className="flex items-center gap-2 text-[11px] text-slate-500">
                                <Clock size={12} /> <span>{cls.startTime} - {cls.endTime}</span>
                              </div>
                            </div>
                          </div>
                          <button disabled={!active} onClick={() => navigate("/dashboard/teacher/atten")} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold ${active ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-200 text-slate-400'}`}>
                            {active ? <ClipboardCheck size={14} /> : <Lock size={14} />} {active ? "Take Attendance" : "Locked"}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-indigo-600 rounded-3xl p-6 text-white shadow-lg h-fit">
            <p className="text-indigo-100 text-xs font-bold uppercase">Average Attendance</p>
            <h2 className="text-4xl font-black my-2">92%</h2>
            <p className="text-[10px] text-indigo-200 uppercase font-bold">Performance Summary</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const TeacherExamListForMarks = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { exams, loading } = useSelector((state) => state.exams);

  useEffect(() => {
    dispatch(getTeacherExams());
  }, [dispatch]);

  return (
    <div className="p-6 bg-[#f4f7fe] min-h-screen">
      <div className="max-w-4xl mx-auto space-y-6">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold text-sm">
          <ArrowLeft size={16} /> Back to Dashboard
        </button>
        <h2 className="text-2xl font-black text-slate-800 uppercase">Select Exam</h2>
        {loading ? <Loader /> : (
          <div className="grid gap-4">
            {exams?.map((exam) => (
              <div key={exam._id} onClick={() => navigate(`/dashboard/teacher/add-marks/${exam._id}/${exam.subjectId?._id}`)} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm hover:border-indigo-300 transition-all cursor-pointer flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex flex-col items-center justify-center text-indigo-600 font-bold uppercase">
                    <span className="text-[10px]">{new Date(exam.examDate).toLocaleDateString('en-US', { month: 'short' })}</span>
                    <span className="text-lg">{new Date(exam.examDate).getDate()}</span>
                  </div>
                  <div>
                    <h4 className="font-black text-slate-800 uppercase">{exam.subjectId?.name}</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{exam.categoryId?.name} • Class: {exam.className}</p>
                  </div>
                </div>
                <ChevronRight className="text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export const MarksEntryPage = () => {
  const { examId, subjectId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { marksList, loading } = useSelector((state) => state.marks);
  const [localScores, setLocalScores] = useState({});

  useEffect(() => {
    dispatch(getMarksBySubject({ examId, subjectId }));
  }, [dispatch, examId, subjectId]);

  const handleScoreChange = (sid, field, val) => {
    setLocalScores(prev => ({ ...prev, [sid]: { ...prev[sid], [field]: Number(val) } }));
  };

  const handleSave = async (studentId) => {
    const payload = {
      studentId,
      examId,
      subjectId,
      theoryMarks: localScores[studentId]?.theory ?? 0,
      practicalMarks: localScores[studentId]?.practical ?? 0
    };
  };

  return (
    <div className="p-6 bg-[#f4f7fe] min-h-screen">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-black text-slate-800 uppercase">Enter Marks</h2>
            <p className="text-xs font-bold text-slate-400 uppercase">Input scores for the students</p>
          </div>
          <button onClick={() => navigate(-1)} className="p-2 bg-slate-100 rounded-xl"><ArrowLeft size={20}/></button>
        </div>
        
        {loading ? <Loader /> : (
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-[10px] font-black uppercase text-slate-500 border-b border-slate-100">
                <tr>
                  <th className="p-4">Roll & Student</th>
                  <th className="p-4 text-center">Theory</th>
                  <th className="p-4 text-center">Practical</th>
                  <th className="p-4 text-right">Save</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {marksList?.map((m) => (
                  <tr key={m.studentId?._id} className="hover:bg-slate-50/50">
                    <td className="p-4 font-bold text-slate-700 text-sm">
                      <span className="text-indigo-600 mr-2">{m.studentId?.rollNo}</span> {m.studentId?.name}
                    </td>
                    <td className="p-4 text-center">
                      <input 
                        type="number" 
                        defaultValue={m.theoryMarks || 0}
                        onChange={(e) => handleScoreChange(m.studentId?._id, 'theory', e.target.value)} 
                        className="w-20 p-2 rounded-lg border border-slate-200 text-center font-bold outline-none focus:border-indigo-400" 
                      />
                    </td>
                    <td className="p-4 text-center">
                      <input 
                        type="number" 
                        defaultValue={m.practicalMarks || 0}
                        onChange={(e) => handleScoreChange(m.studentId?._id, 'practical', e.target.value)} 
                        className="w-20 p-2 rounded-lg border border-slate-200 text-center font-bold outline-none focus:border-indigo-400" 
                      />
                    </td>
                    <td className="p-4 text-right">
                      <button onClick={() => handleSave(m.studentId?._id)} className="p-2 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-all">
                        <Save size={16}/>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!marksList?.length && <NoData message="No students found for this subject." />}
          </div>
        )}
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

const Loader = () => <div className="text-center py-20"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div></div>;

const NoData = ({ message }) => (
  <div className="text-center py-10 border-2 border-dashed border-slate-100 rounded-2xl m-4">
    <p className="text-sm text-slate-400 font-medium">{message}</p>
  </div>
);

export default TeacherDashboard;