import React, { useState } from "react";

// Sample student fee data with pic
const initialStudents = [
  { id: 1, roll: "A01", name: "John Doe", class: "5A", monthsPaid: 2, feePerMonth: 500, pic: "https://i.pravatar.cc/150?img=1", lastCollectedBy: "" },
  { id: 2, roll: "B02", name: "Jane Smith", class: "6B", monthsPaid: 1, feePerMonth: 500, pic: "https://i.pravatar.cc/150?img=2", lastCollectedBy: "" },
  { id: 3, roll: "A02", name: "Michael Lee", class: "5A", monthsPaid: 0, feePerMonth: 500, pic: "https://i.pravatar.cc/150?img=3", lastCollectedBy: "" },
  { id: 4, roll: "B01", name: "Emma Watson", class: "6B", monthsPaid: 1, feePerMonth: 500, pic: "https://i.pravatar.cc/150?img=4", lastCollectedBy: "" },
];

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function StudentFee() {
  const [students, setStudents] = useState(initialStudents);
  const [searchName, setSearchName] = useState("");
  const [searchRoll, setSearchRoll] = useState("");
  const [filterClass, setFilterClass] = useState("");
  const [editingStudentId, setEditingStudentId] = useState(null);
  const [collectorName, setCollectorName] = useState(""); // Input collector name
  const [collectingId, setCollectingId] = useState(null); // Who we are collecting for

  const currentMonthIndex = new Date().getMonth();

  const startEditing = (id) => setEditingStudentId(id);
  const stopEditing = () => setEditingStudentId(null);

  // Toggle month paid/unpaid
  const toggleMonthPaid = (studentId, monthIndex) => {
    setStudents(prev =>
      prev.map(s => {
        if (s.id !== studentId) return s;
        let newMonthsPaid = s.monthsPaid;
        if (monthIndex < s.monthsPaid) {
          newMonthsPaid = monthIndex;
        } else {
          newMonthsPaid = monthIndex + 1;
        }
        return { ...s, monthsPaid: newMonthsPaid };
      })
    );
  };

  // Start collecting current month fee
  const startCollectFee = (studentId) => {
    setCollectingId(studentId);
    setCollectorName("");
  };

  // Collect current month fee with collector name
  const collectCurrentMonthFee = (studentId) => {
    if (!collectorName.trim()) return alert("Please enter collector name");

    setStudents(prev =>
      prev.map(s => {
        if (s.id !== studentId) return s;
        return {
          ...s,
          monthsPaid: currentMonthIndex + 1,
          lastCollectedBy: collectorName
        };
      })
    );

    setCollectingId(null);
    setCollectorName("");
  };

  const filteredStudents = students.filter(s => {
    const matchesName = s.name.toLowerCase().includes(searchName.toLowerCase());
    const matchesRoll = s.roll.toLowerCase().includes(searchRoll.toLowerCase());
    const matchesClass = filterClass ? s.class === filterClass : true;
    return matchesName && matchesRoll && matchesClass;
  });

  const classes = [...new Set(students.map(s => s.class))];

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold mb-6 text-slate-900 dark:text-white">
          Student Fee Management
        </h2>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchName}
            onChange={e => setSearchName(e.target.value)}
            className="w-full md:w-1/3 p-3 rounded-xl border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <input
            type="text"
            placeholder="Search by roll..."
            value={searchRoll}
            onChange={e => setSearchRoll(e.target.value)}
            className="w-full md:w-1/3 p-3 rounded-xl border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <select
            value={filterClass}
            onChange={e => setFilterClass(e.target.value)}
            className="w-full md:w-1/6 p-3 rounded-xl border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="">All Classes</option>
            {classes.map(cls => (
              <option key={cls} value={cls}>{cls}</option>
            ))}
          </select>
        </div>

        {/* Students Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {filteredStudents.map(student => {
            const feePaid = student.monthsPaid * student.feePerMonth;
            const feeRemaining = (12 - student.monthsPaid) * student.feePerMonth;
            const currentMonthPaid = student.monthsPaid > currentMonthIndex;

            return (
              <div
                key={student.id}
                className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition"
              >
                {/* Profile Pic */}
                <div className="flex justify-center mb-3">
                  <img
                    src={student.pic}
                    alt={student.name}
                    className="w-20 h-20 rounded-full border-2 border-slate-300 dark:border-slate-600"
                  />
                </div>

                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-1">
                  {student.name} <span className="text-sm text-slate-500 dark:text-slate-400">({student.roll})</span>
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                  Class: <span className="font-semibold">{student.class}</span>
                </p>

                {/* Current Month Badge + Collect Fee */}
                <div className="mb-3">
                  <span className={`px-3 py-1 rounded-full font-medium ${
                    currentMonthPaid ? "bg-green-600 text-white" : "bg-red-500 text-white"
                  }`}>
                    {monthNames[currentMonthIndex]} - {currentMonthPaid ? "Paid" : "Unpaid"}
                  </span>

                  {/* Show collector input if collecting */}
                  {!currentMonthPaid && collectingId === student.id && (
                    <div className="mt-2 flex gap-2">
                      <input
                        type="text"
                        placeholder="Collector Name"
                        value={collectorName}
                        onChange={e => setCollectorName(e.target.value)}
                        className="p-2 rounded-xl border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white flex-1"
                      />
                      <button
                        onClick={() => collectCurrentMonthFee(student.id)}
                        className="px-3 py-1 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
                      >
                        Submit
                      </button>
                    </div>
                  )}

                  {/* Show button to start collecting */}
                  {!currentMonthPaid && collectingId !== student.id && (
                    <button
                      onClick={() => startCollectFee(student.id)}
                      className="ml-2 mt-2 px-3 py-1 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition text-sm"
                    >
                      Collect Fee
                    </button>
                  )}
                </div>

                {/* Last collector info */}
                {student.lastCollectedBy && (
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                    Last Collected By: <span className="font-semibold">{student.lastCollectedBy}</span>
                  </p>
                )}

                {/* Full 12 Months Edit Payment */}
                {editingStudentId === student.id && (
                  <div className="mb-3 grid grid-cols-3 gap-2">
                    {monthNames.map((month, idx) => (
                      <button
                        key={month}
                        onClick={() => toggleMonthPaid(student.id, idx)}
                        className={`px-2 py-1 rounded-full text-white text-sm font-medium ${
                          idx < student.monthsPaid ? "bg-green-600" : "bg-red-500"
                        }`}
                      >
                        {month}
                      </button>
                    ))}
                  </div>
                )}

                {/* Fee Info */}
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Fee Paid: <span className="font-semibold">${feePaid}</span>
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                  Fee Remaining: <span className="font-semibold">${feeRemaining}</span>
                </p>

                {/* Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => editingStudentId === student.id ? stopEditing() : startEditing(student.id)}
                    className="flex-1 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
                  >
                    {editingStudentId === student.id ? "Close Edit" : "Edit Payment"}
                  </button>
                </div>
              </div>
            );
          })}

          {filteredStudents.length === 0 && (
            <p className="text-center text-slate-500 dark:text-slate-400 col-span-full mt-10">
              No students found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentFee;
