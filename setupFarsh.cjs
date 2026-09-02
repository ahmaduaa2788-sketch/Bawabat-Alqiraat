const fs = require('fs');

const surahs = [
  'الفاتحة', 'البقرة', 'آل عمران', 'النساء', 'المائدة', 'الأنعام', 'الأعراف', 'الأنفال', 'التوبة', 'يونس', 'هود', 'يوسف', 'الرعد', 'إبراهيم', 'الحجر', 'النحل', 'الإسراء', 'الكهف', 'مريم', 'طه', 'الأنبياء', 'الحج', 'المؤمنون', 'النور', 'الفرقان', 'الشعراء', 'النمل', 'القصص', 'العنكبوت', 'الروم', 'لقمان', 'السجدة', 'الأحزاب', 'سبأ', 'فاطر', 'يس', 'الصافات', 'ص', 'الزمر', 'غافر', 'فصلت', 'الشورى', 'الزخرف', 'الدخان', 'الجاثية', 'الأحقاف', 'محمد', 'الفتح', 'الحجرات', 'ق', 'الذاريات', 'الطور', 'النجم', 'القمر', 'الرحمن', 'الواقعة', 'الحديد', 'المجادلة', 'الحشر', 'الممتحنة', 'الصف', 'الجمعة', 'المنافقون', 'التغابن', 'الطلاق', 'التحريم', 'الملك', 'القلم', 'الحاقة', 'المعارج', 'نوح', 'الجن', 'المزمل', 'المدثر', 'القيامة', 'الإنسان', 'المرسلات', 'النبأ', 'النازعات', 'عبس', 'التكوير', 'الانفطار', 'المطففين', 'الانشقاق', 'البروج', 'الطارق', 'الأعلى', 'الغاشية', 'الفجر', 'البلد', 'الشمس', 'الليل', 'الضحى', 'الشرح', 'التين', 'العلق', 'القدر', 'البينة', 'الزلزلة', 'العاديات', 'القارعة', 'التكاثر', 'العصر', 'الهمزة', 'الفيل', 'قريش', 'الماعون', 'الكوثر', 'الكافرون', 'النصر', 'المسد', 'الإخلاص', 'الفلق', 'الناس'
];

let dataStr = fs.readFileSync('src/data/quranFarsh.ts', 'utf-8');
const exportIndex = dataStr.indexOf('export const quranFarsh');
let rawObj = dataStr.substring(exportIndex);
rawObj = rawObj.replace('export const quranFarsh: Record<string, FarshRule[]> = ', 'return ');

let oldObj = new Function(rawObj)();

// Add missing surahs with empty array if they don't exist in oldObj
// Note: oldObj has "مريم وما بعدها", "الصافات إلى الحجرات", "ق إلى الناس" which were grouped.
// Let's migrate them accurately where possible, or just keep the ones we have and let the user add the rest.
// I will distribute the grouped ones back to their surahs based on the comments or just leave them and clear the group.

let newObj = {};
for (const surah of surahs) {
  newObj[surah] = oldObj[surah] || [];
}

// Manually mapping the grouped ones
// "مريم وما بعدها" -> مريم, طه, الشعراء, يس
if (oldObj["مريم وما بعدها"]) {
    newObj["مريم"] = [oldObj["مريم وما بعدها"][0], oldObj["مريم وما بعدها"][1], oldObj["مريم وما بعدها"][2]]; // ayah 19, 63, 69
    newObj["الشعراء"] = [oldObj["مريم وما بعدها"][3]]; // ayah 176
    newObj["يس"] = [oldObj["مريم وما بعدها"][4]]; // ayah 1
}
if (oldObj["الصافات إلى الحجرات"]) {
    newObj["الصافات"] = [oldObj["الصافات إلى الحجرات"][0]]; // ayah 130
    newObj["ص"] = [oldObj["الصافات إلى الحجرات"][1]]; // ayah 57
    newObj["الزخرف"] = [oldObj["الصافات إلى الحجرات"][2]]; // ayah 19
    newObj["الفتح"] = [oldObj["الصافات إلى الحجرات"][3]]; // ayah 17
}
if (oldObj["ق إلى الناس"]) {
    newObj["القمر"] = [oldObj["ق إلى الناس"][0]]; // ayah 15
    newObj["المعارج"] = [oldObj["ق إلى الناس"][1]]; // ayah 31
    newObj["المطففين"] = [oldObj["ق إلى الناس"][2]]; // ayah 14
    newObj["الفجر"] = [oldObj["ق إلى الناس"][3]]; // ayah 23
    newObj["الإخلاص"] = [oldObj["ق إلى الناس"][4]]; // ayah 4
}

// Generate new TS content
const output = `export type FarshRule = {
  ayah: number;
  hafs: string;
  warsh: string;
  rule: string;
};

export const surahsList = ${JSON.stringify(surahs)};

export const quranFarsh: Record<string, FarshRule[]> = ${JSON.stringify(newObj, null, 2)};
`;
fs.writeFileSync('src/data/quranFarsh.ts', output);
console.log('quranFarsh.ts generated!');
