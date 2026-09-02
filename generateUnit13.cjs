const fs = require('fs');
let dataStr = fs.readFileSync('src/data/unit13.tsx', 'utf-8');

// The exported unit13Content starts near the bottom
const exportIndex = dataStr.indexOf('export const unit13Content');
let baseContent = dataStr.substring(0, exportIndex);

// Add import of surahsList
if (!baseContent.includes('surahsList')) {
    baseContent = baseContent.replace("import { quranFarsh, FarshRule } from './quranFarsh';", "import { quranFarsh, FarshRule, surahsList } from './quranFarsh';");
}

let newContent = baseContent + `
export const unit13Content: Record<string, React.ReactNode> = {};

surahsList.forEach((surah, idx) => {
  const data = quranFarsh[surah] || [];
  
  unit13Content[\`u13-l\${idx + 1}\`] = (
    <SurahSection 
      title={\`سورة \${surah}\`} 
      intro={data.length > 0 ? \`بيان اختلافات ورش عن حفص في سورة \${surah} من كتاب الثمر اليانع.\` : ""} 
      data={data} 
    />
  );
});
`;

fs.writeFileSync('src/data/unit13.tsx', newContent);
console.log("Updated unit13.tsx");
