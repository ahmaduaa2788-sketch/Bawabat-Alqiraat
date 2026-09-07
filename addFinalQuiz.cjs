const fs = require('fs');
let code = fs.readFileSync('src/data/courseMap.ts', 'utf-8');

code = code.replace(
  '{ id: "lab-1", title: "المختبر القرآني (تطبيقات شاملة)", type: "interactive" }',
  '{ id: "lab-1", title: "المختبر القرآني (تطبيقات شاملة)", type: "interactive" },\n      { id: "final-quiz", title: "الاختبار الشامل", type: "quiz" }'
);

fs.writeFileSync('src/data/courseMap.ts', code);

let lessonCode = fs.readFileSync('src/pages/Lesson.tsx', 'utf-8');
if (!lessonCode.includes('ComprehensiveQuiz')) {
  lessonCode = lessonCode.replace(
    "import { QuranicLab } from '../components/QuranicLab';",
    "import { QuranicLab } from '../components/QuranicLab';\nimport { ComprehensiveQuiz } from '../components/ComprehensiveQuiz';"
  );
  
  // Need to add handler for 'final-quiz'
  // Currently lab is in unit-14? No, lab was just intercepted by lessonId === 'lab-1'
  lessonCode = lessonCode.replace(
    "} else if (lessonId === 'lab-1') {\n      content = <QuranicLab />;\n    } else {",
    "} else if (lessonId === 'lab-1') {\n      content = <QuranicLab />;\n    } else if (lessonId === 'final-quiz') {\n      content = <ComprehensiveQuiz onComplete={handleMarkCompleteAndContinue} />;\n    } else {"
  );
  
  // But wait! qalun vs warsh in Lesson.tsx
  // Let's check Lesson.tsx first.
}
