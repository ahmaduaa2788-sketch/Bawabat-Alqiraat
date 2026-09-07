const fs = require('fs');
let code = fs.readFileSync('src/data/courseMap.ts', 'utf-8');

const unit13Code = `  {
    id: "unit-13",
    title: "الباب الثالث عشر: الوقف والابتداء",
    description: "معرفة الوقوف ومواضع الابتداء الجائزة والممنوعة.",
    lessons: [
      { id: "waqf-tool", title: "أداة الوقف والابتداء التفاعلية", type: "interactive" }
    ]
  },`;

if (!code.includes('unit-13')) {
  // Insert before unit-14
  code = code.replace(
    '  {\n    id: "unit-14",',
    unit13Code + '\n  {\n    id: "unit-14",'
  );
  fs.writeFileSync('src/data/courseMap.ts', code);
}
