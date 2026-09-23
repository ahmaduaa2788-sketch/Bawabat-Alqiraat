const fs = require('fs');
const code = `import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, ArrowLeft, RefreshCw, Trophy } from 'lucide-react';

const allQalunQuestions = [
  {
    id: "q0_1",
    question: "من هو الراوي الأول للإمام نافع المدني؟",
    options: ["ورش", "قالون", "حفص", "الدوري"],
    correctAnswer: 1,
    explanation: "الإمام نافع روى عنه راويان أساسيان: الأول قالون والثاني ورش."
  },
  {
    id: "q0_2",
    question: "هل يقرأ الإمام قالون بالبسملة بين السورتين؟",
    options: ["له الوصل فقط", "له السكت فقط", "له البسملة قولاً واحداً", "له البسملة والسكت"],
    correctAnswer: 2,
    explanation: "مذهب قالون كابن كثير وعاصم يقرؤون بالبسملة بين كل سورتين قولاً واحداً (إلا بين الأنفال والتوبة)."
  },
  {
    id: "q1_1",
    question: "ما هو مذهب قالون في ميم الجمع إذا وقعت قبل حرف متحرك؟",
    options: ["الإسكان فقط", "الصلة فقط", "الصلة والإسكان (الوجهان)", "الإسكان ما عدا إذا كان بعدها همزة قطع"],
    correctAnswer: 2,
    explanation: "لقالون في ميم الجمع إذا أتى بعدها متحرك وجهان: الإسكان (كحفص) وهو المقدم، والصلة."
  },
  {
    id: "q2_1",
    question: "كيف يقرأ قالون كلمة (يُؤَدِّهْ) و (نُؤْتِهْ) و (نُوَلِّهْ) و (نُصْلِهْ)؟",
    options: ["بالصلة مع القصر", "بالإسكان", "بالاختلاس", "بالصلة مع التوسط"],
    correctAnswer: 1,
    explanation: "يقرأ قالون بإسكان الهاء في هذه الكلمات."
  },
  {
    id: "q2_2",
    question: "ما هو مقدار المد المنفصل لقالون؟",
    options: ["القصر فقط", "التوسط فقط", "القصر والتوسط (الوجهان)", "الإشباع"],
    correctAnswer: 2,
    explanation: "لقالون في المد المنفصل وجهان: القصر (حركتان) وهو المقدم، والتوسط (4 حركات)."
  },
  {
    id: "q3_1",
    question: "كيف يقرأ قالون الهمزتين المفتوحتين من كلمتين (مثل: جَاءَ أَمْرُنَا)؟",
    options: ["بتسهيل الأولى", "بإسقاط الهمزة الأولى", "بإبدال الثانية", "بتسهيل الثانية"],
    correctAnswer: 1,
    explanation: "إذا كانت الهمزتان مفتوحتين من كلمتين فإن قالون يسقط الهمزة الأولى مع القصر والتوسط."
  },
  {
    id: "q4_1",
    question: "كيف يقرأ قالون قوله تعالى (يَلْهَث ذَّلِكَ) في سورة الأعراف؟",
    options: ["بالإظهار قولاً واحداً", "بالإدغام قولاً واحداً", "بالإظهار والإدغام (الوجهان)", "بالسكت"],
    correctAnswer: 2,
    explanation: "لقالون في (يلهث ذلك) الوجهان: الإظهار والإدغام، والمقدم هو الإظهار."
  },
  {
    id: "q5_1",
    question: "كيف يقرأ قالون ياء الإضافة في (مَحْيَايَ)؟",
    options: ["بالفتح", "بالإسكان", "بالفتح والإسكان", "بالحذف"],
    correctAnswer: 1,
    explanation: "قرأ قالون (ومحيايْ) بإسكان الياء، بخلاف ورش الذي فتحها."
  }
];

function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export function QalunComprehensiveQuiz({ onComplete }: { onComplete: () => void }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    // Select 5 random questions for the comprehensive quiz
    const shuffled = shuffleArray(allQalunQuestions);
    setQuestions(shuffled.slice(0, 5));
  }, []);

  const handleSelect = (idx: number) => {
    if (showResult) return;
    setSelectedAnswer(idx);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    setShowResult(true);
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(c => c + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizFinished(true);
    }
  };

  if (questions.length === 0) return <div>جاري التحميل...</div>;

  if (quizFinished) {
    const passed = score >= questions.length * 0.8;
    return (
      <div className="bg-navy-900 border border-navy-700 p-8 rounded-2xl shadow-xl text-center max-w-2xl mx-auto animate-in zoom-in duration-500">
        <Trophy className={\`w-20 h-20 mx-auto mb-6 \${passed ? 'text-gold-400' : 'text-navy-500'}\`} />
        <h2 className="text-3xl font-bold text-white mb-4">نتيجة الاختبار الشامل لقالون</h2>
        <div className="text-6xl font-black mb-6" style={{ color: passed ? '#4ade80' : '#f87171' }}>
          {score} / {questions.length}
        </div>
        
        {passed ? (
          <div className="space-y-6">
            <p className="text-xl text-green-400 font-bold">مبارك! لقد اجتزت مسار الإمام قالون بنجاح.</p>
            <button 
              onClick={onComplete}
              className="w-full bg-gold-500 text-navy-950 font-bold py-4 rounded-xl hover:bg-gold-400 transition shadow-lg text-lg flex items-center justify-center gap-2"
            >
              استلام الشهادة والمتابعة
              <ArrowLeft className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <p className="text-xl text-red-400 font-bold">لم تجتز الاختبار هذه المرة. الممارسة طريق الإتقان.</p>
            <button 
              onClick={() => window.location.reload()}
              className="w-full bg-navy-800 text-white font-bold py-4 rounded-xl border border-navy-600 hover:bg-navy-700 transition shadow-lg text-lg flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              إعادة الاختبار
            </button>
          </div>
        )}
      </div>
    );
  }

  const q = questions[currentQuestion];
  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center bg-navy-900 p-4 rounded-xl border border-navy-700">
        <h2 className="text-xl font-bold text-white">الاختبار الشامل (قالون)</h2>
        <div className="flex items-center gap-4">
          <span className="text-gold-400 font-bold text-lg">{score} نقاط</span>
          <span className="bg-navy-800 text-navy-300 px-4 py-1 rounded-full text-sm font-bold border border-navy-700">
            {currentQuestion + 1} / {questions.length}
          </span>
        </div>
      </div>

      <div className="bg-navy-900 border border-navy-700 p-6 md:p-8 rounded-2xl shadow-lg">
        <h3 className="text-2xl font-bold text-white mb-8 leading-relaxed">
          {q.question}
        </h3>
        
        <div className="space-y-4">
          {q.options.map((option, idx) => {
            let stateClass = "bg-navy-950 border-navy-800 hover:border-gold-500 hover:bg-navy-800 cursor-pointer text-navy-100";
            if (showResult) {
              if (idx === q.correctAnswer) stateClass = "bg-green-500/10 border-green-500 text-green-400";
              else if (idx === selectedAnswer) stateClass = "bg-red-500/10 border-red-500 text-red-400";
              else stateClass = "bg-navy-950 border-navy-800 opacity-40 cursor-not-allowed";
            } else if (idx === selectedAnswer) {
              stateClass = "bg-gold-500/10 border-gold-500 text-gold-400";
            }

            return (
              <div 
                key={idx}
                onClick={() => handleSelect(idx)}
                className={\`p-5 rounded-xl border-2 transition-all flex items-center justify-between \${stateClass}\`}
              >
                <span className="text-lg font-medium">{option}</span>
                {showResult && idx === q.correctAnswer && <CheckCircle2 className="w-6 h-6 text-green-500" />}
                {showResult && idx === selectedAnswer && idx !== q.correctAnswer && <XCircle className="w-6 h-6 text-red-500" />}
              </div>
            );
          })}
        </div>

        {showResult && (
          <div className="mt-8 bg-navy-950 border border-navy-800 p-5 rounded-xl animate-in zoom-in-95">
            <h4 className="font-bold text-gold-400 mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              توضيح القاعدة
            </h4>
            <p className="text-navy-200 leading-relaxed">{q.explanation}</p>
          </div>
        )}

        <div className="mt-8 flex justify-end pt-6 border-t border-navy-800">
          {!showResult ? (
            <button
              onClick={handleSubmit}
              disabled={selectedAnswer === null}
              className="bg-gold-500 hover:bg-gold-400 disabled:opacity-50 disabled:cursor-not-allowed text-navy-950 px-8 py-3 rounded-xl font-bold text-lg transition"
            >
              تأكيد الإجابة
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="bg-navy-800 hover:bg-navy-700 text-white px-8 py-3 rounded-xl font-bold text-lg transition flex items-center gap-2 border border-navy-600"
            >
              {currentQuestion < questions.length - 1 ? 'السؤال التالي' : 'إظهار النتيجة'}
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
`;
fs.writeFileSync('src/components/QalunComprehensiveQuiz.tsx', code);
