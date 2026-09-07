const fs = require('fs');
let code = fs.readFileSync('src/components/QuranicLab.tsx', 'utf-8');

const newVerses = `const labVerses: LabVerse[] = [
  {
    id: 1,
    surah: "الفاتحة",
    ayah: 1,
    words: [
      { text: "بِسۡمِ", ruleType: 'none' },
      { text: "اِ۬للَّهِ", ruleType: 'none' },
      { text: "اِ۬لرَّحۡمَٰنِ", ruleType: 'none' },
      { text: "اِ۬لرَّحِيمِ", ruleType: 'none', ruleTitle: 'البسملة', ruleDesc: 'يقرأ ورش بالبسملة أو السكت أو الوصل بين السورتين.' },
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
      { text: "وَبِالَآخِرَةِ", ruleType: 'naql', ruleTitle: 'النقل ومد البدل', ruleDesc: 'ينقل ورش حركة الهمزة (الفتحة) إلى اللام الساكنة قبلها وتحذف الهمزة، ويصبح فيها مد بدل بأوجهه الثلاثة.' },
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
      { text: "ءَا۬نذَرۡتَهُمۡ", ruleType: 'hamz', ruleTitle: 'الهمزتان من كلمة (المفتوحتان)', ruleDesc: 'قرأها ورش بوجهين: التسهيل، والإبدال ألفاً تُمد إشباعاً لسكون النون.' },
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
    ayah: 142,
    words: [
      { text: "سَيَقُولُ", ruleType: 'none' },
      { text: "اَ۬لسُّفَهَآءُ", ruleType: 'madd', ruleTitle: 'المد المتصل', ruleDesc: 'يقرأ ورش المتصل بالإشباع (6 حركات).' },
      { text: "مِنَ", ruleType: 'none' },
      { text: "اَ۬لنَّاسِ", ruleType: 'none' },
      { text: "مَا", ruleType: 'none' },
      { text: "وَلَّىٰهُمۡ", ruleType: 'naql', ruleTitle: 'الفتح والتقليل', ruleDesc: 'من ذوات الياء، يقرأها ورش بالوجهين: الفتح، والتقليل (بين الفتح والإمالة).' },
      { text: "عَن", ruleType: 'none' },
      { text: "قِبۡلَتِهِمُ", ruleType: 'none' },
      { text: "اَ۬لَّتِي", ruleType: 'none' },
      { text: "كَانُواْ", ruleType: 'none' },
      { text: "عَلَيۡهَا", ruleType: 'none' }
    ]
  },
  {
    id: 5,
    surah: "القيامة",
    ayah: 27,
    words: [
      { text: "وَقِيلَ", ruleType: 'none' },
      { text: "مَن", ruleType: 'none' },
      { text: "رَّاقٖ", ruleType: 'naql', ruleTitle: 'ترك السكت والإدغام', ruleDesc: 'يقرأ ورش بترك السكت على النون في (مَن)، فيدغم النون في الراء إدغاماً كاملاً بغير غنة (مَرَّاق).' }
    ]
  },
  {
    id: 6,
    surah: "الأعلى",
    ayah: 9,
    words: [
      { text: "فَذَكِّرۡ", ruleType: 'naql', ruleTitle: 'ترقيق الراء', ruleDesc: 'قرأ ورش بترقيق الراء لأنها سبقت بكسر أصلي متصل.' },
      { text: "إِن", ruleType: 'none' },
      { text: "نَّفَعَتِ", ruleType: 'none' },
      { text: "اِ۬لذِّكۡرَىٰ", ruleType: 'naql', ruleTitle: 'التقليل وترقيق الراء', ruleDesc: 'الراء مرققة، والكلمة من ذوات الراء ففيها التقليل قولاً واحداً لورش.' }
    ]
  }
];`;

const oldArrRegex = /const labVerses: LabVerse\[\] = \[[\s\S]*?\];/;
code = code.replace(oldArrRegex, newVerses);
fs.writeFileSync('src/components/QuranicLab.tsx', code);
