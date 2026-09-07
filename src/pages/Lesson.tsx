import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { courseMap } from '../data/courseMap';
import { qalunCourseMap } from '../data/qalunCourseMap';
import { qalunContentMap } from '../data/qalunCourseContent';
import { unit0Content } from '../data/unit0';
import { unit1Content } from '../data/unit1';
import { unit2Content } from '../data/unit2';
import { unit3Content } from '../data/unit3';
import { unit4Content } from '../data/unit4';
import { unit5Content } from '../data/unit5';
import { unit6Content } from '../data/unit6';
import { unit7Content } from '../data/unit7';
import { unit8Content } from '../data/unit8';
import { unit9Content } from '../data/unit9';
import { unit10Content } from '../data/unit10';
import { unit11Content } from '../data/unit11';
import { unit12Content } from '../data/unit12';
import { unit13Content } from '../data/unit13';
import { Unit0Quiz } from '../components/Unit0Quiz';
import { Unit1Quiz } from '../components/Unit1Quiz';
import { Unit2Quiz } from '../components/Unit2Quiz';
import { Unit3Quiz } from '../components/Unit3Quiz';
import { Unit8Quiz } from '../components/Unit8Quiz';
import { QuranicLab } from '../components/QuranicLab';
import { ComprehensiveQuiz } from '../components/ComprehensiveQuiz';
import { QuickQuestion } from '../components/QuickQuestion';
import { ArrowRight, ArrowLeft, CheckCircle, Save, StickyNote, Clock } from 'lucide-react';
import { qiraatTree } from '../data/qiraatTree';
import { useProgress } from '../context/ProgressContext';
import { useAuth } from '../context/AuthContext';
import { db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useToast } from '../context/ToastContext';

