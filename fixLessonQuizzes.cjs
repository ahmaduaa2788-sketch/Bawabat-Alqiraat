const fs = require('fs');
let lessonContent = fs.readFileSync('src/pages/Lesson.tsx', 'utf-8');

lessonContent = lessonContent.replace(
  "import { Unit2Quiz } from '../components/Unit2Quiz';",
  "import { Unit2Quiz } from '../components/Unit2Quiz';\nimport { Unit3Quiz } from '../components/Unit3Quiz';\nimport { Unit8Quiz } from '../components/Unit8Quiz';"
);

lessonContent = lessonContent.replace(
  "} else if (unitId === 'unit-3') {\n    content = unit3Content[lesson.id];",
  "} else if (unitId === 'unit-3') {\n    if (lesson.type === 'quiz') {\n      content = <Unit3Quiz onComplete={handleMarkCompleteAndContinue} />;\n    } else {\n      content = unit3Content[lesson.id];\n    }"
);

lessonContent = lessonContent.replace(
  "} else if (unitId === 'unit-8') {\n    content = unit8Content[lesson.id];",
  "} else if (unitId === 'unit-8') {\n    if (lesson.type === 'quiz') {\n      content = <Unit8Quiz onComplete={handleMarkCompleteAndContinue} />;\n    } else {\n      content = unit8Content[lesson.id];\n    }"
);

fs.writeFileSync('src/pages/Lesson.tsx', lessonContent);
