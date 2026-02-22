import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  PlusCircle, 
  Users, 
  School, 
  UserPlus, 
  LayoutGrid, 
  Calendar as CalendarIcon,
  TrendingUp,
  Wallet,
  ArrowRightLeft
} from "lucide-react";
import { fetchAllStudents } from "../../redux/slices/studentSlice";
import { fetchAllClasses } from "../../redux/slices/classSlice";
import { fetchTeachers } from "../../redux/slices/teacherSlice";
import { getTransactionSummary } from "../../redux/slices/transition_slice";
import DashboardStats from "../../components/Dashboard/Stats";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { students } = useSelector((state) => state.students);
  const { teachers } = useSelector((state) => state.teachers);
  const { classes } = useSelector((state) => state.classes);
  const { summary } = useSelector((state) => state.transactions);

  useEffect(() => {
    dispatch(fetchAllStudents());
    dispatch(fetchAllClasses());
    dispatch(fetchTeachers());
    dispatch(getTransactionSummary());
  }, [dispatch]);

  const quickActions = [
    { title: "Add Student", path: "/admin/dashboard/addstudent", icon: <UserPlus size={22} />, color: "bg-blue-500", shadow: "shadow-blue-200" },
    { title: "Add Teacher", path: "/admin/dashboard/teachers/add", icon: <Users size={22} />, color: "bg-purple-500", shadow: "shadow-purple-200" },
    { title: "Add Class", path: "/admin/dashboard/addclass", icon: <School size={22} />, color: "bg-orange-500", shadow: "shadow-orange-200" },
    { title: "Financials", path: "/admin/dashboard/transactions", icon: <ArrowRightLeft size={22} />, color: "bg-emerald-500", shadow: "shadow-emerald-200" },
  ];

  return (
    <div className="p-4 md:p-10 bg-[#f1f5f9] min-h-screen font-sans">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Admin Dashboard</h1>
          <p className="text-slate-500 font-medium">
            Welcome back, <span className="text-blue-600">Administrator</span>!
          </p>
        </div>
        
        <div className="flex items-center gap-4 mt-6 md:mt-0">
          <div className="hidden lg:flex items-center gap-2 bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-200">
            <CalendarIcon size={18} className="text-blue-500" />
            <span className="text-sm font-bold text-slate-700">
              {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </span>
          </div>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold shadow-xl shadow-slate-200 text-sm"
          >
            Generate Report
          </motion.button>
        </div>
      </div>

      <div className="mb-10">
        <DashboardStats students={students} teachers={teachers} classes={classes} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 space-y-8">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
                <TrendingUp className="text-blue-600" size={24} />
                Quick Management
              </h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {quickActions.map((action, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -5 }}
                  onClick={() => navigate(action.path)}
                  className="bg-white p-5 rounded-[2rem] border border-white shadow-[0_10px_30px_-15px_rgba(0,0,0,0.1)] hover:shadow-2xl hover:shadow-slate-200 cursor-pointer transition-all flex items-center gap-6 group relative overflow-hidden"
                >
                  <div className={`relative z-10 ${action.color} text-white p-4 rounded-2xl group-hover:scale-110 transition-transform shadow-lg ${action.shadow}`}>
                    {action.icon}
                  </div>
                  <div className="relative z-10">
                    <h3 className="font-extrabold text-slate-800 group-hover:text-blue-600 transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-xs font-semibold text-slate-400 uppercase mt-1">Manage Now</p>
                  </div>
                  <div className={`absolute -right-4 -bottom-4 w-20 h-20 ${action.color} opacity-[0.03] rounded-full group-hover:scale-150 transition-transform duration-500`} />
                </motion.div>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
            <h2 className="text-xl font-black text-slate-800 mb-6">Recent Activities</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-200" />
                    <div>
                      <div className="h-4 w-32 bg-slate-200 rounded mb-2" />
                      <div className="h-3 w-20 bg-slate-100 rounded" />
                    </div>
                  </div>
                  <div className="h-6 w-16 bg-blue-50 rounded-full" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            onClick={() => navigate("/admin/dashboard/transactions")}
            className="bg-gradient-to-br from-indigo-600 to-blue-700 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-blue-200 relative overflow-hidden cursor-pointer group"
          >
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-2">Net Cash</h3>
              <p className="opacity-80 text-sm mb-6">Total fund available</p>
              <div className="text-4xl font-black mb-6">
                ৳{(summary?.totalBalance || 0).toLocaleString()}
              </div>
              <div className="flex items-center gap-2 bg-white/20 w-fit px-4 py-2 rounded-xl text-xs font-bold group-hover:bg-white/30 transition-all">
                History <ArrowRightLeft size={14} />
              </div>
            </div>
            <Wallet className="absolute -right-6 -bottom-6 w-32 h-32 opacity-10 rotate-12 group-hover:rotate-0 transition-transform duration-500" />
          </motion.div>

          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
            <h2 className="text-lg font-black text-slate-800 mb-4">Academic Overview</h2>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm font-bold mb-2">
                  <span className="text-slate-500">Attendance</span>
                  <span className="text-blue-600">92%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="w-[92%] h-full bg-blue-500" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm font-bold mb-2">
                  <span className="text-slate-500">Exam Passed</span>
                  <span className="text-emerald-600">85%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="w-[85%] h-full bg-emerald-500" />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;