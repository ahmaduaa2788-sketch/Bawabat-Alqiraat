const fs = require('fs');
let content = fs.readFileSync('src/pages/CourseView.tsx', 'utf-8');

// The displayMap logic we added:
//   let displayMap: any[] = [];
//   if (rawiId === 'warsh') {
//     displayMap = courseMap;
//   } else if (rawiId === 'qalun') {
//     displayMap = qalunCourseMap;
//   }

content = content.replace(
  "  if (rawiId === 'warsh') {",
  "  const hasContent = rawiId === 'warsh' || rawiId === 'qalun';\n  if (rawiId === 'warsh') {"
);

fs.writeFileSync('src/pages/CourseView.tsx', content);
