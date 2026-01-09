import React, { useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const initialTeachers = [
  { id: 1, name: "Mrs. Smith", subject: "Math", image: "https://i.pravatar.cc/100?img=5" },
  { id: 2, name: "Mr. Johnson", subject: "English", image: "https://i.pravatar.cc/100?img=10" },
  { id: 3, name: "Ms. Lee", subject: "Science", image: "https://i.pravatar.cc/100?img=15" },
];

function Teacher() {
  const [teachers, setTeachers] = useState(initialTeachers);
  const [search, setSearch] = useState("");

  const handleDelete = (id) => {
    setTeachers(teachers.filter((t) => t.id !== id));
  };

  const filteredTeachers = teachers.filter((teacher) =>
    teacher.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mt-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
          Teacher Management
        </h2>
        <Link to={"/dashboard/teacher/add"} className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
          <FaPlus /> Add Teacher
        </Link>
      </div>

      <input
        type="text"
        placeholder="Search teachers..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-4 p-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white"
      />

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white">
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Teacher</th>
              <th className="py-2 px-4 border-b">Subject</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTeachers.map((teacher) => (
              <tr key={teacher.id} className="hover:bg-slate-100 dark:hover:bg-slate-700">
                <td className="py-2 px-4 border-b">{teacher.id}</td>
                <td className="py-2 px-4 border-b flex items-center gap-3">
                  <img
                    src={teacher.image}
                    alt={teacher.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="text-slate-900 dark:text-white">{teacher.name}</span>
                </td>
                <td className="py-2 px-4 border-b">{teacher.subject}</td>
                <td className="py-2 px-4 border-b flex gap-2">
                  <button className="bg-yellow-400 px-3 py-1 rounded-lg hover:bg-yellow-500">
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(teacher.id)}
                    className="bg-red-500 px-3 py-1 rounded-lg hover:bg-red-600"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
            {filteredTeachers.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-4 text-slate-500 dark:text-slate-400">
                  No teachers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Teacher;
