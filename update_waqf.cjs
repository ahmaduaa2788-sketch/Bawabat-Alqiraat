const fs = require('fs');
const path = 'src/components/WaqfIbtidaTool.tsx';
let code = fs.readFileSync(path, 'utf8');

const regex = /const waqfData: WaqfWord\[\] = \[[\s\S]*?\];/;

const newData = `const waqfData: WaqfWord[] = [
  // المقطع الأول
  { text: 'يَا أَيُّهَا', waqf: 'قبيح', ibtida: 'جائز', explanation: 'لا يجوز الوقف على أداة النداء وفصلها عن المنادى.' },
  { text: 'الَّذِينَ', waqf: 'قبيح', ibtida: 'قبيح', explanation: 'الوقف على الاسم الموصول دون صلته قبيح يخل بالمعنى.' },
  { text: 'آمَنُوا', waqf: 'حسن', ibtida: 'جائز', explanation: 'وقف حسن لتعلق ما بعده به في المعنى واللفظ.' },
  { text: 'لَا', waqf: 'قبيح', ibtida: 'جائز', explanation: 'الوقف على (لا) الناهية دون الفعل المنهي عنه قبيح.' },
  { text: 'تَقْرَبُوا', waqf: 'قبيح', ibtida: 'قبيح', explanation: 'لا يوقف على الفعل دون المفعول به.' },
  { text: 'الصَّلَاةَ', waqf: 'كاف', ibtida: 'جائز', explanation: 'وقف كافٍ لاكتمال الجملة، ولكن ما بعده حال متعلق بما قبله.' },
  { text: 'وَأَنتُمْ', waqf: 'قبيح', ibtida: 'جائز', explanation: 'لا يوقف على المبتدأ دون خبره.' },
  { text: 'سُكَارَىٰ', waqf: 'تام', ibtida: 'جائز', explanation: 'وقف تام لاكتمال المعنى المراد تماماً.' },
  { text: '۝', waqf: 'تام', ibtida: 'جائز', explanation: 'رأس آية.' },

  // المقطع الثاني (آية أخرى كمثال)
  { text: 'وَيْلٌ', waqf: 'قبيح', ibtida: 'جائز', explanation: 'مبتدأ لا يوقف عليه دون خبره.' },
  { text: 'لِّلْمُطَفِّفِينَ', waqf: 'تام', ibtida: 'جائز', explanation: 'نهاية الآية والوقف على رؤوس الآي سُنّة.' },
  { text: '۝', waqf: 'تام', ibtida: 'جائز', explanation: 'رأس آية.' },
  { text: 'الَّذِينَ', waqf: 'قبيح', ibtida: 'جائز', explanation: 'الابتداء به جائز، ولكن الوقف عليه دون صلته قبيح.' },
  { text: 'إِذَا', waqf: 'قبيح', ibtida: 'جائز', explanation: 'أداة شرط لا يوقف عليها دون فعل الشرط.' },
  { text: 'اكْتَالُوا', waqf: 'قبيح', ibtida: 'قبيح', explanation: 'الوقف دون متعلق الفعل (على الناس) غير مكتمل المعنى.' },
  { text: 'عَلَى', waqf: 'قبيح', ibtida: 'قبيح', explanation: 'حرف جر لا يوقف عليه.' },
  { text: 'النَّاسِ', waqf: 'حسن', ibtida: 'جائز', explanation: 'وقف حسن لارتباطه بجواب الشرط بعده.' },
  { text: 'يَسْتَوْفُونَ', waqf: 'تام', ibtida: 'جائز', explanation: 'نهاية الآية واكتمال المعنى والوقف سُنّة.' },
  { text: '۝', waqf: 'تام', ibtida: 'جائز', explanation: 'رأس آية.' },

  // المقطع الثالث (البقرة 7)
  { text: 'خَتَمَ', waqf: 'قبيح', ibtida: 'جائز', explanation: 'فعل لا يوقف عليه دون فاعله.' },
  { text: 'اللَّهُ', waqf: 'قبيح', ibtida: 'جائز', explanation: 'لا يوقف على الفاعل دون المفعول أو المتعلق.' },
  { text: 'عَلَىٰ', waqf: 'قبيح', ibtida: 'جائز', explanation: 'حرف جر لا يوقف عليه.' },
  { text: 'قُلُوبِهِمْ', waqf: 'حسن', ibtida: 'جائز', explanation: 'وقف حسن لاكتمال المعنى، لكن ما بعده معطوف عليه.' },
  { text: 'وَعَلَىٰ', waqf: 'قبيح', ibtida: 'جائز', explanation: 'حرف جر وعطف لا يوقف عليه.' },
  { text: 'سَمْعِهِمْ', waqf: 'تام', ibtida: 'جائز', explanation: 'وقف تام (أو كافٍ) لانتهاء الجملة، وما بعده مبتدأ جديد.' },
  { text: 'ۖ', waqf: 'كاف', ibtida: 'جائز', explanation: 'علامة وقف (صلى) تفيد جواز الوقف والوصل.' },
  { text: 'وَعَلَىٰ', waqf: 'قبيح', ibtida: 'جائز', explanation: 'لا يوقف على حرف الجر.' },
  { text: 'أَبْصَارِهِمْ', waqf: 'قبيح', ibtida: 'جائز', explanation: 'لا يوقف على الخبر المقدم دون المبتدأ المؤخر.' },
  { text: 'غِشَاوَةٌ', waqf: 'كاف', ibtida: 'جائز', explanation: 'وقف كافٍ لاكتمال الجملة الاسمية.' },
  { text: 'ۖ', waqf: 'كاف', ibtida: 'جائز', explanation: 'علامة وقف تفيد جواز الوقف.' },
  { text: 'وَلَهُمْ', waqf: 'قبيح', ibtida: 'جائز', explanation: 'لا يوقف على الخبر المقدم.' },
  { text: 'عَذَابٌ', waqf: 'قبيح', ibtida: 'جائز', explanation: 'لا يوقف على الموصوف دون صفته.' },
  { text: 'عَظِيمٌ', waqf: 'تام', ibtida: 'جائز', explanation: 'وقف تام على رأس الآية.' },
  { text: '۝', waqf: 'تام', ibtida: 'جائز', explanation: 'رأس آية.' },

  // المقطع الرابع (المائدة 73)
  { text: 'لَّقَدْ', waqf: 'قبيح', ibtida: 'جائز', explanation: 'حرف تحقيق لا يوقف عليه.' },
  { text: 'كَفَرَ', waqf: 'قبيح', ibtida: 'جائز', explanation: 'فعل لا يوقف عليه دون فاعله.' },
  { text: 'الَّذِينَ', waqf: 'قبيح', ibtida: 'جائز', explanation: 'اسم موصول يحتاج إلى صلته.' },
  { text: 'قَالُوا', waqf: 'قبيح', ibtida: 'جائز', explanation: 'فعل القول يحتاج إلى مقول القول.' },
  { text: 'إِنَّ', waqf: 'قبيح', ibtida: 'جائز', explanation: 'حرف توكيد لا يوقف عليه.' },
  { text: 'اللَّهَ', waqf: 'قبيح', ibtida: 'جائز', explanation: 'اسم إن لا يوقف عليه دون خبرها.' },
  { text: 'ثَالِثُ', waqf: 'قبيح', ibtida: 'جائز', explanation: 'مضاف لا يوقف عليه دون المضاف إليه.' },
  { text: 'ثَلَاثَةٍ', waqf: 'تام', ibtida: 'جائز', explanation: 'وقف تام لانتهاء مقول القول، وما بعده كلام جديد للرد عليهم.' },
  { text: 'ۘ', waqf: 'تام', ibtida: 'جائز', explanation: 'علامة وقف لازم (م) تفيد لزوم الوقف حتى لا يختلط كلام الله بكلام الكفار.' },
  { text: 'وَمَا', waqf: 'قبيح', ibtida: 'جائز', explanation: 'لا يوقف على النفي.' },
  { text: 'مِنْ', waqf: 'قبيح', ibtida: 'جائز', explanation: 'حرف جر.' },
  { text: 'إِلَٰهٍ', waqf: 'قبيح', ibtida: 'جائز', explanation: 'مستثنى منه يحتاج إلى أداة الاستثناء.' },
  { text: 'إِلَّا', waqf: 'قبيح', ibtida: 'جائز', explanation: 'أداة استثناء لا يوقف عليها.' },
  { text: 'إِلَٰهٌ', waqf: 'حسن', ibtida: 'جائز', explanation: 'وقف حسن.' },
  { text: 'وَاحِدٌ', waqf: 'تام', ibtida: 'جائز', explanation: 'وقف تام لاكتمال المعنى.' },
  { text: '۝', waqf: 'تام', ibtida: 'جائز', explanation: 'رأس آية.' }
];`;

if (regex.test(code)) {
    code = code.replace(regex, newData);
    fs.writeFileSync(path, code);
    console.log("Replaced successfully!");
} else {
    console.log("Could not match regex.");
}
