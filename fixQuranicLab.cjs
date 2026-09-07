const fs = require('fs');
let content = fs.readFileSync('src/components/QuranicLab.tsx', 'utf-8');

const qalunLabVersesStr = `const qalunLabVerses: LabVerse[] = [
  {
    id: 1,
    surah: "البقرة",
    ayah: 6,
    words: [
      { text: "إِنَّ", ruleType: 'none' },
      { text: "ٱلَّذِينَ", ruleType: 'none' },
      { text: "كَفَرُواْ", ruleType: 'none' },
      { text: "سَوَآءٌ", ruleType: 'madd', ruleTitle: 'المد المتصل', ruleDesc: 'يقرأه قالون بالتوسط (4 حركات).' },
      { text: "عَلَيۡهِمۡ", ruleType: 'naql', ruleTitle: 'ميم الجمع', ruleDesc: 'يقرأ قالون بوجهين: إسكان الميم، أو صلتها بواو لفظية تمد حركتين (عَلَيْهِمُو).' },
      { text: "ءَأَنذَرۡتَهُمۡ", ruleType: 'hamz', ruleTitle: 'الهمزتان من كلمة (المفتوحتان)', ruleDesc: 'يقرأها قالون بتسهيل الهمزة الثانية مع إدخال ألف بينهما (ءَاـأَنذَرْتَهُمْ).' },
      { text: "أَمۡ", ruleType: 'none' },
      { text: "لَمۡ", ruleType: 'none' },
      { text: "تُنذِرۡهُمۡ", ruleType: 'naql', ruleTitle: 'ميم الجمع', ruleDesc: 'يقرأ قالون بوجهين: الإسكان أو الصلة.' },
      { text: "لَا", ruleType: 'none' },
      { text: "يُؤۡمِنُونَ", ruleType: 'none' }
    ]
  },
  {
    id: 2,
    surah: "البقرة",
    ayah: 4,
    words: [
      { text: "وَٱلَّذِينَ", ruleType: 'none' },
      { text: "يُؤۡمِنُونَ", ruleType: 'none' },
      { text: "بِمَآ", ruleType: 'madd', ruleTitle: 'المد المنفصل', ruleDesc: 'يقرأه قالون بوجهين: القصر (حركتان) وهو المقدم، أو التوسط (4 حركات).' },
      { text: "أُنزِلَ", ruleType: 'none' },
      { text: "إِلَيۡكَ", ruleType: 'none' },
      { text: "وَمَآ", ruleType: 'madd', ruleTitle: 'المد المنفصل', ruleDesc: 'له القصر والتوسط.' },
      { text: "أُنزِلَ", ruleType: 'none' },
      { text: "مِن", ruleType: 'none' },
      { text: "قَبۡلِكَ", ruleType: 'none' },
      { text: "وَبِٱلۡأٓخِرَةِ", ruleType: 'none' },
      { text: "هُمۡ", ruleType: 'naql', ruleTitle: 'ميم الجمع', ruleDesc: 'له فيها وجهان: الإسكان أو الصلة.' },
      { text: "يُوقِنُونَ", ruleType: 'none' }
    ]
  }
];`;

content = content.replace("export function QuranicLab() {", "import { useParams } from 'react-router-dom';\n\n" + qalunLabVersesStr + "\n\nexport function QuranicLab() {");
content = content.replace("export function QuranicLab() {", "export function QuranicLab() {\n  const { rawiId } = useParams<{ rawiId: string }>();\n  const isQalun = rawiId === 'qalun';\n  const currentLabVerses = isQalun ? qalunLabVerses : labVerses;");

content = content.replace("const verse = labVerses[currentVerse];", "const verse = currentLabVerses[currentVerse];");
content = content.replace("if (currentVerse < labVerses.length - 1) {", "if (currentVerse < currentLabVerses.length - 1) {");
content = content.replace("currentVerse === labVerses.length - 1", "currentVerse === currentLabVerses.length - 1");
content = content.replace("الشاهد {currentVerse + 1} من {labVerses.length}", "الشاهد {currentVerse + 1} من {currentLabVerses.length}");

content = content.replace("الأحكام الأصولية عند الإمام ورش (المدود، الهمز، والنقل)", "{isQalun ? 'الأحكام الأصولية عند الإمام قالون (المدود، الهمز، ميم الجمع)' : 'الأحكام الأصولية عند الإمام ورش (المدود، الهمز، والنقل)'}");
content = content.replace("توجيه القراءة (لورش عن نافع)", "{isQalun ? 'توجيه القراءة (لقالون عن نافع)' : 'توجيه القراءة (لورش عن نافع)'}");
content = content.replace("'قسم النقل'", "{isQalun ? 'ميم الجمع' : 'قسم النقل'}");
content = content.replace("'قسم النقل'", "{isQalun ? 'ميم الجمع' : 'قسم النقل'}");

fs.writeFileSync('src/components/QuranicLab.tsx', content);
