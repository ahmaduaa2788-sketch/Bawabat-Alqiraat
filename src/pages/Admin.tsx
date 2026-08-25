import React, { useState, useEffect } from 'react';
import { Shield, ShieldAlert, CheckCircle2, Users, Key, Link as LinkIcon, Plus, Save } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Teacher, StudentRecord } from './Login';
import { db } from '../lib/firebase';
import { collection, query, getDocs, addDoc, updateDoc, doc, onSnapshot } from 'firebase/firestore';

export function Admin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const { role, login, logout } = useAuth();
  
  const [activeTab, setActiveTab] = useState<'dashboard' | 'teachers' | 'settings'>('dashboard');
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [students, setStudents] = useState<StudentRecord[]>([]);
  
  // Settings tab
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [settingsMessage, setSettingsMessage] = useState('');

  // Add teacher
  const [newTeacherName, setNewTeacherName] = useState('');

  useEffect(() => {
    if (role === 'admin') {
      // Real-time listener for teachers
      const unsubscribeTeachers = onSnapshot(collection(db, 'teachers'), (snapshot) => {
        const teachersData: Teacher[] = [];
        snapshot.forEach((doc) => {
          teachersData.push({ id: doc.id, ...doc.data() } as Teacher);
        });
        setTeachers(teachersData);
      });

      // Real-time listener for students
      const unsubscribeStudents = onSnapshot(collection(db, 'students'), (snapshot) => {
        const studentsData: StudentRecord[] = [];
        snapshot.forEach((doc) => {
          studentsData.push({ id: doc.id, ...doc.data() } as StudentRecord);
        });
        setStudents(studentsData);
      });

      return () => {
        unsubscribeTeachers();
        unsubscribeStudents();
      };
    }
  }, [role]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const storedAdminPassword = localStorage.getItem('admin_password') || 'admin123';
    if (password === storedAdminPassword) { 
      login('admin');
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleAddTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeacherName.trim()) return;
    
    // Generate a random 6-character code
    const generatedCode = 'TCH-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    
    try {
      await addDoc(collection(db, 'teachers'), {
        name: newTeacherName,
        code: generatedCode,
        active: true
      });
      setNewTeacherName('');
    } catch (err) {
      console.error(err);
      alert('حدث خطأ أثناء إضافة المعلم');
    }
  };

  const toggleTeacherStatus = async (id: string, currentStatus: boolean) => {
    try {
      await updateDoc(doc(db, 'teachers', id), {
        active: !currentStatus
      });
    } catch (err) {
      console.error(err);
      alert('حدث خطأ أثناء تحديث حالة المعلم');
    }
  };

  const copyLink = (code: string) => {
    const link = `${window.location.origin}/login?code=${code}`;
    navigator.clipboard.writeText(link);
    alert('تم نسخ رابط التسجيل المباشر لطلاب هذا المعلم.');
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAdminPassword.length < 6) {
      setSettingsMessage('كلمة المرور يجب أن تكون 6 أحرف على الأقل.');
      return;
    }
    localStorage.setItem('admin_password', newAdminPassword);
    setSettingsMessage('تم تغيير كلمة المرور بنجاح.');
    setNewAdminPassword('');
  };


  if (role !== 'admin') {
    return (
      <div className="flex items-center justify-center min-h-[70vh] px-4 animate-in zoom-in-95 duration-500">
        <div className="bg-navy-900 border border-navy-700 p-8 md:p-12 rounded-2xl shadow-2xl max-w-md w-full text-center space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-navy-800 rounded-full border-2 border-red-500/50 text-red-500 mb-2 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
            <ShieldAlert className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold text-white">لوحة الإدارة</h1>
          <p className="text-navy-300 text-sm">هذه المنطقة مخصصة للمدير العام فقط.</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="كلمة المرور..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full bg-navy-950 border ${error ? 'border-red-500 text-red-100' : 'border-navy-700 text-white'} p-4 rounded-xl text-center focus:border-gold-500 outline-none`}
            />
            {error && <p className="text-red-400 text-sm">كلمة المرور غير صحيحة.</p>}
            <button 
              type="submit"
              className="w-full bg-red-600/20 border border-red-500/50 text-red-400 font-bold text-lg py-4 rounded-xl hover:bg-red-500 hover:text-white transition shadow-lg"
            >
              تسجيل الدخول للإدارة
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Shield className="w-10 h-10 text-gold-500" />
          <h1 className="text-3xl md:text-4xl font-bold text-white">لوحة تحكم المدير العام</h1>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="flex gap-2 mb-8 bg-navy-800 p-1.5 rounded-xl border border-navy-700 w-full md:w-max overflow-x-auto hide-scrollbar">
        <button 
          onClick={() => setActiveTab('dashboard')}
          className={`px-6 py-2.5 rounded-lg font-bold text-sm transition-all whitespace-nowrap ${activeTab === 'dashboard' ? 'bg-gold-500 text-navy-950 shadow-md' : 'text-navy-300 hover:text-white hover:bg-navy-700'}`}
        >
          نظرة عامة
        </button>
        <button 
          onClick={() => setActiveTab('teachers')}
          className={`px-6 py-2.5 rounded-lg font-bold text-sm transition-all whitespace-nowrap flex items-center gap-2 ${activeTab === 'teachers' ? 'bg-gold-500 text-navy-950 shadow-md' : 'text-navy-300 hover:text-white hover:bg-navy-700'}`}
        >
          <Users className="w-4 h-4" /> المعلمين والشيوخ
        </button>
        <button 
          onClick={() => setActiveTab('settings')}
          className={`px-6 py-2.5 rounded-lg font-bold text-sm transition-all whitespace-nowrap flex items-center gap-2 ${activeTab === 'settings' ? 'bg-gold-500 text-navy-950 shadow-md' : 'text-navy-300 hover:text-white hover:bg-navy-700'}`}
        >
          <Key className="w-4 h-4" /> الإعدادات والأمان
        </button>
      </div>

      {activeTab === 'dashboard' && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-navy-900 border border-navy-700 p-6 rounded-2xl">
              <h3 className="text-navy-300 font-bold mb-2">إجمالي الشيوخ/المعلمين</h3>
              <p className="text-4xl font-extrabold text-white">{teachers.length}</p>
            </div>
            <div className="bg-navy-900 border border-navy-700 p-6 rounded-2xl">
              <h3 className="text-navy-300 font-bold mb-2">الطلاب المسجلين</h3>
              <p className="text-4xl font-extrabold text-gold-500">{students.length}</p>
            </div>
            <div className="bg-navy-900 border border-navy-700 p-6 rounded-2xl">
              <h3 className="text-navy-300 font-bold mb-2">الاختبارات المجتازة</h3>
              <p className="text-4xl font-extrabold text-green-400">{students.filter(s => s.status === 'مجتاز').length}</p>
            </div>
          </div>
          <div className="bg-navy-900 border border-navy-700 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-white mb-6">آخر نشاط للطلاب</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-right text-navy-100">
                <thead>
                  <tr className="border-b border-navy-800 text-navy-400 text-sm">
                    <th className="pb-4 font-bold">الطالب</th>
                    <th className="pb-4 font-bold">المعلم</th>
                    <th className="pb-4 font-bold">المسار الحالي</th>
                    <th className="pb-4 font-bold">الحالة</th>
                  </tr>
                </thead>
                <tbody>
                  {students.length > 0 ? students.map(student => (
                    <tr key={student.id} className="border-b border-navy-800/50 hover:bg-navy-800/50 transition">
                      <td className="py-4 text-white font-bold">{student.name}</td>
                      <td className="py-4 text-navy-200">{student.teacherName}</td>
                      <td className="py-4 text-gold-400">{student.currentPath}</td>
                      <td className="py-4">
                        {student.status === 'نشط' ? (
                          <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs border border-green-500/30">نشط</span>
                        ) : (
                          <span className="bg-gold-500/20 text-gold-400 px-3 py-1 rounded-full text-xs border border-gold-500/30 flex w-fit items-center gap-1"><CheckCircle2 className="w-3 h-3"/> مجتاز</span>
                        )}
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-navy-400">لا يوجد طلاب مسجلين حتى الآن.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'teachers' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-navy-900 border border-navy-700 p-6 rounded-2xl flex flex-col md:flex-row gap-4 items-end justify-between">
            <div className="flex-1 w-full">
              <h2 className="text-xl font-bold text-white mb-4">إضافة معلم / شيخ جديد</h2>
              <form onSubmit={handleAddTeacher} className="flex flex-col sm:flex-row gap-4">
                <input 
                  type="text" 
                  placeholder="اسم المعلم (مثال: الشيخ فلان)" 
                  value={newTeacherName}
                  onChange={(e) => setNewTeacherName(e.target.value)}
                  className="flex-1 bg-navy-950 border border-navy-700 text-white p-3 rounded-xl focus:border-gold-500 outline-none"
                  required
                />
                <button 
                  type="submit"
                  className="bg-gold-500 text-navy-950 font-bold px-6 py-3 rounded-xl hover:bg-gold-400 transition flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" /> إصدار كود جديد
                </button>
              </form>
            </div>
          </div>

          <div className="bg-navy-900 border border-navy-700 p-6 rounded-2xl">
            <h2 className="text-xl font-bold text-white mb-6">قائمة المعلمين والأكواد</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-right text-navy-100">
                <thead>
                  <tr className="border-b border-navy-800 text-navy-400 text-sm">
                    <th className="pb-4 font-bold">اسم المعلم</th>
                    <th className="pb-4 font-bold">كود الدخول للطلاب</th>
                    <th className="pb-4 font-bold">الرابط المباشر</th>
                    <th className="pb-4 font-bold">الحالة</th>
                    <th className="pb-4 font-bold">الإجراء</th>
                  </tr>
                </thead>
                <tbody>
                  {teachers.map(teacher => (
                    <tr key={teacher.id} className="border-b border-navy-800/50 hover:bg-navy-800/50 transition">
                      <td className="py-4 font-bold text-white">{teacher.name}</td>
                      <td className="py-4">
                        <span className="bg-navy-950 px-3 py-1.5 rounded-lg border border-navy-700 font-mono text-gold-400">
                          {teacher.code}
                        </span>
                      </td>
                      <td className="py-4">
                        <button 
                          onClick={() => copyLink(teacher.code)}
                          className="text-navy-300 hover:text-gold-400 flex items-center gap-2 bg-navy-800 px-3 py-1.5 rounded-lg border border-navy-700 transition"
                        >
                          <LinkIcon className="w-4 h-4" /> نسخ الرابط
                        </button>
                      </td>
                      <td className="py-4">
                        <span className={`px-3 py-1 rounded-full text-xs border ${teacher.active ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'}`}>
                          {teacher.active ? 'مفعل' : 'موقوف'}
                        </span>
                      </td>
                      <td className="py-4">
                        <button 
                          onClick={() => toggleTeacherStatus(teacher.id, teacher.active)}
                          className={`px-4 py-1.5 rounded-lg text-sm font-bold transition ${teacher.active ? 'bg-navy-800 text-red-400 hover:bg-red-500/20' : 'bg-navy-800 text-green-400 hover:bg-green-500/20'}`}
                        >
                          {teacher.active ? 'إيقاف' : 'تفعيل'}
                        </button>
                      </td>
                    </tr>
                  ))}
                  {teachers.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-navy-400">لا يوجد معلمين مسجلين بعد.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-xl">
          <div className="bg-navy-900 border border-navy-700 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-white mb-6">تغيير كلمة مرور الإدارة</h2>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <input 
                type="password"
                placeholder="كلمة المرور الجديدة"
                value={newAdminPassword}
                onChange={(e) => setNewAdminPassword(e.target.value)}
                className="w-full bg-navy-950 border border-navy-700 text-white p-4 rounded-xl focus:border-gold-500 outline-none"
                required
              />
              {settingsMessage && (
                <p className={`text-sm font-bold p-3 rounded-lg border ${settingsMessage.includes('بنجاح') ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                  {settingsMessage}
                </p>
              )}
              <button 
                type="submit"
                className="w-full bg-navy-700 text-white font-bold px-6 py-4 rounded-xl hover:bg-navy-600 border border-navy-600 transition flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" /> حفظ كلمة المرور
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
