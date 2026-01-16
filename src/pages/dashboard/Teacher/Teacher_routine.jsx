import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTeacherRoutine } from "../../../redux/slices/routine_slice.js";
import { Clock, MapPin, Users, BookOpen, Calendar, Loader2 } from "lucide-react";

const TeacherRoutine = () => {
  const dispatch = useDispatch();
  const { teacherRoutine, loading, error } = useSelector((state) => state.routine);

  useEffect(() => {
    dispatch(getTeacherRoutine());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="animate-spin text-indigo-600" size={48} />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-[#fafafa] min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-5xl font-black uppercase italic tracking-tighter text-black">
              Instructor Schedule
            </h1>
            <p className="text-indigo-600 font-bold uppercase text-xs mt-2 tracking-[0.3em]">
              Teaching Portfolio • Academic Year 2026
            </p>
          </div>
          <div className="bg-black text-white px-6 py-2 border-l-8 border-yellow-400 font-black uppercase italic text-sm">
            Total Days: {teacherRoutine?.length || 0}
          </div>
        </header>

        {error && (
          <div className="bg-red-50 border-[4px] border-black p-4 mb-6 font-bold flex items-center gap-3">
            <div className="bg-red-500 text-white p-1 rounded-full">!</div>
            <span>{error}</span>
          </div>
        )}

        {teacherRoutine.length === 0 && !loading && (
          <div className="bg-white border-[4px] border-black p-20 text-center shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-black uppercase italic">No Classes Assigned!</h2>
            <p className="font-bold text-gray-500 mt-2">Enjoy your free time or contact the academic office.</p>
          </div>
        )}

        {/* Schedule Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
          {teacherRoutine.map((dayData, index) => (
            <div 
              key={index} 
              className="bg-white border-[4px] border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
            >
              {/* Day Section */}
              <div className="bg-black text-white p-5 border-b-[4px] border-black flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Calendar size={24} className="text-yellow-400" />
                  <h2 className="text-2xl font-black uppercase italic tracking-widest">{dayData._id}</h2>
                </div>
                <span className="text-[10px] font-bold bg-white/20 px-3 py-1 rounded-full">
                  {dayData.myClasses.length} PERIODS
                </span>
              </div>

              {/* Class Cards */}
              <div className="p-6 space-y-6">
                {dayData.myClasses.map((cls, idx) => (
                  <div 
                    key={idx} 
                    className="relative border-[3px] border-black p-5 hover:bg-yellow-50 transition-all group"
                  >
                    {/* Period Floating Badge */}
                    <div className="absolute -top-4 -right-4 bg-yellow-400 border-[3px] border-black px-4 py-1 text-xs font-black uppercase transform rotate-3 group-hover:rotate-0 transition-transform">
                      Period {cls.periodNumber}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Left: Subject & Time */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <BookOpen size={18} className="text-indigo-600" />
                          <h3 className="text-xl font-black uppercase tracking-tight">{cls.subjectName}</h3>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 font-bold italic text-sm">
                          <Clock size={16} />
                          {cls.startTime} — {cls.endTime}
                        </div>
                      </div>

                      {/* Right: Class & Section */}
                      <div className="flex flex-col md:items-end justify-center gap-2 border-t md:border-t-0 md:border-l border-dashed border-black/20 pt-4 md:pt-0 md:pl-4">
                        <div className="flex items-center gap-2">
                          <Users size={16} className="text-green-600" />
                          <span className="text-sm font-black uppercase text-black">
                            Class: <span className="bg-black text-white px-2 py-0.5 ml-1">{cls.className}</span>
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={16} className="text-red-500" />
                          <span className="text-sm font-black uppercase text-gray-500">
                            Section: <span className="text-black underline decoration-yellow-400 decoration-4">{cls.sectionName}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherRoutine;