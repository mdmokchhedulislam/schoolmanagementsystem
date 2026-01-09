import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Landing";
import Login from "./pages/Login";
import SignupPage from "./pages/Signup";
import DashboardPage from "./pages/dashboard/Dashboard";
import StudentManagement from "./pages/dashboard/Student/StudentPage";
import Teacher from "./pages/dashboard/Teacher/Teacher";
import AddStudent from "./pages/dashboard/Student/AddStudent";
import StudentFee from "./pages/dashboard/Student/StudentFee";
import AdminLogin from "./pages/AdminLogin";
import AdminSignup from "./pages/AdminRegistratioin";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Signup" element={<SignupPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/dashboard/student" element={<StudentManagement />} />
      <Route path="/dashboard/student/fees" element={<StudentFee />} />
      <Route path="/dashboard/teacher" element={<Teacher />} />
      <Route path="/dashboard/student/add" element={<AddStudent />} />
      <Route path="/admin/signup" element={<AdminSignup />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      
    </Routes>
  );
}

export default App;
