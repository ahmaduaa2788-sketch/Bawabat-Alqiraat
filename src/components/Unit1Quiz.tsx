import React, { useState } from 'react';
import { CheckCircle2, XCircle, ArrowLeft, RefreshCw, Trophy } from 'lucide-react';

const questions = [
  {
    question: "ما هو مقدار مد المتصل والمنفصل لورش من طريق الشاطبية؟",
    options: ["التوسط (4 حركات)", "القصر (حركتان)", "الإشباع (6 حركات)", "التوسط والإشباع"],
    correctAnswer: 2,
    explanation: "يقرأ ورش بإشباع (تطويل) المد المتصل والمنفصل بمقدار 6 حركات قولاً واحداً."
  },
  {
    question: "أي من الكلمات التالية يُستثنى من جواز الأوجه الثلاثة في البدل ويُقرأ بالقصر فقط لورش؟",
    options: ["ءَامَنُواْ", "قُرۡءَان", "أُوتُواْ", "إِيمَٰنًا"],
    correctAnswer: 1,
    explanation: "كلمة (قرآن) مستثناة لأن الهمز سبق بساكن صحيح متصل."
  },
  {
    question: "ما هو مقدار مد اللين المهموز لورش من طريق الشاطبية؟",
    options: ["القصر والتوسط (2، 4)", "التوسط والإشباع (4، 6)", "الإشباع فقط (6)", "التوسط فقط (4)"],
    correctAnswer: 1,
    explanation: "يقرأ ورش مد اللين المهموز بوجهين: التوسط (4) والإشباع (6)."
  },
  {
    question: "إذا قرأت لورش بتوسط البدل (4 حركات)، فما هو الوجه الجائز في اللين المهموز؟",
    options: ["الإشباع فقط (6)", "التوسط والإشباع (4، 6)", "القصر (2)", "التوسط فقط (4)"],
    correctAnswer: 3,
    explanation: "على توسط البدل (4)، يتعين توسط اللين المهموز (4)."
  }
];

