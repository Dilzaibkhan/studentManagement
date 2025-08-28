import React, { useState, useEffect } from "react";
import { useAuth } from "../context/authcontext";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";

export default function TeacherDashboard() {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAssignments = async () => {
      const aSnap = await getDocs(collection(db, "assignments"));
      setAssignments(aSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchAssignments();
  }, []);

  const handleCreate = async () => {
    if (!title.trim()) return alert("Enter title");
    setLoading(true);
    try {
      const newAssign = {
        title: title.trim(),
        desc: desc.trim(),
        createdBy: user.name,
        createdAt: new Date().toISOString()
      };
      await addDoc(collection(db, "assignments"), newAssign);
      // Refresh assignments
      const aSnap = await getDocs(collection(db, "assignments"));
      setAssignments(aSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setTitle(""); setDesc("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex flex-col items-center py-12 px-2">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-extrabold text-green-800 mb-2">Teacher Dashboard</h2>
        <p className="text-lg text-gray-700 mb-8">Hi, <span className="font-bold text-green-700">{user.name}</span></p>

        <div className="bg-green-50 rounded-xl p-6 shadow mb-8">
          <h3 className="text-xl font-bold text-green-700 mb-4">Create New Assignment</h3>
          <div className="flex flex-col gap-4">
            <input className="border border-green-200 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400" placeholder="Assignment title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <textarea className="border border-green-200 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400" placeholder="Assignment details" value={desc} onChange={(e) => setDesc(e.target.value)}></textarea>
            <button onClick={handleCreate} disabled={loading} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold shadow transition">
              {loading ? "Creating..." : "Create Assignment"}
            </button>
          </div>
        </div>

        <h3 className="text-xl font-bold text-blue-700 mb-4">Your Assignments</h3>
        {assignments.length === 0 ? (
          <p className="text-gray-500">No assignments yet</p>
        ) : (
          <div className="space-y-4">
            {assignments.slice().reverse().map(a => (
              <div key={a.id} className="bg-blue-50 rounded-lg p-4 shadow flex flex-col gap-1">
                <div className="font-bold text-blue-800 text-lg">{a.title}</div>
                <div className="text-gray-700">{a.desc}</div>
                <div className="text-xs text-gray-500">By: {a.createdBy} · {new Date(a.createdAt).toLocaleString()}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
