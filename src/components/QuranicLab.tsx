import React, { useState } from 'react';
import { Beaker, CheckCircle2, ChevronLeft, ChevronRight, Info, MousePointer2 } from 'lucide-react';

type RuleType = 'madd' | 'hamz' | 'naql' | 'none';

interface WordObject {
  text: string;
  ruleType: RuleType;
  ruleTitle?: string;
  ruleDesc?: string;
}

interface LabVerse {
  id: number;
  surah: string;
  ayah: number;
  words: WordObject[];
}

const labVerses: LabVerse[] = [
  {
    id: 1,
    surah: "البقرة",
    ayah: 6,
    words: [
      { text: "إِنَّ", ruleType: 'none' },
      { text: "ٱلَّذِينَ", ruleType: 'none' },
      { text: "كَفَرُواْ", ruleType: 'none' },
      { text: "سَوَآءٌ", ruleType: 'madd', ruleTitle: 'المد المتصل', ruleDesc: 'اجتمع حرف المد والهمز في كلمة واحدة. قرأها ورش بالإشباع (6 حركات).' },
      { text: "عَلَيۡهِمۡ", ruleType: 'none' },
      { text: "ءَأَنذَرۡتَهُمۡ", ruleType: 'hamz', ruleTitle: 'الهمزتان من كلمة (المفتوحتان)', ruleDesc: 'قرأها ورش بوجهين: التسهيل، والإبدال ألفاً تُمد إشباعاً (6 حركات) لسكون النون.' },
      { text: "أَمۡ", ruleType: 'none' },
      { text: "لَمۡ", ruleType: 'none' },
      { text: "تُنذِرۡهُمۡ", ruleType: 'none' },
      { text: "لَا", ruleType: 'none' },
      { text: "يُؤۡمِنُونَ", ruleType: 'hamz', ruleTitle: 'إبدال الهمز المفرد', ruleDesc: 'همزة ساكنة وقعت فاء للكلمة، يبدلها ورش واواً خالصة.' }
    ]
  },
  {
    id: 2,
    surah: "البقرة",
    ayah: 4,
    words: [
      { text: "وَٱلَّذِينَ", ruleType: 'none' },
      { text: "يُؤۡمِنُونَ", ruleType: 'hamz', ruleTitle: 'إبدال الهمز المفرد', ruleDesc: 'تبدل الهمزة واواً خالصة.' },
      { text: "بِمَآ", ruleType: 'madd', ruleTitle: 'المد المنفصل', ruleDesc: 'يقرأه ورش بالإشباع (6 حركات).' },
      { text: "أُنزِلَ", ruleType: 'none' },
      { text: "إِلَيۡكَ", ruleType: 'none' },
      { text: "وَمَآ", ruleType: 'madd', ruleTitle: 'المد المنفصل', ruleDesc: 'يقرأه ورش بالإشباع (6 حركات).' },
      { text: "أُنزِلَ", ruleType: 'none' },
      { text: "مِن", ruleType: 'none' },
      { text: "قَبۡلِكَ", ruleType: 'none' },
      { text: "وَبِٱلۡأٓخِرَةِ", ruleType: 'naql', ruleTitle: 'النقل ومد البدل', ruleDesc: 'ينقل ورش حركة الهمزة (الفتحة) إلى اللام الساكنة قبلها وتحذف الهمزة، ويصبح فيها مد بدل (لأن أصلها همزة ممدودة) بأوجهه الثلاثة.' },
      { text: "هُمۡ", ruleType: 'none' },
      { text: "يُوقِنُونَ", ruleType: 'none' }
    ]
  }
];

