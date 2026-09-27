import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LogIn, 
  GraduationCap, 
  ShieldCheck, 
  Award, 
  Key, 
  User, 
  ArrowLeft, 
  Eye, 
  EyeOff, 
  Info, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
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

export type LoginIdentity = 'student' | 'admin' | 'teacher';

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // Active identity selection: 'student' | 'admin' | 'teacher'
  const [identity, setIdentity] = useState<LoginIdentity>('student');

  // Student Form State
  const [studentName, setStudentName] = useState('');
  const [teacherCode, setTeacherCode] = useState('');

  // Admin Form State
  const [adminPassword, setAdminPassword] = useState('');
  const [showAdminPassword, setShowAdminPassword] = useState(false);

  // Sheikh / Teacher Form State
  const [sheikhCode, setSheikhCode] = useState('');

  // General Status
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check URL parameters for role or prefilled teacher code
    const params = new URLSearchParams(location.search);
    const roleParam = params.get('role');
    const codeFromUrl = params.get('code');

    if (roleParam === 'admin') {
      setIdentity('admin');
    } else if (roleParam === 'teacher' || roleParam === 'sheikh') {
      setIdentity('teacher');
      if (codeFromUrl) setSheikhCode(codeFromUrl);
    } else {
      if (codeFromUrl) {
        setTeacherCode(codeFromUrl);
        setIdentity('student');
      }
    }
  }, [location]);

  // Handle switching identity
  const handleSelectIdentity = (newIdentity: LoginIdentity) => {
    setIdentity(newIdentity);
    setError('');
  };

  // Student Login Handler
  const handleStudentLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // 1. Check if teacher exists in Firestore
      const teachersRef = collection(db, 'teachers');
      const cleanCode = teacherCode.trim().toUpperCase();
      const qTeacher = query(teachersRef, where('code', '==', cleanCode));
      const teacherSnapshot = await getDocs(qTeacher);

      if (teacherSnapshot.empty) {
        setError('كود المعلم / الشيخ غير صحيح أو غير مسجل في المقرأة.');
        setIsLoading(false);
        return;
      }

      const teacherDoc = teacherSnapshot.docs[0];
      const teacherData = teacherDoc.data() as Omit<Teacher, 'id'>;

      if (!teacherData.active) {
        setError('حساب هذا الشيخ غير مفعل حالياً. يرجى مراجعة إدارة المقرأة.');
        setIsLoading(false);
        return;
      }

      const cleanStudentName = studentName.trim();
      if (!cleanStudentName) {
        setError('يرجى إدخال اسم الطالب كاملاً.');
        setIsLoading(false);
        return;
      }

      // 2. Check if student already exists for this teacher
      const studentsRef = collection(db, 'students');
      const qStudent = query(
        studentsRef, 
        where('name', '==', cleanStudentName), 
        where('teacherCode', '==', cleanCode)
      );
      const studentSnapshot = await getDocs(qStudent);

      let studentId = '';

      if (studentSnapshot.empty) {
        // Register new student
        const docRef = await addDoc(studentsRef, {
          name: cleanStudentName,
          teacherCode: cleanCode,
          teacherName: teacherData.name,
          currentPath: 'ورش (الشاطبية)',
          status: 'نشط',
          registeredAt: serverTimestamp()
        });
        studentId = docRef.id;
      } else {
        studentId = studentSnapshot.docs[0].id;
      }

      login('student', { 
        id: studentId, 
        name: cleanStudentName, 
        teacherCode: cleanCode,
        role: 'student'
      });
      navigate('/');
    } catch (err) {
      console.error(err);
      setError('حدث خطأ أثناء الاتصال بقاعدة البيانات. حاول مرة أخرى.');
    } finally {
      setIsLoading(false);
    }
  };

  // Admin Login Handler
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const storedAdminPassword = localStorage.getItem('admin_password') || 'admin123';
    if (adminPassword === storedAdminPassword) {
      login('admin', { name: 'المشرف العام', role: 'admin' });
      navigate('/admin');
    } else {
      setError('كلمة المرور غير صحيحة. يرجى التحقق وإعادة المحاولة.');
    }
    setIsLoading(false);
  };

  // Sheikh / Teacher Login Handler
  const handleSheikhLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const cleanCode = sheikhCode.trim().toUpperCase();
    if (!cleanCode) {
      setError('يرجى إدخال كود الشيخ الخاص بك.');
      setIsLoading(false);
      return;
    }

    try {
      const teachersRef = collection(db, 'teachers');
      const q = query(teachersRef, where('code', '==', cleanCode));
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        setError('كود الشيخ غير موجود. تأكد من إدخال الكود الممنوح لك من الإدارة (مثال: TCH-XXXXXX).');
        setIsLoading(false);
        return;
      }

      const teacherDoc = snapshot.docs[0];
      const teacherData = teacherDoc.data() as Omit<Teacher, 'id'>;

      if (!teacherData.active) {
        setError('حساب الشيخ موقوف مؤقتاً. يرجى التواصل مع إدارة المقرأة لإعادة تفعيله.');
        setIsLoading(false);
        return;
      }

      login('teacher', {
        id: teacherDoc.id,
        name: teacherData.name,
        teacherCode: teacherData.code,
        role: 'teacher'
      });
      navigate('/teacher');
    } catch (err) {
      console.error(err);
      setError('تعذر التحقق من كود الشيخ. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[75vh] px-4 py-8 animate-in fade-in duration-500" dir="rtl">
      <div className="bg-navy-900 border border-navy-700/80 p-6 md:p-10 rounded-3xl shadow-2xl max-w-xl w-full text-center space-y-6 relative overflow-hidden backdrop-blur-md">
        
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-1/2 translate-x-1/2 w-72 h-32 bg-gold-500/10 blur-3xl pointer-events-none rounded-full"></div>

        {/* Brand / Logo */}
        <div className="inline-flex items-center justify-center w-16 h-16 bg-navy-800/90 rounded-2xl border-2 border-gold-500/40 text-gold-400 mb-1 shadow-[0_0_20px_rgba(212,175,55,0.25)]">
          {identity === 'student' && <GraduationCap className="w-8 h-8" />}
          {identity === 'admin' && <ShieldCheck className="w-8 h-8 text-red-400" />}
          {identity === 'teacher' && <Award className="w-8 h-8 text-emerald-400" />}
        </div>

        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-wide">
            تسجيل الدخول للمقرأة
          </h1>
          <p className="text-navy-300 text-xs md:text-sm mt-1">
            اختر هويتك للولوج إلى حسابك والبدء بالخدمات المخصصة لك
          </p>
        </div>

        {/* Identity Selector Tabs (طالب / إدارة / شيخ) */}
        <div className="bg-navy-950 p-1.5 rounded-2xl border border-navy-800 grid grid-cols-3 gap-1.5 shadow-inner">
          {/* 1. Student Tab */}
          <button
            type="button"
            onClick={() => handleSelectIdentity('student')}
            className={`py-3 px-2 rounded-xl font-bold text-xs md:text-sm transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
              identity === 'student'
                ? 'bg-gold-500 text-navy-950 shadow-lg shadow-gold-500/20 scale-[1.02]'
                : 'text-navy-300 hover:text-white hover:bg-navy-900/60'
            }`}
          >
            <GraduationCap className="w-4 h-4 shrink-0" />
            <span>طالب</span>
          </button>

          {/* 2. Sheikh / Teacher Tab */}
          <button
            type="button"
            onClick={() => handleSelectIdentity('teacher')}
            className={`py-3 px-2 rounded-xl font-bold text-xs md:text-sm transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
              identity === 'teacher'
                ? 'bg-emerald-500 text-navy-950 shadow-lg shadow-emerald-500/20 scale-[1.02]'
                : 'text-navy-300 hover:text-white hover:bg-navy-900/60'
            }`}
          >
            <Award className="w-4 h-4 shrink-0" />
            <span>شيخ / معلّم</span>
          </button>

          {/* 3. Admin Tab */}
          <button
            type="button"
            onClick={() => handleSelectIdentity('admin')}
            className={`py-3 px-2 rounded-xl font-bold text-xs md:text-sm transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
              identity === 'admin'
                ? 'bg-red-500 text-white shadow-lg shadow-red-500/20 scale-[1.02]'
                : 'text-navy-300 hover:text-white hover:bg-navy-900/60'
            }`}
          >
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>إدارة</span>
          </button>
        </div>

        {/* Identity Context Hint */}
        <div className="text-right">
          {identity === 'student' && (
            <div className="bg-gold-500/10 border border-gold-500/20 rounded-xl p-3 flex items-start gap-2 text-xs text-gold-300">
              <Sparkles className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
              <span>مخصص لطلاب العلم المسجلين في حلقات المقرأة للوصول للدروس والاختبارات ومتابعة التقدم.</span>
            </div>
          )}
          {identity === 'teacher' && (
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 flex items-start gap-2 text-xs text-emerald-300">
              <Award className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>مخصص لمشايخ ومعلمي الحلقات لمتابعة أداء طلابهم ونسب إنجازهم ومشاركة كود الحلقة.</span>
            </div>
          )}
          {identity === 'admin' && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 flex items-start gap-2 text-xs text-red-300">
              <ShieldCheck className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>مخصص للإدارة العامة والتحكم بالمنهج، بنك الأسئلة، إصدار الأكواد، وإعدادات النظام.</span>
            </div>
          )}
        </div>

        {/* Error Alert */}
        {error && (
          <div className="text-red-400 text-xs md:text-sm font-bold bg-red-500/10 p-3 rounded-xl border border-red-500/30 flex items-center gap-2 text-right">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* ======================= FORM 1: STUDENT ======================= */}
        {identity === 'student' && (
          <form onSubmit={handleStudentLogin} className="space-y-4 text-right animate-in fade-in duration-300">
            <div>
              <label className="block text-xs font-bold text-navy-200 mb-1.5">
                اسم الطالب (الاسم الثلاثي) <span className="text-gold-500">*</span>
              </label>
              <input
                type="text"
                placeholder="مثال: عبد الله أحمد المنصوري"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full bg-navy-950 border border-navy-700 text-white p-3.5 rounded-xl text-right focus:border-gold-500 outline-none text-sm transition"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-navy-200 mb-1.5 flex items-center justify-between">
                <span>كود الشيخ / المعلم المشرف <span className="text-gold-500">*</span></span>
                {teacherCode && <span className="text-[11px] text-gold-400 font-mono">الكود محدد</span>}
              </label>
              <input
                type="text"
                placeholder="مثال: TCH-AB12CD"
                value={teacherCode}
                onChange={(e) => setTeacherCode(e.target.value.toUpperCase())}
                className="w-full bg-navy-950 border border-navy-700 text-white p-3.5 rounded-xl text-center font-mono tracking-widest focus:border-gold-500 outline-none text-base transition"
                required
                disabled={isLoading}
              />
              <p className="text-[11px] text-navy-400 mt-1">
                احصل على هذا الكود من شيخ حلقتك أو إدارة المقرأة للانضمام إلى قائمته المعتمدة.
              </p>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-gold-500 text-navy-950 font-bold text-base py-3.5 rounded-xl hover:bg-gold-400 transition shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
            >
              <LogIn className="w-5 h-5" />
              {isLoading ? 'جاري التحقق والتسجيل...' : 'دخول الطالب ومتابعة التعلّم'}
            </button>
          </form>
        )}

        {/* ======================= FORM 2: SHEIKH / TEACHER ======================= */}
        {identity === 'teacher' && (
          <form onSubmit={handleSheikhLogin} className="space-y-4 text-right animate-in fade-in duration-300">
            <div>
              <label className="block text-xs font-bold text-navy-200 mb-1.5">
                كود الاعتماد الخاص بالشيخ <span className="text-emerald-400">*</span>
              </label>
              <input
                type="text"
                placeholder="مثال: TCH-XXXXXX"
                value={sheikhCode}
                onChange={(e) => setSheikhCode(e.target.value.toUpperCase())}
                className="w-full bg-navy-950 border border-navy-700 text-white p-3.5 rounded-xl text-center font-mono tracking-widest focus:border-emerald-500 outline-none text-base transition"
                required
                disabled={isLoading}
              />
              <p className="text-[11px] text-navy-400 mt-1">
                أدخل الكود الممنوح لك كمعلم للدخول إلى لوحة متابعة طلابك.
              </p>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-500 text-navy-950 font-bold text-base py-3.5 rounded-xl hover:bg-emerald-400 transition shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
            >
              <Award className="w-5 h-5" />
              {isLoading ? 'جاري التحقق من كود الشيخ...' : 'دخول فضيلة الشيخ إلى لوحة الحلقة'}
            </button>

            <div className="bg-navy-950/60 p-3 rounded-xl border border-navy-800 text-center text-xs text-navy-400">
              هل تود الحصول على كود شيخ جديد؟ تواصل مع إدارة المقرأة لإصدار الكود واعتماده.
            </div>
          </form>
        )}

        {/* ======================= FORM 3: ADMINISTRATION ======================= */}
        {identity === 'admin' && (
          <form onSubmit={handleAdminLogin} className="space-y-4 text-right animate-in fade-in duration-300">
            <div>
              <label className="block text-xs font-bold text-navy-200 mb-1.5">
                كلمة مرور الإدارة العامة <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <input
                  type={showAdminPassword ? 'text' : 'password'}
                  placeholder="أدخل كلمة مرور الإدارة..."
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full bg-navy-950 border border-navy-700 text-white p-3.5 pl-11 rounded-xl text-center focus:border-red-500 outline-none text-base transition"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowAdminPassword(!showAdminPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-400 hover:text-white p-1"
                  title={showAdminPassword ? 'إخفاء' : 'إظهار'}
                >
                  {showAdminPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[11px] text-navy-400 mt-1 flex items-center justify-between">
                <span>كلمة المرور الافتراضية للتجربة:</span>
                <span className="font-mono text-gold-400 font-bold bg-navy-950 px-2 py-0.5 rounded border border-navy-800">admin123</span>
              </p>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-red-600 hover:bg-red-500 text-white font-bold text-base py-3.5 rounded-xl transition shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
            >
              <ShieldCheck className="w-5 h-5" />
              {isLoading ? 'جاري التحقق...' : 'دخول المشرف إلى لوحة الإدارة'}
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
