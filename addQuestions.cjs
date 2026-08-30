const fs = require('fs');

let content = fs.readFileSync('src/data/courseMap.ts', 'utf8');

// Update Lesson interface
if (!content.includes('export interface QuickQuestion')) {
  content = content.replace(
    "export interface Lesson {",
    "export interface QuickQuestion {\n  question: string;\n  options: string[];\n  correctAnswer: number;\n}\n\nexport interface Lesson {"
  );

  content = content.replace(
    "type: 'text' | 'interactive' | 'quiz';",
    "type: 'text' | 'interactive' | 'quiz';\n  quickQuestion?: QuickQuestion;"
  );
}

// Map of unit 13 replacement
const newUnit13 = `id: "unit-13",
    title: "قسم فرش الحروف",
    description: "الخلافات الفرشية مرتبة حسب سور القرآن الكريم.",
    shahed: "وَبَعْدُ فَإِنِّي فِي الْفُرُوشِ لَنَاظِمٌ ... مَقَالِيدَ مَا حَوَتْهُ أَيْدِي الرُّوَاةِ فَاقْبَلاَ",
    lessons: [
      { id: "u13-l1", title: "سورة الفاتحة", type: "text" },
      { id: "u13-l2", title: "سورة البقرة", type: "text" },
      { id: "u13-l3", title: "سورة آل عمران", type: "text" },
      { id: "u13-l4", title: "سورة النساء", type: "text" },
      { id: "u13-l5", title: "سورة المائدة إلى الأعراف", type: "text" },
      { id: "u13-l6", title: "سورة الأنفال إلى النور", type: "text" },
      { id: "u13-l7", title: "سورة الفرقان إلى يس", type: "text" },
      { id: "u13-l8", title: "سورة الصافات إلى الحجرات", type: "text" },
      { id: "u13-l9", title: "سورة ق إلى الناس", type: "text" }
    ]`;

content = content.replace(/id: "unit-13",[\s\S]*?\]/, newUnit13);

fs.writeFileSync('src/data/courseMap.ts', content);
console.log('courseMap.ts updated.');
