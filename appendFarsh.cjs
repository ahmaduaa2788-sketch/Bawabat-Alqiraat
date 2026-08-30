const fs = require('fs');

const alimran = [
  { ayah: 3, hafs: "التَّوْرَاةَ", warsh: "التَّوْرٰةَ", rule: "تقليل فتحة الراء والألف" },
  { ayah: 4, hafs: "هُدًى", warsh: "هُدًى", rule: "وقفا وجهان: 1. الفتح 2. التقليل" },
  { ayah: 5, hafs: "يَخْفَىٰ", warsh: "يَخْفَىٰ", rule: "وجهان: 1. الفتح 2. التقليل" },
  { ayah: 6, hafs: "يُصَوِّرُكُمْ", warsh: "يُصَوِّرُكُمْ", rule: "ترقيق الراء" },
  { ayah: 7, hafs: "تَأْوِيلِهِ", warsh: "تَاوِيلِهِ", rule: "إبدال الهمزة ألفا (الموضعين)" },
  { ayah: 10, hafs: "النَّارِ", warsh: "النَّارِ", rule: "تقليل فتحة النون والألف" },
  { ayah: 12, hafs: "وَبِئْسَ", warsh: "وَبِيسَ", rule: "إبدال الهمزة ياء" },
  { ayah: 13, hafs: "وَأُخْرَىٰ", warsh: "وَأُخْرَىٰ", rule: "تقليل فتحة الراء والألف" },
  { ayah: 13, hafs: "كَافِرَةٌ", warsh: "كَافِرَةٌ", rule: "ترقيق الراء" },
  { ayah: 13, hafs: "يَرَوْنَهُم", warsh: "تَرَوْنَهُم", rule: "بالتاء بدل الياء" },
  { ayah: 13, hafs: "يُؤَيِّدُ", warsh: "يُويِّدُ", rule: "إبدال الهمزة واوا مفتوحة" },
  { ayah: 13, hafs: "يَشَاءُ ۗ إِنَّ", warsh: "يَشَاءُ ۗ إِنَّ", rule: "وجهان: 1. إبدال الهمزة الثانية واوا مكسورة 2. تسهيلها بين الهمزة والياء" },
  { ayah: 13, hafs: "لَعِبْرَةً", warsh: "لَعِبْرَةً", rule: "ترقيق الراء" },
  { ayah: 13, hafs: "الْأَبْصَارِ", warsh: "الَابْصَارِ", rule: "نقل وتقليل فتحة الصاد والألف" },
  { ayah: 14, hafs: "الدُّنْيَا", warsh: "الدُّنْيَا", rule: "وجهان: 1. الفتح 2. التقليل" },
  { ayah: 15, hafs: "قُلْ أَؤُنَبِّئُكُم", warsh: "قُلَ اَؤُنَبِّئُكُم", rule: "نقل ثم تسهيل الهمزة الثانية" },
  { ayah: 15, hafs: "بَصِيرٌ", warsh: "بَصِيرٌ", rule: "ترقيق الراء وصلا ووقفا" },
  { ayah: 16, hafs: "النَّارِ", warsh: "النَّارِ", rule: "تقليل فتحة النون والألف" },
  { ayah: 17, hafs: "بِالْأَسْحَارِ", warsh: "بِالَاسْحَارِ", rule: "نقل وتقليل فتحة الحاء والألف" }
];

let dataStr = fs.readFileSync('src/data/quranFarsh.ts', 'utf-8');
// Insert it inside the object
dataStr = dataStr.replace('  "البقرة":', '  "آل عمران": ' + JSON.stringify(alimran, null, 2) + ',\n  "البقرة":');

fs.writeFileSync('src/data/quranFarsh.ts', dataStr);
console.log('Appended Al Imran');
