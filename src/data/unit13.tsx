import React, { useState } from 'react';
import { BookOpen, List, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { quranFarsh, FarshRule } from './quranFarsh';

type ChangeType = 'أصول' | 'فرش' | 'أصول وفرش';

const FarshAyahCard: React.FC<{ ayahNumber: number, changes: FarshRule[] }> = ({ ayahNumber, changes }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-navy-900/50 border border-navy-800 rounded-xl mb-4 overflow-hidden">
      <div
        className="p-4 flex flex-col sm:flex-row sm:items-center justify-between cursor-pointer hover:bg-navy-800/50 transition gap-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-start sm:items-center gap-4 flex-1 w-full">
          <span className="bg-gold-500/20 text-gold-400 font-bold px-3 py-1 rounded-lg text-sm whitespace-nowrap mt-1 sm:mt-0">
            آية {ayahNumber}
          </span>
          <p className="font-serif text-lg text-white text-right leading-relaxed flex-1 w-full">
            شواهد الآية {ayahNumber}
          </p>
        </div>
        <div className="self-end sm:self-auto flex items-center justify-center p-2 rounded-full bg-navy-800">
            {isOpen ? <ChevronUp className="text-gold-400 w-5 h-5" /> : <ChevronDown className="text-gold-400 w-5 h-5" />}
        </div>
      </div>

      {isOpen && (
        <div className="p-4 border-t border-navy-800 bg-navy-950/80 overflow-x-auto">
          <table className="w-full text-right border-collapse min-w-[600px]">
            <thead>
              <tr className="text-navy-300 text-sm border-b border-navy-800">
                <th className="pb-2 px-2 w-1/4">رواية حفص</th>
                <th className="pb-2 px-2 w-1/2">البيـــــــــــــــــــــان (حكم ورش)</th>
                <th className="pb-2 px-2 w-1/4">رواية ورش</th>
              </tr>
            </thead>
            <tbody>
              {changes.map((change, idx) => (
                <tr key={idx} className="border-b border-navy-800/50 last:border-0 hover:bg-navy-900/30 transition-colors">
                  <td className="py-4 px-2 font-serif text-gold-400 text-lg">{change.hafs}</td>
                  <td className="py-4 px-2 text-navy-200 text-sm leading-relaxed">{change.rule}</td>
                  <td className="py-4 px-2 font-serif text-white text-lg">{change.warsh}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};


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
        <div className={`mt-6 p-4 rounded-xl ${selectedOption === correctAnswerIndex ? 'bg-green-900/20 border border-green-500/30 text-green-200' : 'bg-red-900/20 border border-red-500/30 text-red-200'}`}>
          <p className="font-bold mb-2">
            {selectedOption === correctAnswerIndex ? 'إجابة صحيحة! 🎉' : 'إجابة خاطئة.'}
          </p>
          <p className="text-sm leading-relaxed">{explanation}</p>
        </div>
      )}
    </div>
  );
};

const SurahSection = ({ title, intro, data, questionData }: { title: string, intro: string, data: FarshRule[], questionData?: any }) => {
  // Group by ayah
  const groupedData: Record<number, FarshRule[]> = {};
  data.forEach(item => {
    if (!groupedData[item.ayah]) groupedData[item.ayah] = [];
    groupedData[item.ayah].push(item);
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-navy-800/80 p-6 md:p-8 rounded-2xl border border-navy-700 shadow-xl relative overflow-hidden">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
          <List className="text-gold-500" />
          {title}
        </h2>
        
        <div className="prose prose-invert max-w-none mb-6">
          <p className="text-navy-100">{intro}</p>
          <div className="bg-blue-900/10 p-5 rounded-xl border border-blue-900/30 flex items-start gap-4 mt-4">
            <Info className="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-200 m-0 leading-relaxed">
              هذا الجدول مستمد حرفياً من كتاب <strong>(الثمر اليانع في رواية ورش عن نافع)</strong> ليمشي آية بآية لعرض اختلافات ورش عن حفص.
            </p>
          </div>
        </div>

        {Object.keys(groupedData).length > 0 ? (
          <div className="space-y-3">
            {Object.keys(groupedData).map(ayahStr => (
               <FarshAyahCard key={ayahStr} ayahNumber={parseInt(ayahStr)} changes={groupedData[parseInt(ayahStr)]} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 border border-dashed border-navy-700 rounded-xl bg-navy-900/20">
            <p className="text-navy-300">يتم حالياً استكمال رقمنة هذه السورة من الكتاب...</p>
          </div>
        )}

        {questionData && <QuickQuestion {...questionData} />}
      </div>
    </div>
  );
};

export const unit13Content: Record<string, React.ReactNode> = {
  'u13-l1': <SurahSection title="سورة الفاتحة" intro="بيان اختلافات ورش عن حفص في سورة الفاتحة من كتاب الثمر اليانع." data={quranFarsh["الفاتحة"] || []} 
    questionData={{
      question: "كيف يقرأ ورش عن نافع كلمة (مَالِكِ) في سورة الفاتحة؟",
      options: ["بإثبات الألف (مَالِكِ)", "بحذف الألف (مَلِكِ)", "بإمالة الألف", "بتسهيل الألف"],
      correctAnswerIndex: 1,
      explanation: "يقرأ ورش كلمة (مَلِكِ) بحذف الألف، بينما يقرأها حفص بإثبات الألف (مَالِكِ)."
    }} 
  />,
  'u13-l2': <SurahSection title="سورة البقرة" intro="بيان اختلافات ورش عن حفص في سورة البقرة." data={quranFarsh["البقرة"] || []} 
    questionData={{
      question: "ما هو حكم ورش في كلمة (يُؤْمِنُونَ) ومثيلاتها؟",
      options: ["تحقيق الهمزة", "تسهيل الهمزة", "إبدال الهمزة واواً", "حذف الهمزة"],
      correctAnswerIndex: 2,
      explanation: "ورش يبدل الهمزة الساكنة الواقعة فاءً للكلمة حرف مد من جنس حركة ما قبلها، فتبدل واواً في (يُومِنُونَ)."
    }} 
  />,
  'u13-l3': <SurahSection title="سورة آل عمران" intro="بيان اختلافات ورش عن حفص في سورة آل عمران." data={quranFarsh["آل عمران"] || []} 
    questionData={{
      question: "ما حكم ورش في لفظ (التَّوْرَاةَ)؟",
      options: ["الفتح قولا واحدا", "التقليل قولا واحدا", "الفتح والتقليل", "الإمالة الكبرى"],
      correctAnswerIndex: 1,
      explanation: "يقرأ ورش لفظ (التَّوْرَاةَ) بتقليل فتحة الراء والألف قولا واحدا حيثما وردت."
    }} 
  />,
  'u13-l4': <SurahSection title="سورة النساء" intro="بيان اختلافات ورش عن حفص في سورة النساء." data={quranFarsh["النساء"] || []} questionData={{ question: "ما هو حكم ورش في قوله تعالى (يُضَاعِفْهَا) في سورة النساء؟", options: ["يُضَاعِفُهَا بالرفع", "يُضَعِّفْهَا بتشديد العين", "يُضَاعِفْهَا كحفص", "تُضَاعَفُ بالبناء للمجهول"], correctAnswerIndex: 1, explanation: "يقرأ ورش (يُضَعِّفْهَا) بحذف الألف وتشديد العين وكسرها." }} />,
  'u13-l5': <SurahSection title="سورة المائدة إلى الأعراف" intro="بيان اختلافات ورش عن حفص في سور المائدة والأنعام والأعراف." data={[...(quranFarsh["المائدة"]||[]), ...(quranFarsh["الأنعام"]||[]), ...(quranFarsh["الأعراف"]||[])]} questionData={{ question: "كيف يقرأ ورش كلمة (يُصْرَفْ) في سورة الأنعام آية 16؟", options: ["يُصْرَفْ كحفص", "يَصْرِفْ بالبناء للمعلوم", "تُصْرَفْ بالتاء", "يَصْرَفَ بفتح الراء"], correctAnswerIndex: 1, explanation: "يقرأ ورش (يَصْرِفْ عَنْهُ) بفتح الياء وكسر الراء مبنياً للمعلوم." }} />,
  'u13-l6': <SurahSection title="سورة الأنفال إلى النور" intro="بيان اختلافات ورش عن حفص في الأنفال والتوبة." data={[...(quranFarsh["الأنفال"]||[]), ...(quranFarsh["التوبة"]||[])]} questionData={{ question: "كيف يقرأ ورش (عُزَيْرٌ ابْنُ) في سورة التوبة؟", options: ["بالتنوين كحفص", "بترك التنوين وضم الراء", "بكسر الراء", "بحذف النون"], correctAnswerIndex: 1, explanation: "يقرأ ورش (عُزَيْرُ ابْنُ) بضم الراء من غير تنوين تفادياً لالتقاء الساكنين." }} />,
  'u13-l7': <SurahSection title="سورة مريم إلى يس" intro="مختارات من فرشيات سور مريم وطه والفرقان والشعراء ويس." data={quranFarsh["مريم وما بعدها"] || []} questionData={{ question: "ما هو حكم قراءة (الْأَيْكَةِ) لورش في الشعراء؟", options: ["بإثبات الهمزتين كحفص", "بحذف الهمزتين (لَيْكَةِ)", "بتسهيل الهمزة", "بإبدال الهمزة ألفا"], correctAnswerIndex: 1, explanation: "يقرأ ورش (لَيْكَةِ) بلام مفتوحة من غير همزة وصل ولا قطع." }} />,
  'u13-l8': <SurahSection title="سورة الصافات إلى الحجرات" intro="شواهد من الصافات وص والزخرف والفتح." data={quranFarsh["الصافات إلى الحجرات"] || []} questionData={{ question: "كيف يقرأ ورش لفظ (عِبَادُ) في الزخرف 19؟", options: ["عِبَادُ", "عِنْدَ", "عَبِيدُ", "عَبْدُ"], correctAnswerIndex: 1, explanation: "يقرأ ورش (عِنْدَ الرَّحْمَٰنِ) بكسر العين وسكون النون وفتح الدال." }} />,
  'u13-l9': <SurahSection title="سورة ق إلى الناس" intro="أبرز الأحكام والفرشيات في المفصل مفصلة بالآية." data={quranFarsh["ق إلى الناس"] || []} questionData={{ question: "كيف يقرأ ورش قوله تعالى (كُفُوًا) في الإخلاص؟", options: ["كُفُئًا", "كُفْوًا", "كِفَاءً", "كُفْئًا"], correctAnswerIndex: 0, explanation: "يقرأ ورش (كُفُئًا) بضم الفاء والهمز بدلاً من الواو." }} />
};
