import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authcontext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="nav">
      <div className="nav-left">
        <Link to="/" className="brand">Role Dashboard</Link>

        {user && (user.role === "admin" || user.role === "teacher") && (
          <Link to="/submissions" className="nav-link">Submissions</Link>
        )}

        {user && (user.role === "admin" || user.role === "teacher") && (
          <Link to="/teacher" className="nav-link">Teacher</Link>
        )}

        {user && (user.role === "admin" || user.role === "student") && (
          <Link to="/student" className="nav-link">Student</Link>
        )}

        {user && user.role === "admin" && (
          <Link to="/admin" className="nav-link">Admin</Link>
        )}
      </div>

      <div className="nav-right">
        {user ? (
          <>
            <span className="user">Hi, {user.name} ({user.role})</span>
            <button className="btn-ghost" onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to="/login" className="nav-link">Login</Link>
        )}
      </div>
    </nav>
  );
}
