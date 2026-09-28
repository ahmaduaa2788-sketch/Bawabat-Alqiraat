import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../lib/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { StudentRecord } from './Login';
import { courseMap } from '../data/courseMap';
import { 
  Users, 
  Award, 
  BookOpen, 
  CheckCircle2, 
  Copy, 
  Check, 
  Share2, 
  ExternalLink,
  Flame,
  Clock,
  Sparkles,
  ArrowRight,
  Eye,
  X,
  Trophy,
  CheckCircle
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export function TeacherView() {
  const { userData, role } = useAuth();
  const navigate = useNavigate();
  const [students, setStudents] = useState<StudentRecord[]>([]);
  const [studentProgressMap, setStudentProgressMap] = useState<Record<string, any>>({});
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeTab, setActiveTab] = useState<'students' | 'overview'>('students');
  const [selectedStudentForDetails, setSelectedStudentForDetails] = useState<StudentRecord | null>(null);

  const teacherCode = userData?.teacherCode || '';
  const teacherName = userData?.name || 'فضيلة الشيخ';
  const warshTotalLessons = courseMap.reduce((acc, u) => acc + (u.lessons?.length || 0), 0);

  useEffect(() => {
    if (!teacherCode) return;

    // Listen to students registered with this teacher's code
    const studentsRef = collection(db, 'students');
    const qStudents = query(studentsRef, where('teacherCode', '==', teacherCode));
    
    const unsubscribeStudents = onSnapshot(qStudents, (snapshot) => {
      const list: StudentRecord[] = [];
      snapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() } as StudentRecord);
      });
      setStudents(list);
    });

    // Listen to student progress
    const unsubscribeProgress = onSnapshot(collection(db, 'studentProgress'), (snapshot) => {
      const progressData: Record<string, any> = {};
      snapshot.forEach((doc) => {
        progressData[doc.id] = doc.data();
      });
      setStudentProgressMap(progressData);
    });

    return () => {
      unsubscribeStudents();
      unsubscribeProgress();
    };
  }, [teacherCode]);

  const directLink = `${window.location.origin}/login?code=${teacherCode}&role=student`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(teacherCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(directLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const completedCount = students.filter(s => s.status === 'مجتاز').length;
  const activeCount = students.filter(s => s.status === 'نشط').length;
  
  // Average progress across all students
  const totalPercent = students.reduce((acc, s) => {
    const p = studentProgressMap[s.id];
    const completedLessons = p?.completedLessons?.length || 0;
    const percent = p?.warshProgress ?? (completedLessons > 0 ? Math.min(Math.round((completedLessons / warshTotalLessons) * 100), 100) : 0);
    return acc + percent;
  }, 0);
  const avgProgress = students.length > 0 ? Math.round(totalPercent / students.length) : 0;

  const getStudentUnitProgress = (progress: any) => {
    const completedList: string[] = progress?.completedLessons || [];
    return courseMap.map(unit => {
      const unitLessons = unit.lessons || [];
      const completedInUnit = unitLessons.filter(l => 
        completedList.includes(`warsh-${unit.id}-${l.id}`) ||
        completedList.includes(`${unit.id}-${l.id}`) ||
        completedList.some(cl => cl.endsWith(`${unit.id}-${l.id}`) || cl === l.id)
      ).length;
      const isComplete = unitLessons.length > 0 && completedInUnit === unitLessons.length;
      return {
        unit,
        completedInUnit,
        totalInUnit: unitLessons.length,
        isComplete
      };
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500 py-6" dir="rtl">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-navy-900 via-navy-900 to-navy-950 border border-gold-500/30 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-80 h-80 bg-gold-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs font-bold">
              <Award className="w-3.5 h-3.5" />
              معلّم ومجاز في القراءات القرآنية
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white">
              حياكم الله، {teacherName}
            </h1>
            <p className="text-navy-300 text-sm md:text-base max-w-2xl">
              هنا لوحة إدارة حلقتك القرآنية لمتابعة إنجاز طلابك في أصول القراءات السبع والاطلاع على تقدمهم في الدروس والاختبارات.
            </p>
          </div>

          {/* Teacher Code Quick Widget */}
          <div className="bg-navy-950/90 border border-navy-700/80 rounded-2xl p-4 shadow-xl flex flex-col gap-3 min-w-[280px] w-full lg:w-auto">
            <div className="text-xs text-navy-400 font-bold flex items-center justify-between">
              <span>كود حلقتك المعتمد:</span>
              <span className="text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">نشط وجاهز</span>
            </div>
            
            <div className="flex items-center justify-between gap-3 bg-navy-900 px-4 py-2.5 rounded-xl border border-navy-800">
              <span className="font-mono text-xl font-black text-gold-400 tracking-wider">
                {teacherCode || 'لا يوجد كود'}
              </span>
              <button 
                onClick={handleCopyCode}
                className="text-xs font-bold bg-navy-800 hover:bg-gold-500 hover:text-navy-950 text-gold-400 px-3 py-1.5 rounded-lg transition border border-gold-500/30 flex items-center gap-1.5 shrink-0"
                title="نسخ كود الحلقة"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedCode ? 'تم النسخ!' : 'نسخ الكود'}
              </button>
            </div>

            <button 
              onClick={handleCopyLink}
              className="w-full text-xs font-bold bg-gold-500/10 hover:bg-gold-500/20 text-gold-400 py-2 rounded-xl border border-gold-500/20 transition flex items-center justify-center gap-2"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              {copiedLink ? 'تم نسخ الرابط المباشر للطلاب!' : 'نسخ رابط تسجيل الطلاب المباشر'}
            </button>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-navy-900 border border-navy-800 p-5 rounded-2xl flex items-center gap-4 shadow-lg">
          <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/20 text-gold-400 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-navy-400 font-bold">إجمالي طلاب الحلقة</div>
            <div className="text-2xl font-black text-white mt-1">{students.length}</div>
          </div>
        </div>

        <div className="bg-navy-900 border border-navy-800 p-5 rounded-2xl flex items-center gap-4 shadow-lg">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-navy-400 font-bold">الطلاب المجتازون</div>
            <div className="text-2xl font-black text-emerald-400 mt-1">{completedCount}</div>
          </div>
        </div>

        <div className="bg-navy-900 border border-navy-800 p-5 rounded-2xl flex items-center gap-4 shadow-lg">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-navy-400 font-bold">الطلاب النشطون</div>
            <div className="text-2xl font-black text-white mt-1">{activeCount}</div>
          </div>
        </div>

        <div className="bg-navy-900 border border-navy-800 p-5 rounded-2xl flex items-center gap-4 shadow-lg">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-navy-400 font-bold">متوسط إنجاز الحلقة</div>
            <div className="text-2xl font-black text-gold-400 mt-1">{avgProgress}%</div>
          </div>
        </div>
      </div>

      {/* Main Student Roster Card */}
      <div className="bg-navy-900 border border-navy-800 rounded-3xl p-6 md:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-navy-800/80 pb-5">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
              <Users className="w-6 h-6 text-gold-500" />
              قائمة طلاب حلقتك المسجلين
            </h2>
            <p className="text-xs text-navy-400 mt-1">يتم تحديث التقدم تلقائياً وبشكل حي عند إنجاز الطالب لأي درس أو اختبار.</p>
          </div>

          <div className="flex items-center gap-2">
            <Link 
              to="/" 
              className="text-xs font-bold text-navy-300 hover:text-white bg-navy-800 px-3 py-2 rounded-xl border border-navy-700 transition flex items-center gap-1.5"
            >
              <BookOpen className="w-4 h-4 text-gold-400" />
              تصفح الدروس والمنهج
            </Link>
            <Link 
              to="/review" 
              className="text-xs font-bold text-navy-300 hover:text-white bg-navy-800 px-3 py-2 rounded-xl border border-navy-700 transition flex items-center gap-1.5"
            >
              بنك المراجعة
            </Link>
          </div>
        </div>

        {students.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-right text-navy-100">
              <thead>
                <tr className="border-b border-navy-800 text-navy-400 text-xs font-bold">
                  <th className="pb-4">اسم الطالب</th>
                  <th className="pb-4">المسار القرآني</th>
                  <th className="pb-4 text-center">الدروس المنجزة</th>
                  <th className="pb-4 text-center">الأبواب المكتملة</th>
                  <th className="pb-4 text-center">نسبة الإنجاز</th>
                  <th className="pb-4 text-center">أيام التفاعل</th>
                  <th className="pb-4 text-center">الحالة</th>
                  <th className="pb-4 text-center">تفاصيل الأبواب</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-800/40 text-sm">
                {students.map((student) => {
                  const progress = studentProgressMap[student.id];
                  const completedLessonsCount = progress?.completedLessons?.length || 0;
                  const percent = progress?.warshProgress ?? (completedLessonsCount > 0 ? Math.min(Math.round((completedLessonsCount / warshTotalLessons) * 100), 100) : 0);
                  const unitProgressList = getStudentUnitProgress(progress);
                  const completedUnitsCount = unitProgressList.filter(u => u.isComplete).length;
                  
                  return (
                    <tr key={student.id} className="hover:bg-navy-800/40 transition">
                      <td className="py-4">
                        <div className="font-bold text-white">{student.name}</div>
                        <div className="text-[11px] text-navy-400">معرف الطالب: {student.id.substring(0, 8)}...</div>
                      </td>
                      <td className="py-4 text-gold-400 text-xs font-medium">
                        {student.currentPath || 'رواية ورش عن نافع'}
                      </td>
                      <td className="py-4 text-center font-bold text-navy-200">
                        {completedLessonsCount} / {warshTotalLessons}
                      </td>
                      <td className="py-4 text-center">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                          completedUnitsCount > 0 
                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' 
                            : 'bg-navy-950 text-navy-400 border border-navy-800'
                        }`}>
                          <Award className="w-3.5 h-3.5" />
                          <span>{completedUnitsCount} من {courseMap.length} باب</span>
                        </span>
                      </td>
                      <td className="py-4 text-center">
                        <div className="flex items-center gap-2 justify-center max-w-[140px] mx-auto">
                          <div className="flex-1 bg-navy-950 h-2 rounded-full overflow-hidden border border-navy-800">
                            <div 
                              className="bg-gradient-to-l from-gold-500 to-emerald-400 h-full rounded-full transition-all duration-500"
                              style={{ width: `${percent}%` }}
                            />
                          </div>
                          <span className="font-mono text-xs font-bold text-gold-400">{percent}%</span>
                        </div>
                      </td>
                      <td className="py-4 text-center">
                        <div className="inline-flex items-center gap-1 text-xs font-bold text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded-full border border-orange-500/20">
                          <Flame className="w-3.5 h-3.5" />
                          {progress?.streakDays || 1} يوم
                        </div>
                      </td>
                      <td className="py-4 text-center">
                        {student.status === 'مجتاز' || percent >= 100 ? (
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            مجتاز
                          </span>
                        ) : (
                          <span className="text-xs font-bold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20">
                            مستمر
                          </span>
                        )}
                      </td>
                      <td className="py-4 text-center">
                        <button
                          onClick={() => setSelectedStudentForDetails(student)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gold-500/10 hover:bg-gold-500 hover:text-navy-950 text-gold-400 rounded-xl text-xs font-bold transition border border-gold-500/20"
                          title="عرض إنجاز الأبواب والاختبارات"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>عرض الأبواب</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 px-4 space-y-4 bg-navy-950/40 rounded-2xl border border-dashed border-navy-800">
            <div className="w-16 h-16 rounded-full bg-navy-900 border border-navy-700 flex items-center justify-center mx-auto text-gold-500">
              <Users className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white">لا يوجد طلاب مسجلون حتى الآن في حلقتك</h3>
            <p className="text-navy-300 text-sm max-w-md mx-auto">
              شارك كود حلقتك <span className="font-mono text-gold-400 font-bold px-1.5 py-0.5 bg-navy-900 rounded border border-navy-700">{teacherCode}</span> أو الرابط المباشر مع طلابك ليبدأوا التسجيل ومتابعة تقدمهم معك مباشرة.
            </p>
            <div className="pt-2">
              <button 
                onClick={handleCopyLink}
                className="bg-gold-500 text-navy-950 font-bold px-6 py-2.5 rounded-xl hover:bg-gold-400 transition shadow-lg text-sm inline-flex items-center gap-2"
              >
                {copiedLink ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                {copiedLink ? 'تم نسخ الرابط!' : 'نسخ رابط التسجيل المباشر'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Student Completed Chapters Breakdown Modal */}
      {selectedStudentForDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm animate-in fade-in" dir="rtl">
          <div className="bg-navy-900 border border-navy-700 rounded-3xl p-6 md:p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl relative">
            <button
              onClick={() => setSelectedStudentForDetails(null)}
              className="absolute top-5 left-5 text-navy-400 hover:text-white p-1 rounded-xl hover:bg-navy-800 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-navy-800">
              <div className="p-3 bg-gold-500/15 text-gold-400 rounded-2xl border border-gold-500/30">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  سجل إنجاز الأبواب: {selectedStudentForDetails.name}
                </h3>
                <p className="text-xs text-navy-300">
                  تفصيل إتمام أبواب المنهج والاختبارات المعتمدة لورش عن نافع
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {getStudentUnitProgress(studentProgressMap[selectedStudentForDetails.id]).map(({ unit, completedInUnit, totalInUnit, isComplete }) => (
                <div
                  key={unit.id}
                  className={`p-4 rounded-2xl border flex items-center justify-between gap-3 transition ${
                    isComplete 
                      ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-100' 
                      : completedInUnit > 0 
                        ? 'bg-navy-950/80 border-gold-500/30 text-navy-200' 
                        : 'bg-navy-950/40 border-navy-800 text-navy-400 opacity-60'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="font-bold text-sm text-white flex items-center gap-2">
                      {isComplete && <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />}
                      <span>{unit.title}</span>
                    </div>
                    <div className="text-xs text-navy-300">
                      أنجز {completedInUnit} من {totalInUnit} درس واختبار
                    </div>
                  </div>

                  <div className="shrink-0 text-left">
                    {isComplete ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full text-xs font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        تم إتمام الباب ✓
                      </span>
                    ) : (
                      <span className="text-xs font-mono text-gold-400 bg-navy-900 px-2.5 py-1 rounded-lg border border-navy-800">
                        {Math.round((completedInUnit / totalInUnit) * 100)}%
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-navy-800 flex justify-end">
              <button
                onClick={() => setSelectedStudentForDetails(null)}
                className="bg-navy-800 hover:bg-navy-700 text-white px-6 py-2 rounded-xl text-sm font-bold transition border border-navy-700"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
