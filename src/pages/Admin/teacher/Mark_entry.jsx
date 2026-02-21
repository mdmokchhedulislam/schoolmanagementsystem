import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { getStudentsByClassAndSection } from '../../../redux/slices/student/studentSlice';
import { saveBulkMarks, clearMarkError, getMarksBySubject } from '../../../redux/slices/result_slice';
import toast from 'react-hot-toast';

function MarksEntryPage() {
  const { examId, subjectId, classId, sectionId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { studentsList, loading: studentLoading } = useSelector((state) => state.student);
  const { marksList, loading: saveLoading, error: markError } = useSelector((state) => state.marks); 
  
  const [localMarks, setLocalMarks] = useState({});

  useEffect(() => {
    if (classId && sectionId) {
      dispatch(getStudentsByClassAndSection({ classId, sectionId }));
    }
    if (examId && subjectId) {
      dispatch(getMarksBySubject({ examId, subjectId }));
    }
    return () => dispatch(clearMarkError());
  }, [dispatch, classId, sectionId, examId, subjectId]);

  useEffect(() => {
    if (marksList && Array.isArray(marksList)) {
      const existingMarks = {};
      marksList.forEach((item) => {
        const sId = item.studentId?._id || item.studentId;
        existingMarks[sId] = {
          theoryMarks: item.theoryMarks || 0,
          practicalMarks: item.practicalMarks || 0,
        };
      });
      setLocalMarks(existingMarks);
    }
  }, [marksList]);

  const handleInputChange = (studentId, field, value) => {
    setLocalMarks(prev => ({
      ...prev,
      [studentId]: { 
        ...prev[studentId], 
        [field]: value 
      }
    }));
  };

  const handleSave = async () => {
    const marksData = Object.keys(localMarks).map(studentId => ({
      studentId,
      theoryMarks: Number(localMarks[studentId].theoryMarks || 0),
      practicalMarks: Number(localMarks[studentId].practicalMarks || 0),
    }));

    if (marksData.length === 0) {
      toast.error("Please enter marks for at least one student");
      return;
    }

    const payload = {
      examId,
      subjectId,
      marksArray: marksData
    };

    const resultAction = await dispatch(saveBulkMarks(payload));
    
    if (saveBulkMarks.fulfilled.match(resultAction)) {
      setTimeout(() => {
        navigate(-1);
      }, 1200);
    }
  };

  return (
    <div className="p-6 bg-[#f4f7fe] min-h-screen">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full transition-all">
              <ArrowLeft size={20} className="text-slate-600" />
            </button>
            <div>
              <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Student Marks Entry</h2>
              <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-widest">
                ID: {examId?.slice(-6)} | Subject: {subjectId?.slice(-6)}
              </p>
            </div>
          </div>
          
          <button 
            onClick={handleSave}
            disabled={saveLoading}
            className={`flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-2xl text-sm font-bold shadow-lg transition-all ${saveLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {saveLoading ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Saving...
              </span>
            ) : (
              <><Save size={18} /> Save All</>
            )}
          </button>
        </div>

        {markError && (
          <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-xs font-bold uppercase tracking-tight border border-red-100">
            Error: {markError}
          </div>
        )}

        {studentLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="p-4 text-[10px] font-black uppercase text-slate-400">Roll & Name</th>
                  <th className="p-4 text-[10px] font-black uppercase text-slate-400 text-center">Theory Marks</th>
                  <th className="p-4 text-[10px] font-black uppercase text-slate-400 text-center">Practical Marks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {studentsList?.length > 0 ? (
                  studentsList.map((student) => (
                    <tr key={student._id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 font-bold">
                            {student.rollNo}
                          </div>
                          <span className="text-sm font-bold text-slate-700 uppercase">{student.name}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <input 
                          type="number"
                          placeholder="0"
                          value={localMarks[student._id]?.theoryMarks || ''}
                          className="w-24 mx-auto block bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-center font-bold focus:border-indigo-500 focus:bg-white outline-none transition-all"
                          onChange={(e) => handleInputChange(student._id, 'theoryMarks', e.target.value)}
                        />
                      </td>
                      <td className="p-4">
                        <input 
                          type="number"
                          placeholder="0"
                          value={localMarks[student._id]?.practicalMarks || ''}
                          className="w-24 mx-auto block bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-center font-bold focus:border-indigo-500 focus:bg-white outline-none transition-all"
                          onChange={(e) => handleInputChange(student._id, 'practicalMarks', e.target.value)}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="p-10 text-center text-slate-400 font-bold uppercase">No Students Found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default MarksEntryPage;