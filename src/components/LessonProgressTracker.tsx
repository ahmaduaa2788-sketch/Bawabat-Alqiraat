import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext';
import { useReview } from '../context/ReviewContext';
import { CheckCircle2, Trophy, BookOpen, Sparkles, ArrowLeft, Target } from 'lucide-react';
import { courseMap } from '../data/courseMap';
import { qalunCourseMap } from '../data/qalunCourseMap';

interface LessonProgressTrackerProps {
  qariId: string;
  rawiId: string;
  tariqId: string;
  unitId: string;
  currentLessonId: string;
}

export function LessonProgressTracker({
  qariId,
  rawiId,
  tariqId,
  unitId,
  currentLessonId
}: LessonProgressTrackerProps) {
  const navigate = useNavigate();
  const { completedLessons, getCourseProgress, getUnitProgress } = useProgress();
  const { unmasteredMistakes } = useReview();

  const currentMap = rawiId === 'qalun' ? qalunCourseMap : courseMap;
  const currentUnit = currentMap.find(u => u.id === unitId);
  
  const courseProgress = getCourseProgress(rawiId);
  const unitProgress = getUnitProgress(rawiId, unitId);

  const rawiName = rawiId === 'qalun' ? 'قالون عن نافع' : 'ورش عن نافع';

  return (
    <div className="bg-gradient-to-br from-navy-900/90 via-navy-950 to-navy-900/90 border border-navy-800 rounded-3xl p-5 md:p-6 mb-8 shadow-xl backdrop-blur-md" dir="rtl">
      
      {/* Top Row: Overall Course Progress */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b border-navy-800/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gold-400">إنجاز الدورة الشاملة:</span>
            <span className="text-xs text-navy-300 font-semibold">{rawiName}</span>
          </div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-black text-white font-mono">{courseProgress.percent}%</span>
            <span className="text-xs text-navy-400">
              ({courseProgress.completedCount} من {courseProgress.totalLessons} درساً واختباراً منجزاً)
            </span>
          </div>
        </div>

        {/* Quick Review Mode Shortcut if mistakes exist */}
        {unmasteredMistakes.length > 0 && (
          <Link
            to="/review"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-gold-500/15 hover:bg-gold-500/25 border border-gold-500/30 rounded-xl text-xs font-bold text-gold-300 transition shadow-sm animate-pulse"
            title="لديك أسئلة سابقة تحتاج مراجعة وتمكين"
          >
            <Target className="w-3.5 h-3.5 text-gold-400" />
            <span>وضع المراجعة ({unmasteredMistakes.length} أسئلة)</span>
            <ArrowLeft className="w-3 h-3" />
          </Link>
        )}
      </div>

      {/* Course Progress Bar */}
      <div className="w-full bg-navy-950 h-2.5 rounded-full overflow-hidden my-4 border border-navy-800/60 p-0.5">
        <div
          className="h-full rounded-full bg-gradient-to-l from-gold-500 via-emerald-400 to-emerald-500 transition-all duration-700 shadow-[0_0_10px_rgba(16,185,129,0.3)]"
          style={{ width: `${Math.max(courseProgress.percent, 3)}%` }}
        />
      </div>

      {/* Unit Level Progress & Visual Step Pills */}
      {currentUnit && (
        <div className="mt-4 pt-3 border-t border-navy-800/60">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-navy-200">خطوات {currentUnit.title}:</span>
              {unitProgress.isComplete && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
                  <CheckCircle2 className="w-3 h-3" /> مكتمل 100%
                </span>
              )}
            </div>

            <span className="text-xs text-navy-400 font-mono">
              {unitProgress.completedCount} / {unitProgress.totalLessons}
            </span>
          </div>

          {/* Interactive Lesson Pills */}
          <div className="flex flex-wrap gap-2">
            {currentUnit.lessons.map((lesson, idx) => {
              const lessonGlobalId = `${rawiId}-${unitId}-${lesson.id}`;
              const isCompleted = completedLessons.includes(lessonGlobalId) ||
                completedLessons.includes(`${unitId}-${lesson.id}`) ||
                completedLessons.some(cl => cl.endsWith(`${unitId}-${lesson.id}`) || cl === lesson.id);
              const isActive = lesson.id === currentLessonId;
              const isQuiz = lesson.type === 'quiz';

              let pillStyle = "bg-navy-950/70 border-navy-800 text-navy-400 hover:text-white hover:border-navy-700";

              if (isActive) {
                pillStyle = "bg-gold-500 text-navy-950 font-black border-gold-400 shadow-[0_0_12px_rgba(212,175,55,0.4)]";
              } else if (isCompleted) {
                pillStyle = "bg-emerald-950/60 text-emerald-300 border-emerald-500/40 hover:bg-emerald-900/70";
              }

              return (
                <button
                  key={lesson.id}
                  onClick={() => {
                    if (!isActive) {
                      navigate(`/lesson/${qariId}/${rawiId}/${tariqId}/${unitId}/${lesson.id}`);
                    }
                  }}
                  className={`text-xs px-3 py-1.5 rounded-xl border transition flex items-center gap-1.5 ${pillStyle}`}
                  title={lesson.title}
                >
                  {isCompleted && !isActive ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  ) : isQuiz ? (
                    <Trophy className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-navy-950' : 'text-gold-400'}`} />
                  ) : (
                    <span className="font-mono text-[10px] opacity-75">{idx + 1}</span>
                  )}
                  <span className="truncate max-w-[130px] sm:max-w-[180px]">
                    {lesson.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}
