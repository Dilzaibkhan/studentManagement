

import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authcontext";
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";

export default function StudentDashboard() {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState([]);
  const [file, setFile] = useState(null);
  const [selectedAssignment, setSelectedAssignment] = useState("");
  const [comment, setComment] = useState("");
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const aSnap = await getDocs(collection(db, "assignments"));
      setAssignments(aSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      const sQuery = query(collection(db, "submissions"), where("studentName", "==", user.name));
      const sSnap = await getDocs(sQuery);
      setSubmissions(sSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchData();
  }, [user.name]);

  const handleSubmit = async () => {
    if (!selectedAssignment) return alert("Select assignment");
    if (!file) return alert("Choose file");
    setLoading(true);
    try {
      const newSub = {
        assignmentId: selectedAssignment,
        filename: file.name,
        studentName: user.name,
        comment: comment.trim(),
        createdAt: new Date().toISOString()
      };
      await addDoc(collection(db, "submissions"), newSub);
      // Refresh submissions
      const sQuery = query(collection(db, "submissions"), where("studentName", "==", user.name));
      const sSnap = await getDocs(sQuery);
      setSubmissions(sSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setFile(null); setComment("");
      alert("Assignment submitted (filename stored in Firestore).");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-100 flex flex-col items-center py-12 px-2">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-extrabold text-blue-800 mb-2">Student Dashboard</h2>
        <p className="text-lg text-gray-700 mb-8">Hi, <span className="font-bold text-blue-700">{user.name}</span></p>

        <div className="bg-blue-50 rounded-xl p-6 shadow mb-8">
          <h3 className="text-xl font-bold text-blue-700 mb-4">Available Assignments</h3>
          {assignments.length === 0 ? (
            <p className="text-gray-500">No assignments yet</p>
          ) : (
            <div className="flex flex-col gap-4">
              <select value={selectedAssignment} onChange={e => setSelectedAssignment(e.target.value)} className="border border-blue-200 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
                <option value="">-- choose assignment --</option>
                {assignments.map(a => <option key={a.id} value={a.id}>{a.title} — {a.createdBy}</option>)}
              </select>
              <input type="file" onChange={e => setFile(e.target.files[0])} className="border border-blue-200 rounded px-4 py-2" />
              <textarea placeholder="Comments (optional)" value={comment} onChange={e => setComment(e.target.value)} className="border border-blue-200 rounded px-4 py-2" />
              <button onClick={handleSubmit} disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold shadow transition">
                {loading ? "Submitting..." : "Submit Assignment"}
              </button>
            </div>
          )}
        </div>

        <h3 className="text-xl font-bold text-green-700 mb-4">Your Submissions</h3>
        {submissions.length === 0 ? (
          <p className="text-gray-500">No submissions yet</p>
        ) : (
          <div className="space-y-4">
            {submissions.slice().reverse().map(s => (
              <div key={s.id} className="bg-green-50 rounded-lg p-4 shadow flex flex-col gap-1">
                <div className="font-bold text-green-800 text-lg">{s.filename}</div>
                <div className="text-gray-700">For: {assignments.find(a => a.id === s.assignmentId)?.title || "—"}</div>
                <div className="text-xs text-gray-500">{new Date(s.createdAt).toLocaleString()}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
