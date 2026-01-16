import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRoutine, addRoutine, clearRoutineState } from "../../../redux/slices/routine_slice.js";
import { Calendar, PlusCircle, X, Save, Clock, User, BookOpen } from "lucide-react";
import toast from "react-hot-toast";

const Routine_page = () => {
  const dispatch = useDispatch();
  const { routineData, loading, success, error } = useSelector((state) => state.routine);

  // Modal and Form States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    dayName: "Saturday",
    periodNumber: 1,
    className: "",
    sectionName: "",
    subjectName: "",
    teacherName: "",
    startTime: "",
    endTime: ""
  });

  useEffect(() => {
    dispatch(getRoutine());
  }, [dispatch]);

  // Handle Success or Error Messages
  useEffect(() => {
    if (success) {
      toast.success("Routine added successfully!");
      setIsModalOpen(false);
      dispatch(clearRoutineState());
    }
    if (error) {
      toast.error(error);
      dispatch(clearRoutineState());
    }
  }, [success, error, dispatch]);

  const allClassGroups = routineData?.reduce((acc, day) => {
    day.schedules.forEach(session => {
      const groupKey = `${session.className}-${session.sectionName}`;
      if (!acc.find(item => item.id === groupKey)) {
        acc.push({ id: groupKey, className: session.className, sectionName: session.sectionName });
      }
    });
    return acc;
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addRoutine(formData));
  };

  const daysList = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const periods = [1, 2, 3, 4, 5, 6];
  const daysInData = routineData?.map(d => d._id) || [];

  return (
    <div className="p-4 bg-gray-50 min-h-screen font-sans relative">
      
      {/* Header Section */}
      <div className="max-w-[1600px] mx-auto mb-8 border-b-4 border-black pb-4 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black uppercase flex items-center gap-3 italic">
            <Calendar size={32} /> Academic Schedule
          </h1>
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mt-1">School Management System</p>
        </div>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-black text-white px-6 py-3 font-black uppercase italic flex items-center gap-2 hover:bg-blue-600 transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)] active:translate-y-1"
        >
          <PlusCircle size={20} /> Add New Entry
        </button>
      </div>

      {/* Routine Grid Layout */}
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        {allClassGroups?.map((group) => (
          <div key={group.id} className="bg-white border-[3px] border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex flex-col">
            <div className="border-b-[3px] border-black p-3 text-center bg-white">
              <div className="flex justify-center gap-4 mt-1">
                <span className="bg-black text-white px-3 py-0.5 text-[10px] font-bold rounded">CLASS: {group.className}</span>
                <span className="bg-blue-600 text-white px-3 py-0.5 text-[10px] font-bold rounded">SECTION: {group.sectionName}</span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-[10px] border-collapse">
                <thead>
                  <tr className="bg-gray-100 border-b-2 border-black">
                    <th className="border-r-2 border-black p-2 font-black w-24 uppercase">Day</th>
                    {periods.map(p => <th key={p} className="border-r-2 border-black p-2 font-black last:border-r-0">{p}<sup>st</sup> PER</th>)}
                  </tr>
                </thead>
                <tbody>
                  {daysInData.map((dayName) => {
                    const dayObj = routineData?.find(d => d._id === dayName);
                    return (
                      <tr key={dayName} className="border-b-2 border-black last:border-b-0 h-14">
                        <td className="border-r-2 border-black p-2 font-black bg-gray-50 uppercase text-center italic">{dayName.substring(0, 3)}</td>
                        {periods.map((pNum) => {
                          const session = dayObj?.schedules.find(s => s.periodNumber === pNum && s.className === group.className && s.sectionName === group.sectionName);
                          return (
                            <td key={pNum} className="border-r-2 border-gray-200 p-1 last:border-r-0 text-center align-middle">
                              {session ? (
                                <div className="flex flex-col text-[9px]">
                                  <span className="font-black text-blue-800 leading-none uppercase">{session.subjectName}</span>
                                  <span className="text-[7px] font-bold text-gray-400 mt-1 uppercase italic">{session.teacherName}</span>
                                  <span className="text-[7px] font-mono text-blue-400 font-bold">{session.startTime}</span>
                                </div>
                              ) : <span className="text-gray-200 font-bold text-lg">-</span>}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      {/* --- ADD ROUTINE MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex justify-center items-center p-4">
          <div className="bg-white border-[4px] border-black shadow-[15px_15px_0px_0px_rgba(0,0,0,1)] w-full max-w-xl animate-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="bg-black text-white p-4 flex justify-between items-center">
              <h2 className="text-xl font-black uppercase italic flex items-center gap-2">
                <PlusCircle size={24} /> Create New Schedule
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="hover:bg-red-500 p-1 transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                {/* Day Selection */}
                <div>
                  <label className="block text-xs font-black uppercase mb-1">Select Day</label>
                  <select 
                    className="w-full border-2 border-black p-2 font-bold outline-none focus:bg-yellow-50"
                    value={formData.dayName}
                    onChange={(e) => setFormData({...formData, dayName: e.target.value})}
                  >
                    {daysList.map(day => <option key={day} value={day}>{day}</option>)}
                  </select>
                </div>
                {/* Period Selection */}
                <div>
                  <label className="block text-xs font-black uppercase mb-1">Period Number</label>
                  <select 
                    className="w-full border-2 border-black p-2 font-bold outline-none focus:bg-yellow-50"
                    value={formData.periodNumber}
                    onChange={(e) => setFormData({...formData, periodNumber: Number(e.target.value)})}
                  >
                    {periods.map(p => <option key={p} value={p}>Period {p}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Class Name */}
                <div>
                  <label className="block text-xs font-black uppercase mb-1 italic text-blue-600">Class</label>
                  <input 
                    type="text" placeholder="e.g. 10" required
                    className="w-full border-2 border-black p-2 font-bold outline-none"
                    onChange={(e) => setFormData({...formData, className: e.target.value})}
                  />
                </div>
                {/* Section Name */}
                <div>
                  <label className="block text-xs font-black uppercase mb-1 italic text-blue-600">Section</label>
                  <input 
                    type="text" placeholder="e.g. A" required
                    className="w-full border-2 border-black p-2 font-bold outline-none"
                    onChange={(e) => setFormData({...formData, sectionName: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Subject Name */}
                <div className="col-span-1">
                  <label className="text-xs font-black uppercase flex items-center gap-1 mb-1"><BookOpen size={14}/> Subject</label>
                  <input 
                    type="text" placeholder="Mathematics" required
                    className="w-full border-2 border-black p-2 font-bold outline-none"
                    onChange={(e) => setFormData({...formData, subjectName: e.target.value})}
                  />
                </div>
                {/* Teacher Name */}
                <div className="col-span-1">
                  <label className="text-xs font-black uppercase flex items-center gap-1 mb-1"><User size={14}/> Teacher</label>
                  <input 
                    type="text" placeholder="Mr. Rahim" required
                    className="w-full border-2 border-black p-2 font-bold outline-none"
                    onChange={(e) => setFormData({...formData, teacherName: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Time Selection */}
                <div>
                  <label className="text-xs font-black uppercase flex items-center gap-1 mb-1"><Clock size={14}/> Start Time</label>
                  <input 
                    type="time" required
                    className="w-full border-2 border-black p-2 font-bold outline-none"
                    onChange={(e) => setFormData({...formData, startTime: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-xs font-black uppercase flex items-center gap-1 mb-1"><Clock size={14}/> End Time</label>
                  <input 
                    type="time" required
                    className="w-full border-2 border-black p-2 font-bold outline-none"
                    onChange={(e) => setFormData({...formData, endTime: e.target.value})}
                  />
                </div>
              </div>

              <button 
                type="submit" disabled={loading}
                className="w-full bg-black text-white p-4 font-black uppercase italic text-lg flex items-center justify-center gap-3 hover:bg-blue-600 transition-all"
              >
                {loading ? "Saving..." : <><Save size={20} /> Save Routine</>}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Footer Info */}
      <div className="mt-12 text-center">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.5em]">System Generated Layout • 2026</p>
      </div>
    </div>
  );
};

export default Routine_page;