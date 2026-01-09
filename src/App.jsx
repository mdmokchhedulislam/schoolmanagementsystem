import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignupPage from "./pages/Signup";
import DashboardPage from "./pages/dashboard/Dashboard";
import StudentManagement from "./pages/dashboard/Student/StudentPage";
import Teacher from "./pages/dashboard/Teacher/Teacher";
import AddStudent from "./pages/dashboard/Student/AddStudent";
import AddTeacher from "./pages/dashboard/Teacher/AddTeacher";
import StudentFee from "./pages/dashboard/Student/StudentFee";


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
      
    </Routes>
  );
}

export default App;
