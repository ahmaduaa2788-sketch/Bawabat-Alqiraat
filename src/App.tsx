import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Portal } from './pages/Portal';
import { QariView } from './pages/QariView';
import { CourseView } from './pages/CourseView';
import { Lesson } from './pages/Lesson';
import { ExamView } from './pages/ExamView';
import { Login } from './pages/Login';
import { Admin } from './pages/Admin';
import { ProgressProvider } from './context/ProgressContext';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';

export default function App() {
  return (
    <AuthProvider>
      <ProgressProvider>
        <ToastProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Portal />} />
                <Route path="qari/:qariId" element={<QariView />} />
                <Route path="course/:qariId/:rawiId/:tariqId" element={<CourseView />} />
                <Route path="lesson/:qariId/:rawiId/:tariqId/:unitId/:lessonId" element={<Lesson />} />
                <Route path="exam/:qariId/:rawiId/:tariqId" element={<ExamView />} />
                <Route path="login" element={<Login />} />
                <Route path="admin" element={<Admin />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ToastProvider>
      </ProgressProvider>
    </AuthProvider>
  );
}