export function Lesson() {
  const { qariId, rawiId, tariqId, unitId, lessonId } = useParams<{ 
    qariId: string; 
    rawiId: string; 
    tariqId: string;
    unitId: string; 
    lessonId: string;
  }>();
  
  const navigate = useNavigate();
  const { completeLesson, completedLessons, lessonNotes, saveLessonNote, lessonTimeSpent, updateLessonTime } = useProgress();
  const { showToast } = useToast();
  const { role } = useAuth();

  const lessonGlobalId = `${rawiId}-${unitId}-${lessonId}`;
  const courseBaseUrl = `/course/${qariId}/${rawiId}/${tariqId}`;
  
  
  const totalTime = lessonTimeSpent[lessonGlobalId] || 0;
  
  useEffect(() => {
    const timer = setInterval(() => {
      updateLessonTime(lessonGlobalId, 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [lessonGlobalId, updateLessonTime]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const [noteContent, setNoteContent] = useState('');
  const [adminNote, setAdminNote] = useState('');
  
  useEffect(() => {
    setNoteContent(lessonNotes[lessonGlobalId] || '');
  }, [lessonGlobalId, lessonNotes]);
  
  useEffect(() => {
    const fetchAdminNote = async () => {
      try {
        const docRef = doc(db, 'content', 'adminNotes');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && docSnap.data()[lessonGlobalId]) {
          setAdminNote(docSnap.data()[lessonGlobalId]);
        } else {
          setAdminNote('');
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchAdminNote();
  }, [lessonGlobalId]);

  const handleSaveNote = () => {
    saveLessonNote(lessonGlobalId, noteContent);
    showToast('تم حفظ ملاحظاتك بنجاح', 'success');
  };

  const currentMap = rawiId === 'qalun' ? qalunCourseMap : courseMap;
  const unit = currentMap.find(u => u.id === unitId);
  const lesson = unit?.lessons.find(l => l.id === lessonId);
  const lessonIndex = unit?.lessons.findIndex(l => l.id === lessonId) ?? -1;

  if (!unit || !lesson) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gold-400 mb-4">الدرس غير موجود</h2>
        <Link to={`/course/${qariId}/${rawiId}/${tariqId}`} className="text-gold-600 hover:underline">العودة لخريطة المسار</Link>
      </div>
    );
  }

  const isLessonComplete = completedLessons.includes(lessonGlobalId);

  const handleMarkCompleteAndContinue = () => {
    if (!isLessonComplete) {
      completeLesson(lessonGlobalId);
      showToast('🎉 أحسنت! تم إنجاز الدرس بنجاح. استمر في تقدمك!', 'success');
    }
    
    if (nextLesson) {
      navigate(`/lesson/${qariId}/${rawiId}/${tariqId}/${unit.id}/${nextLesson.id}`);
    } else {
      navigate(`/course/${qariId}/${rawiId}/${tariqId}`);
    }
  };

  // Next and Prev Lesson logic
  const prevLesson = lessonIndex > 0 ? unit.lessons[lessonIndex - 1] : null;
  const nextLesson = lessonIndex < unit.lessons.length - 1 ? unit.lessons[lessonIndex + 1] : null;

  // Render content based on unit and lesson type
  let content = null;
  if (rawiId === 'qalun') {
    if (lesson?.type === 'quiz') {
      content = <div className="p-8 bg-navy-800 rounded-xl text-center text-gold-400">قسم الاختبارات قيد التطوير لراوي قالون. <br/><button onClick={handleMarkCompleteAndContinue} className="mt-4 px-6 py-2 bg-gold-500 text-navy-900 rounded-lg">تخطي مؤقتاً</button></div>;
    } else if (lessonId === 'lab-1') {
      content = <QuranicLab />;
    } else {
      content = qalunContentMap[lesson.id];
    }
  } else if (unitId === 'unit-0') {
    if (lesson.type === 'quiz') {
      content = <Unit0Quiz onComplete={handleMarkCompleteAndContinue} />;
    } else {
      content = unit0Content[lesson.id];
    }
  } else if (unitId === 'unit-1') {
    if (lesson.type === 'quiz') {
      content = <Unit1Quiz onComplete={handleMarkCompleteAndContinue} />;
    } else {
      content = unit1Content[lesson.id];
    }
  } else if (unitId === 'unit-2') {
    if (lesson.type === 'quiz') {
      content = <Unit2Quiz onComplete={handleMarkCompleteAndContinue} />;
    } else {
      content = unit2Content[lesson.id];
    }
  } else if (unitId === 'unit-3') {
    if (lesson.type === 'quiz') {
      content = <Unit3Quiz onComplete={handleMarkCompleteAndContinue} />;
    } else {
      content = unit3Content[lesson.id];
    }
  } else if (unitId === 'unit-4') {
    content = unit4Content[lesson.id];
  } else if (unitId === 'unit-5') {
    content = unit5Content[lesson.id];
  } else if (unitId === 'unit-6') {
    content = unit6Content[lesson.id];
  } else if (unitId === 'unit-7') {
    content = unit7Content[lesson.id];
  } else if (unitId === 'unit-8') {
    if (lesson.type === 'quiz') {
      content = <Unit8Quiz onComplete={handleMarkCompleteAndContinue} />;
    } else {
      content = unit8Content[lesson.id];
    }
  } else if (unitId === 'unit-9') {
    content = unit9Content[lesson.id];
  } else if (unitId === 'unit-10') {
    content = unit10Content[lesson.id];
  } else if (unitId === 'unit-11') {
    content = unit11Content[lesson.id];
  } else if (unitId === 'unit-12') {
    content = unit12Content[lesson.id];
  } else if (unitId === 'unit-13') {
    content = unit13Content[lesson.id];
  } else if (unitId === 'unit-14') {
    if (lessonId === 'final-quiz') {
      const displayMap = rawiId === 'qalun' ? qalunCourseMap : courseMap;
      const totalLessons = displayMap.reduce((acc, u) => acc + (u.lessons?.length || 0), 0);
      const completedCount = displayMap.reduce((acc, u) => {
        return acc + (u.lessons?.filter(l => completedLessons.includes(`${rawiId}-${u.id}-${l.id}`)).length || 0);
      }, 0);
      
      const isLessonCompleted = completedLessons.includes(`${rawiId}-${unitId}-${lessonId}`);
      const completedOtherLessons = completedCount - (isLessonCompleted ? 1 : 0);
      const canAccessLesson = role === 'admin' || completedOtherLessons >= totalLessons - 1;

      if (!canAccessLesson) {
        content = (
          <div className="bg-navy-950/80 p-8 rounded-2xl border border-red-500/30 text-center max-w-2xl mx-auto shadow-2xl">
            <Lock className="w-16 h-16 mx-auto text-red-500 mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">الاختبار مقفل</h2>
            <p className="text-navy-300">يجب عليك إتمام جميع الدروس والاختبارات القصيرة السابقة قبل دخول الاختبار الشامل.</p>
            <Link to={courseBaseUrl} className="mt-6 inline-block bg-navy-800 text-white px-6 py-2 rounded-xl hover:bg-navy-700 transition">العودة للمسار</Link>
          </div>
        );
      } else {
        content = <ComprehensiveQuiz onComplete={handleMarkCompleteAndContinue} />;
      }
    } else {
      content = <QuranicLab />;
    }
  }

  

  return (
    <div className="max-w-4xl mx-auto pb-20 animate-in fade-in duration-500">
      <div className="mb-8">
        <div className="text-sm font-bold text-gold-600 mb-2 flex items-center gap-2">
          <Link to={courseBaseUrl} className="hover:underline">المسار</Link>
          <span>/</span>
          <span>{unit.title}</span>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
            {lesson.title}
          </h1>
          <div className="flex items-center gap-3">
            <div className="bg-navy-800/80 border border-navy-700 text-navy-200 px-3 py-1.5 rounded-lg flex items-center gap-2 font-mono text-sm shadow-sm" title="الوقت المستغرق في هذا الدرس">
              <Clock className="w-4 h-4 text-gold-500" />
              {formatTime(totalTime)}
            </div>
            {isLessonComplete && (
              <span className="bg-green-500/20 text-green-400 px-3 py-1.5 rounded-lg text-xs font-bold border border-green-500/30 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" /> مكتمل
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none prose-headings:font-bold prose-a:text-gold-600 prose-p:leading-relaxed bg-navy-950/50 p-6 md:p-10 rounded-2xl border border-navy-800 shadow-xl backdrop-blur-sm">
        {content || (
          <div className="bg-gold-500/10 p-6 rounded-lg text-gold-300 text-center border border-gold-500/30">
            محتوى هذا الدرس قيد الإعداد...
          </div>
        )}
      </div>

      {/* Quick Question Section */}
      {lesson.type !== 'quiz' && lesson.type !== 'interactive' && (
        <QuickQuestion lessonId={lessonGlobalId} />
      )}

      {/* Lesson Notes Section */}
      <div className="mt-12 bg-navy-900/50 p-6 md:p-8 rounded-2xl border border-navy-800 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <StickyNote className="text-gold-500 w-6 h-6" />
          <h3 className="text-xl font-bold text-white">ملاحظاتي الشخصية</h3>
        </div>
        <p className="text-navy-300 text-sm mb-4">اكتب هنا أية فوائد أو استفسارات خاصة بك في هذا الدرس للرجوع إليها لاحقاً.</p>
        <textarea
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          placeholder="اكتب ملاحظاتك هنا..."
          className="w-full bg-navy-950 border border-navy-700 text-white p-4 rounded-xl min-h-[150px] focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none resize-y mb-4"
        />
        <div className="flex justify-end">
          <button
            onClick={handleSaveNote}
            className="flex items-center gap-2 bg-navy-700 hover:bg-navy-600 text-white px-6 py-3 rounded-xl transition font-medium border border-navy-600"
          >
            <Save className="w-4 h-4" />
            حفظ الملاحظات
          </button>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="mt-16 pt-8 border-t border-navy-800 flex flex-col sm:flex-row gap-4 justify-between items-center">
        {prevLesson ? (
          <Link
            to={`/lesson/${qariId}/${rawiId}/${tariqId}/${unit.id}/${prevLesson.id}`}
            className="flex items-center gap-2 text-navy-300 hover:text-white font-medium px-4 py-2 rounded-lg hover:bg-navy-800 transition"
          >
            <ArrowRight className="w-5 h-5" />
            الدرس السابق
          </Link>
        ) : <div />}

        {lesson.type !== 'quiz' && (
          <button
            onClick={handleMarkCompleteAndContinue}
            className={`flex items-center gap-3 font-medium px-8 py-4 rounded-xl transition shadow-lg w-full sm:w-auto justify-center ${
              isLessonComplete 
                ? "bg-navy-800 text-white hover:bg-navy-700" 
                : "bg-gold-500 text-navy-950 hover:bg-gold-400 shadow-gold-500/20"
            }`}
          >
            {isLessonComplete ? (nextLesson ? "الدرس التالي" : "العودة للمسار") : "إتمام ومتابعة"}
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
