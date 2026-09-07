import React, { useState } from 'react';
import { Info, Play, Pause, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface WaqfWord {
  text: string;
  waqf: 'تام' | 'كاف' | 'حسن' | 'قبيح' | 'ممنوع';
  ibtida: 'جائز' | 'قبيح';
  explanation: string;
}

const waqfData: WaqfWord[] = [
  // المقطع الأول
  { text: 'يَا أَيُّهَا', waqf: 'قبيح', ibtida: 'جائز', explanation: 'لا يجوز الوقف على أداة النداء وفصلها عن المنادى.' },
  { text: 'الَّذِينَ', waqf: 'قبيح', ibtida: 'قبيح', explanation: 'الوقف على الاسم الموصول دون صلته قبيح يخل بالمعنى.' },
  { text: 'آمَنُوا', waqf: 'حسن', ibtida: 'جائز', explanation: 'وقف حسن لتعلق ما بعده به في المعنى واللفظ.' },
  { text: 'لَا', waqf: 'قبيح', ibtida: 'جائز', explanation: 'الوقف على (لا) الناهية دون الفعل المنهي عنه قبيح.' },
  { text: 'تَقْرَبُوا', waqf: 'قبيح', ibtida: 'قبيح', explanation: 'لا يوقف على الفعل دون المفعول به.' },
  { text: 'الصَّلَاةَ', waqf: 'كاف', ibtida: 'جائز', explanation: 'وقف كافٍ لاكتمال الجملة، ولكن ما بعده حال متعلق بما قبله.' },
  { text: 'وَأَنتُمْ', waqf: 'قبيح', ibtida: 'جائز', explanation: 'لا يوقف على المبتدأ دون خبره.' },
  { text: 'سُكَارَىٰ', waqf: 'تام', ibtida: 'جائز', explanation: 'وقف تام لاكتمال المعنى المراد تماماً.' },
  // فاصل
  { text: 'ۖ', waqf: 'كاف', ibtida: 'جائز', explanation: 'علامة صلة (صلى) تفيد أن الوصل أولى مع جواز الوقف.' },
  // المقطع الثاني (آية أخرى كمثال)
  { text: 'وَيْلٌ', waqf: 'قبيح', ibtida: 'جائز', explanation: 'مبتدأ لا يوقف عليه دون خبره.' },
  { text: 'لِّلْمُطَفِّفِينَ', waqf: 'تام', ibtida: 'جائز', explanation: 'نهاية الآية والوقف على رؤوس الآي سُنّة.' },
  { text: 'الَّذِينَ', waqf: 'قبيح', ibtida: 'جائز', explanation: 'الابتداء به جائز، ولكن الوقف عليه دون صلته قبيح.' },
  { text: 'إِذَا', waqf: 'قبيح', ibtida: 'جائز', explanation: 'أداة شرط لا يوقف عليها دون فعل الشرط.' },
  { text: 'اكْتَالُوا', waqf: 'قبيح', ibtida: 'قبيح', explanation: 'الوقف دون متعلق الفعل (على الناس) غير مكتمل المعنى.' },
  { text: 'عَلَى', waqf: 'قبيح', ibtida: 'قبيح', explanation: 'حرف جر لا يوقف عليه.' },
  { text: 'النَّاسِ', waqf: 'حسن', ibtida: 'جائز', explanation: 'وقف حسن لارتباطه بجواب الشرط بعده.' },
  { text: 'يَسْتَوْفُونَ', waqf: 'تام', ibtida: 'جائز', explanation: 'نهاية الآية واكتمال المعنى والوقف سُنّة.' },
];

export function WaqfIbtidaTool() {
  const [selectedWord, setSelectedWord] = useState<number | null>(null);

  const getWaqfColor = (type: string) => {
    switch (type) {
      case 'تام': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'كاف': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'حسن': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'قبيح': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'ممنوع': return 'bg-red-700/20 text-red-500 border-red-700/30';
      default: return 'bg-navy-800 text-white border-navy-700';
    }
  };

  const getWaqfIcon = (type: string) => {
    switch (type) {
      case 'تام':
      case 'كاف':
      case 'حسن':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'قبيح':
      case 'ممنوع':
        return <XCircle className="w-5 h-5 text-red-400" />;
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  return (
    <div className="bg-navy-900 border border-navy-700 rounded-2xl overflow-hidden shadow-2xl my-8">
      <div className="bg-navy-950 px-6 py-4 border-b border-navy-800 flex items-center justify-between">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Pause className="text-gold-500 w-5 h-5" />
          المعمل التفاعلي: الوقف والابتداء
        </h3>
        <span className="text-navy-400 text-sm">انقر على أي كلمة لمعرفة حكم الوقف عليها</span>
      </div>

      <div className="p-8 md:p-12 text-center min-h-[200px] flex flex-col justify-center bg-navy-900/50">
        <div className="font-quran text-3xl md:text-5xl text-white leading-[2.5] md:leading-[2.5] flex flex-wrap justify-center gap-x-3 gap-y-6 dir-rtl">
          <span className="text-navy-500 ml-2">﴿</span>
          {waqfData.map((word, idx) => (
            <span
              key={idx}
              onClick={() => setSelectedWord(idx)}
              className={`transition-all duration-300 relative inline-block rounded-lg px-2 cursor-pointer border-b-2 
                ${selectedWord === idx 
                  ? 'bg-navy-800 border-gold-500 text-gold-300 scale-110 shadow-lg' 
                  : 'border-transparent hover:bg-navy-800 hover:border-navy-600'}`}
            >
              {word.text}
            </span>
          ))}
          <span className="text-navy-500 mr-2">﴾</span>
        </div>
      </div>

      {selectedWord !== null && (
        <div className="bg-gradient-to-b from-navy-950 to-navy-900 p-6 border-t border-navy-800 animate-in slide-in-from-bottom-2">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <h4 className="text-2xl font-bold text-gold-400 mb-4 font-quran">
                {waqfData[selectedWord].text}
              </h4>
              <p className="text-navy-200 leading-relaxed mb-4">
                {waqfData[selectedWord].explanation}
              </p>
            </div>
            
            <div className="flex flex-col gap-3 min-w-[200px]">
              <div className={`p-4 rounded-xl border flex items-center justify-between ${getWaqfColor(waqfData[selectedWord].waqf)}`}>
                <span className="font-bold">حكم الوقف:</span>
                <div className="flex items-center gap-2">
                  <span>{waqfData[selectedWord].waqf}</span>
                  {getWaqfIcon(waqfData[selectedWord].waqf)}
                </div>
              </div>
              <div className={`p-4 rounded-xl border flex items-center justify-between ${getWaqfColor(waqfData[selectedWord].ibtida)}`}>
                <span className="font-bold">حكم الابتداء:</span>
                <div className="flex items-center gap-2">
                  <span>{waqfData[selectedWord].ibtida}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
