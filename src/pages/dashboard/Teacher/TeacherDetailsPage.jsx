import React, { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeacherById, resetSingleTeacher } from "../../../redux/slices/teacherSlice";
import { 
  FaUser, FaEnvelope, FaBuilding, FaUserTie, FaMoneyBillWave, 
  FaCalendarAlt, FaHistory, FaArrowLeft, FaEdit, FaIdCard, 
  FaGraduationCap, FaBookReader, FaUniversity 
} from "react-icons/fa";

const TeacherDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { singleTeacher, loading, error } = useSelector((state) => state.teachers);

  useEffect(() => {
    if (id) dispatch(fetchTeacherById(id));
    return () => dispatch(resetSingleTeacher());
  }, [id, dispatch]);

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  if (error) return <div className="text-center py-20 text-red-500 font-bold">Error: {error}</div>;
  if (!singleTeacher) return <div className="text-center py-20">Teacher profile not found!</div>;

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen font-sans">
      {/* Top Bar */}
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-8">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-blue-700 font-semibold transition">
          <FaArrowLeft /> Back to Teachers List
        </button>
        <Link 
          to={`/admin/dashboard/teachers/edit/${id}`} 
          className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl flex items-center gap-2 hover:bg-indigo-700 shadow-lg transition"
        >
          <FaEdit /> Edit Profile
        </Link>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar: Profile Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 text-center sticky top-8">
            <div className="w-32 h-32 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 text-5xl font-bold shadow-inner">
              {singleTeacher.user?.name?.charAt(0) || "T"}
            </div>
            <h2 className="text-2xl font-bold text-gray-800 leading-tight">{singleTeacher.user?.name}</h2>
            <p className="text-indigo-600 font-medium mt-1">{singleTeacher.designation}</p>
            <p className="text-gray-400 text-sm mt-1">{singleTeacher.department} Department</p>
            
            <div className="mt-6 flex flex-col gap-2">
              <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${singleTeacher.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {singleTeacher.status}
              </span>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-100 text-left space-y-4">
              <div className="flex items-center gap-3 text-gray-600 overflow-hidden">
                <FaEnvelope className="shrink-0 text-indigo-400" /> 
                <span className="text-sm truncate">{singleTeacher.user?.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <FaIdCard className="shrink-0 text-indigo-400" /> 
                <span className="text-sm font-bold">{singleTeacher.teacherId}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3 space-y-8">
          
          {/* Section 1: Academic & Qualification */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-800 to-blue-700 p-6 text-white flex items-center justify-between">
              <h3 className="text-xl font-bold flex items-center gap-3"><FaGraduationCap /> Academic Qualification</h3>
              <span className="bg-white/20 px-3 py-1 rounded-lg text-xs backdrop-blur-sm">Verified Profile</span>
            </div>
            <div className="p-8">
              <div className="mb-8">
                <p className="text-xs text-indigo-500 font-bold uppercase tracking-widest mb-2">Highest Degree</p>
                <h4 className="text-2xl font-bold text-gray-800">{singleTeacher.qualification || "N/A"}</h4>
              </div>
              
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-4">Specialized Subjects</p>
                <div className="flex flex-wrap gap-3">
                  {singleTeacher.specializedSubjects?.map((sub, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-xl border border-indigo-100 font-semibold shadow-sm">
                      <FaBookReader className="text-indigo-400" /> {sub}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Salary & Financial Details */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <h3 className="text-xl font-bold mb-8 flex items-center gap-3 text-gray-800">
              <FaMoneyBillWave className="text-green-500" /> Payroll & Financials
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <p className="text-xs text-gray-400 font-bold uppercase mb-2">Monthly Base Salary</p>
                <p className="text-2xl font-black text-indigo-700">৳ {singleTeacher.salaryInfo?.baseSalary?.toLocaleString()}</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <p className="text-xs text-gray-400 font-bold uppercase mb-2">Bank Account Number</p>
                <p className="text-lg font-bold text-gray-800">{singleTeacher.salaryInfo?.bankAccount || "--- --- ---"}</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <p className="text-xs text-gray-400 font-bold uppercase mb-2">PAN / NID Number</p>
                <p className="text-lg font-bold text-gray-800">{singleTeacher.salaryInfo?.panOrNid || "Not Provided"}</p>
              </div>
            </div>
          </div>

          {/* Section 3: Career History */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <h3 className="text-xl font-bold mb-8 flex items-center gap-3 text-gray-800">
              <FaHistory className="text-orange-500" /> Career Journey
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="flex items-start gap-5">
                <div className="bg-orange-100 p-4 rounded-2xl text-orange-600 shadow-sm"><FaCalendarAlt size={24} /></div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Date of Joining</p>
                  <p className="text-xl font-bold text-gray-800">
                    {new Date(singleTeacher.experience?.joiningDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-5">
                <div className="bg-blue-100 p-4 rounded-2xl text-blue-600 shadow-sm"><FaUniversity size={24} /></div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Prior Experience</p>
                  <p className="text-gray-700 font-medium leading-relaxed">
                    {singleTeacher.experience?.previousExperience || "Fresher / No previous record"}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TeacherDetailsPage;