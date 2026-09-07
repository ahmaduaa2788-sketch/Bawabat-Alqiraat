const fs = require('fs');

// Fix CourseView.tsx
let cv = fs.readFileSync('src/pages/CourseView.tsx', 'utf-8');
cv = cv.replace(/completedLessons\.includes\(\`\$\{unit\.id\}-\$\{l\.id\}\`\)/g, "completedLessons.includes(`${rawiId}-${unit.id}-${l.id}`)");
fs.writeFileSync('src/pages/CourseView.tsx', cv);

// Fix Lesson.tsx
let ls = fs.readFileSync('src/pages/Lesson.tsx', 'utf-8');
ls = ls.replace(/const lessonGlobalId = \`\$\{unitId\}-\$\{lessonId\}\`;/g, "const lessonGlobalId = `${rawiId}-${unitId}-${lessonId}`;");
fs.writeFileSync('src/pages/Lesson.tsx', ls);

