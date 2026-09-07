const fs = require('fs');
let code = fs.readFileSync('src/pages/Lesson.tsx', 'utf-8');

if (!code.includes('ComprehensiveQuiz')) {
  code = code.replace(
    "import { QuranicLab } from '../components/QuranicLab';",
    "import { QuranicLab } from '../components/QuranicLab';\nimport { ComprehensiveQuiz } from '../components/ComprehensiveQuiz';"
  );
  
  code = code.replace(
    "} else if (unitId === 'unit-14') {\n    content = <QuranicLab />;\n  }",
    "} else if (unitId === 'unit-14') {\n    if (lessonId === 'final-quiz') {\n      content = <ComprehensiveQuiz onComplete={handleMarkCompleteAndContinue} />;\n    } else {\n      content = <QuranicLab />;\n    }\n  }"
  );
  
  fs.writeFileSync('src/pages/Lesson.tsx', code);
}
