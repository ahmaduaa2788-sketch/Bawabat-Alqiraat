import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';

const quizData = [
  {
    "id": "q1",
    "question": "من هو الراوي الأول للإمام نافع المدني؟",
    "options": [
      "ورش",
      "قالون",
      "حفص",
      "الدوري"
    ],
    "correctAnswer": 1,
    "explanation": "الإمام نافع روى عنه راويان أساسيان: الأول قالون (عيسى بن مينا) والثاني ورش (عثمان بن سعيد)."
  },
  {
    "id": "q2",
    "question": "ما معنى لقب 'قالون' في اللغة الرومية؟",
    "options": [
      "الطويل",
      "القصير",
      "الجيد",
      "السريع"
    ],
    "correctAnswer": 2,
    "explanation": "لقب 'قالون' أطلقه الإمام نافع على تلميذه عيسى بن مينا لجودة قراءته، وتعني 'جيد' باللغة الرومية."
  },
  {
    "id": "q3",
    "question": "هل يقرأ الإمام قالون بالبسملة بين السورتين؟",
    "options": [
      "له الوصل فقط",
      "له السكت فقط",
      "له البسملة قولاً واحداً",
      "له البسملة والسكت"
    ],
    "correctAnswer": 2,
    "explanation": "مذهب قالون كابن كثير وعاصم والكسائي وأبي جعفر؛ يقرؤون بالبسملة بين كل سورتين قولاً واحداً (إلا بين الأنفال والتوبة)."
  }
];

export function QalunUnit0Quiz({ onComplete }: { onComplete: () => void }) {
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
    if (selectedAnswer === quizData[currentQuestion].correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setIsSubmitted(false);
    } else {
      setQuizFinished(true);
    }
  };

  if (quizFinished) {
    const passed = score >= quizData.length * 0.75;
    return (
      <div className="bg-navy-800/80 p-8 rounded-xl shadow-sm border border-navy-700 text-center space-y-6">
        <h2 className="text-3xl font-bold text-white">نتيجة الاختبار</h2>
        <div className="flex justify-center my-6">
          <div className="relative w-40 h-40 flex items-center justify-center bg-navy-800/50 rounded-full border-8 border-navy-800">
            <svg className="absolute inset-0 w-full h-full transform -rotate-90">
              <circle cx="50%" cy="50%" r="46%" fill="transparent" stroke={passed ? "#22c55e" : "#ef4444"} strokeWidth="12" strokeDasharray={`${(score / quizData.length) * 289} 289`} className="transition-all duration-1000 ease-out" />
            </svg>
            <span className="text-4xl font-bold text-gold-400">{score}/{quizData.length}</span>
          </div>
        </div>
        {passed ? (
          <div className="bg-green-500/20 text-green-400 border border-green-500/30 p-4 rounded-lg flex items-center gap-3 justify-center">
            <CheckCircle2 className="w-6 h-6" />
            <p className="text-lg font-semibold">أحسنت! لقد اجتزت الاختبار بنجاح.</p>
          </div>
        ) : (
          <div className="bg-red-500/20 text-red-400 border border-red-500/30 p-4 rounded-lg flex items-center gap-3 justify-center">
            <AlertCircle className="w-6 h-6" />
            <p className="text-lg font-semibold">تحتاج إلى المراجعة والمحاولة مرة أخرى.</p>
          </div>
        )}
        <button onClick={onComplete} className="mt-6 inline-flex items-center gap-2 bg-gold-500 text-navy-950 px-6 py-3 rounded-lg hover:bg-gold-400 transition font-bold">
          <ArrowLeft className="w-5 h-5" /> العودة لخريطة المسار
        </button>
      </div>
    );
  }

  const q = quizData[currentQuestion];
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6 border-b border-navy-700 pb-4">
        <h2 className="text-2xl font-bold text-white">اختبار الوحدة التمهيدية (قالون)</h2>
        <span className="bg-gold-500/20 text-gold-300 px-4 py-1 rounded-full font-bold">السؤال {currentQuestion + 1} من {quizData.length}</span>
      </div>
      <div className="bg-navy-800/80 p-6 rounded-xl shadow-sm border border-navy-700">
        <h3 className="text-xl font-bold text-white mb-6 leading-relaxed">{q.question}</h3>
        <div className="space-y-3">
          {q.options.map((option, idx) => {
            let stateClass = "bg-navy-900/50 border-navy-700 hover:border-gold-500/50 hover:bg-navy-800 cursor-pointer text-navy-200";
            if (isSubmitted) {
              if (idx === q.correctAnswer) stateClass = "bg-green-500/20 border-green-500 text-green-300";
              else if (idx === selectedAnswer) stateClass = "bg-red-500/20 border-red-500 text-red-300";
              else stateClass = "bg-navy-900/50 border-navy-800 opacity-50 cursor-not-allowed text-navy-400";
            } else if (idx === selectedAnswer) {
              stateClass = "bg-gold-500/20 border-gold-500 text-gold-300";
            }
            return (
              <div key={idx} onClick={() => handleSelect(idx)} className={cn("p-4 rounded-lg border transition-all flex items-center justify-between", stateClass)}>
                <span className="text-lg">{option}</span>
                {isSubmitted && idx === q.correctAnswer && <CheckCircle2 className="text-green-500" />}
                {isSubmitted && idx === selectedAnswer && idx !== q.correctAnswer && <XCircle className="text-red-500" />}
              </div>
            );
          })}
        </div>
        {isSubmitted && (
          <div className="mt-6 bg-navy-900 border border-navy-700 text-white p-5 rounded-lg">
            <h4 className="font-bold text-gold-400 mb-2">التوضيح:</h4>
            <p className="text-lg leading-relaxed text-navy-200">{q.explanation}</p>
          </div>
        )}
        <div className="mt-8 flex justify-end">
          {!isSubmitted ? (
            <button onClick={handleSubmit} disabled={selectedAnswer === null} className="bg-gold-500 hover:bg-gold-400 disabled:opacity-50 disabled:cursor-not-allowed text-navy-950 px-8 py-3 rounded-lg font-bold text-lg transition">تأكيد الإجابة</button>
          ) : (
            <button onClick={handleNext} className="bg-navy-700 hover:bg-navy-600 text-white px-8 py-3 rounded-lg font-bold text-lg transition flex items-center gap-2">
              {currentQuestion < quizData.length - 1 ? 'السؤال التالي' : 'إنهاء الاختبار'} <ArrowLeft className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
