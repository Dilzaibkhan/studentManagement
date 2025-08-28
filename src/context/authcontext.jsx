







import React, { createContext, useContext, useState, useEffect } from "react";
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { db, auth } from "../firebaseConfig/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const AuthContext = createContext();


export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Get user profile from Firestore
        const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
        if (userDoc.exists()) {
          setUser(userDoc.data());
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Login sets user profile (used after sign in)
  const login = (profile) => setUser(profile);
  // Logout signs out from Firebase
  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
