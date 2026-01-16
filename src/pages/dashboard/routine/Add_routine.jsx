import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRoutine, clearRoutineState } from "../../../redux/slices/routine_slice.js";
import { fetchSections } from "../../../redux/slices/sectionSlice.js"; 
import { fetchTeachers } from "../../../redux/slices/teacherSlice.js"; 
import { fetchDays } from "../../../redux/slices/daySlice.js"; 
import { fetchPeriods } from "../../../redux/slices/period_slice.js"; 
import { fetchSubjects } from "../../../redux/slices/subject_slice.js"; 

import { useNavigate } from "react-router-dom";
import { Plus, Trash2, Save, ArrowLeft, ChevronDown } from "lucide-react";
import toast from "react-hot-toast";

const AddRoutine = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux Store logic
  const { sections } = useSelector((state) => state.sections); 
  const { teachers } = useSelector((state) => state.teachers);
  const { days } = useSelector((state) => state.days); 
  const { periods } = useSelector((state) => state.periods);
  const { subjects } = useSelector((state) => state.subjects); 
  const { loading, success, error } = useSelector((state) => state.routine);

  // 1. STATE DEFINE (Eikhane thik thakle 'formData is not defined' error ashbe na)
  const [formData, setFormData] = useState({
    dayId: "",
    periodId: "",
    schedules: [{ sectionId: "", subjectId: "", teacherId: "" }]
  });

  // Initial Data Fetch
  useEffect(() => {
    dispatch(fetchSections());
    dispatch(fetchTeachers());
    dispatch(fetchDays()); 
    dispatch(fetchPeriods()); 
    dispatch(fetchSubjects());
  }, [dispatch]);

  // Success/Error Handling
  useEffect(() => {
    if (success) {
      toast.success("Routine added successfully!");
      dispatch(clearRoutineState());
      navigate("/admin/dashboard/routine");
    }
    if (error) {
      toast.error(error);
      dispatch(clearRoutineState());
    }
  }, [success, error, navigate, dispatch]);

  // Helper Functions
  const addScheduleRow = () => {
    setFormData((prev) => ({
      ...prev,
      schedules: [...prev.schedules, { sectionId: "", subjectId: "", teacherId: "" }]
    }));
  };

  const removeScheduleRow = (index) => {
    setFormData((prev) => ({
      ...prev,
      schedules: prev.schedules.filter((_, i) => i !== index)
    }));
  };

  const handleScheduleChange = (index, field, value) => {
    const updatedSchedules = [...formData.schedules];
    updatedSchedules[index][field] = value;
    setFormData({ ...formData, schedules: updatedSchedules });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if(!formData.dayId || !formData.periodId) return toast.error("Select Day and Period!");
    const isInvalid = formData.schedules.some(s => !s.sectionId || !s.subjectId || !s.teacherId);
    if(isInvalid) return toast.error("Please fill all fields!");

    // Backend-er chahida moto Payload pathano
    dispatch(addRoutine(formData));
  };

  return (
    <div className="p-8 bg-[#f0f2f5] min-h-screen font-sans">
      <div className="max-w-5xl mx-auto">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 font-black uppercase text-xs mb-6 hover:text-blue-600 transition-colors">
          <ArrowLeft size={16} /> Back
        </button>

        <div className="bg-white border-[4px] border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
          <div className="bg-black text-white p-6 border-b-4 border-black">
            <h1 className="text-3xl font-black uppercase italic tracking-tighter">Bulk Routine Entry</h1>
            <p className="text-blue-400 text-xs font-bold uppercase mt-1 italic">Single or Multiple Entries Supported</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-10">
            {/* Day & Period selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative">
                <label className="block text-xs font-black uppercase mb-2 italic text-gray-500">Select Day</label>
                <select 
                  className="w-full border-2 border-black p-3 font-bold outline-none appearance-none focus:bg-yellow-50 cursor-pointer"
                  value={formData.dayId}
                  onChange={(e) => setFormData({...formData, dayId: e.target.value})}
                  required
                >
                  <option value="">-- Choose Day --</option>
                  {days?.map(day => <option key={day._id} value={day._id}>{day.name}</option>)}
                </select>
                <ChevronDown className="absolute right-3 bottom-3 pointer-events-none opacity-50" size={20} />
              </div>

              <div className="relative">
                <label className="block text-xs font-black uppercase mb-2 italic text-gray-500">Select Period</label>
                <select 
                  className="w-full border-2 border-black p-3 font-bold outline-none appearance-none focus:bg-yellow-50 cursor-pointer"
                  value={formData.periodId}
                  onChange={(e) => setFormData({...formData, periodId: e.target.value})}
                  required
                >
                  <option value="">-- Choose Period --</option>
                  {periods?.map(p => (
                    <option key={p._id} value={p._id}>
                      Period {p.periodNumber} ({p.startTime} - {p.endTime})
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 bottom-3 pointer-events-none opacity-50" size={20} />
              </div>
            </div>

            {/* Schedules Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-black uppercase italic border-b-2 border-black pb-2 flex justify-between items-center">
                <span>Assign Sections</span>
              </h3>
              
              <div className="space-y-4">
                {formData.schedules.map((row, index) => (
                  <div key={index} className="flex flex-wrap md:flex-nowrap gap-4 items-center bg-gray-50 p-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
                    <div className="flex-1 min-w-[180px]">
                      <select 
                        className="w-full border-2 border-black p-2 text-[11px] font-bold"
                        value={row.sectionId}
                        onChange={(e) => handleScheduleChange(index, "sectionId", e.target.value)}
                        required
                      >
                        <option value="">-- Section --</option>
                        {sections?.map(s => <option key={s._id} value={s._id}>Class {s.className.toUpperCase()} - {s.sectionName}</option>)}
                      </select>
                    </div>

                    <div className="flex-1 min-w-[140px]">
                      <select 
                        className="w-full border-2 border-black p-2 text-[11px] font-bold"
                        value={row.subjectId}
                        onChange={(e) => handleScheduleChange(index, "subjectId", e.target.value)}
                        required
                      >
                        <option value="">-- Subject --</option>
                        {subjects?.map(sub => <option key={sub._id} value={sub._id}>{sub.name}</option>)}
                      </select>
                    </div>

                    <div className="flex-1 min-w-[140px]">
                      <select 
                        className="w-full border-2 border-black p-2 text-[11px] font-bold"
                        value={row.teacherId}
                        onChange={(e) => handleScheduleChange(index, "teacherId", e.target.value)}
                        required
                      >
                        <option value="">-- Teacher --</option>
                        {teachers?.map(t => <option key={t._id} value={t._id}>{t.name || t.teacherName}</option>)}
                      </select>
                    </div>

                    {formData.schedules.length > 1 && (
                      <button 
                        type="button" 
                        onClick={() => removeScheduleRow(index)}
                        className="text-red-500 hover:bg-black p-2 border-2 border-black transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <button 
                type="button" onClick={addScheduleRow}
                className="w-full border-2 border-dashed border-black p-3 font-black uppercase text-xs hover:bg-blue-600 hover:text-white transition-all italic"
              >
                <Plus size={16} className="inline mr-2" /> Add Another Row
              </button>
            </div>

            <button 
              type="submit" disabled={loading}
              className="w-full bg-black text-white p-5 font-black uppercase italic text-xl shadow-[8px_8px_0px_0px_rgba(59,130,246,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex items-center justify-center gap-4 border-2 border-black"
            >
              {loading ? "SAVING..." : <><Save size={24} /> Submit Routine</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddRoutine;