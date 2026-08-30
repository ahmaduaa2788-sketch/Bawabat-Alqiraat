const fs = require('fs');
let content = fs.readFileSync('src/data/unit13.tsx', 'utf-8');

const quickQuestionComponent = `
const QuickQuestion = ({ question, options, correctAnswerIndex, explanation }: { question: string, options: string[], correctAnswerIndex: number, explanation: string }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (idx: number) => {
    if (showResult) return;
    setSelectedOption(idx);
    setShowResult(true);
  };

  return (
    <div className="mt-12 bg-navy-900/40 border border-gold-500/30 rounded-2xl p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 bg-gold-500 text-navy-950 font-bold px-4 py-1 rounded-bl-xl text-sm">
        سؤال سريع
      </div>
      <h3 className="text-xl font-bold text-white mt-4 mb-6">{question}</h3>
      <div className="space-y-3">
        {options.map((option, idx) => {
          let btnClass = "w-full text-right p-4 rounded-xl border transition-all duration-300 ";
          if (!showResult) {
            btnClass += "bg-navy-800 border-navy-700 hover:border-gold-500 hover:bg-navy-800/80 cursor-pointer text-navy-100";
          } else {
            if (idx === correctAnswerIndex) {
              btnClass += "bg-green-900/30 border-green-500 text-green-100";
            } else if (idx === selectedOption) {
              btnClass += "bg-red-900/30 border-red-500 text-red-100";
            } else {
              btnClass += "bg-navy-800 border-navy-700 opacity-50 text-navy-300 cursor-not-allowed";
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              className={btnClass}
              disabled={showResult}
            >
              {option}
            </button>
          );
        })}
      </div>
      
      {showResult && (
        <div className={\`mt-6 p-4 rounded-xl \${selectedOption === correctAnswerIndex ? 'bg-green-900/20 border border-green-500/30 text-green-200' : 'bg-red-900/20 border border-red-500/30 text-red-200'}\`}>
          <p className="font-bold mb-2">
            {selectedOption === correctAnswerIndex ? 'إجابة صحيحة! 🎉' : 'إجابة خاطئة.'}
          </p>
          <p className="text-sm leading-relaxed">{explanation}</p>
        </div>
      )}
    </div>
  );
};
`;

// Insert the component before SurahSection
content = content.replace('const SurahSection = ', quickQuestionComponent + '\nconst SurahSection = ');

// Add a quickQuestion prop to SurahSection
content = content.replace(
  'const SurahSection = ({ title, intro, data }: { title: string, intro: string, data: FarshRule[] }) => {',
  'const SurahSection = ({ title, intro, data, questionData }: { title: string, intro: string, data: FarshRule[], questionData?: any }) => {'
);

// Add the question rendering at the end of the SurahSection
content = content.replace(
  '        )}',
  '        )}\n\n        {questionData && <QuickQuestion {...questionData} />}'
);

// Add questions to the unit13Content
content = content.replace(
  `data={quranFarsh["الفاتحة"] || []} />`,
  `data={quranFarsh["الفاتحة"] || []} 
    questionData={{
      question: "كيف يقرأ ورش عن نافع كلمة (مَالِكِ) في سورة الفاتحة؟",
      options: ["بإثبات الألف (مَالِكِ)", "بحذف الألف (مَلِكِ)", "بإمالة الألف", "بتسهيل الألف"],
      correctAnswerIndex: 1,
      explanation: "يقرأ ورش كلمة (مَلِكِ) بحذف الألف، بينما يقرأها حفص بإثبات الألف (مَالِكِ)."
    }} 
  />`
);

content = content.replace(
  `data={quranFarsh["البقرة"] || []} />`,
  `data={quranFarsh["البقرة"] || []} 
    questionData={{
      question: "ما هو حكم ورش في كلمة (يُؤْمِنُونَ) ومثيلاتها؟",
      options: ["تحقيق الهمزة", "تسهيل الهمزة", "إبدال الهمزة واواً", "حذف الهمزة"],
      correctAnswerIndex: 2,
      explanation: "ورش يبدل الهمزة الساكنة الواقعة فاءً للكلمة حرف مد من جنس حركة ما قبلها، فتبدل واواً في (يُومِنُونَ)."
    }} 
  />`
);

content = content.replace(
  `data={quranFarsh["آل عمران"] || []} />`,
  `data={quranFarsh["آل عمران"] || []} 
    questionData={{
      question: "ما حكم ورش في لفظ (التَّوْرَاةَ)؟",
      options: ["الفتح قولا واحدا", "التقليل قولا واحدا", "الفتح والتقليل", "الإمالة الكبرى"],
      correctAnswerIndex: 1,
      explanation: "يقرأ ورش لفظ (التَّوْرَاةَ) بتقليل فتحة الراء والألف قولا واحدا حيثما وردت."
    }} 
  />`
);

fs.writeFileSync('src/data/unit13.tsx', content);
console.log('Added quick questions');
