const fs = require('fs');

let code = fs.readFileSync('src/components/QuranicLab.tsx', 'utf-8');

// 1. Update RuleType
code = code.replace(
  "type RuleType = 'madd' | 'hamz' | 'naql' | 'none';",
  "type RuleType = 'madd' | 'hamz' | 'naql' | 'basmalah' | 'tarqiq' | 'taqlil' | 'taghliz' | 'none';"
);

// 2. Update Legend
const oldLegend = `<div className="flex justify-center gap-4 mt-4 text-sm font-bold">
          <span className="flex items-center gap-2 text-gold-400 bg-gold-500/10 px-3 py-1 rounded-full"><span className="w-3 h-3 rounded-full bg-gold-400"></span> أحكام المد</span>
          <span className="flex items-center gap-2 text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full"><span className="w-3 h-3 rounded-full bg-blue-400"></span> أحكام الهمز</span>
          <span className="flex items-center gap-2 text-green-400 bg-green-500/10 px-3 py-1 rounded-full"><span className="w-3 h-3 rounded-full bg-green-400"></span> أحكام النقل</span>
        </div>`;

const newLegend = `<div className="flex flex-wrap justify-center gap-3 mt-4 text-sm font-bold">
          <span className="flex items-center gap-2 text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full"><span className="w-3 h-3 rounded-full bg-purple-400"></span> البسملة</span>
          <span className="flex items-center gap-2 text-gold-400 bg-gold-500/10 px-3 py-1 rounded-full"><span className="w-3 h-3 rounded-full bg-gold-400"></span> أحكام المد</span>
          <span className="flex items-center gap-2 text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full"><span className="w-3 h-3 rounded-full bg-blue-400"></span> أحكام الهمز</span>
          <span className="flex items-center gap-2 text-green-400 bg-green-500/10 px-3 py-1 rounded-full"><span className="w-3 h-3 rounded-full bg-green-400"></span> أحكام النقل</span>
          <span className="flex items-center gap-2 text-teal-400 bg-teal-500/10 px-3 py-1 rounded-full"><span className="w-3 h-3 rounded-full bg-teal-400"></span> الراءات واللامات</span>
          <span className="flex items-center gap-2 text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full"><span className="w-3 h-3 rounded-full bg-orange-400"></span> الفتح والتقليل</span>
        </div>`;

code = code.replace(oldLegend, newLegend);

// 3. Update btnClass logic and Details logic
const oldBtnLogic = `if (word.ruleType === 'madd') {
                btnClass = "transition-all duration-300 relative inline-block rounded-lg px-2 cursor-pointer border-b-2 hover:bg-gold-500/20 border-gold-500 text-gold-300 bg-gold-500/10";
                if (isSelected) btnClass += " bg-gold-500/30 scale-110 shadow-[0_0_15px_rgba(212,175,55,0.4)]";
              } else if (word.ruleType === 'hamz') {
                btnClass = "transition-all duration-300 relative inline-block rounded-lg px-2 cursor-pointer border-b-2 hover:bg-blue-500/20 border-blue-500 text-blue-300 bg-blue-500/10";
                if (isSelected) btnClass += " bg-blue-500/30 scale-110 shadow-[0_0_15px_rgba(59,130,246,0.4)]";
              } else if (word.ruleType === 'naql') {
                btnClass = "transition-all duration-300 relative inline-block rounded-lg px-2 cursor-pointer border-b-2 hover:bg-green-500/20 border-green-500 text-green-300 bg-green-500/10";
                if (isSelected) btnClass += " bg-green-500/30 scale-110 shadow-[0_0_15px_rgba(34,197,94,0.4)]";
              }`;