export function Unit1Quiz({ onComplete }: { onComplete: () => void }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleSelect = (index: number) => {
    if (isSubmitted) return;
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    setIsSubmitted(true);
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(s => s + 1);
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

  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setIsSubmitted(false);
    setScore(0);
    setQuizFinished(false);
  };

  if (quizFinished) {
    const isPassing = score === questions.length;
    
    return (
      <div className="bg-navy-800/80 p-8 rounded-2xl border border-navy-700 text-center max-w-2xl mx-auto shadow-xl backdrop-blur-sm animate-in zoom-in-95 duration-500">
        <div className="inline-flex justify-center items-center w-20 h-20 bg-navy-950 rounded-full mb-6 border border-gold-500/30 shadow-lg shadow-gold-500/20">
          <Trophy className={`w-10 h-10 ${isPassing ? 'text-gold-500' : 'text-navy-500'}`} />
        </div>
        <h2 className="text-3xl font-bold text-white mb-4">نتيجة الاختبار</h2>
        <p className="text-xl text-navy-200 mb-6">
          لقد أجبت بشكل صحيح على <span className="font-bold text-gold-400 text-2xl mx-1">{score}</span> من <span className="font-bold text-white mx-1">{questions.length}</span>
        </p>
        
        {isPassing ? (
          <div className="bg-green-500/10 border border-green-500/30 text-green-400 p-4 rounded-xl mb-8 flex items-center justify-center gap-2">
            <CheckCircle2 className="w-6 h-6" />
            <span className="font-bold text-lg">أحسنت! لقد أتممت هذا الباب بنجاح.</span>
          </div>
        ) : (
          <div className="bg-navy-900/80 border border-navy-700 text-navy-300 p-4 rounded-xl mb-8 flex items-center justify-center gap-2">
            <RefreshCw className="w-6 h-6" />
            <span className="font-bold text-lg">ننصحك بمراجعة الباب وإعادة الاختبار.</span>
          </div>
        )}

        <div className="flex gap-4 justify-center">
          {!isPassing && (
            <button 
              onClick={handleRetry}
              className="inline-flex items-center gap-2 bg-navy-700 text-white px-6 py-3 rounded-xl font-bold hover:bg-navy-600 transition shadow-md"
            >
              <RefreshCw className="w-5 h-5" />
              إعادة الاختبار
            </button>
          )}
          <button 
            onClick={onComplete}
            className="inline-flex items-center gap-2 bg-gold-500 text-navy-950 px-8 py-3 rounded-xl font-bold hover:bg-gold-400 transition shadow-lg shadow-gold-500/20"
          >
            العودة لخريطة المسار
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  const q = questions[currentQuestion];

  return (
    <div className="max-w-2xl mx-auto animate-in slide-in-from-bottom-4 duration-500">
      <div className="bg-navy-800/80 rounded-2xl border border-navy-700 p-6 md:p-8 shadow-xl backdrop-blur-sm">
        <div className="flex justify-between items-center mb-6">
          <span className="text-gold-400 font-bold bg-navy-950 px-4 py-1 rounded-full border border-gold-500/20 text-sm">
            سؤال {currentQuestion + 1} من {questions.length}
          </span>
          <span className="text-navy-400 text-sm font-medium">الباب الأول: المد والقصر</span>
        </div>
        
        <h3 className="text-2xl font-bold text-white mb-8 leading-relaxed">
          {q.question}
        </h3>

        <div className="space-y-3">
          {q.options.map((opt, i) => {
            const isSelected = selectedAnswer === i;
            const isCorrect = i === q.correctAnswer;
            const showCorrect = isSubmitted && isCorrect;
            const showWrong = isSubmitted && isSelected && !isCorrect;
            
            let bgClass = "bg-navy-900 border-navy-700 hover:border-gold-500/50 hover:bg-navy-800 text-navy-100";
            if (isSelected && !isSubmitted) bgClass = "bg-navy-700 border-gold-500 text-white shadow-[0_0_10px_rgba(212,175,55,0.1)]";
            if (showCorrect) bgClass = "bg-green-500/20 border-green-500/50 text-green-400";
            if (showWrong) bgClass = "bg-red-500/20 border-red-500/50 text-red-400";

            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={isSubmitted}
                className={`w-full text-right p-4 rounded-xl border-2 transition-all flex justify-between items-center ${bgClass} ${isSubmitted ? 'cursor-default' : 'cursor-pointer'}`}
              >
                <span className="text-lg font-medium">{opt}</span>
                {showCorrect && <CheckCircle2 className="w-6 h-6 text-green-400" />}
                {showWrong && <XCircle className="w-6 h-6 text-red-400" />}
              </button>
            );
          })}
        </div>

        {isSubmitted && (
          <div className={`mt-6 p-5 rounded-xl border ${selectedAnswer === q.correctAnswer ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
            <h4 className={`font-bold mb-2 flex items-center gap-2 ${selectedAnswer === q.correctAnswer ? 'text-green-400' : 'text-red-400'}`}>
              {selectedAnswer === q.correctAnswer ? (
                <><CheckCircle2 className="w-5 h-5" /> إجابة صحيحة</>
              ) : (
                <><XCircle className="w-5 h-5" /> إجابة خاطئة</>
              )}
            </h4>
            <p className="text-navy-100 leading-relaxed">{q.explanation}</p>
          </div>
        )}

        <div className="mt-8 flex justify-end">
          {!isSubmitted ? (
            <button
              onClick={handleSubmit}
              disabled={selectedAnswer === null}
              className="bg-gold-500 text-navy-950 px-8 py-3 rounded-xl font-bold hover:bg-gold-400 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-lg shadow-gold-500/20"
            >
              تأكيد الإجابة
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="bg-navy-700 text-white px-8 py-3 rounded-xl font-bold hover:bg-navy-600 transition flex items-center gap-2 border border-navy-600"
            >
              {currentQuestion < questions.length - 1 ? 'السؤال التالي' : 'إنهاء الاختبار'}
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
