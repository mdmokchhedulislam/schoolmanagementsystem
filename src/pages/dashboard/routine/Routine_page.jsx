import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Navigation er jonno
import { getRoutine } from "../../../redux/slices/routine_slice.js";
import { Calendar, PlusCircle, Clock, BookOpen, User } from "lucide-react";

const Routine_page = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { routineData, loading } = useSelector((state) => state.routine);

  useEffect(() => {
    dispatch(getRoutine());
  }, [dispatch]);

  // Unique Class + Section grouping logic
  const allClassGroups = routineData?.reduce((acc, day) => {
    day.schedules.forEach(session => {
      const groupKey = `${session.className}-${session.sectionName}`;
      if (!acc.find(item => item.id === groupKey)) {
        acc.push({ 
          id: groupKey, 
          className: session.className, 
          sectionName: session.sectionName 
        });
      }
    });
    return acc;
  }, []);

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <div className="w-12 h-12 border-4 border-black border-t-blue-600 rounded-full animate-spin"></div>
      <p className="font-black uppercase italic animate-pulse">Dadu vai, data load hochhe...</p>
    </div>
  );

  const periods = [1, 2, 3, 4, 5, 6];
  const daysInData = routineData?.map(d => d._id) || [];

  return (
    <div className="p-6 bg-[#f8fafc] min-h-screen font-sans">
      
      {/* Header Section */}
      <div className="max-w-[1600px] mx-auto mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b-4 border-black pb-6">
        <div>
          <h1 className="text-4xl font-black uppercase flex items-center gap-3 italic tracking-tighter text-black">
            <Calendar size={40} className="text-blue-600" /> Academic Schedule
          </h1>
          <p className="text-sm font-bold text-gray-500 uppercase tracking-[0.3em] mt-1 ml-1">
            2026 • School Management System
          </p>
        </div>

        {/* Eikhane click korle Add Page e jabe */}
        <button 
          onClick={() => navigate("/admin/dashboard/routine/add")}
          className="bg-black text-white px-8 py-4 font-black uppercase italic flex items-center justify-center gap-3 hover:bg-blue-600 transition-all shadow-[8px_8px_0px_0px_rgba(59,130,246,0.3)] active:translate-y-1 active:shadow-none"
        >
          <PlusCircle size={22} /> Add New Entry
        </button>
      </div>

      {/* Routine Cards Grid */}
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 xl:grid-cols-2 gap-12">
        {allClassGroups?.length > 0 ? (
          allClassGroups.map((group) => (
            <div key={group.id} className="bg-white border-[4px] border-black shadow-[15px_15px_0px_0px_rgba(0,0,0,1)] hover:shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] transition-all flex flex-col overflow-hidden">
              
              {/* Card Header */}
              <div className="bg-black text-white p-4 flex justify-between items-center">
                <div className="flex gap-3">
                  <span className="bg-blue-600 px-4 py-1 text-xs font-black uppercase rounded">CLASS: {group.className}</span>
                  <span className="bg-white text-black px-4 py-1 text-xs font-black uppercase rounded">SECTION: {group.sectionName}</span>
                </div>
                <BookOpen size={20} className="opacity-50" />
              </div>

              {/* Table Body */}
              <div className="overflow-x-auto">
                <table className="w-full text-[11px] border-collapse">
                  <thead>
                    <tr className="bg-gray-100 border-b-4 border-black">
                      <th className="border-r-2 border-black p-3 font-black w-24 uppercase bg-gray-200">Day</th>
                      {periods.map(p => (
                        <th key={p} className="border-r-2 border-black p-3 font-black last:border-r-0 uppercase italic">
                          {p}<sup className="lowercase">st</sup> Period
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {daysInData.map((dayName) => {
                      const dayObj = routineData?.find(d => d._id === dayName);

                      return (
                        <tr key={dayName} className="border-b-2 border-black last:border-b-0 hover:bg-blue-50/50 transition-colors h-16">
                          <td className="border-r-2 border-black p-2 font-black bg-gray-50 uppercase text-center italic text-blue-800">
                            {dayName.substring(0, 3)}
                          </td>
                          
                          {periods.map((pNum) => {
                            const session = dayObj?.schedules.find(s => 
                              s.periodNumber === pNum && 
                              s.className === group.className &&
                              s.sectionName === group.sectionName
                            );

                            return (
                              <td key={pNum} className="border-r-2 border-gray-200 p-2 last:border-r-0 text-center align-middle">
                                {session ? (
                                  <div className="flex flex-col gap-0.5">
                                    <span className="font-black text-black leading-tight uppercase tracking-tighter text-xs">{session.subjectName}</span>
                                    <div className="flex items-center justify-center gap-1 opacity-70">
                                      <User size={8} />
                                      <span className="text-[8px] font-bold uppercase truncate">{session.teacherName}</span>
                                    </div>
                                    <div className="mt-1 inline-block bg-gray-100 rounded px-1 py-0.5 border border-black/10">
                                      <span className="text-[8px] font-mono font-bold text-blue-600">{session.startTime}</span>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="flex justify-center items-center h-full opacity-10">
                                    <Clock size={16} />
                                  </div>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Card Footer */}
              <div className="bg-gray-100 p-2 border-t-2 border-black flex justify-between items-center">
                <span className="text-[9px] font-bold text-gray-400">UID: {group.id}</span>
                <span className="text-[9px] font-black uppercase italic flex items-center gap-1">
                  Verified Schedule <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full bg-white border-4 border-dashed border-gray-300 p-20 text-center">
             <p className="text-gray-400 font-black uppercase italic">Kono routine khuje paoa jayni, dadu vai!</p>
          </div>
        )}
      </div>

      {/* Footer Branding */}
      <div className="mt-16 text-center pb-10">
        <div className="inline-block border-t-2 border-black pt-2">
          <p className="text-[10px] font-black text-black uppercase tracking-[0.4em] italic opacity-40">
            Automated Academic Planning System • Version 2.0
          </p>
        </div>
      </div>
    </div>
  );
};

export default Routine_page;