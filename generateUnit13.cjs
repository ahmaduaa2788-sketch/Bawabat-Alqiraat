const fs = require('fs');

const content = `import React, { useState } from 'react';
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

const SurahSection = ({ title, intro, data }: { title: string, intro: string, data: FarshRule[] }) => {
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
      </div>
    </div>
  );
};

export const unit13Content: Record<string, React.ReactNode> = {
  'u13-l1': <SurahSection title="سورة الفاتحة" intro="بيان اختلافات ورش عن حفص في سورة الفاتحة من كتاب الثمر اليانع." data={quranFarsh["الفاتحة"] || []} />,
  'u13-l2': <SurahSection title="سورة البقرة" intro="بيان اختلافات ورش عن حفص في سورة البقرة." data={quranFarsh["البقرة"] || []} />,
  'u13-l3': <SurahSection title="سورة آل عمران" intro="جاري استكمال الجدول من الكتاب." data={[]} />,
  'u13-l4': <SurahSection title="سورة النساء" intro="جاري استكمال الجدول من الكتاب." data={[]} />,
  'u13-l5': <SurahSection title="سورة المائدة إلى الأعراف" intro="جاري استكمال الجدول من الكتاب." data={[]} />,
  'u13-l6': <SurahSection title="سورة الأنفال إلى النور" intro="جاري استكمال الجدول من الكتاب." data={[]} />,
  'u13-l7': <SurahSection title="سورة الفرقان إلى يس" intro="جاري استكمال الجدول من الكتاب." data={[]} />,
  'u13-l8': <SurahSection title="سورة الصافات إلى الحجرات" intro="جاري استكمال الجدول من الكتاب." data={[]} />,
  'u13-l9': <SurahSection title="سورة ق إلى الناس" intro="جاري استكمال الجدول من الكتاب." data={[]} />
};
`;

fs.writeFileSync('src/data/unit13.tsx', content);
console.log('Done updating unit13');
