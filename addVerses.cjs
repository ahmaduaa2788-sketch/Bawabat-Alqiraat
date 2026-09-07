const fs = require('fs');
let code = fs.readFileSync('src/components/QuranicLab.tsx', 'utf-8');

const newWarshVerses = `const labVerses: LabVerse[] = [
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
  },
  {
    id: 3,
    surah: "آل عمران",
    ayah: 31,
    words: [
      { text: "قُلۡ", ruleType: 'none' },
      { text: "إِن", ruleType: 'none' },
      { text: "كُنتُمۡ", ruleType: 'none' },
      { text: "تُحِبُّونَ", ruleType: 'none' },
      { text: "ٱللَّهَ", ruleType: 'none' },
      { text: "فَٱتَّبِعُونِي", ruleType: 'none' },
      { text: "يُحۡبِبۡكُمُ", ruleType: 'none' },
      { text: "ٱللَّهُ", ruleType: 'none' },
      { text: "وَيَغۡفِرۡ", ruleType: 'none' },
      { text: "لَكُمۡ", ruleType: 'none' },
      { text: "ذُنُوبَكُمۡ", ruleType: 'none' },
      { text: "وَٱللَّهُ", ruleType: 'none' },
      { text: "غَفُورٞ", ruleType: 'none' },
      { text: "رَّحِيمٞ", ruleType: 'none' }
    ]
  },
  {
    id: 4,
    surah: "الفاتحة",
    ayah: 4,
    words: [
      { text: "مَٰلِكِ", ruleType: 'madd', ruleTitle: 'حذف الألف', ruleDesc: 'قرأ ورش (مَلِكِ) بحذف الألف، بخلاف حفص.' },
      { text: "يَوۡمِ", ruleType: 'none' },
      { text: "ٱلدِّينِ", ruleType: 'none' }
    ]
  },
  {
    id: 5,
    surah: "النازعات",
    ayah: 39,
    words: [
      { text: "فَإِنَّ", ruleType: 'none' },
      { text: "ٱلۡجَحِيمَ", ruleType: 'none' },
      { text: "هِيَ", ruleType: 'none' },
      { text: "ٱلۡمَأۡوَىٰ", ruleType: 'naql', ruleTitle: 'ذوات الياء (التقليل)', ruleDesc: 'كلمة المأوى من ذوات الياء، وفيها لورش التقليل وجهاً واحداً لأنها رأس آية.' }
    ]
  },
  {
    id: 6,
    surah: "القيامة",
    ayah: 27,
    words: [
      { text: "وَقِيلَ", ruleType: 'none' },
      { text: "مَنۡ", ruleType: 'none' },
      { text: "رَاقٖ", ruleType: 'naql', ruleTitle: 'ترك السكت والإدغام', ruleDesc: 'يقرأ ورش بترك السكت على النون في (مَن)، وبالتالي يدغم النون في الراء إدغاماً كاملاً بغير غنة (مَرَّاق).' }
    ]
  },
  {
    id: 7,
    surah: "البقرة",
    ayah: 142,
    words: [
      { text: "سَيَقُولُ", ruleType: 'none' },
      { text: "ٱلسُّفَهَآءُ", ruleType: 'madd', ruleTitle: 'المد المتصل', ruleDesc: 'قرأ ورش بالإشباع (6 حركات).' },
      { text: "مِنَ", ruleType: 'none' },
      { text: "ٱلنَّاسِ", ruleType: 'none' },
      { text: "مَا", ruleType: 'none' },
      { text: "وَلَّىٰهُمۡ", ruleType: 'naql', ruleTitle: 'الفتح والتقليل', ruleDesc: 'من ذوات الياء، يقرأها ورش بالوجهين: الفتح، والتقليل.' },
      { text: "عَن", ruleType: 'none' },
      { text: "قِبۡلَتِهِمُ", ruleType: 'none' },
      { text: "ٱلَّتِي", ruleType: 'none' },
      { text: "كَانُواْ", ruleType: 'none' },
      { text: "عَلَيۡهَا", ruleType: 'none' }
    ]
  },
  {
    id: 8,
    surah: "الأعلى",
    ayah: 9,
    words: [
      { text: "فَذَكِّرۡ", ruleType: 'naql', ruleTitle: 'ترقيق الراء', ruleDesc: 'قرأ ورش بترقيق الراء لأنها سبقت بكسر أصلي متصل.' },
      { text: "إِن", ruleType: 'none' },
      { text: "نَّفَعَتِ", ruleType: 'none' },
      { text: "ٱلذِّكۡرَىٰ", ruleType: 'naql', ruleTitle: 'ترقيق الراء والتقليل', ruleDesc: 'الراء مرققة، والكلمة من ذوات الراء ففيها التقليل قولاً واحداً لورش.' }
    ]
  }
];`;

const oldArrRegex = /const labVerses: LabVerse\[\] = \[[\s\S]*?\];/;
code = code.replace(oldArrRegex, newWarshVerses);
fs.writeFileSync('src/components/QuranicLab.tsx', code);
