import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Landing";
import Login from "./pages/student/Login";
import SignupPage from "./pages/Signup";
import DashboardPage from "./pages/dashboard/Dashboard";
import StudentManagement from "./pages/dashboard/Student/StudentPage";
import Teacher from "./pages/dashboard/Teacher/Teacher";
import AddStudent from "./pages/dashboard/Student/AddStudent";
import StudentFee from "./pages/dashboard/Student/StudentFee";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminSignup from "./pages/AdminRegistratioin";
import AdminDashboard from "./pages/Admin/Dashboard";
import StudentPage from "./pages/dashboard/Student/StudentPage";
import StudentEditPage from "./pages/dashboard/Student/StudentEditPage";
import SingleStudentPage from "./pages/dashboard/Student/SingleStudentPage";
import AddTeacher from "./pages/dashboard/Teacher/AddTeacher";
import TeacherPage from "./pages/dashboard/Teacher/Teacher";
import UpdateTeacherPage from "./pages/dashboard/Teacher/updateTeacher";
import TeacherDetailsPage from "./pages/dashboard/Teacher/TeacherDetailsPage";
import StudentProfile from "./pages/student/Profile";


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
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/signup" element={<AdminSignup />} />
      <Route path="/login" element={<AdminLogin />} />
      <Route path="/student/profile" element={<StudentProfile />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/dashboard/teachers" element={<TeacherPage />} />
      <Route path="/admin/dashboard/teachers/:id" element={<TeacherDetailsPage />} />
      <Route path="/admin/dashboard/teachers/add" element={<AddTeacher />} />
      <Route path="admin/dashboard/teachers/edit/:id" element={<UpdateTeacherPage />} />
      <Route path="/admin/dashboard/students" element={<StudentPage />} />
      <Route path="/admin/dashboard/addstudent" element={<AddStudent />} />
      <Route path="/admin/dashboard/students/edit/:id" element={<StudentEditPage />} />
      <Route path="/admin/dashboard/students/:id" element={<SingleStudentPage />} />

    </Routes>
  );
}

export default App;
