import React, { useState } from 'react';
import { cn } from '../lib/utils';
import { CheckCircle2, XCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const quizData: Question[] = [
  {
    id: "q1",
    question: "ما المقصود بـ 'القراءة' في اصطلاح علماء القراءات؟",
    options: [
      "ما نسب للراوي عن الإمام",
      "المذهب الذي ذهب إليه إمام من أئمة القراء وينسب إليه",
      "ما نسب للآخذ عن الراوي وإن سفل",
      "طريقة النطق بالقرآن بأي وجه صح لغة"
    ],
    correctAnswer: 1,
    explanation: "القراءة هي المذهب الذي ينسب للإمام (مثل نافع)، بينما الرواية تنسب للراوي (مثل ورش)، والطريق ينسب لمن دونهم (مثل الأزرق)."
  },
  {
    id: "q2",
    question: "من هو الإمام الذي أخذ عنه ورش القراءة؟",
    options: [
      "الإمام الشاطبي",
      "الإمام ابن الجزري",
      "الإمام أبو عمرو الداني",
      "الإمام نافع المدني"
    ],
    correctAnswer: 3,
    explanation: "الإمام ورش رحل إلى المدينة وقرأ على الإمام نافع بن أبي نعيم المدني."
  },
  {
    id: "q3",
    question: "طريق 'الشاطبية' في رواية ورش يمثل أي طريق من طرق الرواة عن ورش؟",
    options: [
      "طريق الأصبهاني",
      "طريق أبي بكر بن سيف",
      "طريق أبي يعقوب الأزرق",
      "طريق الحلواني"
    ],
    correctAnswer: 2,
    explanation: "الإمام الشاطبي رحمه الله في منظومته (حرز الأماني) اقتصر في رواية ورش على طريق أبي يعقوب الأزرق عن ورش."
  },
  {
    id: "q4",
    question: "هل يجوز للطالب الذي يقرأ من طريق 'الشاطبية' أن يأتي بأوجه لورش وردت في 'طيبة النشر' ولم ترد في الشاطبية؟",
    options: [
      "نعم، يجوز مطلقاً لأن كلها عن ورش",
      "لا يجوز، لأن ذلك يسمى بالتركيب وهو معيب عند أهل الأداء",
      "يجوز إذا كان الوجه أسهل في القراءة",
      "يجوز في الفرش ولا يجوز في الأصول"
    ],
    correctAnswer: 1,
    explanation: "يجب الالتزام بالطريق المقروء به وعدم الخلط بين الطرق، والخلط يسمى (التركيب) وهو ممنوع عند الأئمة إلا لمن أراد أن يجمع القراءات في مقام التعليم بشروط."
  }
];

export function Unit0Quiz({ onComplete }: { onComplete: () => void }) {
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
              <circle
                cx="50%" cy="50%" r="46%"
                fill="transparent"
                stroke={passed ? "#22c55e" : "#ef4444"}
                strokeWidth="12"
                strokeDasharray={`${(score / quizData.length) * 289} 289`}
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <span className="text-4xl font-bold text-gold-400">{score}/{quizData.length}</span>
          </div>
        </div>

        {passed ? (
          <div className="bg-green-50 text-green-800 p-4 rounded-lg flex items-center gap-3 justify-center">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
            <p className="text-lg font-semibold">أحسنت! لقد اجتزت الوحدة التمهيدية بنجاح.</p>
          </div>
        ) : (
          <div className="bg-red-50 text-red-800 p-4 rounded-lg flex items-center gap-3 justify-center">
            <AlertCircle className="w-6 h-6 text-red-600" />
            <p className="text-lg font-semibold">تحتاج إلى مراجعة الوحدة التمهيدية مرة أخرى.</p>
          </div>
        )}

        <button 
          onClick={onComplete}
          className="mt-6 inline-flex items-center gap-2 bg-navy-950 text-white px-6 py-3 rounded-lg hover:bg-navy-900 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          العودة لخريطة المسار
        </button>
      </div>
    );
  }

  const q = quizData[currentQuestion];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h2 className="text-2xl font-bold text-white">اختبار الوحدة التمهيدية</h2>
        <span className="bg-gold-500/20 text-gold-300 px-4 py-1 rounded-full font-bold">
          السؤال {currentQuestion + 1} من {quizData.length}
        </span>
      </div>

      <div className="bg-navy-800/80 p-6 rounded-xl shadow-sm border border-navy-700">
        <h3 className="text-xl font-bold text-gold-400 mb-6 leading-relaxed">
          {q.question}
        </h3>

        <div className="space-y-3">
          {q.options.map((option, idx) => {
            let stateClass = "bg-navy-800/50 border-navy-700 hover:border-gold-400 hover:bg-gold-500/10 cursor-pointer";
            
            if (isSubmitted) {
              if (idx === q.correctAnswer) {
                stateClass = "bg-green-50 border-green-500 text-green-900";
              } else if (idx === selectedAnswer) {
                stateClass = "bg-red-50 border-red-500 text-red-900";
              } else {
                stateClass = "bg-navy-800/50 border-navy-700 opacity-50 cursor-not-allowed";
              }
            } else if (idx === selectedAnswer) {
              stateClass = "bg-gold-500/20 border-gold-500 text-gold-400";
            }

            return (
              <div 
                key={idx}
                onClick={() => handleSelect(idx)}
                className={cn(
                  "p-4 rounded-lg border-2 transition-all flex items-center justify-between",
                  stateClass
                )}
              >
                <span className="text-lg">{option}</span>
                {isSubmitted && idx === q.correctAnswer && <CheckCircle2 className="text-green-600" />}
                {isSubmitted && idx === selectedAnswer && idx !== q.correctAnswer && <XCircle className="text-red-600" />}
              </div>
            );
          })}
        </div>

        {isSubmitted && (
          <div className="mt-6 bg-navy-950 text-white p-5 rounded-lg">
            <h4 className="font-bold text-gold-400 mb-2">التوضيح:</h4>
            <p className="text-lg leading-relaxed">{q.explanation}</p>
          </div>
        )}

        <div className="mt-8 flex justify-end">
          {!isSubmitted ? (
            <button
              onClick={handleSubmit}
              disabled={selectedAnswer === null}
              className="bg-gold-600 hover:bg-gold-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-bold text-lg transition"
            >
              تأكيد الإجابة
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="bg-navy-950 hover:bg-navy-950 text-white px-8 py-3 rounded-lg font-bold text-lg transition flex items-center gap-2"
            >
              {currentQuestion < quizData.length - 1 ? 'السؤال التالي' : 'إنهاء الاختبار'}
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