export function QuranicLab() {
  const [currentVerse, setCurrentVerse] = useState(0);
  const [selectedWordIdx, setSelectedWordIdx] = useState<number | null>(null);

  const verse = labVerses[currentVerse];

  const handleNext = () => {
    if (currentVerse < labVerses.length - 1) {
      setCurrentVerse(c => c + 1);
      setSelectedWordIdx(null);
    }
  };

  const handlePrev = () => {
    if (currentVerse > 0) {
      setCurrentVerse(c => c - 1);
      setSelectedWordIdx(null);
    }
  };

  const handleWordClick = (index: number, type: RuleType) => {
    if (type !== 'none') {
      setSelectedWordIdx(index);
    } else {
      setSelectedWordIdx(null);
    }
  };

  const selectedWord = selectedWordIdx !== null ? verse.words[selectedWordIdx] : null;

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-700 pb-12">
      <div className="text-center space-y-4 py-6 border-b border-navy-800">
        <div className="inline-flex justify-center items-center w-16 h-16 bg-navy-900 rounded-full border border-gold-500/30 text-gold-500 shadow-[0_0_15px_rgba(212,175,55,0.15)]">
          <Beaker className="w-8 h-8" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white">المختبر القرآني التفاعلي</h1>
        <p className="text-navy-300 max-w-2xl mx-auto">
          انقر على الكلمات المظللة لاكتشاف الأحكام الأصولية عند الإمام ورش (المدود، الهمز، والنقل).
        </p>
        <div className="flex justify-center gap-4 mt-4 text-sm font-bold">
          <span className="flex items-center gap-2 text-gold-400 bg-gold-500/10 px-3 py-1 rounded-full"><span className="w-3 h-3 rounded-full bg-gold-400"></span> أحكام المد</span>
          <span className="flex items-center gap-2 text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full"><span className="w-3 h-3 rounded-full bg-blue-400"></span> أحكام الهمز</span>
          <span className="flex items-center gap-2 text-green-400 bg-green-500/10 px-3 py-1 rounded-full"><span className="w-3 h-3 rounded-full bg-green-400"></span> أحكام النقل</span>
        </div>
      </div>

      <div className="bg-navy-800/80 rounded-3xl border border-navy-700 shadow-2xl overflow-hidden backdrop-blur-sm">
        
        {/* Navigation & Header */}
        <div className="bg-navy-950 px-6 py-4 border-b border-navy-800 flex justify-between items-center">
          <button 
            onClick={handlePrev}
            disabled={currentVerse === 0}
            className="p-2 text-navy-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          <div className="text-center">
            <span className="text-gold-400 font-bold bg-navy-900 px-4 py-1.5 rounded-full border border-gold-500/20 text-sm shadow-inner">
              الشاهد {currentVerse + 1} من {labVerses.length}
            </span>
          </div>
          <button 
            onClick={handleNext}
            disabled={currentVerse === labVerses.length - 1}
            className="p-2 text-navy-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>

        {/* Verse Display (Interactive) */}
        <div className="p-8 md:p-14 text-center min-h-[300px] flex flex-col justify-center relative">
          <div className="absolute top-6 right-6 text-sm font-bold text-navy-400 border border-navy-700 bg-navy-900/50 px-3 py-1.5 rounded-lg shadow-sm">
            سورة {verse.surah} - آية {verse.ayah}
          </div>
          
          <div className="font-serif text-3xl md:text-5xl text-white leading-[2.5] md:leading-[2.5] mt-10 mb-6 flex flex-wrap justify-center gap-x-3 gap-y-6 dir-rtl">
            <span className="text-navy-500 ml-2">﴿</span>
            {verse.words.map((word, idx) => {
              const isSelected = selectedWordIdx === idx;
              let btnClass = "transition-all duration-300 relative inline-block rounded-lg px-2 cursor-default";
              
              if (word.ruleType === 'madd') {
                btnClass = "transition-all duration-300 relative inline-block rounded-lg px-2 cursor-pointer border-b-2 hover:bg-gold-500/20 border-gold-500 text-gold-300 bg-gold-500/10";
                if (isSelected) btnClass += " bg-gold-500/30 scale-110 shadow-[0_0_15px_rgba(212,175,55,0.4)]";
              } else if (word.ruleType === 'hamz') {
                btnClass = "transition-all duration-300 relative inline-block rounded-lg px-2 cursor-pointer border-b-2 hover:bg-blue-500/20 border-blue-500 text-blue-300 bg-blue-500/10";
                if (isSelected) btnClass += " bg-blue-500/30 scale-110 shadow-[0_0_15px_rgba(59,130,246,0.4)]";
              } else if (word.ruleType === 'naql') {
                btnClass = "transition-all duration-300 relative inline-block rounded-lg px-2 cursor-pointer border-b-2 hover:bg-green-500/20 border-green-500 text-green-300 bg-green-500/10";
                if (isSelected) btnClass += " bg-green-500/30 scale-110 shadow-[0_0_15px_rgba(34,197,94,0.4)]";
              }

              return (
                <span 
                  key={idx}
                  onClick={() => handleWordClick(idx, word.ruleType)}
                  className={btnClass}
                >
                  {word.text}
                </span>
              );
            })}
            <span className="text-navy-500 mr-2">﴾</span>
          </div>
        </div>

        {/* Interaction / Analysis Box */}
        <div className="bg-gradient-to-b from-navy-900 to-navy-950 p-8 border-t border-navy-700 min-h-[220px]">
          {!selectedWord ? (
            <div className="text-center h-full flex flex-col items-center justify-center opacity-70">
              <MousePointer2 className="w-12 h-12 text-navy-500 mb-4 animate-bounce" />
              <p className="text-navy-300 text-xl font-medium">
                قم بالضغط على الكلمات الملونة لعرض التحليل القرآني والحكم الخاص بها.
              </p>
            </div>
          ) : (
            <div className="animate-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-navy-800 p-4 rounded-xl border border-navy-700 shadow-inner">
                  <span className="font-serif text-3xl text-white">
                    {selectedWord.text}
                  </span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
                    <CheckCircle2 className={`w-6 h-6 ${
                      selectedWord.ruleType === 'madd' ? 'text-gold-400' :
                      selectedWord.ruleType === 'hamz' ? 'text-blue-400' : 'text-green-400'
                    }`} />
                    {selectedWord.ruleTitle}
                  </h3>
                  <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                    selectedWord.ruleType === 'madd' ? 'bg-gold-500/10 text-gold-400 border border-gold-500/20' :
                    selectedWord.ruleType === 'hamz' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-green-500/10 text-green-400 border border-green-500/20'
                  }`}>
                    {selectedWord.ruleType === 'madd' ? 'قسم المدود' : selectedWord.ruleType === 'hamz' ? 'قسم الهمزات' : 'قسم النقل'}
                  </span>
                </div>
              </div>
              
              <div className="bg-navy-800/50 border border-navy-700 p-6 rounded-2xl">
                <div className="flex items-center gap-2 text-navy-300 font-bold mb-3">
                  <Info className="w-5 h-5" />
                  توجيه القراءة (لورش عن نافع)
                </div>
                <p className="text-white text-xl leading-loose">
                  {selectedWord.ruleDesc}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
