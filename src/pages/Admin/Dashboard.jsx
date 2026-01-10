import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllStudents } from "../../redux/slices/studentSlice";
import DashboardStats from "../../components/Dashboard/Stats";

function AdminDashboard() {
  const dispatch = useDispatch();
  const { students, loading, error } = useSelector((state) => state.students);

  useEffect(() => {
    dispatch(fetchAllStudents());
  }, [dispatch]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <DashboardStats students={students} />

      {loading && <p className="text-blue-600">Loading students...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && students.length === 0 && (
        <p className="text-gray-600">No students found.</p>
      )}

      {!loading && students.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-2 px-4 text-left">#</th>
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Email</th>
                <th className="py-2 px-4 text-left">Role</th>
                <th className="py-2 px-4 text-left">School ID</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr
                  key={student._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">{student.name}</td>
                  <td className="py-2 px-4">{student.email}</td>
                  <td className="py-2 px-4">{student.role}</td>
                  <td className="py-2 px-4">{student.schoolId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
