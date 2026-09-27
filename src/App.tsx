import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Portal } from './pages/Portal';
import { QariView } from './pages/QariView';
import { CourseView } from './pages/CourseView';
import { Lesson } from './pages/Lesson';
import { ExamView } from './pages/ExamView';
import { ReviewView } from './pages/ReviewView';
import { Login } from './pages/Login';
import { Admin } from './pages/Admin';
import { TeacherView } from './pages/TeacherView';
import { ProgressProvider } from './context/ProgressContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { ReviewProvider } from './context/ReviewContext';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { role } = useAuth();
  const location = useLocation();

  if (!role) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
}

export default function App() {
  return (
    <AuthProvider>
      <ProgressProvider>
        <ReviewProvider>
          <ToastProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Portal />} />
                  <Route path="login" element={<Login />} />
                  <Route path="admin" element={<Admin />} />
                  <Route path="teacher" element={<ProtectedRoute><TeacherView /></ProtectedRoute>} />
                  <Route path="review" element={<ProtectedRoute><ReviewView /></ProtectedRoute>} />
                  
                  {/* Protected Routes */}
                  <Route path="qari/:qariId" element={<ProtectedRoute><QariView /></ProtectedRoute>} />
                  <Route path="course/:qariId/:rawiId/:tariqId" element={<ProtectedRoute><CourseView /></ProtectedRoute>} />
                  <Route path="lesson/:qariId/:rawiId/:tariqId/:unitId/:lessonId" element={<ProtectedRoute><Lesson /></ProtectedRoute>} />
                  <Route path="exam/:qariId/:rawiId/:tariqId" element={<ProtectedRoute><ExamView /></ProtectedRoute>} />
                </Route>
              </Routes>
            </BrowserRouter>
          </ToastProvider>
        </ReviewProvider>
      </ProgressProvider>
    </AuthProvider>
  );
}
