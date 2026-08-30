const fs = require('fs');

const baqarahRest = [
  { ayah: 85, hafs: "تَظَاهَرُونَ", warsh: "تَظَّاهَرُونَ", rule: "بتشديد الظاء" },
  { ayah: 85, hafs: "أُسَارَى", warsh: "أُسَارَى", rule: "إثبات الألف (وتقليلها لورش)" },
  { ayah: 85, hafs: "تَفْدُوهُمْ", warsh: "تُفَادُوهُمْ", rule: "بضم التاء وإثبات الألف" },
  { ayah: 85, hafs: "تَعْمَلُونَ", warsh: "يَعْمَلُونَ", rule: "بالياء (ياء الغيب) بدل التاء" },
  { ayah: 119, hafs: "وَلَا تُسْأَلُ", warsh: "وَلَا تَسْأَلْ", rule: "بجزم اللام على أنها (لا) الناهية" },
  { ayah: 125, hafs: "وَاتَّخِذُوا", warsh: "وَاتَّخَذُوا", rule: "بفتح الخاء على أنه فعل ماضٍ" },
  { ayah: 132, hafs: "وَوَصَّى", warsh: "وَأَوْصَى", rule: "بهمزة مفتوحة وإسكان الواو" },
  { ayah: 140, hafs: "تَقُولُونَ", warsh: "يَقُولُونَ", rule: "بالياء (ياء الغيب)" },
  { ayah: 143, hafs: "لَرَءُوفٌ", warsh: "لَرَءُوفٌ", rule: "إثبات الواو وفيها ثلاثة البدل" },
  { ayah: 184, hafs: "فِدْيَةٌ طَعَامُ مِسْكِينٍ", warsh: "فِدْيَةُ طَعَامِ مَسَاكِينَ", rule: "بحذف تنوين فدية وجر طعام وجمع مسكين" },
  { ayah: 189, hafs: "الْبُيُوتَ", warsh: "الْبِيُوتَ", rule: "بكسر الباء" },
  { ayah: 214, hafs: "حَتَّى يَقُولَ", warsh: "حَتَّى يَقُولُ", rule: "برفع اللام" },
  { ayah: 219, hafs: "كَبِيرٌ", warsh: "كَثِيرٌ", rule: "بالثاء المثلثة بدل الباء" },
  { ayah: 240, hafs: "وَصِيَّةً", warsh: "وَصِيَّةٌ", rule: "برفع التاء" },
  { ayah: 245, hafs: "فَيُضَاعِفَهُ", warsh: "فَيُضَاعِفُهُ", rule: "برفع الفاء" },
  { ayah: 245, hafs: "وَيَبْسُطُ", warsh: "وَيَبْصُطُ", rule: "بالصاد الخالصة" },
  { ayah: 259, hafs: "نُنشِزُهَا", warsh: "نُنشِرُهَا", rule: "بالراء المهملة بدل الزاي" },
  { ayah: 271, hafs: "وَيُكَفِّرُ", warsh: "وَنُكَفِّرُ", rule: "بالنون والرفع" },
  { ayah: 285, hafs: "وَكُتُبِهِ", warsh: "وَكِتَابِهِ", rule: "بالإفراد" }
];

const alimranFull = [
  { ayah: 13, hafs: "يَرَوْنَهُم", warsh: "تَرَوْنَهُم", rule: "بتاء الخطاب" },
  { ayah: 37, hafs: "وَكَفَّلَهَا", warsh: "وَكَفَلَهَا", rule: "بتخفيف الفاء" },
  { ayah: 37, hafs: "زَكَرِيَّا", warsh: "زَكَرِيَّاءُ", rule: "بالهمز والرفع" },
  { ayah: 81, hafs: "لَمَا ءَاتَيْتُكُم", warsh: "لَمَا ءَاتَيْنَاكُم", rule: "بنون العظمة والألف" },
  { ayah: 146, hafs: "قَاتَلَ", warsh: "قُتِلَ", rule: "بالبناء للمجهول (ضم القاف وكسر التاء)" },
  { ayah: 157, hafs: "يَجْمَعُونَ", warsh: "تَجْمَعُونَ", rule: "بالتاء بدل الياء" }
];

const nisaFull = [
  { ayah: 1, hafs: "تَسَاءَلُونَ", warsh: "تَسَّاءَلُونَ", rule: "بتشديد السين" },
  { ayah: 11, hafs: "يُوصِي", warsh: "يُوصَى", rule: "البناء للمجهول (فتح الصاد)" },
  { ayah: 12, hafs: "يُوصِينَ", warsh: "يُوصَى", rule: "البناء للمجهول" },
  { ayah: 40, hafs: "يُضَاعِفْهَا", warsh: "يُضَعِّفْهَا", rule: "بحذف الألف وتشديد العين" },
  { ayah: 152, hafs: "يُؤْتِيهِمْ", warsh: "نُوتِيهِمْ", rule: "بنون العظمة وإبدال الهمزة واوا" }
];

const maidahFull = [
  { ayah: 54, hafs: "يَرْتَدَّ", warsh: "يَرْتَدِدْ", rule: "بدالين (فك الإدغام)" },
  { ayah: 67, hafs: "رِسَالَتَهُ", warsh: "رِسَالَاتِهِ", rule: "بالجمع وكسر التاء" },
  { ayah: 109, hafs: "الْغُيُوبِ", warsh: "الْغُيُوبِ", rule: "بضم الغين كحفص" }
];

const anamFull = [
  { ayah: 16, hafs: "يُصْرَفْ", warsh: "يَصْرِفْ", rule: "بالبناء للمعلوم (فتح الياء وكسر الراء)" },
  { ayah: 115, hafs: "كَلِمَتُ", warsh: "كَلِمَاتُ", rule: "بالجمع" },
  { ayah: 137, hafs: "زَيَّنَ", warsh: "زَيَّنَ", rule: "بناء للمعلوم كحفص" }
];

let dataStr = fs.readFileSync('src/data/quranFarsh.ts', 'utf-8');

// Find where "البقرة" ends
const startBaqarah = dataStr.indexOf('"البقرة": [');
if (startBaqarah > -1) {
    const endBaqarah = dataStr.indexOf(']', startBaqarah) + 1;
    let baqarahJson = JSON.parse(dataStr.substring(startBaqarah + '"البقرة": '.length, endBaqarah));
    baqarahJson = baqarahJson.concat(baqarahRest);
    
    // Create new entries
    let replacement = '"البقرة": ' + JSON.stringify(baqarahJson, null, 2) + ',\\n';
    replacement += '  "آل عمران": ' + JSON.stringify(alimranFull, null, 2) + ',\\n';
    replacement += '  "النساء": ' + JSON.stringify(nisaFull, null, 2) + ',\\n';
    replacement += '  "المائدة": ' + JSON.stringify(maidahFull, null, 2) + ',\\n';
    replacement += '  "الأنعام": ' + JSON.stringify(anamFull, null, 2);
    
    let newDataStr = dataStr.substring(0, startBaqarah) + replacement + dataStr.substring(endBaqarah);
    fs.writeFileSync('src/data/quranFarsh.ts', newDataStr);
    console.log('Appended data successfully');
}
