import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStudentRoutine } from "../../../redux/slices/routine_slice.js";
import { BookOpen, Clock, User, CalendarDays, Loader2 } from "lucide-react";

const StudentRoutine = () => {
  const dispatch = useDispatch();
  const { studentRoutine, loading, error } = useSelector((state) => state.routine);

  useEffect(() => {
    dispatch(getStudentRoutine());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="animate-spin text-black" size={48} />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-[#fdfdfd] min-h-screen">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-black uppercase italic tracking-tighter text-black">
            My Class Routine
          </h1>
          <p className="text-gray-500 font-bold uppercase text-xs mt-2 tracking-widest">
            Academic Schedule • Section Based
          </p>
        </header>

        {error && (
          <div className="bg-red-100 border-4 border-black p-4 mb-6 font-bold">
            Error: {error}
          </div>
        )}

        {studentRoutine.length === 0 && !loading && (
          <div className="bg-yellow-50 border-4 border-black p-10 text-center">
            <h2 className="text-xl font-black uppercase italic">No routine assigned yet!</h2>
            <p className="font-bold text-gray-600 mt-2 text-sm uppercase">Please check back later or contact admin.</p>
          </div>
        )}

        {/* Routine Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {studentRoutine.map((dayData, index) => (
            <div 
              key={index} 
              className="bg-white border-[4px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col"
            >
              {/* Day Header */}
              <div className="bg-black text-white p-4 flex items-center gap-3">
                <CalendarDays size={20} className="text-yellow-400" />
                <h2 className="text-xl font-black uppercase italic">{dayData._id}</h2>
              </div>

              {/* Class List */}
              <div className="p-4 space-y-4 flex-grow">
                {dayData.fullDayRoutine.map((cls, idx) => (
                  <div 
                    key={idx} 
                    className="group relative border-2 border-black p-4 hover:bg-blue-50 transition-colors"
                  >
                    {/* Period Badge */}
                    <div className="absolute -top-3 -right-3 bg-yellow-400 border-2 border-black px-3 py-1 text-[10px] font-black uppercase">
                      Period {cls.periodNumber}
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <BookOpen size={16} className="text-blue-600" />
                        <span className="text-lg font-black uppercase tracking-tight">
                          {cls.subjectName}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock size={14} />
                        <span className="text-xs font-bold uppercase italic">
                          {cls.startTime} - {cls.endTime}
                        </span>
                        <span className="text-[10px] bg-gray-200 px-2 font-black rounded-full">
                          {cls.type}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mt-2 pt-2 border-t border-dashed border-gray-300">
                        <User size={14} className="text-green-600" />
                        <span className="text-[11px] font-black uppercase text-gray-500">
                          Instructor: <span className="text-black">{cls.teacherName}</span>
                        </span>
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

export default StudentRoutine;