import React, { useState } from 'react';
import { BookOpen, List, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { quranFarsh, FarshRule, surahsList } from './quranFarsh';

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
        
        {data.length > 0 && (
          <div className="prose prose-invert max-w-none mb-6">
            <p className="text-navy-100">{intro}</p>
            <div className="bg-blue-900/10 p-5 rounded-xl border border-blue-900/30 flex items-start gap-4 mt-4">
              <Info className="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-200 m-0 leading-relaxed">
                هذا الجدول مستمد حرفياً من كتاب <strong>(الثمر اليانع في رواية ورش عن نافع)</strong> ليمشي آية بآية لعرض اختلافات ورش عن حفص.
              </p>
            </div>
          </div>
        )}

        {Object.keys(groupedData).length > 0 ? (
          <div className="space-y-3">
            {Object.keys(groupedData).map(Number).sort((a, b) => a - b).map(ayahNum => (
               <FarshAyahCard key={ayahNum} ayahNumber={ayahNum} changes={groupedData[ayahNum]} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 border border-dashed border-navy-700 rounded-xl bg-navy-900/20">
            <p className="text-navy-300">لا يوجد فرشيات لورش في هذه السورة</p>
          </div>
        )}

        {questionData && <QuickQuestion {...questionData} />}
      </div>
    </div>
  );
};


export const unit13Content: Record<string, React.ReactNode> = {};

surahsList.forEach((surah, idx) => {
  const data = quranFarsh[surah] || [];
  
  unit13Content[`u13-l${idx + 1}`] = (
    <SurahSection 
      title={`سورة ${surah}`} 
      intro={data.length > 0 ? `بيان اختلافات ورش عن حفص في سورة ${surah} من كتاب الثمر اليانع.` : ""} 
      data={data} 
    />
  );
});
