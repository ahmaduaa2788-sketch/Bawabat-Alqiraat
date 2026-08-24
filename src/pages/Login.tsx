import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export interface Teacher {
  id: string;
  name: string;
  code: string;
  active: boolean;
}

export interface StudentRecord {
  id: string;
  name: string;
  teacherCode: string;
  teacherName: string;
  currentPath: string;
  status: 'نشط' | 'مجتاز';
  registeredAt: string;
}

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [studentName, setStudentName] = useState('');
  const [teacherCode, setTeacherCode] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Check for ?code= parameter in URL
    const params = new URLSearchParams(location.search);
    const codeFromUrl = params.get('code');
    if (codeFromUrl) {
      setTeacherCode(codeFromUrl);
    }
  }, [location]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Load teachers from DB
    const savedTeachers = localStorage.getItem('app_teachers');
    const teachers: Teacher[] = savedTeachers ? JSON.parse(savedTeachers) : [];

    const teacher = teachers.find(t => t.code === teacherCode);

    if (!teacher) {
      setError('كود المعلم غير صحيح أو غير مسجل لدينا.');
      return;
    }

    if (!teacher.active) {
      setError('حساب هذا المعلم غير مفعل حالياً. يرجى مراجعة الإدارة.');
      return;
    }

    if (studentName.trim() !== '') {
      // Save student to global mock database
      const savedStudents = localStorage.getItem('app_students');
      const students: StudentRecord[] = savedStudents ? JSON.parse(savedStudents) : [];
      
      const existingStudent = students.find(s => s.name === studentName && s.teacherCode === teacher.code);
      
      if (!existingStudent) {
        const newStudent: StudentRecord = {
          id: Date.now().toString(),
          name: studentName,
          teacherCode: teacher.code,
          teacherName: teacher.name,
          currentPath: 'ورش (الشاطبية)',
          status: 'نشط',
          registeredAt: new Date().toISOString()
        };
        students.push(newStudent);
        localStorage.setItem('app_students', JSON.stringify(students));
      }

      login('student', { name: studentName, teacherCode: teacher.code });
      navigate('/');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh] px-4 animate-in fade-in duration-500">
      <div className="bg-navy-900 border border-navy-700 p-8 md:p-12 rounded-2xl shadow-2xl max-w-md w-full text-center space-y-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-navy-800 rounded-full border-2 border-gold-500/50 text-gold-500 mb-2 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
          <LogIn className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold text-white">تسجيل الدخول للطالب</h1>
        <p className="text-navy-300">
          من فضلك قم بإدخال اسمك وكود المعلم (الشيخ) الخاص بك للبدء.
        </p>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="اسم الطالب (الاسم الثلاثي)"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            className="w-full bg-navy-950 border border-navy-700 text-white p-4 rounded-xl text-center focus:border-gold-500 outline-none"
            required
          />
          <input
            type="text"
            placeholder="كود المعلم (الشيخ)"
            value={teacherCode}
            onChange={(e) => setTeacherCode(e.target.value)}
            className="w-full bg-navy-950 border border-navy-700 text-white p-4 rounded-xl text-center focus:border-gold-500 outline-none"
            required
          />
          {error && <p className="text-red-400 text-sm font-bold bg-red-500/10 p-2 rounded-lg border border-red-500/20">{error}</p>}
          <button 
            type="submit"
            className="w-full bg-gold-500 text-navy-950 font-bold text-lg py-4 rounded-xl hover:bg-gold-400 transition shadow-lg flex items-center justify-center gap-3"
          >
            <LogIn className="w-5 h-5" />
            تسجيل الدخول
          </button>
        </form>
      </div>
    </div>
  );
}
