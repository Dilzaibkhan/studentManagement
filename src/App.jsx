import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/home";
import Signup from "./pages/signup";
import AdminDashboard from "./pages/admindashboard";
import TeacherDashboard from "./pages/teacherdashboard";
import StudentDashboard from "./pages/studentdashboard";
import Submissions from "./pages/submissions";
import NotFound from "./pages/notfound";
import Navbar from "./components/navbar";
import { useAuth } from "./context/authcontext";

function ProtectedRoute({ allowedRoles, children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" replace />;
  if (user.role === "admin") return children; // admin can access all panels
  if (!allowedRoles.includes(user.role)) return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  return (
    <Router>
      <Navbar />
      <div className="app-wrap">
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/teacher"
            element={
              <ProtectedRoute allowedRoles={["teacher"]}>
                <TeacherDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/student"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/submissions"
            element={
              <ProtectedRoute allowedRoles={["teacher"]}>
                <Submissions />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}