const newBtnLogic = `if (word.ruleType === 'madd') {
                btnClass = "transition-all duration-300 relative inline-block rounded-lg px-2 cursor-pointer border-b-2 hover:bg-gold-500/20 border-gold-500 text-gold-300 bg-gold-500/10";
                if (isSelected) btnClass += " bg-gold-500/30 scale-110 shadow-[0_0_15px_rgba(212,175,55,0.4)]";
              } else if (word.ruleType === 'hamz') {
                btnClass = "transition-all duration-300 relative inline-block rounded-lg px-2 cursor-pointer border-b-2 hover:bg-blue-500/20 border-blue-500 text-blue-300 bg-blue-500/10";
                if (isSelected) btnClass += " bg-blue-500/30 scale-110 shadow-[0_0_15px_rgba(59,130,246,0.4)]";
              } else if (word.ruleType === 'naql') {
                btnClass = "transition-all duration-300 relative inline-block rounded-lg px-2 cursor-pointer border-b-2 hover:bg-green-500/20 border-green-500 text-green-300 bg-green-500/10";
                if (isSelected) btnClass += " bg-green-500/30 scale-110 shadow-[0_0_15px_rgba(34,197,94,0.4)]";
              } else if (word.ruleType === 'basmalah') {
                btnClass = "transition-all duration-300 relative inline-block rounded-lg px-2 cursor-pointer border-b-2 hover:bg-purple-500/20 border-purple-500 text-purple-300 bg-purple-500/10";
                if (isSelected) btnClass += " bg-purple-500/30 scale-110 shadow-[0_0_15px_rgba(168,85,247,0.4)]";
              } else if (word.ruleType === 'tarqiq' || word.ruleType === 'taghliz') {
                btnClass = "transition-all duration-300 relative inline-block rounded-lg px-2 cursor-pointer border-b-2 hover:bg-teal-500/20 border-teal-500 text-teal-300 bg-teal-500/10";
                if (isSelected) btnClass += " bg-teal-500/30 scale-110 shadow-[0_0_15px_rgba(20,184,166,0.4)]";
              } else if (word.ruleType === 'taqlil') {
                btnClass = "transition-all duration-300 relative inline-block rounded-lg px-2 cursor-pointer border-b-2 hover:bg-orange-500/20 border-orange-500 text-orange-300 bg-orange-500/10";
                if (isSelected) btnClass += " bg-orange-500/30 scale-110 shadow-[0_0_15px_rgba(249,115,22,0.4)]";
              }`;

code = code.replace(oldBtnLogic, newBtnLogic);


const oldDetailsIconLogic = `selectedWord.ruleType === 'madd' ? 'text-gold-400' :
                      selectedWord.ruleType === 'hamz' ? 'text-blue-400' : 'text-green-400'`;

const newDetailsIconLogic = `selectedWord.ruleType === 'madd' ? 'text-gold-400' :
                      selectedWord.ruleType === 'hamz' ? 'text-blue-400' : 
                      selectedWord.ruleType === 'basmalah' ? 'text-purple-400' :
                      (selectedWord.ruleType === 'tarqiq' || selectedWord.ruleType === 'taghliz') ? 'text-teal-400' :
                      selectedWord.ruleType === 'taqlil' ? 'text-orange-400' : 'text-green-400'`;

code = code.replace(oldDetailsIconLogic, newDetailsIconLogic);

const oldDetailsBadgeClass = `selectedWord.ruleType === 'madd' ? 'bg-gold-500/10 text-gold-400 border border-gold-500/20' :
                    selectedWord.ruleType === 'hamz' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-green-500/10 text-green-400 border border-green-500/20'`;

const newDetailsBadgeClass = `selectedWord.ruleType === 'madd' ? 'bg-gold-500/10 text-gold-400 border border-gold-500/20' :
                    selectedWord.ruleType === 'hamz' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 
                    selectedWord.ruleType === 'basmalah' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' :
                    (selectedWord.ruleType === 'tarqiq' || selectedWord.ruleType === 'taghliz') ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20' :
                    selectedWord.ruleType === 'taqlil' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' :
                    'bg-green-500/10 text-green-400 border border-green-500/20'`;

code = code.replace(oldDetailsBadgeClass, newDetailsBadgeClass);

const oldDetailsBadgeText = `selectedWord.ruleType === 'madd' ? 'قسم المدود' : selectedWord.ruleType === 'hamz' ? 'قسم الهمزات' : (isQalun ? 'ميم الجمع' : 'قسم النقل')`;

const newDetailsBadgeText = `selectedWord.ruleType === 'madd' ? 'قسم المدود' : 
                    selectedWord.ruleType === 'hamz' ? 'قسم الهمزات' : 
                    selectedWord.ruleType === 'basmalah' ? 'بين السورتين' :
                    (selectedWord.ruleType === 'tarqiq' || selectedWord.ruleType === 'taghliz') ? 'الراءات واللامات' :
                    selectedWord.ruleType === 'taqlil' ? 'الفتح والتقليل' :
                    (isQalun ? 'ميم الجمع' : 'قسم النقل')`;

