const fs = require('fs');
let code = fs.readFileSync('src/components/WaqfIbtidaTool.tsx', 'utf-8');

const oldWaqfData = `const waqfData: WaqfWord[] = [
  { text: 'يَا أَيُّهَا', waqf: 'قبيح', ibtida: 'جائز', explanation: 'لا يجوز الوقف على ياء النداء وفصلها عن المنادى.' },
  { text: 'الَّذِينَ', waqf: 'قبيح', ibtida: 'قبيح', explanation: 'الوقف على الموصول دون صلته قبيح.' },
  { text: 'آمَنُوا', waqf: 'كاف', ibtida: 'جائز', explanation: 'وقف كافٍ لتمام المعنى، وما بعده لا يتعلق به لفظاً.' },
  { text: 'لَا', waqf: 'قبيح', ibtida: 'جائز', explanation: 'الوقف على (لا) الناهية دون الفعل قبيح يخل بالمعنى.' },
  { text: 'تَقْرَبُوا', waqf: 'قبيح', ibtida: 'قبيح', explanation: 'لا يوقف على الفعل دون المفعول به إذا كان المعنى لا يتم إلا به.' },
  { text: 'الصَّلَاةَ', waqf: 'تام', ibtida: 'جائز', explanation: 'هنا الوقف تام، ولكن المعنى مرجأ إلى ما بعده.' },
  { text: 'وَأَنتُمْ', waqf: 'قبيح', ibtida: 'جائز', explanation: 'لا يوقف على المبتدأ دون خبره.' },
  { text: 'سُكَارَى', waqf: 'تام', ibtida: 'جائز', explanation: 'وقف تام لاكتمال المعنى المراد والنهي عن الصلاة في حالة السكر.' },
];`;

const newWaqfData = `const waqfData: WaqfWord[] = [
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
];`;

code = code.replace(oldWaqfData, newWaqfData);
fs.writeFileSync('src/components/WaqfIbtidaTool.tsx', code);
