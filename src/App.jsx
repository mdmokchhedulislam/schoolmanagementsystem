import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Landing";
// import Login from "./pages/Login";
import SignupPage from "./pages/Signup";
import DashboardPage from "./pages/dashboard/Dashboard";
import StudentManagement from "./pages/dashboard/Student/StudentPage";
import Teacher from "./pages/dashboard/Teacher/Teacher";
import AddStudent from "./pages/dashboard/Student/AddStudent";
import StudentFee from "./pages/dashboard/Student/StudentFee";
// import AdminLogin from "./pages/AdminLogin";
import AdminSignup from "./pages/AdminRegistratioin";
import AdminDashboard from "./pages/Admin/Dashboard";
import StudentPage from "./pages/dashboard/Student/StudentPage";
import StudentEditPage from "./pages/dashboard/Student/StudentEditPage";
import SingleStudentPage from "./pages/dashboard/Student/SingleStudentPage";
import AddTeacher from "./pages/dashboard/Teacher/AddTeacher";
import TeacherPage from "./pages/dashboard/Teacher/Teacher";
import UpdateTeacherPage from "./pages/dashboard/Teacher/updateTeacher";
import TeacherDetailsPage from "./pages/dashboard/Teacher/TeacherDetailsPage";
import Login from "./pages/Login";
import TeacherLogin from "./pages/Admin/AdminLogin";
import ClassPage from "./pages/dashboard/Class/ClassPage";
import Add_class_teacher from "./pages/dashboard/Section/Add_class_teacher";
import AddClass from "./pages/dashboard/Class/Add_class";
import AddSection from "./pages/dashboard/Section/Add_section";
import TeacherDashboard from "./pages/Admin/TeacherDashboard";
import StudentProfile from "./pages/student/Profile";
import Routine_page from "./pages/dashboard/routine/Routine_page";
import AddRoutine from "./pages/dashboard/routine/Add_routine";
import StudentRoutine from "./pages/dashboard/Student/Student_routine";
import TeacherRoutine from "./pages/dashboard/Teacher/Teacher_routine";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/student/profile" element={<StudentProfile />} />
      <Route path="/Signup" element={<SignupPage />} />
      <Route path="/student/routine" element={<StudentRoutine />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/dashboard/student" element={<StudentManagement />} />
      <Route path="/dashboard/student/fees" element={<StudentFee />} />
      <Route path="/dashboard/teacher" element={<TeacherDashboard />} />
      <Route path="/dashboard/teacher/routine" element={<TeacherRoutine />} />
      <Route path="/admin/signup" element={<AdminSignup />} />
      <Route path="/admin/login" element={<TeacherLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/dashboard/teachers" element={<TeacherPage />} />
      <Route path="/admin/dashboard/routine" element={<Routine_page />} />
      <Route path="/admin/dashboard/routine/add" element={<AddRoutine />} />
      <Route path="/admin/dashboard/classes" element={<ClassPage />} />
      <Route path="/admin/dashboard/addclass" element={<AddClass />} />
      <Route path="/admin/dashboard/addsection" element={<AddSection />} />
      <Route path="/admin/dashboard/classteacher" element={<Add_class_teacher />} />
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