code = code.replace(oldDetailsBadgeText, newDetailsBadgeText);

// 4. Update the actual verses
const newVerses = `const labVerses: LabVerse[] = [
  {
    id: 1,
    surah: "الفاتحة",
    ayah: 1,
    words: [
      { text: "بِسۡمِ", ruleType: 'none' },
      { text: "اِ۬للَّهِ", ruleType: 'none' },
      { text: "اِ۬لرَّحۡمَٰنِ", ruleType: 'none' },
      { text: "اِ۬لرَّحِيمِ", ruleType: 'basmalah', ruleTitle: 'البسملة', ruleDesc: 'يقرأ ورش بين السورتين بثلاثة أوجه: السكت (وهو المقدم)، والوصل، والبسملة. ولاحظ أن البسملة في الفاتحة آية رقم 1 تقرأ وجوباً عند الابتداء.' },
      { text: "اِ۬لۡحَمۡدُ", ruleType: 'none' },
      { text: "لِلَّهِ", ruleType: 'none' },
      { text: "رَبِّ", ruleType: 'none' },
      { text: "اِ۬لۡعَٰلَمِينَ", ruleType: 'none' }
    ]
  },
  {
    id: 2,
    surah: "البقرة",
    ayah: 4,
    words: [
      { text: "وَالَّذِينَ", ruleType: 'none' },
      { text: "يُومِنُونَ", ruleType: 'hamz', ruleTitle: 'إبدال الهمز المفرد', ruleDesc: 'تبدل الهمزة الساكنة الواقعة فاء للكلمة واواً خالصة.' },
      { text: "بِمَآ", ruleType: 'madd', ruleTitle: 'المد المنفصل', ruleDesc: 'يقرأه ورش بالإشباع (6 حركات).' },
      { text: "أُنزِلَ", ruleType: 'none' },
      { text: "إِلَيۡكَ", ruleType: 'none' },
      { text: "وَمَآ", ruleType: 'madd', ruleTitle: 'المد المنفصل', ruleDesc: 'يقرأه ورش بالإشباع (6 حركات).' },
      { text: "أُنزِلَ", ruleType: 'none' },
      { text: "مِن", ruleType: 'none' },
      { text: "قَبۡلِكَ", ruleType: 'none' },
      { text: "وَبِالَآخِرَةِ", ruleType: 'naql', ruleTitle: 'النقل ومد البدل', ruleDesc: 'ينقل ورش حركة الهمزة (الفتحة) إلى اللام الساكنة قبلها وتحذف الهمزة، ويصبح فيها مد بدل بأوجهه الثلاثة (القصر، التوسط، الإشباع).' },
      { text: "هُمۡ", ruleType: 'none' },
      { text: "يُوقِنُونَ", ruleType: 'none' }
    ]
  },
  {
    id: 3,
    surah: "البقرة",
    ayah: 6,
    words: [
      { text: "إِنَّ", ruleType: 'none' },
      { text: "اَ۬لَّذِينَ", ruleType: 'none' },
      { text: "كَفَرُواْ", ruleType: 'none' },
      { text: "سَوَآءٌ", ruleType: 'madd', ruleTitle: 'المد المتصل', ruleDesc: 'اجتمع حرف المد والهمز في كلمة واحدة. قرأها ورش بالإشباع (6 حركات).' },
      { text: "عَلَيۡهِمۡ", ruleType: 'none' },
      { text: "ءَا۬نذَرۡتَهُمۡ", ruleType: 'hamz', ruleTitle: 'الهمزتان من كلمة (المفتوحتان)', ruleDesc: 'قرأها ورش بوجهين: التسهيل بين الهمزة والألف، والإبدال ألفاً تُمد إشباعاً لسكون النون.' },
      { text: "أَمۡ", ruleType: 'none' },
      { text: "لَمۡ", ruleType: 'none' },
      { text: "تُنذِرۡهُمۡ", ruleType: 'none' },
      { text: "لَا", ruleType: 'none' },
      { text: "يُومِنُونَ", ruleType: 'hamz', ruleTitle: 'إبدال الهمز المفرد', ruleDesc: 'همزة ساكنة وقعت فاء للكلمة، يبدلها ورش واواً خالصة.' }
    ]
  },
  {
    id: 4,
    surah: "البقرة",
    ayah: 20,
    words: [
      { text: "إِنَّ", ruleType: 'none' },
      { text: "اَ۬للَّهَ", ruleType: 'none' },
      { text: "عَلَىٰ", ruleType: 'taqlil', ruleTitle: 'الفتح والتقليل في ذوات الياء', ruleDesc: 'من ذوات الياء، يقرأها ورش بالوجهين: الفتح، والتقليل.' },
      { text: "كُلِّ", ruleType: 'none' },
      { text: "شَيۡءٖ", ruleType: 'madd', ruleTitle: 'مد اللين المهموز', ruleDesc: 'ياء ساكنة مفتوح ما قبلها وبعدها همز. يقرأها ورش بالتوسط (4) أو الإشباع (6 حركات).' },
      { text: "قَدِيرٞ", ruleType: 'tarqiq', ruleTitle: 'ترقيق الراء', ruleDesc: 'الراء متطرفة ومسبوقة بياء ساكنة (مدية)، فترقق قولاً واحداً لورش وصلاً ووقفاً.' }
    ]
  },
  {
    id: 5,
    surah: "البقرة",
    ayah: 43,
    words: [
      { text: "وَأَقِيمُواْ", ruleType: 'none' },
      { text: "اَ۬لصَّلَوٰةَ", ruleType: 'taghliz', ruleTitle: 'تغليظ اللام', ruleDesc: 'لام مفتوحة سبقت بصاد مفتوحة. تغلظ اللام لورش وجهاً واحداً.' },
      { text: "وَءَاتُواْ", ruleType: 'madd', ruleTitle: 'مد البدل', ruleDesc: 'همز ممدود، لورش فيه الأوجه الثلاثة: القصر والتوسط والإشباع.' },
      { text: "اَ۬لزَّكَوٰةَ", ruleType: 'none' },
      { text: "وَارۡكَعُواْ", ruleType: 'none' },
      { text: "مَعَ", ruleType: 'none' },
      { text: "اَ۬لرَّٰكِعِينَ", ruleType: 'none' }
    ]
  },
  {
    id: 6,
    surah: "القيامة",
    ayah: 27,
    words: [
      { text: "وَقِيلَ", ruleType: 'none' },
      { text: "مَن", ruleType: 'none' },
      { text: "رَّاقٖ", ruleType: 'naql', ruleTitle: 'ترك السكت والإدغام', ruleDesc: 'يقرأ ورش بترك السكت على النون في (مَن) بخلاف حفص، فيدغم النون في الراء إدغاماً كاملاً بغير غنة (مَرَّاق).' }
    ]
  },
  {
    id: 7,
    surah: "الأعلى",
    ayah: 9,
    words: [
      { text: "فَذَكِّرۡ", ruleType: 'tarqiq', ruleTitle: 'ترقيق الراء', ruleDesc: 'قرأ ورش بترقيق الراء لأنها سبقت بكسر أصلي متصل.' },
      { text: "إِن", ruleType: 'none' },
      { text: "نَّفَعَتِ", ruleType: 'none' },
      { text: "اِ۬لذِّكۡرَىٰ", ruleType: 'taqlil', ruleTitle: 'التقليل قولا واحداً (ذوات الراء)', ruleDesc: 'الراء مرققة، والكلمة من ذوات الراء ففيها التقليل قولاً واحداً لورش.' }
    ]
  },
  {
    id: 8,
    surah: "الضحى",
    ayah: 1,
    words: [
      { text: "وَالضُّحَىٰ", ruleType: 'taqlil', ruleTitle: 'تقليل رؤوس الآي', ruleDesc: 'سورة الضحى من السور الإحدى عشرة التي يقرأ ورش رؤوس آياتها بالتقليل قولاً واحداً.' }
    ]
  }
];`;

const oldArrRegex = /const labVerses: LabVerse\[\] = \[[\s\S]*?\];/;
code = code.replace(oldArrRegex, newVerses);
fs.writeFileSync('src/components/QuranicLab.tsx', code);

console.log("QuranicLab updated successfully.");
