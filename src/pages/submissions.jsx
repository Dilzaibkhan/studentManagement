




import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authcontext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";

export default function Submissions() {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const aSnap = await getDocs(collection(db, "assignments"));
      setAssignments(aSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      const sSnap = await getDocs(collection(db, "submissions"));
      setSubmissions(sSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchData();
  }, []);

  const visible = user.role === "admin"
    ? submissions
    : submissions.filter(s => {
        const a = assignments.find(a => a.id === s.assignmentId);
        return a && a.createdBy === user.name;
      });

  return (
    <div className="center">
      <div className="card" style={{ maxWidth: 800 }}>
        <h2>Submissions</h2>
        {visible.length === 0 ? <p>No submissions found</p> : visible.slice().reverse().map(s => (
          <div key={s.id} className="item">
            <strong>{s.filename}</strong>
            <div>Student: {s.studentName}  For: {assignments.find(a => a.id === s.assignmentId)?.title || ""}</div>
            <small>{new Date(s.createdAt).toLocaleString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
