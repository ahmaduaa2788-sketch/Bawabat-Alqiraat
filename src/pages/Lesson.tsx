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
import { Unit4Quiz } from '../components/Unit4Quiz';
import { Unit5Quiz } from '../components/Unit5Quiz';
import { Unit6Quiz } from '../components/Unit6Quiz';
import { Unit7Quiz } from '../components/Unit7Quiz';
import { Unit8Quiz } from '../components/Unit8Quiz';
import { Unit9Quiz } from '../components/Unit9Quiz';
import { Unit10Quiz } from '../components/Unit10Quiz';
import { Unit11Quiz } from '../components/Unit11Quiz';
import { Unit12Quiz } from '../components/Unit12Quiz';
import { Unit13Quiz } from '../components/Unit13Quiz';
import { QalunUnit0Quiz } from '../components/QalunUnit0Quiz';
import { QalunUnit1Quiz } from '../components/QalunUnit1Quiz';
import { QalunUnit2Quiz } from '../components/QalunUnit2Quiz';
import { QalunUnit3Quiz } from '../components/QalunUnit3Quiz';
import { QalunUnit4Quiz } from '../components/QalunUnit4Quiz';
import { QalunUnit5Quiz } from '../components/QalunUnit5Quiz';
import { QalunComprehensiveQuiz } from '../components/QalunComprehensiveQuiz';
import { QuranicLab } from '../components/QuranicLab';
import { ComprehensiveQuiz } from '../components/ComprehensiveQuiz';
import { QuickQuestion } from '../components/QuickQuestion';
import { CustomLessonRenderer } from '../components/CustomLessonRenderer';
import { LessonEditorModal } from '../components/LessonEditorModal';
import { LessonProgressTracker } from '../components/LessonProgressTracker';
import { 
  ArrowRight, ArrowLeft, CheckCircle, Save, StickyNote, Clock, Lock, 
  Edit3, Shield, Sparkles, Key, CheckCircle2, AlertCircle, X
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { useAuth } from '../context/AuthContext';
import { db } from '../lib/firebase';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
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
  const { role, login } = useAuth();

  const lessonGlobalId = `${rawiId}-${unitId}-${lessonId}`;
  const courseBaseUrl = `/course/${qariId}/${rawiId}/${tariqId}`;
  
  const totalTime = lessonTimeSpent[lessonGlobalId] || 0;
  
  // Lesson timer
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
  const [customLessonData, setCustomLessonData] = useState<{ content: string; ruleSummary?: string } | null>(null);

  // Modal states for editing
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Personal notes listener
  useEffect(() => {
    setNoteContent(lessonNotes[lessonGlobalId] || '');
  }, [lessonGlobalId, lessonNotes]);
  
  // Listen for admin notes
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
        console.error("Error fetching admin note:", e);
      }
    };
    fetchAdminNote();
  }, [lessonGlobalId]);

  // Real-time listener for customized educational material
  useEffect(() => {
    if (!lessonGlobalId) return;
    const docRef = doc(db, 'lessonContents', lessonGlobalId);
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists() && docSnap.data().content) {
        setCustomLessonData({
          content: docSnap.data().content,
          ruleSummary: docSnap.data().ruleSummary || ''
        });
      } else {
        setCustomLessonData(null);
      }
    }, (err) => {
      console.error("Error listening to custom lesson content:", err);
    });

    return () => unsubscribe();
  }, [lessonGlobalId]);

  const handleSaveNote = () => {
    saveLessonNote(lessonGlobalId, noteContent);
    showToast('تم حفظ ملاحظاتك بنجاح', 'success');
  };

  const handleAdminAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    const storedAdminPassword = localStorage.getItem('admin_password') || 'admin123';
    if (adminPasswordInput === storedAdminPassword) {
      login('admin');
      setShowAuthModal(false);
      setAdminPasswordInput('');
      setIsEditorOpen(true);
      showToast('مرحباً بك يا شيخ! تم تفعيل وضع المشرف وصلاحيات التعديل.', 'success');
    } else {
      setAuthError('كلمة مرور الإدارة غير صحيحة. كلمة المرور الافتراضية هي: admin123');
    }
  };

  const currentMap = rawiId === 'qalun' ? qalunCourseMap : courseMap;
  const unit = currentMap.find(u => u.id === unitId);
  const lesson = unit?.lessons.find(l => l.id === lessonId);
  const lessonIndex = unit?.lessons.findIndex(l => l.id === lessonId) ?? -1;

  if (!unit || !lesson) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gold-400 mb-4">الدرس غير موجود</h2>
        <Link to={`/course/${qariId}/${rawiId}/${tariqId}`} className="text-gold-600 hover:underline">
          العودة لخريطة المسار
        </Link>
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

  // Render content based on custom edits OR fallback to hardcoded default
  let content = null;
  
  // If we have custom edited educational material for this text lesson:
  if (customLessonData?.content && lesson.type !== 'quiz' && lesson.id !== 'lab-1') {
    content = (
      <CustomLessonRenderer 
        content={customLessonData.content} 
        ruleSummary={customLessonData.ruleSummary} 
      />
    );
  } else if (rawiId === 'qalun') {
    if (lesson?.type === 'quiz') {
      if (unitId === 'unit-0') {
        content = <QalunUnit0Quiz onComplete={handleMarkCompleteAndContinue} />;
      } else if (unitId === 'unit-1') {
        content = <QalunUnit1Quiz onComplete={handleMarkCompleteAndContinue} />;
      } else if (unitId === 'unit-2') {
        content = <QalunUnit2Quiz onComplete={handleMarkCompleteAndContinue} />;
      } else if (unitId === 'unit-3') {
        content = <QalunUnit3Quiz onComplete={handleMarkCompleteAndContinue} />;
      } else if (unitId === 'unit-4') {
        content = <QalunUnit4Quiz onComplete={handleMarkCompleteAndContinue} />;
      } else if (unitId === 'unit-5') {
        content = <QalunUnit5Quiz onComplete={handleMarkCompleteAndContinue} />;
      } else if (lessonId === 'final-quiz') {
        content = <QalunComprehensiveQuiz onComplete={handleMarkCompleteAndContinue} />;
      } else {
        content = (
          <div className="p-8 bg-navy-800 rounded-xl text-center text-gold-400">
            قسم الاختبارات قيد التطوير لهذا الباب.<br/>
            <button onClick={handleMarkCompleteAndContinue} className="mt-4 px-6 py-2 bg-gold-500 text-navy-900 rounded-lg">
              تخطي مؤقتاً
            </button>
          </div>
        );
      }
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
    if (lesson.type === 'quiz') {
      content = <Unit4Quiz onComplete={handleMarkCompleteAndContinue} />;
    } else {
      content = unit4Content[lesson.id];
    }
  } else if (unitId === 'unit-5') {
    if (lesson.type === 'quiz') {
      content = <Unit5Quiz onComplete={handleMarkCompleteAndContinue} />;
    } else {
      content = unit5Content[lesson.id];
    }
  } else if (unitId === 'unit-6') {
    if (lesson.type === 'quiz') {
      content = <Unit6Quiz onComplete={handleMarkCompleteAndContinue} />;
    } else {
      content = unit6Content[lesson.id];
    }
  } else if (unitId === 'unit-7') {
    if (lesson.type === 'quiz') {
      content = <Unit7Quiz onComplete={handleMarkCompleteAndContinue} />;
    } else {
      content = unit7Content[lesson.id];
    }
  } else if (unitId === 'unit-8') {
    if (lesson.type === 'quiz') {
      content = <Unit8Quiz onComplete={handleMarkCompleteAndContinue} />;
    } else {
      content = unit8Content[lesson.id];
    }
  } else if (unitId === 'unit-9') {
    if (lesson.type === 'quiz') {
      content = <Unit9Quiz onComplete={handleMarkCompleteAndContinue} />;
    } else {
      content = unit9Content[lesson.id];
    }
  } else if (unitId === 'unit-10') {
    if (lesson.type === 'quiz') {
      content = <Unit10Quiz onComplete={handleMarkCompleteAndContinue} />;
    } else {
      content = unit10Content[lesson.id];
    }
  } else if (unitId === 'unit-11') {
    if (lesson.type === 'quiz') {
      content = <Unit11Quiz onComplete={handleMarkCompleteAndContinue} />;
    } else {
      content = unit11Content[lesson.id];
    }
  } else if (unitId === 'unit-12') {
    if (lesson.type === 'quiz') {
      content = <Unit12Quiz onComplete={handleMarkCompleteAndContinue} />;
    } else {
      content = unit12Content[lesson.id];
    }
  } else if (unitId === 'unit-13') {
    if (lesson.type === 'quiz') {
      content = <Unit13Quiz onComplete={handleMarkCompleteAndContinue} />;
    } else {
      content = unit13Content[lesson.id];
    }
  } else if (unitId === 'unit-14') {
    const displayMap = rawiId === 'qalun' ? qalunCourseMap : courseMap;
    const totalLessons = displayMap.reduce((acc, u) => acc + (u.lessons?.length || 0), 0);
    const completedCount = displayMap.reduce((acc, u) => {
      return acc + (u.lessons?.filter(l => completedLessons.includes(`${rawiId}-${u.id}-${l.id}`)).length || 0);
    }, 0);
    
    const isThisLessonCompleted = completedLessons.includes(`${rawiId}-${unitId}-${lessonId}`);
    const completedOtherLessons = completedCount - (isThisLessonCompleted ? 1 : 0);
    const canAccessLesson = role === 'admin' || completedOtherLessons >= totalLessons - 2;
    
    if (!canAccessLesson) {
      content = (
        <div className="bg-navy-950/80 p-8 rounded-2xl border border-red-500/30 text-center max-w-2xl mx-auto shadow-2xl">
          <Lock className="w-16 h-16 mx-auto text-red-500 mb-4" />
          <h2 className="text-2xl font-bold text-white mb-4">القسم مقفل</h2>
          <p className="text-navy-300">يجب عليك إتمام جميع الدروس والاختبارات القصيرة السابقة أولاً.</p>
          <Link to={courseBaseUrl} className="mt-6 inline-block bg-navy-800 text-white px-6 py-2 rounded-xl hover:bg-navy-700 transition">
            العودة للمسار
          </Link>
        </div>
      );
    } else {
      if (lessonId === 'final-quiz') {
        content = <ComprehensiveQuiz onComplete={handleMarkCompleteAndContinue} />;
      } else {
        content = <QuranicLab />;
      }
    }
  }

  return (
    <div className="max-w-4xl mx-auto pb-20 animate-in fade-in duration-500">
      
      {/* Top Breadcrumb and Header */}
      <div className="mb-6">
        <div className="text-sm font-bold text-gold-600 mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to={courseBaseUrl} className="hover:underline">المسار</Link>
            <span>/</span>
            <span>{unit.title}</span>
          </div>

          {/* Quick Edit Action button */}
          <div className="flex items-center gap-2">
            {role === 'admin' ? (
              <button
                onClick={() => setIsEditorOpen(true)}
                className="bg-gold-500 hover:bg-gold-400 text-navy-950 px-4 py-1.5 rounded-xl font-bold text-xs md:text-sm flex items-center gap-2 transition shadow-md hover:scale-105 transform"
                title="تعديل وتصحيح المادة العلمية لهذا الدرس"
              >
                <Edit3 className="w-4 h-4" />
                تعديل المادة العلمية
              </button>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="bg-navy-800 hover:bg-navy-700 text-gold-400 border border-gold-500/30 hover:border-gold-500/60 px-3.5 py-1.5 rounded-xl font-bold text-xs md:text-sm flex items-center gap-2 transition shadow-sm"
                title="تسجيل الدخول كمعلم / مشرف لتعديل المادة العلمية"
              >
                <Shield className="w-4 h-4 text-gold-400" />
                تعديل المادة العلمية (للمشرف)
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight flex items-center gap-3">
              {lesson.title}
            </h1>
            {customLessonData && (
              <div className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5" />
                مادة علمية معتمدة ومراجعة من المشرف
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 shrink-0">
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

      {/* Embedded Progress Tracking Widget for the Lesson & Unit */}
      <LessonProgressTracker
        qariId={qariId || 'nafi'}
        rawiId={rawiId || 'warsh'}
        tariqId={tariqId || 'shatibiyyah'}
        unitId={unitId || 'unit-0'}
        currentLessonId={lessonId || ''}
      />

      {/* Admin Broadcast Note if exists */}
      {adminNote && (
        <div className="mb-6 bg-gradient-to-l from-navy-900 via-navy-800 to-navy-900 border-r-4 border-gold-500 p-5 rounded-xl shadow-lg flex items-start gap-4">
          <Sparkles className="w-6 h-6 text-gold-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="text-gold-300 block text-sm font-bold">توجيه وإفادة من المشرف العام:</strong>
            <p className="text-navy-100 text-base leading-relaxed">{adminNote}</p>
          </div>
        </div>
      )}

      {/* Main Educational Material Content Container */}
      <div className="bg-navy-950/50 p-6 md:p-10 rounded-2xl border border-navy-800 shadow-xl backdrop-blur-sm relative">
        {role === 'admin' && (
          <div className="absolute top-4 left-4">
            <button
              onClick={() => setIsEditorOpen(true)}
              className="p-2 bg-navy-900/90 hover:bg-gold-500 hover:text-navy-950 text-gold-400 rounded-lg border border-gold-500/30 transition shadow"
              title="تعديل المادة العلمية"
            >
              <Edit3 className="w-4 h-4" />
            </button>
          </div>
        )}
        
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

      {/* Personal Notes Section */}
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

      {/* Educational Content Editor Modal */}
      <LessonEditorModal
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        rawiId={rawiId || 'warsh'}
        unitId={unitId || 'unit-0'}
        lessonId={lessonId || ''}
        lessonTitle={lesson.title}
        onSaved={(newContent) => {
          showToast('تم تحديث المادة العلمية واعتمادها بنجاح!', 'success');
        }}
      />

      {/* Quick Admin Auth Modal for Teachers/Sheikhs */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm animate-in fade-in" dir="rtl">
          <div className="bg-navy-900 border border-navy-700 p-6 md:p-8 rounded-2xl shadow-2xl max-w-md w-full relative">
            <button
              onClick={() => {
                setShowAuthModal(false);
                setAuthError('');
              }}
              className="absolute top-4 left-4 text-navy-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gold-500/20 text-gold-400 rounded-xl border border-gold-500/30">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">صلاحية تعديل المادة العلمية</h3>
                <p className="text-xs text-navy-300">مخصص للمشرفين وشيوخ الإقراء</p>
              </div>
            </div>

            <p className="text-navy-200 text-sm mb-4 leading-relaxed">
              أدخل كلمة مرور الإدارة لتفعيل وضع المشرف وتصحيح المادة العلمية لهذا الدرس مباشرة:
            </p>

            <form onSubmit={handleAdminAuthSubmit} className="space-y-4">
              <div>
                <input
                  type="password"
                  placeholder="كلمة مرور الإدارة (الافتراضية: admin123)"
                  value={adminPasswordInput}
                  onChange={(e) => setAdminPasswordInput(e.target.value)}
                  className="w-full bg-navy-950 border border-navy-700 text-white p-3.5 rounded-xl text-center focus:border-gold-500 outline-none text-base font-mono"
                  autoFocus
                  required
                />
              </div>

              {authError && (
                <div className="text-xs font-bold text-red-300 bg-red-500/10 border border-red-500/20 p-2.5 rounded-lg flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold py-3.5 rounded-xl shadow-lg transition flex items-center justify-center gap-2"
              >
                <Key className="w-4 h-4" />
                تأكيد ودخول وضع التعديل
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
