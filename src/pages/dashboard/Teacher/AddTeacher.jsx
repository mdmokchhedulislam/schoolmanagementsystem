import React, { useState } from "react";

function AddTeacher() {
  const [teacher, setTeacher] = useState({
    name: "",
    subject: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeacher({ ...teacher, [name]: value });
  };

  const handleImageChange = (e) => {
    setTeacher({ ...teacher, image: URL.createObjectURL(e.target.files[0]) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Teacher added:", teacher);
    alert(`Teacher ${teacher.name} added successfully!`);
    setTeacher({ name: "", subject: "", image: null });
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-slate-900 dark:text-white">
          Add New Teacher
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div className="relative">
            <label className="block mb-1 font-medium text-slate-700 dark:text-slate-200">
              Teacher Name
            </label>
            <input
              type="text"
              name="name"
              value={teacher.name}
              onChange={handleChange}
              placeholder="Enter full name"
              required
              className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Subject */}
          <div className="relative">
            <label className="block mb-1 font-medium text-slate-700 dark:text-slate-200">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              value={teacher.subject}
              onChange={handleChange}
              placeholder="Enter subject (e.g., Math)"
              required
              className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Image Upload */}
          <div className="relative">
            <label className="block mb-1 font-medium text-slate-700 dark:text-slate-200">
              Teacher Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full text-sm text-slate-500 dark:text-slate-300"
            />
            {teacher.image && (
              <div className="mt-3 flex justify-center">
                <img
                  src={teacher.image}
                  alt="Preview"
                  className="w-28 h-28 rounded-full object-cover border-4 border-green-500 shadow-lg"
                />
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-green-600 to-teal-500 text-white font-semibold rounded-xl hover:from-teal-500 hover:to-green-600 shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Add Teacher
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTeacher;
