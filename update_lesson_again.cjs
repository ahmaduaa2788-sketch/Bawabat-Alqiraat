const fs = require('fs');
const path = 'src/pages/Lesson.tsx';
let code = fs.readFileSync(path, 'utf8');

const imports = `import { QalunUnit4Quiz } from '../components/QalunUnit4Quiz';
import { QalunUnit5Quiz } from '../components/QalunUnit5Quiz';
import { QalunComprehensiveQuiz } from '../components/QalunComprehensiveQuiz';\n`;

// add imports after QalunUnit3Quiz
const importRegex = /import \{ QalunUnit3Quiz \} from '\.\.\/components\/QalunUnit3Quiz';/;
if (importRegex.test(code)) {
    code = code.replace(importRegex, `import { QalunUnit3Quiz } from '../components/QalunUnit3Quiz';\n${imports}`);
}

const qalunBlockRegex = /if \(unitId === 'unit-3'\) \{\s*content = <QalunUnit3Quiz onComplete=\{handleMarkCompleteAndContinue\} \/>;\s*\} else \{\s*content = <div className="p-8 bg-navy-800 rounded-xl text-center text-gold-400">قسم الاختبارات قيد التطوير لهذا الباب\.<br\/><button onClick=\{handleMarkCompleteAndContinue\} className="mt-4 px-6 py-2 bg-gold-500 text-navy-900 rounded-lg">تخطي مؤقتاً<\/button><\/div>;\s*\}/;

const newQalunBlock = `if (unitId === 'unit-3') {
        content = <QalunUnit3Quiz onComplete={handleMarkCompleteAndContinue} />;
      } else if (unitId === 'unit-4') {
        content = <QalunUnit4Quiz onComplete={handleMarkCompleteAndContinue} />;
      } else if (unitId === 'unit-5') {
        content = <QalunUnit5Quiz onComplete={handleMarkCompleteAndContinue} />;
      } else if (lessonId === 'final-quiz') {
        content = <QalunComprehensiveQuiz onComplete={handleMarkCompleteAndContinue} />;
      } else {
        content = <div className="p-8 bg-navy-800 rounded-xl text-center text-gold-400">قسم الاختبارات قيد التطوير لهذا الباب.<br/><button onClick={handleMarkCompleteAndContinue} className="mt-4 px-6 py-2 bg-gold-500 text-navy-900 rounded-lg">تخطي مؤقتاً</button></div>;
      }`;

if (qalunBlockRegex.test(code)) {
    code = code.replace(qalunBlockRegex, newQalunBlock);
    fs.writeFileSync(path, code);
    console.log("Updated Lesson.tsx successfully.");
} else {
    console.log("Could not find qalun block 2 in Lesson.tsx");
}
