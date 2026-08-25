import React, { createContext, useContext, useState, useEffect } from 'react';
import { signInAnonymously, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth } from '../lib/firebase';

type UserRole = 'student' | 'admin' | null;

interface UserData {
  id?: string;
  name?: string;
  teacherCode?: string;
}

interface AuthContextType {
  role: UserRole;
  userData: UserData | null;
  firebaseUser: FirebaseUser | null;
  login: (role: UserRole, data?: UserData) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  role: null,
  userData: null,
  firebaseUser: null,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<UserRole>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    const savedRole = localStorage.getItem('user_role') as UserRole;
    const savedData = localStorage.getItem('user_data');
    if (savedRole) setRole(savedRole);
    if (savedData) setUserData(JSON.parse(savedData));

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
    });

    // Automatically sign in anonymously if not signed in
    signInAnonymously(auth).catch(console.error);

    return () => unsubscribe();
  }, []);

  const login = (newRole: UserRole, data?: UserData) => {
    setRole(newRole);
    if (data) setUserData(data);
    
    if (newRole) localStorage.setItem('user_role', newRole);
    if (data) localStorage.setItem('user_data', JSON.stringify(data));
  };

  const logout = () => {
    setRole(null);
    setUserData(null);
    localStorage.removeItem('user_role');
    localStorage.removeItem('user_data');
  };

  return (
    <AuthContext.Provider value={{ role, userData, firebaseUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
