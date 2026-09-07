import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, ArrowLeft, RefreshCw, Trophy } from 'lucide-react';
import { questionBank as defaultQuestionBank, Question } from '../data/questionsBank';
import { db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

// Fisher-Yates shuffle
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export function ComprehensiveQuiz({ onComplete }: { onComplete: () => void }) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const [allQuestions, setAllQuestions] = useState<Question[]>(defaultQuestionBank);
  const QUESTION_COUNT = 40;

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const docRef = doc(db, 'content', 'questions');
        const docSnap = await getDoc(docRef);
        let loadedQuestions = defaultQuestionBank;
        if (docSnap.exists() && docSnap.data().questions) {
          loadedQuestions = docSnap.data().questions;
        }
        setAllQuestions(loadedQuestions);
        const shuffled = shuffleArray(loadedQuestions);
        const selected = shuffled.slice(0, QUESTION_COUNT);
        setQuestions(selected);
      } catch (err) {
        console.error(err);
        const shuffled = shuffleArray(defaultQuestionBank);
        const selected = shuffled.slice(0, QUESTION_COUNT);
        setQuestions(selected);
      }
    };
    loadQuestions();
  }, []);

  const handleAnswerClick = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);
    
    if (index === questions[currentQuestion].correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizFinished(true);
    }
  };

  const resetQuiz = () => {
    const shuffled = shuffleArray(allQuestions);
    const selected = shuffled.slice(0, QUESTION_COUNT);
    setQuestions(selected);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizFinished(false);
  };

  if (questions.length === 0) return <div>جاري تجهيز الأسئلة...</div>;

  if (quizFinished) {
    const isPassing = score >= 35;
    const earnsCertificate = score >= 38;
    return (
      <div className="bg-navy-950/80 p-8 rounded-2xl border border-navy-800 text-center max-w-2xl mx-auto shadow-2xl backdrop-blur-sm animate-in zoom-in duration-500">
        <Trophy className={`w-20 h-20 mx-auto mb-6 ${isPassing ? 'text-gold-400' : 'text-navy-400'}`} />
        <h2 className="text-3xl font-bold text-white mb-4">نتيجة الاختبار الشامل</h2>
        <p className="text-2xl mb-8">
          <span className={isPassing ? 'text-green-400 font-bold' : 'text-gold-400 font-bold'}>
            {score}
          </span>
          <span className="text-navy-300 mx-2">من</span>
          <span className="text-white font-bold">{questions.length}</span>
        </p>
        
        {isPassing ? (
          <div className="space-y-6">
            <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-xl text-green-400">
              أحسنت! لقد اجتزت الاختبار الشامل بنجاح وأثبت إتقانك لأصول ورش.
            </div>
            {earnsCertificate ? (
              <div className="bg-gold-500/20 border border-gold-500/40 p-4 rounded-xl text-gold-400 font-bold">
                🎉 مبروك! نتيجة ممتازة تؤهلك للحصول على الإجازة/الشهادة (38 فأكثر).
              </div>
            ) : (
              <div className="bg-navy-800 border border-navy-700 p-4 rounded-xl text-navy-300 text-sm">
                ملاحظة: لإصدار الشهادة، يجب الحصول على 38 درجة فأكثر. يمكنك إعادة الاختبار لتحسين النتيجة.
              </div>
            )}
            <button 
              onClick={onComplete}
              className="bg-gold-500 text-navy-950 font-bold px-8 py-3 rounded-xl hover:bg-gold-400 transition w-full shadow-lg shadow-gold-500/20"
            >
              العودة للرئيسية
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-xl text-red-400">
              تحتاج إلى 35 من 40 على الأقل لاجتياز الاختبار. يمكنك مراجعة الأبواب والمحاولة مرة أخرى.
            </div>
            <button 
              onClick={resetQuiz}
              className="flex items-center justify-center gap-2 bg-navy-800 text-white font-bold px-8 py-3 rounded-xl hover:bg-navy-700 transition w-full"
            >
              <RefreshCw className="w-5 h-5" /> إعادة الاختبار الشامل بأسئلة جديدة
            </button>
          </div>
        )}
      </div>
    );
  }

  const question = questions[currentQuestion];
  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <div className="bg-navy-900/50 p-6 md:p-10 rounded-2xl border border-navy-800 shadow-xl max-w-3xl mx-auto backdrop-blur-sm relative overflow-hidden">
      <div className="flex justify-between items-center mb-8 border-b border-navy-800 pb-4">
        <h2 className="text-2xl font-bold text-white">الاختبار الشامل لأصول ورش</h2>
        <div className="text-gold-400 font-bold font-mono bg-navy-950 px-4 py-1.5 rounded-lg border border-navy-800">
          {currentQuestion + 1} / {questions.length}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl md:text-2xl text-white leading-relaxed font-semibold">
          {question.question}
        </h3>
      </div>

      <div className="space-y-3 mb-8">
        {question.options.map((option, index) => {
          let buttonClass = "w-full text-right p-4 rounded-xl border transition-all text-lg font-medium ";
          
          if (!showResult) {
            buttonClass += selectedAnswer === index 
              ? "bg-navy-800 border-gold-500 text-white shadow-[0_0_15px_rgba(212,175,55,0.1)]" 
              : "bg-navy-950/50 border-navy-700 text-navy-200 hover:bg-navy-800 hover:border-navy-600";
          } else {
            if (index === question.correctAnswer) {
              buttonClass += "bg-green-500/20 border-green-500 text-green-300 shadow-[0_0_15px_rgba(34,197,94,0.1)]";
            } else if (index === selectedAnswer) {
              buttonClass += "bg-red-500/20 border-red-500 text-red-300";
            } else {
              buttonClass += "bg-navy-950/50 border-navy-800 text-navy-400 opacity-50";
            }
          }

          return (
            <button
              key={index}
              onClick={() => handleAnswerClick(index)}
              disabled={showResult}
              className={buttonClass}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {showResult && index === question.correctAnswer && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                {showResult && index === selectedAnswer && index !== question.correctAnswer && <XCircle className="w-5 h-5 text-red-500" />}
              </div>
            </button>
          );
        })}
      </div>

      {showResult && (
        <div className={`p-5 rounded-xl mb-8 border animate-in slide-in-from-bottom-2 ${isCorrect ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
          <div className="flex items-start gap-3">
            {isCorrect ? <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-0.5" /> : <XCircle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />}
            <div>
              <h4 className={`font-bold mb-1 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                {isCorrect ? 'إجابة صحيحة!' : 'إجابة خاطئة'}
              </h4>
              <p className="text-navy-200 leading-relaxed text-sm">
                {question.explanation}
              </p>
            </div>
          </div>
        </div>
      )}

      {showResult && (
        <button
          onClick={handleNextQuestion}
          className="flex items-center justify-center gap-2 bg-gold-500 text-navy-950 font-bold px-8 py-3 rounded-xl hover:bg-gold-400 transition w-full shadow-lg shadow-gold-500/20"
        >
          {currentQuestion < questions.length - 1 ? 'السؤال التالي' : 'إنهاء الاختبار'}
          <ArrowLeft className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
