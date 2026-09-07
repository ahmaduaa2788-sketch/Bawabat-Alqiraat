
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import { Award, BookOpen, Clock, Activity, Flame, Medal, CheckCircle2, Star } from 'lucide-react';
import { CertificateViewer } from './CertificateViewer';
import { qiraatTree } from '../data/qiraatTree';
import { courseMap } from '../data/courseMap';

export function StudentDashboard() {
  const { userData } = useAuth();
  const { completedLessons, completedTuruq = [], lessonTimeSpent = {}, streakDays, updateStreak } = useProgress();

  React.useEffect(() => {
    updateStreak();
  }, [updateStreak]);
  
  const [selectedCert, setSelectedCert] = useState<{name: string, date: string} | null>(null);

  const getCourseName = (id: string) => {
    const parts = id.split('-');
    if (parts.length < 3) return id;
    const qari = qiraatTree.find(q => q.id === parts[0]);
    const rawi = qari?.ruwat.find(r => r.id === parts[1]);
    const tariq = rawi?.turuq.find(t => t.id === parts[2]);
    if (qari && rawi && tariq) {
      return `${qari.name} - ${rawi.name} (${tariq.name})`;
    }
    return id;
  };

  const totalTimeSeconds = Number(Object.values(lessonTimeSpent).reduce((acc: any, curr: any) => acc + (curr || 0), 0)) || 0;
  const totalHours = Math.floor(totalTimeSeconds / 3600);
  const totalMinutes = Math.floor((totalTimeSeconds % 3600) / 60);
  const formattedTime = totalHours > 0 ? `${totalHours} ساعة و ${totalMinutes} دقيقة` : `${totalMinutes} دقيقة`;
  
  // Calculate mastered units (Badges)
  const masteredUnits = courseMap.filter(unit => {
    if (unit.lessons.length === 0) return false;
    const completedInUnit = unit.lessons.filter(l => completedLessons.some(cl => cl.endsWith(`${unit.id}-${l.id}`))).length;
    return completedInUnit === unit.lessons.length;
  });

  // Calculate a streak based on local storage if possible (or default to 1)
  
  if (!userData) return null;

  return (
    <div className="mb-12 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-navy-950 border border-navy-800 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 relative z-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 flex items-center gap-3">
              مرحباً بك يا {userData.name} 👋
            </h2>
            <p className="text-navy-300">سجل إنجازاتك وتقدمك في رحلة القرآن</p>
          </div>
          <div className="bg-gradient-to-r from-gold-600 to-gold-400 text-navy-950 px-6 py-2.5 rounded-full font-bold flex items-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.3)]">
            <Medal className="w-5 h-5" />
            الطالب المثالي
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10 relative z-10">
          {/* Streak Card */}
          <div className="bg-navy-900/80 border border-navy-700/50 p-6 rounded-2xl flex items-center gap-5 backdrop-blur-sm group hover:bg-navy-800 transition">
            <div className="p-4 bg-orange-500/10 text-orange-500 rounded-2xl group-hover:scale-110 transition-transform shadow-inner">
              <Flame className="w-8 h-8" />
            </div>
            <div>
              <p className="text-navy-300 text-sm font-bold mb-1">شعلة الاستمرار (Streak)</p>
              <div className="flex items-baseline gap-1">
                <p className="text-3xl font-extrabold text-white">{streakDays}</p>
                <span className="text-orange-500 font-bold text-sm">أيام متتالية</span>
              </div>
            </div>
          </div>

          {/* Lessons Card */}
          <div className="bg-navy-900/80 border border-navy-700/50 p-6 rounded-2xl flex items-center gap-5 backdrop-blur-sm group hover:bg-navy-800 transition">
            <div className="p-4 bg-blue-500/10 text-blue-400 rounded-2xl group-hover:scale-110 transition-transform shadow-inner">
              <BookOpen className="w-8 h-8" />
            </div>
            <div>
              <p className="text-navy-300 text-sm font-bold mb-1">الدروس المنجزة</p>
              <div className="flex items-baseline gap-1">
                <p className="text-3xl font-extrabold text-white">{completedLessons.length}</p>
                <span className="text-blue-400 font-bold text-sm">درس</span>
              </div>
            </div>
          </div>

          {/* Time Card */}
          <div className="bg-navy-900/80 border border-navy-700/50 p-6 rounded-2xl flex items-center gap-5 backdrop-blur-sm group hover:bg-navy-800 transition">
            <div className="p-4 bg-green-500/10 text-green-400 rounded-2xl group-hover:scale-110 transition-transform shadow-inner">
              <Clock className="w-8 h-8" />
            </div>
            <div>
              <p className="text-navy-300 text-sm font-bold mb-1">ساعات المذاكرة</p>
              <p className="text-2xl font-extrabold text-white">{formattedTime}</p>
            </div>
          </div>
        </div>

        {/* Achievements & Badges Log */}
        <div className="bg-navy-900/50 p-6 md:p-8 rounded-2xl border border-navy-800 relative z-10">
          <div className="flex items-center gap-3 mb-8 border-b border-navy-800 pb-4">
            <Award className="w-6 h-6 text-gold-500" />
            <h3 className="text-xl font-bold text-white">سجل الإنجازات والأوسمة الرقمية</h3>
          </div>
          
          {masteredUnits.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {masteredUnits.map((unit, index) => (
                <div key={unit.id} className="bg-navy-950 p-4 rounded-xl border border-gold-500/20 flex flex-col items-center text-center gap-3 hover:border-gold-500/50 transition hover:-translate-y-1 shadow-lg shadow-gold-500/5">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center shadow-lg shadow-gold-500/30">
                      <Star className="w-8 h-8 text-navy-950 fill-navy-950" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-green-500 text-white rounded-full p-1 border-2 border-navy-950">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm line-clamp-2 leading-snug">{unit.title}</h4>
                    <p className="text-gold-400 text-xs mt-1">وسام الإتقان</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 px-4 border-2 border-dashed border-navy-700 rounded-xl bg-navy-950/30">
              <Star className="w-12 h-12 text-navy-600 mx-auto mb-3" />
              <h4 className="text-lg font-bold text-navy-300 mb-1">لا توجد أوسمة بعد</h4>
              <p className="text-navy-400 text-sm max-w-sm mx-auto">أكمل جميع الدروس في أي باب للحصول على وسام الإتقان وإضافته إلى سجلك.</p>
            </div>
          )}
        </div>
      </div>

      {/* Certificates Section */}
      {completedTuruq.length > 0 && (
        <div className="bg-navy-950 border border-navy-800 rounded-3xl p-6 md:p-8 shadow-2xl mt-6 animate-in slide-in-from-bottom-6 duration-700">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
            <Award className="text-gold-500" />
            شهادات الإتمام الشاملة
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {completedTuruq.map(tariqId => (
              <div key={tariqId} className="bg-gradient-to-br from-navy-900 to-navy-950 border border-gold-500/30 p-6 rounded-2xl flex flex-col justify-between items-center text-center gap-4 hover:border-gold-500 transition shadow-xl group">
                <div className="p-4 bg-gold-500/10 rounded-full group-hover:scale-110 transition-transform">
                  <Award className="w-12 h-12 text-gold-500" />
                </div>
                <div>
                  <p className="text-gold-400 text-sm font-bold mb-1">إجازة في المسار</p>
                  <h4 className="font-bold text-white text-lg">{getCourseName(tariqId)}</h4>
                </div>
                <button 
                  onClick={() => setSelectedCert({ name: getCourseName(tariqId), date: new Date().toLocaleDateString('ar-EG') })}
                  className="bg-gold-500 text-navy-900 px-6 py-2.5 rounded-xl font-bold hover:bg-gold-400 w-full transition shadow-lg shadow-gold-500/20"
                >
                  عرض الشهادة
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedCert && (
        <div className="fixed inset-0 z-50 bg-navy-950/90 backdrop-blur-sm p-4 md:p-8 overflow-y-auto flex items-center justify-center">
          <CertificateViewer 
            studentName={userData.name}
            courseName={selectedCert.name}
            score="95"
            date={selectedCert.date}
            onClose={() => setSelectedCert(null)}
          />
        </div>
      )}
    </div>
  );
}
