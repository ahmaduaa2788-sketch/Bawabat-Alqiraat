const fs = require('fs');
let code = fs.readFileSync('src/pages/Lesson.tsx', 'utf-8');

// Move courseBaseUrl up
code = code.replace(
  "const courseBaseUrl = `/course/${qariId}/${rawiId}/${tariqId}`;",
  ""
);

code = code.replace(
  "const lessonGlobalId = `${rawiId}-${unitId}-${lessonId}`;",
  "const lessonGlobalId = `${rawiId}-${unitId}-${lessonId}`;\n  const courseBaseUrl = `/course/${qariId}/${rawiId}/${tariqId}`;"
);

fs.writeFileSync('src/pages/Lesson.tsx', code);
