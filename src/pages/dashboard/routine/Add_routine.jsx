import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRoutine } from "../../../redux/slices/routine_slice.js";
import { Plus, Trash2, Save, X } from "lucide-react";
import toast from "react-hot-toast";

const Routine_page = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State: Tomar JSON structure onujayi
  const [formData, setFormData] = useState({
    dayId: "",
    periodId: "",
    schedules: [
      { sectionId: "", subjectId: "", teacherId: "" }
    ]
  });

  // Notun schedule row add kora
  const addScheduleRow = () => {
    setFormData({
      ...formData,
      schedules: [...formData.schedules, { sectionId: "", subjectId: "", teacherId: "" }]
    });
  };

  // Row delete kora
  const removeScheduleRow = (index) => {
    const updatedSchedules = formData.schedules.filter((_, i) => i !== index);
    setFormData({ ...formData, schedules: updatedSchedules });
  };

  // Input change handler
  const handleScheduleChange = (index, field, value) => {
    const updatedSchedules = [...formData.schedules];
    updatedSchedules[index][field] = value;
    setFormData({ ...formData, schedules: updatedSchedules });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting Data:", formData);
    dispatch(addRoutine(formData));
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <button 
        onClick={() => setIsModalOpen(true)}
        className="bg-black text-white px-6 py-3 font-black uppercase flex items-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-blue-600 transition-all"
      >
        <Plus size={20} /> Bulk Add Routine
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-4">
          <div className="bg-white border-4 border-black w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-[15px_15px_0px_0px_rgba(0,0,0,1)]">
            
            {/* Modal Header */}
            <div className="bg-black text-white p-4 flex justify-between items-center sticky top-0 z-10">
              <h2 className="text-xl font-black uppercase italic">Add Bulk Schedules</h2>
              <button onClick={() => setIsModalOpen(false)}><X size={24} /></button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* IDs Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase">Day ID</label>
                  <input 
                    className="w-full border-2 border-black p-2 font-bold outline-none focus:bg-yellow-50"
                    placeholder="69699e69056d2a268f930d69"
                    onChange={(e) => setFormData({...formData, dayId: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase">Period ID</label>
                  <input 
                    className="w-full border-2 border-black p-2 font-bold outline-none focus:bg-yellow-50"
                    placeholder="6969a083056d2a268f930d8b"
                    onChange={(e) => setFormData({...formData, periodId: e.target.value})}
                    required
                  />
                </div>
              </div>

              {/* Schedules Table Section */}
              <div className="border-2 border-black">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100 border-b-2 border-black">
                    <tr>
                      <th className="p-2 border-r-2 border-black text-left text-[10px] font-black">SECTION ID</th>
                      <th className="p-2 border-r-2 border-black text-left text-[10px] font-black">SUBJECT ID</th>
                      <th className="p-2 border-r-2 border-black text-left text-[10px] font-black">TEACHER ID</th>
                      <th className="p-2 text-center text-[10px] font-black">ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.schedules.map((row, index) => (
                      <tr key={index} className="border-b border-gray-300 last:border-0">
                        <td className="p-1 border-r-2 border-black">
                          <input 
                            className="w-full p-1 text-[10px] outline-none font-semibold"
                            placeholder="Section ID..."
                            onChange={(e) => handleScheduleChange(index, "sectionId", e.target.value)}
                            required
                          />
                        </td>
                        <td className="p-1 border-r-2 border-black">
                          <input 
                            className="w-full p-1 text-[10px] outline-none font-semibold"
                            placeholder="Subject ID..."
                            onChange={(e) => handleScheduleChange(index, "subjectId", e.target.value)}
                            required
                          />
                        </td>
                        <td className="p-1 border-r-2 border-black">
                          <input 
                            className="w-full p-1 text-[10px] outline-none font-semibold"
                            placeholder="Teacher ID..."
                            onChange={(e) => handleScheduleChange(index, "teacherId", e.target.value)}
                            required
                          />
                        </td>
                        <td className="p-1 text-center">
                          <button 
                            type="button"
                            onClick={() => removeScheduleRow(index)}
                            className="text-red-500 hover:bg-red-50 p-1 rounded"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center">
                <button 
                  type="button"
                  onClick={addScheduleRow}
                  className="bg-blue-600 text-white px-4 py-2 text-xs font-black uppercase flex items-center gap-1 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-1"
                >
                  <Plus size={14} /> Add More Section
                </button>

                <button 
                  type="submit"
                  className="bg-black text-white px-8 py-3 font-black uppercase italic flex items-center gap-2 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] active:translate-y-1"
                >
                  <Save size={18} /> Save All Schedules
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Routine_page;