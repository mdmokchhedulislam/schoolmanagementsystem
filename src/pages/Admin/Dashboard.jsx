import React from "react";
import { useSelector } from "react-redux";
// import TeacherDashboard from "./TeacherDashboard";
import AdminDashboard from "./AdminDashboard";
import TeacherDashboard from "./TeacherDashboard";

function Dashboard() {
  const { admin } = useSelector((state) => state.auth);
  const role = admin?.role;

  if (role === "teacher") {
    return <TeacherDashboard />;
  }

  return <AdminDashboard />;
}

export default Dashboard;