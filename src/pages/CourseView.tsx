import React from 'react';
import { courseMap } from '../data/courseMap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { BookOpen, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import { cn } from '../lib/utils';
import { useProgress } from '../context/ProgressContext';
import { qiraatTree } from '../data/qiraatTree';

export function CourseView() {
  const { qariId, rawiId, tariqId } = useParams<{ qariId: string; rawiId: string; tariqId: string }>();
  const navigate = useNavigate();
  const { completeTariq, completedTuruq, completedLessons } = useProgress();

  const qari = qiraatTree.find(q => q.id === qariId);
  const rawi = qari?.ruwat.find(r => r.id === rawiId);
  const tariq = rawi?.turuq.find(t => t.id === tariqId);

  const isComplete = completedTuruq.includes(`${qariId}-${rawiId}-${tariqId}`);

  if (!qari || !rawi || !tariq) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-white">المسار غير موجود</h2>
        <Link to="/" className="text-gold-500 mt-4 inline-block hover:text-gold-400">العودة للبوابة</Link>
      </div>
    );
  }

  // Currently we only have content for nafi/warsh/shatibiyyah
  const hasContent = qariId === 'nafi' && rawiId === 'warsh' && tariqId === 'shatibiyyah';
  const displayMap = hasContent ? courseMap : [];

  const handleCompleteCourse = () => {
    completeTariq(qariId, rawiId, tariqId);
    navigate(`/qari/${qariId}`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20">
      <div className="flex items-center gap-4 py-4 border-b border-navy-800">
        <Link to={`/qari/${qariId}`} className="p-2 bg-navy-800 hover:bg-navy-700 rounded-lg transition-colors text-navy-300 hover:text-white">
          <ChevronRight className="w-6 h-6" />
        </Link>
        <div className="flex gap-2 text-sm text-navy-400">
          <span>{qari.name}</span>
          <span>/</span>
          <span>{rawi.name}</span>
          <span>/</span>
          <span className="text-gold-400 font-bold">{tariq.name}</span>
        </div>
      </div>

      <div className="text-center space-y-4 py-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight drop-shadow-md">
          أصول {rawi.name}
        </h1>
        <div className="inline-block bg-navy-800/80 text-gold-400 px-6 py-2 rounded-full font-bold text-lg border border-gold-500/30 shadow-lg backdrop-blur-sm shadow-gold-500/10">
          {tariq.name}
        </div>
        <p className="text-xl text-navy-200 max-w-2xl mx-auto leading-relaxed mt-4">
          منهج تعليمي تفاعلي متكامل يهدف إلى التدرج بالطالب من معرفة المبادئ والأسس إلى إتقان الأصول وفرش الحروف.
        </p>
      </div>

      {!hasContent ? (
        <div className="bg-navy-950/50 border-2 border-dashed border-navy-700 rounded-2xl p-12 text-center text-navy-400 backdrop-blur-sm">
          <BookOpen className="w-12 h-12 mx-auto text-navy-600 mb-4" />
          <h2 className="text-2xl font-bold text-navy-300 mb-2">المحتوى قيد الإعداد</h2>
          <p>سيتم إضافة محتوى هذا المسار قريباً إن شاء الله.</p>
          <button 
            onClick={handleCompleteCourse}
            className="mt-6 bg-gold-500 text-navy-950 px-6 py-2 rounded-lg font-bold hover:bg-gold-400 transition shadow-md shadow-gold-500/20"
          >
            تحديد كـ "مكتمل" (للتجربة)
          </button>
        </div>
      ) : (
        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-auto before:mr-auto before:-translate-x-1/2 before:w-1 before:bg-navy-800 before:z-0 md:before:mr-[40px] md:before:-translate-x-0">
          {displayMap.map((unit, index) => {
            const unitCompletedLessons = unit.lessons.filter(l => completedLessons.includes(`${unit.id}-${l.id}`)).length;
            const progressPercentage = unit.lessons.length > 0 ? (unitCompletedLessons / unit.lessons.length) * 100 : 0;
            const isUnitComplete = progressPercentage === 100;
            
            return (
            <div key={unit.id} className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-12 items-start group">
              
              <div className="hidden md:flex flex-col items-center">
                <div className={cn(
                  "w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold border-4 shadow-xl transition-transform group-hover:scale-105 bg-navy-950",
                  isUnitComplete
                    ? "text-green-500 border-green-500 shadow-green-500/20"
                    : unit.lessons.length > 0 
                      ? "text-gold-500 border-gold-500 shadow-gold-500/20" 
                      : "text-navy-600 border-navy-800 shadow-navy-950"
                )}>
                  {isUnitComplete ? <CheckCircle className="w-8 h-8" /> : index.toString().padStart(2, '0')}
                </div>
              </div>

              <div className={cn(
                "flex-1 p-6 md:p-8 rounded-2xl shadow-lg border transition-shadow backdrop-blur-sm",
                unit.lessons.length > 0 
                  ? "bg-navy-800/80 border-navy-700 hover:border-gold-500/50 hover:shadow-gold-500/5" 
                  : "bg-navy-950/50 border-dashed border-navy-800 opacity-70"
              )}>
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-white">{unit.title}</h2>
                  {unit.lessons.length === 0 && (
                    <span className="bg-navy-900 text-navy-400 border border-navy-800 text-sm px-3 py-1 rounded-full font-medium">قريباً</span>
                  )}
                  {unit.lessons.length > 0 && (
                    <span className={`text-sm font-bold px-3 py-1 rounded-full border ${isUnitComplete ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-navy-900 text-gold-400 border-gold-500/30'}`}>
                      {unitCompletedLessons} / {unit.lessons.length}
                    </span>
                  )}
                </div>
                
                {unit.lessons.length > 0 && (
                  <div className="w-full bg-navy-900 rounded-full h-2.5 mb-6 border border-navy-800/50 overflow-hidden">
                    <div 
                      className={`h-2.5 rounded-full transition-all duration-1000 ${isUnitComplete ? 'bg-green-500' : 'bg-gold-500'}`} 
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                )}
                
                <p className="text-navy-300 text-lg leading-relaxed mb-4">
                  {unit.description}
                </p>
                {unit.shahed && (
                  <div className="mb-6 bg-gold-500/10 border-r-4 border-gold-500 p-4 rounded-l-xl">
                    <p className="font-arabic text-xl md:text-2xl text-gold-400 leading-loose text-center">
                      {unit.shahed}
                    </p>
                  </div>
                )}

                {unit.lessons.length > 0 && (
                  <div className="space-y-3 bg-navy-900/50 p-4 rounded-xl border border-navy-800/50 shadow-inner">
                    <h3 className="font-semibold text-navy-200 mb-3 text-sm uppercase tracking-wide">الدروس المتاحة:</h3>
                    {unit.lessons.map((lesson, i) => (
                      <Link
                        key={lesson.id}
                        to={`/lesson/${qariId}/${rawiId}/${tariqId}/${unit.id}/${lesson.id}`}
                        className="flex items-center justify-between p-3 rounded-lg bg-navy-800/50 hover:bg-navy-700 shadow-sm border border-navy-700/50 hover:border-gold-500/30 transition group/link"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-full bg-navy-950 text-gold-500 flex items-center justify-center text-xs font-bold border border-gold-500/20 shadow-sm">
                            {i + 1}
                          </div>
                          <span className="font-medium text-navy-100 group-hover/link:text-white">{lesson.title}</span>
                        </div>
                        <ChevronLeft className="w-5 h-5 text-navy-400 group-hover/link:text-gold-500 transition-transform group-hover/link:-translate-x-1" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}

          {/* Final Exam / Completion marker for demo */}
          <div className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-12 items-start mt-12">
            <div className="hidden md:flex flex-col items-center">
              <div className={cn(
                "w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold border-4 shadow-xl bg-navy-950",
                isComplete ? "border-green-500 text-green-500 shadow-green-500/20" : "border-gold-500 text-gold-500 shadow-gold-500/20"
              )}>
                <CheckCircle className="w-10 h-10" />
              </div>
            </div>
            <div className="flex-1 bg-gradient-to-br from-navy-800 to-navy-950 p-8 rounded-2xl shadow-xl border border-gold-500/20 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-50"></div>
              <h2 className="text-2xl font-bold mb-4 text-gold-400">الاختبار النهائي للمسار</h2>
              <p className="text-navy-200 mb-8 leading-relaxed max-w-xl mx-auto">
                بعد الانتهاء من جميع الدروس واجتياز اختبارات الأبواب والمختبر القرآني، تقدم للاختبار النظري النهائي لإتمام دراسة هذا الطريق.
              </p>
              {!isComplete ? (
                <Link 
                  to={`/exam/${qariId}/${rawiId}/${tariqId}`}
                  className="inline-block bg-gold-500 text-navy-950 font-bold px-8 py-3 rounded-xl hover:bg-gold-400 transition shadow-lg shadow-gold-500/20 w-full md:w-auto text-lg"
                >
                  الدخول للاختبار النظري الشامل
                </Link>
              ) : (
                <div className="bg-green-500/10 text-green-400 font-bold px-8 py-4 rounded-xl border border-green-500/30 flex items-center justify-center gap-3 text-lg backdrop-blur-sm">
                  <CheckCircle className="w-6 h-6" />
                  لقد اجتزت هذا المسار بنجاح
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
