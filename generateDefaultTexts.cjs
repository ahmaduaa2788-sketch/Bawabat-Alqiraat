const fs = require('fs');
const path = require('path');

const files = [
  { file: "src/data/unit0.tsx", rawi: "warsh", unit: "unit-0" },
  { file: "src/data/unit1.tsx", rawi: "warsh", unit: "unit-1" },
  { file: "src/data/unit2.tsx", rawi: "warsh", unit: "unit-2" },
  { file: "src/data/unit3.tsx", rawi: "warsh", unit: "unit-3" },
  { file: "src/data/unit4.tsx", rawi: "warsh", unit: "unit-4" },
  { file: "src/data/unit5.tsx", rawi: "warsh", unit: "unit-5" },
  { file: "src/data/unit6.tsx", rawi: "warsh", unit: "unit-6" },
  { file: "src/data/unit7.tsx", rawi: "warsh", unit: "unit-7" },
  { file: "src/data/unit8.tsx", rawi: "warsh", unit: "unit-8" },
  { file: "src/data/unit9.tsx", rawi: "warsh", unit: "unit-9" },
  { file: "src/data/unit10.tsx", rawi: "warsh", unit: "unit-10" },
  { file: "src/data/unit11.tsx", rawi: "warsh", unit: "unit-11" },
  { file: "src/data/unit12.tsx", rawi: "warsh", unit: "unit-12" },
  { file: "src/data/unit13.tsx", rawi: "warsh", unit: "unit-13" },
  { file: "src/data/qalunUnit0.tsx", rawi: "qalun", unit: "unit-0" },
  { file: "src/data/qalunUnit1.tsx", rawi: "qalun", unit: "unit-1" },
  { file: "src/data/qalunUnit2.tsx", rawi: "qalun", unit: "unit-2" },
  { file: "src/data/qalunUnit3.tsx", rawi: "qalun", unit: "unit-3" },
  { file: "src/data/qalunUnit4.tsx", rawi: "qalun", unit: "unit-4" },
  { file: "src/data/qalunUnit5.tsx", rawi: "qalun", unit: "unit-5" }
];

function cleanJsxToMarkdown(jsx) {
  let text = jsx;
  // Convert headers
  text = text.replace(/<h2[^>]*>(.*?)<\/h2>/gis, "\n\n## $1\n\n");
  text = text.replace(/<h3[^>]*>(.*?)<\/h3>/gis, "\n\n### $1\n\n");
  text = text.replace(/<h4[^>]*>(.*?)<\/h4>/gis, "\n\n#### $1\n\n");
  // Convert Quranic spans
  text = text.replace(/<span[^>]*font-serif[^>]*>﴿?(.*?)﴾?<\/span>/gis, " ﴿$1﴾ ");
  // Convert strong / b
  text = text.replace(/<strong[^>]*>(.*?)<\/strong>/gis, "**$1**");
  text = text.replace(/<b[^>]*>(.*?)<\/b>/gis, "**$1**");
  // Convert list items
  text = text.replace(/<li[^>]*>(.*?)<\/li>/gis, "\n* $1");
  // Convert paragraphs
  text = text.replace(/<p[^>]*>(.*?)<\/p>/gis, "\n\n$1\n\n");
  // Strip JSX components like <BookOpen ... />
  text = text.replace(/<[A-Z][A-Za-z0-9]*[^>]*\/>/g, "");
  // Strip generic HTML tags
  text = text.replace(/<[^>]+>/g, " ");
  // Normalization
  text = text.replace(/&nbsp;/g, " ")
             .replace(/&amp;/g, "&")
             .replace(/&quot;/g, "\"")
             .replace(/&lt;/g, "<")
             .replace(/&gt;/g, ">")
             .replace(/[ \t]+/g, " ")
             .replace(/\n\s*\n\s*\n+/g, "\n\n")
             .trim();
  return text;
}

const defaultTexts = {};

for (const item of files) {
  if (fs.existsSync(item.file)) {
    const content = fs.readFileSync(item.file, "utf8");
    const regex = /(["\x27])([a-zA-Z0-9_\-]+)\1\s*:\s*\(\s*(<div[\s\S]*?<\/div>)\s*\)[,\n]/g;
    let m;
    while ((m = regex.exec(content)) !== null) {
      const lessonId = m[2];
      const jsx = m[3];
      const markdown = cleanJsxToMarkdown(jsx);
      // Key: rawi-unit-lessonId (e.g. warsh-unit-1-u1-l1 or qalun-unit-1-u1-l1)
      const globalKey = `${item.rawi}-${item.unit}-${lessonId}`;
      defaultTexts[globalKey] = markdown;
      // Also store just lessonId for fallback
      if (!defaultTexts[lessonId]) {
        defaultTexts[lessonId] = markdown;
      }
    }
  }
}

const outContent = `// Auto-generated default lesson text contents for editing & fallbacks
export const defaultLessonTexts: Record<string, string> = ${JSON.stringify(defaultTexts, null, 2)};

export function getDefaultLessonText(rawiId: string, unitId: string, lessonId: string): string {
  const globalKey = \`\${rawiId}-\${unitId}-\${lessonId}\`;
  if (defaultLessonTexts[globalKey]) {
    return defaultLessonTexts[globalKey];
  }
  if (defaultLessonTexts[lessonId]) {
    return defaultLessonTexts[lessonId];
  }
  return "## محتوى الدرس\\n\\nاكتب المادة العلمية وقواعد هذا الدرس هنا...";
}
`;

fs.writeFileSync("src/data/defaultLessonTexts.ts", outContent, "utf8");
console.log("Successfully generated src/data/defaultLessonTexts.ts with", Object.keys(defaultTexts).length, "entries");
