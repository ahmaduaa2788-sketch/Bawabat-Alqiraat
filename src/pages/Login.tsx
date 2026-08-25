import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { db } from '../lib/firebase';
import { collection, query, where, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';

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
  registeredAt: any;
}

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [studentName, setStudentName] = useState('');
  const [teacherCode, setTeacherCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check for ?code= parameter in URL
    const params = new URLSearchParams(location.search);
    const codeFromUrl = params.get('code');
    if (codeFromUrl) {
      setTeacherCode(codeFromUrl);
    }
  }, [location]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // 1. Check if teacher exists
      const teachersRef = collection(db, 'teachers');
      const qTeacher = query(teachersRef, where('code', '==', teacherCode));
      const teacherSnapshot = await getDocs(qTeacher);

      if (teacherSnapshot.empty) {
        setError('كود المعلم غير صحيح أو غير مسجل لدينا.');
        setIsLoading(false);
        return;
      }

      const teacherDoc = teacherSnapshot.docs[0];
      const teacherData = teacherDoc.data() as Omit<Teacher, 'id'>;

      if (!teacherData.active) {
        setError('حساب هذا المعلم غير مفعل حالياً. يرجى مراجعة الإدارة.');
        setIsLoading(false);
        return;
      }

      if (studentName.trim() !== '') {
        // 2. Check if student already exists for this teacher
        const studentsRef = collection(db, 'students');
        const qStudent = query(studentsRef, where('name', '==', studentName.trim()), where('teacherCode', '==', teacherCode));
        const studentSnapshot = await getDocs(qStudent);

        let studentId = '';

        if (studentSnapshot.empty) {
          // Register new student
          const docRef = await addDoc(studentsRef, {
            name: studentName.trim(),
            teacherCode: teacherCode,
            teacherName: teacherData.name,
            currentPath: 'ورش (الشاطبية)',
            status: 'نشط',
            registeredAt: serverTimestamp()
          });
          studentId = docRef.id;
        } else {
          studentId = studentSnapshot.docs[0].id;
        }

        login('student', { id: studentId, name: studentName.trim(), teacherCode: teacherCode });
        navigate('/');
      }
    } catch (err) {
      console.error(err);
      setError('حدث خطأ أثناء الاتصال بالخادم. حاول مرة أخرى.');
    } finally {
      setIsLoading(false);
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
            disabled={isLoading}
          />
          <input
            type="text"
            placeholder="كود المعلم (الشيخ)"
            value={teacherCode}
            onChange={(e) => setTeacherCode(e.target.value)}
            className="w-full bg-navy-950 border border-navy-700 text-white p-4 rounded-xl text-center focus:border-gold-500 outline-none"
            required
            disabled={isLoading}
          />
          {error && <p className="text-red-400 text-sm font-bold bg-red-500/10 p-2 rounded-lg border border-red-500/20">{error}</p>}
          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-gold-500 text-navy-950 font-bold text-lg py-4 rounded-xl hover:bg-gold-400 transition shadow-lg flex items-center justify-center gap-3 disabled:opacity-50"
          >
            <LogIn className="w-5 h-5" />
            {isLoading ? 'جاري التحقق...' : 'تسجيل الدخول'}
          </button>
        </form>
      </div>
    </div>
  );
}
