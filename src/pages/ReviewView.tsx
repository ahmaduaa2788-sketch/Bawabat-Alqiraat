import React, { useState } from 'react';
import { useReview, MistakeItem } from '../context/ReviewContext';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, XCircle, AlertCircle, RotateCcw, Award, 
  BookOpen, Sparkles, Trash2, ArrowRight, ArrowLeft, Filter, Check, Eye
} from 'lucide-react';
import { useToast } from '../context/ToastContext';

export function ReviewView() {
  const { 
    mistakes, 
    unmasteredMistakes, 
    masteredCount, 
    totalMistakesCount, 
    markMastered, 
    unmarkMastered, 
    removeMistake, 
    clearAllMistakes 
  } = useReview();

  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'practice' | 'list'>('practice');
  const [filterMode, setFilterMode] = useState<'unmastered' | 'all'>('unmastered');
  
  // Practice session state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [sessionCompleted, setSessionCompleted] = useState(false);
  const [sessionCorrectCount, setSessionCorrectCount] = useState(0);

  const displayedList = filterMode === 'unmastered' ? unmasteredMistakes : Object.values(mistakes);
  const currentQuestion: MistakeItem | undefined = displayedList[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (hasAnswered) return;
    setSelectedOption(idx);
    setHasAnswered(true);

    if (currentQuestion && idx === currentQuestion.correctAnswer) {
      setSessionCorrectCount(prev => prev + 1);
      markMastered(currentQuestion.id);
      showToast('أحسنت! إجابة صحيحة وتم اعتماد إتقان السؤال.', 'success');
    } else {
      showToast('إجابة غير دقيقة. اقرأ الشرح والتعليل التجويدي أدناه.', 'info');
    }
  };

  const handleNext = () => {
    if (currentIndex < displayedList.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setHasAnswered(false);
    } else {
      setSessionCompleted(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setSelectedOption(null);
      setHasAnswered(false);
    }
  };

  const restartPractice = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setHasAnswered(false);
    setSessionCompleted(false);
    setSessionCorrectCount(0);
  };

  const masteryPercent = totalMistakesCount > 0 
    ? Math.round((masteredCount / totalMistakesCount) * 100) 
    : 100;

  return (
    <div className="max-w-4xl mx-auto pb-20 animate-in fade-in duration-500" dir="rtl">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-navy-900 via-navy-950 to-navy-900 border border-navy-800 rounded-3xl p-6 md:p-10 mb-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-500/10 border border-gold-500/20 text-gold-400 rounded-full text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              نظام التثبيت والتمكين العلمي
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-wide">
              وضع مراجعة الأخطاء (Review Mode)
            </h1>
            <p className="text-navy-300 mt-2 text-sm md:text-base leading-relaxed">
              يقوم هذا النظام برصد أي مسألة أو سؤال أخطأت فيه سابقاً في الاختبارات تلقائياً، وتخصيص جلسة علاجية للتركيز عليها وتثبيتها.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link 
              to="/" 
              className="bg-navy-800 hover:bg-navy-700 text-navy-200 hover:text-white px-5 py-2.5 rounded-xl font-bold text-sm transition border border-navy-700"
            >
              الرئيسية
            </Link>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-navy-800/80">
          <div className="bg-navy-900/60 p-4 rounded-2xl border border-navy-800">
            <span className="text-xs text-navy-400 block mb-1">إجمالي الأسئلة المسجلة</span>
            <span className="text-2xl font-black text-white">{totalMistakesCount}</span>
          </div>

          <div className="bg-navy-900/60 p-4 rounded-2xl border border-navy-800">
            <span className="text-xs text-gold-400 block mb-1">بانتظار المراجعة</span>
            <span className="text-2xl font-black text-gold-400">{unmasteredMistakes.length}</span>
          </div>

          <div className="bg-navy-900/60 p-4 rounded-2xl border border-navy-800">
            <span className="text-xs text-emerald-400 block mb-1">تم إتقانها بنجاح</span>
            <span className="text-2xl font-black text-emerald-400">{masteredCount}</span>
          </div>

          <div className="bg-navy-900/60 p-4 rounded-2xl border border-navy-800">
            <span className="text-xs text-cyan-400 block mb-1">نسبة التمكين والتعافي</span>
            <span className="text-2xl font-black text-cyan-400">{masteryPercent}%</span>
          </div>
        </div>
      </div>

      {/* Tabs and Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex bg-navy-900 p-1.5 rounded-2xl border border-navy-800">
          <button
            onClick={() => {
              setActiveTab('practice');
              restartPractice();
            }}
            className={`px-5 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition ${
              activeTab === 'practice'
                ? 'bg-gold-500 text-navy-950 shadow-md'
                : 'text-navy-300 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" /> جلسة التدريب التفاعلية
          </button>

          <button
            onClick={() => setActiveTab('list')}
            className={`px-5 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition ${
              activeTab === 'list'
                ? 'bg-gold-500 text-navy-950 shadow-md'
                : 'text-navy-300 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" /> بنك المسائل المسجلة ({displayedList.length})
          </button>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex bg-navy-950 p-1 rounded-xl border border-navy-800 text-xs">
            <button
              onClick={() => {
                setFilterMode('unmastered');
                restartPractice();
              }}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${
                filterMode === 'unmastered'
                  ? 'bg-navy-800 text-gold-400'
                  : 'text-navy-400 hover:text-white'
              }`}
            >
              غير المتقنة ({unmasteredMistakes.length})
            </button>
            <button
              onClick={() => {
                setFilterMode('all');
                restartPractice();
              }}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${
                filterMode === 'all'
                  ? 'bg-navy-800 text-gold-400'
                  : 'text-navy-400 hover:text-white'
              }`}
            >
              الكل ({totalMistakesCount})
            </button>
          </div>

          {totalMistakesCount > 0 && (
            <button
              onClick={() => {
                if (window.confirm('هل أنت متأكد من مسح جميع سجلات الأخطاء؟')) {
                  clearAllMistakes();
                  showToast('تم مسح سجل الأخطاء بنجاح.', 'info');
                }
              }}
              className="p-2 text-navy-400 hover:text-red-400 hover:bg-navy-800 rounded-xl transition"
              title="تفريغ سجل الأخطاء"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      {displayedList.length === 0 ? (
        /* Empty State */
        <div className="bg-navy-900/60 border border-navy-800 rounded-3xl p-12 text-center shadow-xl space-y-4">
          <div className="w-20 h-20 bg-emerald-500/10 border-2 border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-white">
            ما شاء الله تبارك الله! لا توجد أخطاء مسجلة حالياً
          </h2>
          <p className="text-navy-300 max-w-md mx-auto text-sm leading-relaxed">
            {filterMode === 'unmastered' && totalMistakesCount > 0 
              ? 'لقد قمت بإتقان جميع المسائل التي أخطأت فيها سابقاً! يمكنك استعراض الكل أو متابعة دراسة باقي الأبواب.'
              : 'سجلك نظيف ومتقن! عندما تؤدي اختبارات الأبواب وتخطئ في أي سؤال سيتم جلبه هنا فوراً لمراجعته.'}
          </p>
          <div className="pt-4 flex justify-center gap-3">
            <Link
              to="/course/nafi/warsh/shatibiyyah"
              className="bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold px-6 py-3 rounded-xl transition shadow-lg"
            >
              متابعة دراسة الأبواب
            </Link>
          </div>
        </div>
      ) : activeTab === 'practice' ? (
        /* Interactive Practice Session */
        sessionCompleted ? (
          <div className="bg-navy-900 border border-navy-800 rounded-3xl p-8 md:p-12 text-center shadow-2xl space-y-6 animate-in zoom-in-95">
            <div className="w-24 h-24 bg-gold-500/20 border-2 border-gold-500/40 text-gold-400 rounded-full flex items-center justify-center mx-auto">
              <Award className="w-12 h-12" />
            </div>
            <h2 className="text-3xl font-bold text-white">اكتملت الجلسة التدريبية بنجاح!</h2>
            <p className="text-navy-300 text-lg">
              أجبت إجابة صحيحة على <strong className="text-gold-400">{sessionCorrectCount}</strong> من أصل{' '}
              <strong className="text-white">{displayedList.length}</strong> مسألة تمت مراجعتها.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <button
                onClick={restartPractice}
                className="bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold px-8 py-3.5 rounded-xl shadow-lg transition flex items-center gap-2"
              >
                <RotateCcw className="w-5 h-5" /> إعادة الجلسة التدريبية
              </button>
              <button
                onClick={() => setActiveTab('list')}
                className="bg-navy-800 hover:bg-navy-700 text-white font-bold px-8 py-3.5 rounded-xl border border-navy-700 transition"
              >
                عرض قائمة المسائل
              </button>
            </div>
          </div>
        ) : currentQuestion ? (
          <div className="bg-navy-900/90 border border-navy-800 rounded-3xl p-6 md:p-10 shadow-2xl space-y-6">
            
            {/* Question Progress Header */}
            <div className="flex justify-between items-center pb-4 border-b border-navy-800">
              <div className="flex items-center gap-2 text-xs md:text-sm font-bold text-gold-400">
                <span className="px-2.5 py-1 bg-gold-500/15 border border-gold-500/30 rounded-lg">
                  مسألة {currentIndex + 1} من {displayedList.length}
                </span>
                <span className="text-navy-400">|</span>
                <span className="text-navy-300">{currentQuestion.sourceQuiz}</span>
              </div>

              <div className="flex items-center gap-2">
                {currentQuestion.mastered ? (
                  <span className="text-xs bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> تم التمكين سابقاً
                  </span>
                ) : (
                  <span className="text-xs bg-red-500/15 text-red-300 border border-red-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> أخطأت فيها {currentQuestion.timesWrong} {currentQuestion.timesWrong === 1 ? 'مرة' : 'مرات'}
                  </span>
                )}
              </div>
            </div>

            {/* Question Prompt */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white leading-relaxed">
                {currentQuestion.question}
              </h2>
            </div>

            {/* Options */}
            <div className="space-y-3 pt-2">
              {currentQuestion.options.map((option, idx) => {
                const isCorrect = idx === currentQuestion.correctAnswer;
                const isSelected = selectedOption === idx;

                let btnStyle = "bg-navy-950 hover:bg-navy-800/80 border-navy-700 text-navy-100";

                if (hasAnswered) {
                  if (isCorrect) {
                    btnStyle = "bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.2)]";
                  } else if (isSelected && !isCorrect) {
                    btnStyle = "bg-red-950/80 border-red-500 text-red-200";
                  } else {
                    btnStyle = "bg-navy-950/40 border-navy-800 text-navy-500 opacity-60";
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={hasAnswered}
                    className={`w-full text-right p-4 rounded-2xl border transition flex items-center justify-between gap-4 text-base md:text-lg font-medium ${btnStyle}`}
                  >
                    <span>{option}</span>
                    {hasAnswered && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    )}
                    {hasAnswered && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation & Rule Callout */}
            {hasAnswered && (
              <div className="mt-6 p-5 rounded-2xl bg-gradient-to-l from-navy-950 via-navy-900 to-navy-950 border border-gold-500/30 animate-in fade-in">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-gold-400 font-bold flex items-center gap-2 text-base">
                    <Sparkles className="w-4 h-4" />
                    التعليل والتوجيه التجويدي المعتمد:
                  </h4>
                  <button
                    onClick={() => {
                      if (currentQuestion.mastered) {
                        unmarkMastered(currentQuestion.id);
                        showToast('تم إلغاء حالة التمكين', 'info');
                      } else {
                        markMastered(currentQuestion.id);
                        showToast('تم تمييز المسألة كمتقنة!', 'success');
                      }
                    }}
                    className={`text-xs px-3 py-1 rounded-lg font-bold border transition flex items-center gap-1 ${
                      currentQuestion.mastered 
                        ? 'bg-navy-800 text-navy-300 border-navy-700' 
                        : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    }`}
                  >
                    <Check className="w-3 h-3" />
                    {currentQuestion.mastered ? 'إلغاء التمكين' : 'اعتماد كمسألة متقنة'}
                  </button>
                </div>
                <p className="text-white text-base md:text-lg leading-relaxed font-serif">
                  {currentQuestion.explanation}
                </p>
              </div>
            )}

            {/* Navigation Actions */}
            <div className="pt-6 border-t border-navy-800 flex justify-between items-center">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="px-5 py-2.5 rounded-xl border border-navy-700 text-navy-300 hover:text-white hover:bg-navy-800 transition disabled:opacity-40 font-bold flex items-center gap-2"
              >
                <ArrowRight className="w-4 h-4" /> السابق
              </button>

              <button
                onClick={handleNext}
                disabled={!hasAnswered}
                className="px-7 py-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold transition shadow-lg disabled:opacity-40 flex items-center gap-2"
              >
                {currentIndex === displayedList.length - 1 ? 'إنهاء الجلسة' : 'المسألة التالية'}
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>

          </div>
        ) : null
      ) : (
        /* List Mode */
        <div className="space-y-4">
          {displayedList.map((item, index) => (
            <div
              key={item.id || index}
              className="bg-navy-900 border border-navy-800 rounded-2xl p-5 md:p-6 shadow-md transition hover:border-gold-500/30"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-gold-500/20 text-gold-400 font-mono text-xs flex items-center justify-center font-bold">
                    {index + 1}
                  </span>
                  <span className="text-xs text-navy-400">{item.sourceQuiz}</span>
                </div>

                <div className="flex items-center gap-2">
                  {item.mastered ? (
                    <button
                      onClick={() => unmarkMastered(item.id)}
                      className="text-xs bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 px-2.5 py-1 rounded-lg font-bold flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" /> متقن
                    </button>
                  ) : (
                    <button
                      onClick={() => markMastered(item.id)}
                      className="text-xs bg-navy-800 text-navy-300 hover:text-white border border-navy-700 px-2.5 py-1 rounded-lg font-bold flex items-center gap-1"
                    >
                      تحديد كمتقن
                    </button>
                  )}

                  <button
                    onClick={() => removeMistake(item.id)}
                    className="p-1.5 text-navy-500 hover:text-red-400 transition"
                    title="حذف من السجل"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <h3 className="text-lg font-bold text-white mb-3">
                {item.question}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                {item.options.map((opt, oIdx) => (
                  <div
                    key={oIdx}
                    className={`p-2.5 rounded-xl text-sm border ${
                      oIdx === item.correctAnswer 
                        ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-300 font-bold'
                        : 'bg-navy-950 border-navy-800 text-navy-400'
                    }`}
                  >
                    {opt}
                  </div>
                ))}
              </div>

              <div className="bg-navy-950/70 p-3 rounded-xl border border-navy-800 text-xs md:text-sm text-navy-300 font-serif leading-relaxed">
                <strong className="text-gold-400 block mb-1">التعليل:</strong>
                {item.explanation}
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
