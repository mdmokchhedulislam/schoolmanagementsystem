import React, { useState } from "react";
import { Link } from "react-router-dom";

function AddStudent() {
  const [student, setStudent] = useState({
    name: "",
    class: "",
    age: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleImageChange = (e) => {
    setStudent({ ...student, image: URL.createObjectURL(e.target.files[0]) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Student added:", student);
    alert(`Student ${student.name} added successfully!`);
    setStudent({ name: "", class: "", age: "", image: null });
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-slate-900 dark:text-white">
          Add New Student
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div className="relative">
            <label className="block mb-1 font-medium text-slate-700 dark:text-slate-200">
              Student Name
            </label>
            <input
              type="text"
              name="name"
              value={student.name}
              onChange={handleChange}
              placeholder="Enter full name"
              required
              className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Class */}
          <div className="relative">
            <label className="block mb-1 font-medium text-slate-700 dark:text-slate-200">
              Class
            </label>
            <input
              type="text"
              name="class"
              value={student.class}
              onChange={handleChange}
              placeholder="Enter class (e.g., 5A)"
              required
              className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Age */}
          <div className="relative">
            <label className="block mb-1 font-medium text-slate-700 dark:text-slate-200">
              Age
            </label>
            <input
              type="number"
              name="age"
              value={student.age}
              onChange={handleChange}
              placeholder="Enter age"
              required
              className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Image Upload */}
          <div className="relative">
            <label className="block mb-1 font-medium text-slate-700 dark:text-slate-200">
              Student Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full text-sm text-slate-500 dark:text-slate-300"
            />
            {student.image && (
              <div className="mt-3 flex justify-center">
                <img
                  src={student.image}
                  alt="Preview"
                  className="w-28 h-28 rounded-full object-cover border-4 border-blue-500 shadow-lg"
                />
              </div>
            )}
          </div>

          {/* Submit */}
          <Link to={"/dashboard/student/add"}
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-blue-600 shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Add Student
          </Link>
        </form>
      </div>
    </div>
  );
}

export default AddStudent;
