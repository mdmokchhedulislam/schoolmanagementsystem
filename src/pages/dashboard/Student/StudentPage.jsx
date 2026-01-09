import React, { useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const initialStudents = [
  { id: 1, name: "John Doe", class: "5A", age: 10, image: "https://i.pravatar.cc/100?img=20" },
  { id: 2, name: "Jane Smith", class: "6B", age: 11, image: "https://i.pravatar.cc/100?img=25" },
  { id: 3, name: "Michael Lee", class: "7C", age: 12, image: "https://i.pravatar.cc/100?img=30" },
];

function StudentManagement() {
  const [students, setStudents] = useState(initialStudents);
  const [search, setSearch] = useState("");

  const handleDelete = (id) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mt-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
          Student Management
        </h2>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <Link to={"/dashboard/student/add"}><FaPlus /> Add Student</Link>
        </button>
      </div>

      <input
        type="text"
        placeholder="Search students..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-4 p-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white"
      />

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white">
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Student</th>
              <th className="py-2 px-4 border-b">Class</th>
              <th className="py-2 px-4 border-b">Age</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id} className="hover:bg-slate-100 dark:hover:bg-slate-700">
                <td className="py-2 px-4 border-b">{student.id}</td>
                <td className="py-2 px-4 border-b flex items-center gap-3">
                  <img
                    src={student.image}
                    alt={student.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="text-slate-900 dark:text-white">{student.name}</span>
                </td>
                <td className="py-2 px-4 border-b">{student.class}</td>
                <td className="py-2 px-4 border-b">{student.age}</td>
                <td className="py-2 px-4 border-b flex gap-2">
                  <button className="bg-yellow-400 px-3 py-1 rounded-lg hover:bg-yellow-500">
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(student.id)}
                    className="bg-red-500 px-3 py-1 rounded-lg hover:bg-red-600"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
            {filteredStudents.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-4 text-slate-500 dark:text-slate-400">
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentManagement;
