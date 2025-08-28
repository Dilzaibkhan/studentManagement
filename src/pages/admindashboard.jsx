


import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authcontext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";

export default function AdminDashboard() {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const aSnap = await getDocs(collection(db, "assignments"));
      const sSnap = await getDocs(collection(db, "submissions"));
      setAssignments(aSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setSubmissions(sSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center py-12 px-2">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-extrabold text-blue-800 mb-2">Admin Dashboard</h2>
        <p className="text-lg text-gray-700 mb-8">Welcome, <span className="font-bold text-blue-700">{user.name}</span> <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded ml-2">Admin</span></p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div className="bg-blue-100 rounded-xl p-6 flex flex-col items-center shadow">
            <div className="text-4xl text-blue-600 mb-2">📚</div>
            <div className="text-lg font-semibold text-blue-700">Assignments</div>
            <div className="text-3xl font-bold text-blue-900 mt-2">{assignments.length}</div>
          </div>
          <div className="bg-green-100 rounded-xl p-6 flex flex-col items-center shadow">
            <div className="text-4xl text-green-600 mb-2">📄</div>
            <div className="text-lg font-semibold text-green-700">Submissions</div>
            <div className="text-3xl font-bold text-green-900 mt-2">{submissions.length}</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
          <Link to="/teacher" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold shadow transition">Open Teacher Panel</Link>
          <Link to="/student" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold shadow transition">Open Student Panel</Link>
          <Link to="/submissions" className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg font-semibold shadow transition">View Submissions</Link>
        </div>
      </div>
    </div>
  );
}
