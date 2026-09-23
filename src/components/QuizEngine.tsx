import React, { useState } from 'react';
import { CheckCircle2, XCircle, ArrowLeft, RefreshCw, Trophy, Sparkles, BookOpen, AlertCircle } from 'lucide-react';
import { useReview } from '../context/ReviewContext';
import { Link } from 'react-router-dom';

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizEngineProps {
  quizId: string;
  title: string;
  rawiId?: string;
  unitId?: string;
  questions: QuizQuestion[];
  onComplete: () => void;
}

export function QuizEngine({
  quizId,
  title,
  rawiId = 'warsh',
  unitId,
  questions,
  onComplete
}: QuizEngineProps) {
  const { recordMistake } = useReview();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [wrongQuestionsCount, setWrongQuestionsCount] = useState(0);

  const q = questions[currentQuestion];

  const handleSelect = (index: number) => {
    if (isSubmitted) return;
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    setIsSubmitted(true);

    const isCorrect = selectedAnswer === q.correctAnswer;
    if (isCorrect) {
      setScore(s => s + 1);
    } else {
      setWrongQuestionsCount(w => w + 1);
      // Automatically log to Review Mode
      recordMistake({
        id: `${quizId}-q${currentQuestion}`,
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
        userAnswer: selectedAnswer,
        sourceQuiz: title,
        rawiId,
        unitId
      });
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(c => c + 1);
      setSelectedAnswer(null);
      setIsSubmitted(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setIsSubmitted(false);
    setScore(0);
    setQuizFinished(false);
    setWrongQuestionsCount(0);
  };

  if (quizFinished) {
    const percentage = Math.round((score / questions.length) * 100);
    const passed = percentage >= 70;

    return (
      <div className="bg-navy-900 border border-navy-800 rounded-3xl p-8 md:p-12 text-center max-w-2xl mx-auto shadow-2xl animate-in zoom-in-95" dir="rtl">
        <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 border-2 ${
          passed 
            ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' 
            : 'bg-gold-500/10 border-gold-500 text-gold-400'
        }`}>
          {passed ? <Trophy className="w-12 h-12" /> : <RefreshCw className="w-12 h-12" />}
        </div>

        <h2 className="text-3xl font-black text-white mb-2">
          {passed ? 'هنيئاً لك! اجتزت الاختبار بنجاح' : 'تحتاج لمراجعة بعض المسائل'}
        </h2>
        
        <p className="text-navy-300 mb-6 text-base">
          حصلت على <strong className="text-gold-400 text-xl font-mono">{score}</strong> من أصل{' '}
          <strong className="text-white text-xl font-mono">{questions.length}</strong> ({percentage}%)
        </p>

        {wrongQuestionsCount > 0 && (
          <div className="bg-navy-950/80 border border-gold-500/30 rounded-2xl p-5 mb-8 text-right space-y-3">
            <div className="flex items-center gap-2 text-gold-400 font-bold text-sm">
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>تم رصد {wrongQuestionsCount} مسألة غير صحيحة وإضافتها لوضع المراجعة:</span>
            </div>
            <p className="text-xs text-navy-300 leading-relaxed">
              يمكنك الآن التوجه مباشرة لـ <strong className="text-white">وضع المراجعة (Review Mode)</strong> لخوض جلسة تدريبية مخصصة للتركيز على هذه المسائل وتثبيتها.
            </p>
            <Link
              to="/review"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gold-500/20 hover:bg-gold-500/30 text-gold-300 border border-gold-500/40 rounded-xl text-xs font-bold transition"
            >
              <span>الذهاب لوضع مراجعة الأخطاء</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}

        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={handleRestart}
            className="flex items-center gap-2 bg-navy-800 hover:bg-navy-700 text-white px-6 py-3.5 rounded-xl transition border border-navy-700 font-bold text-sm"
          >
            <RefreshCw className="w-4 h-4" />
            إعادة الاختبار
          </button>

          <button
            onClick={onComplete}
            className="flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-950 px-8 py-3.5 rounded-xl transition font-bold shadow-lg text-sm shadow-gold-500/10"
          >
            {passed ? 'إتمام ومتابعة المسار' : 'متابعة الدرس'}
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-navy-900 border border-navy-800 rounded-3xl p-6 md:p-10 shadow-2xl max-w-3xl mx-auto space-y-6" dir="rtl">
      
      {/* Progress & Header */}
      <div className="flex justify-between items-center pb-4 border-b border-navy-800">
        <div className="flex items-center gap-2 text-xs md:text-sm font-bold text-gold-400">
          <span className="px-2.5 py-1 bg-gold-500/15 border border-gold-500/30 rounded-lg">
            سؤال {currentQuestion + 1} من {questions.length}
          </span>
          <span className="text-navy-400">|</span>
          <span className="text-navy-300">{title}</span>
        </div>

        <div className="text-xs text-navy-400 font-mono">
          النتيجة الحالية: <span className="text-gold-400 font-bold">{score}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-navy-950 h-2 rounded-full overflow-hidden border border-navy-800">
        <div
          className="bg-gold-500 h-full transition-all duration-300"
          style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question Text */}
      <div>
        <h3 className="text-xl md:text-2xl font-bold text-white leading-relaxed">
          {q.question}
        </h3>
      </div>

      {/* Options */}
      <div className="space-y-3 pt-2">
        {q.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrect = index === q.correctAnswer;

          let btnClass = "bg-navy-950 hover:bg-navy-800/80 border-navy-700 text-navy-100";

          if (isSubmitted) {
            if (isCorrect) {
              btnClass = "bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.2)]";
            } else if (isSelected && !isCorrect) {
              btnClass = "bg-red-950/80 border-red-500 text-red-200";
            } else {
              btnClass = "bg-navy-950/40 border-navy-800 text-navy-500 opacity-60";
            }
          } else if (isSelected) {
            btnClass = "bg-navy-800 border-gold-500 text-white shadow-md";
          }

          return (
            <button
              key={index}
              onClick={() => handleSelect(index)}
              disabled={isSubmitted}
              className={`w-full text-right p-4 rounded-2xl border transition flex items-center justify-between gap-4 text-base md:text-lg font-medium ${btnClass}`}
            >
              <span>{option}</span>
              {isSubmitted && isCorrect && (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              )}
              {isSubmitted && isSelected && !isCorrect && (
                <XCircle className="w-5 h-5 text-red-400 shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation Box after Submit */}
      {isSubmitted && (
        <div className="mt-6 p-5 rounded-2xl bg-gradient-to-l from-navy-950 via-navy-900 to-navy-950 border border-gold-500/30 animate-in fade-in">
          <h4 className="text-gold-400 font-bold flex items-center gap-2 mb-2 text-sm md:text-base">
            <BookOpen className="w-4 h-4" />
            التوجيه والتعليل التجويدي:
          </h4>
          <p className="text-white text-base md:text-lg leading-relaxed font-serif">
            {q.explanation}
          </p>
        </div>
      )}

      {/* Action Footer */}
      <div className="pt-6 border-t border-navy-800 flex justify-end">
        {!isSubmitted ? (
          <button
            onClick={handleSubmit}
            disabled={selectedAnswer === null}
            className="bg-gold-500 hover:bg-gold-400 disabled:opacity-40 disabled:hover:bg-gold-500 text-navy-950 px-8 py-3.5 rounded-xl font-bold transition shadow-lg text-base"
          >
            تأكيد الإجابة
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="bg-gold-500 hover:bg-gold-400 text-navy-950 px-8 py-3.5 rounded-xl font-bold transition shadow-lg flex items-center gap-2 text-base"
          >
            {currentQuestion < questions.length - 1 ? 'السؤال التالي' : 'عرض النتيجة النهائية'}
            <ArrowLeft className="w-4 h-4" />
          </button>
        )}
      </div>

    </div>
  );
}
