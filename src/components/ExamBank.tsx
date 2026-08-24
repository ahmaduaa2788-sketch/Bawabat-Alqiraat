import React, { useState } from 'react';
import { CheckCircle2, XCircle, ArrowLeft, RefreshCw, Trophy, BookOpen, Layers } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { useParams } from 'react-router-dom';

type QuestionType = 'mcq' | 'tf' | 'matching';

interface BaseQuestion {
  id: string;
  type: QuestionType;
  question: string;
  explanation: string;
}

interface MCQQuestion extends BaseQuestion {
  type: 'mcq';
  options: string[];
  correctAnswer: number;
}

interface TFQuestion extends BaseQuestion {
  type: 'tf';
  correctAnswer: boolean;
}

interface MatchingQuestion extends BaseQuestion {
  type: 'matching';
  pairs: { left: string; right: string }[];
  // Assuming the user has to match each 'left' to a 'right'
}

type Question = MCQQuestion | TFQuestion; // We will implement matching if there's time, let's start with MCQ and TF to keep it robust and within limits. 

// Actually, I can implement a simple Matching by having a dropdown for each left item.
interface SimpleMatchingQuestion extends BaseQuestion {
  type: 'matching';
  leftItems: string[];
  rightItems: string[];
  correctMapping: Record<number, number>; // index of left to index of right
}

type AnyQuestion = MCQQuestion | TFQuestion | SimpleMatchingQuestion;

const examBank: AnyQuestion[] = [
  {
    id: 'q1',
    type: 'mcq',
    question: "ما هو مقدار المد المتصل للإمام ورش من طريق الشاطبية؟",
    options: ["التوسط (4 حركات)", "الإشباع (6 حركات)", "القصر (حركتان)", "جواز التوسط والإشباع"],
    correctAnswer: 1,
    explanation: "يقرأ ورش بإشباع (تطويل) المد المتصل بمقدار 6 حركات قولاً واحداً."
  },
  {
    id: 'q2',
    type: 'tf',
    question: "هل يُستثنى لورش من مد البدل كلمة (إِسْرَائِيل) فتُقرأ بالقصر فقط؟",
    correctAnswer: true,
    explanation: "نعم، كلمة (إسرائيل) استثناها الشاطبي لورش فيقرأها بالقصر فقط."
  },
  {
    id: 'q3',
    type: 'matching',
    question: "اربط الشاهد من الشاطبية بالقاعدة التي يدل عليها:",
    leftItems: [
      "وَتَسْهِيلُ أُخْرَى هَمْزَتَيْنِ بِكِلْمَةٍ ... سَمَا",
      "وَمَا بَعْدَ هَمْزٍ ثَابِتٍ أَوْ مُغَيَّرٍ ... فَقَصْرٌ وَقَدْ يُرْوَى لِوَرْشٍ مُطَوَّلاَ",
      "إِذَا أَلِفٌ أَوْ يَاؤُهَا بَعْدَ كَسْرَةٍ ... أَوِ الْوَاوُ عَنْ ضَمٍّ لَقِيَ الْهَمْزَ طُوِّلاَ"
    ],
    rightItems: [
      "المد المتصل والمنفصل (إشباع)",
      "مد البدل (الأوجه الثلاثة لورش)",
      "تسهيل الهمزة الثانية من كلمة"
    ],
    correctMapping: { 0: 2, 1: 1, 2: 0 },
    explanation: "الشاهد الأول يدل على حكم الهمزتين، والثاني على مد البدل، والثالث على المد المتصل/المنفصل."
  },
  {
    id: 'q4',
    type: 'mcq',
    question: "إذا قُرئ مد البدل بالتوسط (4 حركات)، فما هي الأوجه الجائزة في اللين المهموز لورش؟",
    options: ["التوسط (4)", "الإشباع (6)", "القصر (2)", "التوسط والإشباع (4، 6)"],
    correctAnswer: 0,
    explanation: "على توسط البدل يتعين توسط اللين المهموز، ولا يجوز الإشباع."
  },
  {
    id: 'q5',
    type: 'tf',
    question: "في الهمزتين المفتوحتين من كلمة (ءَأَنذَرۡتَهُمۡ)، لورش وجه الإبدال ألفاً تُمد حركتين فقط.",
    correctAnswer: false,
    explanation: "خطأ. تُمد ألفاً مع الإشباع (6 حركات) لوقوع حرف ساكن (النون) بعدها."
  }
];

