import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getTeacherExams } from '../../../redux/slices/examSlice';
import { 
  BookOpen, 
  Calendar, 
  ChevronRight, 
  ArrowLeft,
  ClipboardList
} from 'lucide-react';

function Add_exam_mark() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { exams, loading, error } = useSelector((state) => state.exams);

  useEffect(() => {
    dispatch(getTeacherExams());
  }, [dispatch]);

  const handleExamClick = (exam) => {
    const examId = exam._id;
    const subjectId = exam.subjectId?._id;
    const classId = exam.classId?._id || exam.classId;
    const sectionId = exam.sectionId?._id || exam.sectionId;

    navigate(`/dashboard/teacher/add-marks/${examId}/${subjectId}/${classId}/${sectionId}`);
  };

  return (
    <div className="p-6 bg-[#f4f7fe] min-h-screen">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold text-sm transition-colors"
          >
            <ArrowLeft size={18} /> Back
          </button>
          <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
            <ClipboardList className="text-indigo-600" /> Exam List for Marks
          </h2>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-center font-bold border border-red-100">
            {error}
          </div>
        ) : (
          <div className="grid gap-4">
            {exams && exams.length > 0 ? (
              exams.map((exam) => (
                <div 
                  key={exam._id} 
                  onClick={() => handleExamClick(exam)}
                  className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex flex-col items-center justify-center text-indigo-600 border border-indigo-100">
                      <span className="text-[10px] font-black uppercase">
                        {new Date(exam.examDate).toLocaleDateString('en-US', { month: 'short' })}
                      </span>
                      <span className="text-xl font-black">
                        {new Date(exam.examDate).getDate()}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-black text-slate-800 uppercase group-hover:text-indigo-600 transition-colors">
                        {exam.subjectId?.name || "Subject Name"}
                      </h4>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          <BookOpen size={12} /> {exam.categoryId?.name || "Exam Type"}
                        </span>
                        <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                        <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          <Calendar size={12} /> Class: {exam.classId?.className || exam.className}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="hidden sm:block text-right">
                      <p className="text-[10px] font-black text-slate-400 uppercase">Total Marks</p>
                      <p className="text-sm font-bold text-slate-700">{exam.totalMarks}</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all">
                      <ChevronRight size={18} />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white p-12 rounded-3xl border-2 border-dashed border-slate-200 text-center">
                <p className="text-slate-400 font-bold uppercase tracking-widest">No exams found.</p>
                <p className="text-xs text-slate-400 mt-1">Contact admin if you don't see your subjects.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Add_exam_mark;