export function ExamBank({ onComplete }: { onComplete: () => void }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [score, setScore] = useState(0);

  const { qariId, rawiId, tariqId } = useParams<{ qariId: string; rawiId: string; tariqId: string }>();
  const { completeTariq } = useProgress();

  const currentQ = examBank[currentIdx];

  const handleMCQSelect = (idx: number) => {
    if (isSubmitted) return;
    setAnswers(prev => ({ ...prev, [currentQ.id]: idx }));
  };

  const handleTFSelect = (val: boolean) => {
    if (isSubmitted) return;
    setAnswers(prev => ({ ...prev, [currentQ.id]: val }));
  };

  const handleMatchingSelect = (leftIdx: number, rightIdx: number) => {
    if (isSubmitted) return;
    setAnswers(prev => {
      const currentMapping = prev[currentQ.id] || {};
      return {
        ...prev,
        [currentQ.id]: {
          ...currentMapping,
          [leftIdx]: rightIdx
        }
      };
    });
  };

  const handleSubmit = () => {
    if (isSubmitted) return;
    setIsSubmitted(true);
    
    // Evaluate
    let isCorrect = false;
    const ans = answers[currentQ.id];
    
    if (currentQ.type === 'mcq') {
      isCorrect = ans === currentQ.correctAnswer;
    } else if (currentQ.type === 'tf') {
      isCorrect = ans === currentQ.correctAnswer;
    } else if (currentQ.type === 'matching') {
      const isFullMatch = Object.keys(currentQ.correctMapping).every(
        (key) => ans && ans[Number(key)] === currentQ.correctMapping[Number(key)]
      );
      // Also check if all items were matched
      const keysLength = Object.keys(currentQ.correctMapping).length;
      const ansLength = ans ? Object.keys(ans).length : 0;
      isCorrect = isFullMatch && (keysLength === ansLength);
    }

    if (isCorrect) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < examBank.length - 1) {
      setCurrentIdx(c => c + 1);
      setIsSubmitted(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRetry = () => {
    setCurrentIdx(0);
    setAnswers({});
    setIsSubmitted(false);
    setScore(0);
    setQuizFinished(false);
  };

  const handleFinalCompletion = () => {
    if (qariId && rawiId && tariqId) {
      completeTariq(qariId, rawiId, tariqId);
    }
    onComplete();
  };

  const renderQuestionInput = () => {
    if (currentQ.type === 'mcq') {
      return (
        <div className="space-y-4">
          {currentQ.options.map((opt, i) => {
            const isSelected = answers[currentQ.id] === i;
            const isCorrect = i === currentQ.correctAnswer;
            const showCorrect = isSubmitted && isCorrect;
            const showWrong = isSubmitted && isSelected && !isCorrect;
            
            let bgClass = "bg-navy-900 border-navy-700 hover:border-gold-500/50 text-navy-100";
            if (isSelected && !isSubmitted) bgClass = "bg-navy-700 border-gold-500 text-white shadow-[0_0_15px_rgba(212,175,55,0.15)]";
            if (showCorrect) bgClass = "bg-green-500/20 border-green-500/50 text-green-400";
            if (showWrong) bgClass = "bg-red-500/20 border-red-500/50 text-red-400";

            return (
              <button
                key={i}
                onClick={() => handleMCQSelect(i)}
                disabled={isSubmitted}
                className={`w-full text-right p-5 rounded-xl border-2 transition-all flex justify-between items-center ${bgClass} ${isSubmitted ? 'cursor-default' : 'cursor-pointer'}`}
              >
                <span className="text-lg md:text-xl font-medium">{opt}</span>
                {showCorrect && <CheckCircle2 className="w-8 h-8 text-green-400" />}
                {showWrong && <XCircle className="w-8 h-8 text-red-400" />}
              </button>
            );
          })}
        </div>
      );
    }

    if (currentQ.type === 'tf') {
      const options = [
        { label: 'صح', value: true },
        { label: 'خطأ', value: false }
      ];

      return (
        <div className="flex gap-4">
          {options.map((opt) => {
            const isSelected = answers[currentQ.id] === opt.value;
            const isCorrect = opt.value === currentQ.correctAnswer;
            const showCorrect = isSubmitted && isCorrect;
            const showWrong = isSubmitted && isSelected && !isCorrect;
            
            let bgClass = "bg-navy-900 border-navy-700 hover:border-gold-500/50 text-navy-100";
            if (isSelected && !isSubmitted) bgClass = "bg-navy-700 border-gold-500 text-white shadow-[0_0_15px_rgba(212,175,55,0.15)]";
            if (showCorrect) bgClass = "bg-green-500/20 border-green-500/50 text-green-400";
            if (showWrong) bgClass = "bg-red-500/20 border-red-500/50 text-red-400";

            return (
              <button
                key={opt.label}
                onClick={() => handleTFSelect(opt.value)}
                disabled={isSubmitted}
                className={`flex-1 p-6 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-3 ${bgClass} ${isSubmitted ? 'cursor-default' : 'cursor-pointer'}`}
              >
                <span className="text-2xl font-bold">{opt.label}</span>
                {showCorrect && <CheckCircle2 className="w-8 h-8 text-green-400" />}
                {showWrong && <XCircle className="w-8 h-8 text-red-400" />}
              </button>
            );
          })}
        </div>
      );
    }

    if (currentQ.type === 'matching') {
      const currentAns = answers[currentQ.id] || {};
      
      return (
        <div className="space-y-6">
          {currentQ.leftItems.map((leftItem, leftIdx) => {
            const selectedRightIdx = currentAns[leftIdx];
            const isCorrect = isSubmitted && selectedRightIdx === currentQ.correctMapping[leftIdx];
            const isWrong = isSubmitted && selectedRightIdx !== undefined && selectedRightIdx !== currentQ.correctMapping[leftIdx];
            
            let borderClass = "border-navy-700";
            if (isCorrect) borderClass = "border-green-500";
            if (isWrong) borderClass = "border-red-500";

            return (
              <div key={leftIdx} className={`bg-navy-900/50 p-5 rounded-xl border-2 ${borderClass} flex flex-col md:flex-row gap-4 items-center`}>
                <div className="flex-1 text-right text-lg text-white font-arabic leading-loose">
                  {leftItem}
                </div>
                <div className="w-full md:w-1/2">
                  <select 
                    value={selectedRightIdx !== undefined ? selectedRightIdx : ""}
                    onChange={(e) => handleMatchingSelect(leftIdx, Number(e.target.value))}
                    disabled={isSubmitted}
                    className="w-full bg-navy-950 border border-navy-700 text-white p-3 rounded-lg focus:border-gold-500 outline-none"
                  >
                    <option value="" disabled>اختر التوجيه الصحيح...</option>
                    {currentQ.rightItems.map((rightItem, rightIdx) => (
                      <option key={rightIdx} value={rightIdx}>{rightItem}</option>
                    ))}
                  </select>
                </div>
                {isCorrect && <CheckCircle2 className="w-6 h-6 text-green-400 shrink-0" />}
                {isWrong && <XCircle className="w-6 h-6 text-red-400 shrink-0" />}
              </div>
            );
          })}
        </div>
      );
    }
  };

  const isAnswered = () => {
    if (currentQ.type === 'matching') {
      const ans = answers[currentQ.id];
      return ans && Object.keys(ans).length === currentQ.leftItems.length;
    }
    return answers[currentQ.id] !== undefined;
  };

  if (quizFinished) {
    const passThreshold = Math.ceil(examBank.length * 0.8);
    const isPassing = score >= passThreshold;
    
    return (
      <div className="bg-gradient-to-b from-navy-800 to-navy-950 p-8 rounded-2xl border border-gold-500/30 text-center max-w-3xl mx-auto shadow-2xl backdrop-blur-sm animate-in zoom-in-95 duration-500">
        <div className="inline-flex justify-center items-center w-24 h-24 bg-navy-900 rounded-full mb-6 border-2 border-gold-500/50 shadow-[0_0_30px_rgba(212,175,55,0.2)]">
          <Trophy className={`w-12 h-12 ${isPassing ? 'text-gold-500' : 'text-navy-500'}`} />
        </div>
        <h2 className="text-4xl font-extrabold text-white mb-4">النتيجة النهائية للمسار</h2>
        <p className="text-xl text-navy-200 mb-6">
          لقد أجبت بشكل صحيح على <span className="font-bold text-gold-400 text-3xl mx-1">{score}</span> من <span className="font-bold text-white mx-1">{examBank.length}</span>
        </p>
        
        {isPassing ? (
          <div className="bg-green-500/10 border border-green-500/30 text-green-400 p-6 rounded-2xl mb-8 flex flex-col items-center justify-center gap-4">
            <CheckCircle2 className="w-12 h-12" />
            <h3 className="font-bold text-2xl">مبارك! لقد اجتزت مسار طريق الشاطبية بنجاح</h3>
            <p className="text-navy-100 text-center max-w-lg">
              بحصولك على هذه النتيجة، تكون قد أثبت جدارتك في استيعاب أصول الإمام ورش من طريق الشاطبية. تم الآن تسجيل هذا المسار كمسار "مكتمل" في البوابة الرئيسية.
            </p>
          </div>
        ) : (
          <div className="bg-navy-900/80 border border-navy-700 text-navy-300 p-6 rounded-2xl mb-8 flex flex-col items-center justify-center gap-4">
            <RefreshCw className="w-12 h-12 text-navy-500" />
            <h3 className="font-bold text-2xl">لم تجتز الاختبار بعد</h3>
            <p className="text-navy-200 text-center">
              درجة النجاح المطلوبة هي {passThreshold} من {examBank.length}. ننصحك بمراجعة الأبواب السابقة وإعادة المحاولة لتوثيق إتمامك للمسار.
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {!isPassing && (
            <button 
              onClick={handleRetry}
              className="inline-flex justify-center items-center gap-2 bg-navy-700 text-white px-8 py-4 rounded-xl font-bold hover:bg-navy-600 transition shadow-md"
            >
              <RefreshCw className="w-5 h-5" />
              إعادة الاختبار
            </button>
          )}
          <button 
            onClick={isPassing ? handleFinalCompletion : onComplete}
            className={`inline-flex justify-center items-center gap-2 px-8 py-4 rounded-xl font-bold transition shadow-lg ${
              isPassing 
                ? 'bg-gold-500 text-navy-950 hover:bg-gold-400 shadow-gold-500/30' 
                : 'bg-navy-800 text-white hover:bg-navy-700 border border-navy-600'
            }`}
          >
            {isPassing ? 'اعتماد النتيجة والعودة للبوابة' : 'العودة للخريطة'}
            {isPassing ? <CheckCircle2 className="w-5 h-5" /> : <ArrowLeft className="w-5 h-5" />}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto animate-in slide-in-from-bottom-4 duration-500">
      <div className="bg-navy-800/80 rounded-2xl border border-gold-500/30 p-6 md:p-10 shadow-2xl backdrop-blur-sm">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b border-navy-700 pb-6">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Layers className="text-gold-500 w-6 h-6" />
              بنك الاختبارات الشامل
            </h2>
            <p className="text-navy-300 text-sm mt-1">
              {currentQ.type === 'mcq' && 'اختيار من متعدد'}
              {currentQ.type === 'tf' && 'صح أم خطأ'}
              {currentQ.type === 'matching' && 'سؤال ربط الشواهد'}
            </p>
          </div>
          <span className="text-gold-400 font-bold bg-navy-950 px-5 py-2 rounded-xl border border-gold-500/20 shadow-inner">
            سؤال {currentIdx + 1} من {examBank.length}
          </span>
        </div>
        
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 leading-relaxed">
          {currentQ.question}
        </h3>

        {renderQuestionInput()}

        {isSubmitted && (
          <div className="mt-8 p-6 rounded-xl border bg-navy-900/80 border-navy-700 shadow-inner">
            <h4 className="font-bold text-lg mb-3 flex items-center gap-2 text-gold-400">
              <Info className="w-6 h-6" /> التوجيه والتعليل
            </h4>
            <p className="text-white leading-relaxed text-lg">{currentQ.explanation}</p>
          </div>
        )}

        <div className="mt-10 flex justify-end">
          {!isSubmitted ? (
            <button
              onClick={handleSubmit}
              disabled={!isAnswered()}
              className="bg-gold-500 text-navy-950 px-10 py-4 rounded-xl text-lg font-bold hover:bg-gold-400 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-lg shadow-gold-500/20 w-full sm:w-auto"
            >
              تأكيد الإجابة
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="bg-navy-700 text-white px-10 py-4 rounded-xl text-lg font-bold hover:bg-navy-600 transition flex items-center justify-center gap-3 border border-navy-600 w-full sm:w-auto"
            >
              {currentIdx < examBank.length - 1 ? 'السؤال التالي' : 'عرض النتيجة النهائية'}
              <ArrowLeft className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// Ensure you have an Info icon import if I didn't add it.
import { Info } from 'lucide-react';
