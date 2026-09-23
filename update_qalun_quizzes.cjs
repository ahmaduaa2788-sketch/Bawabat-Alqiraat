const fs = require('fs');
const path = 'src/pages/Lesson.tsx';
let code = fs.readFileSync(path, 'utf8');

const imports = `import { QalunUnit0Quiz } from '../components/QalunUnit0Quiz';
import { QalunUnit1Quiz } from '../components/QalunUnit1Quiz';
import { QalunUnit2Quiz } from '../components/QalunUnit2Quiz';
import { QalunUnit3Quiz } from '../components/QalunUnit3Quiz';\n`;

// add imports after other component imports
const importRegex = /import \{ Unit3Quiz \} from '\.\.\/components\/Unit3Quiz';/;
if (importRegex.test(code)) {
    code = code.replace(importRegex, `import { Unit3Quiz } from '../components/Unit3Quiz';\n${imports}`);
}

const qalunBlockRegex = /if \(rawiId === 'qalun'\) \{\s*if \(lesson\?\.type === 'quiz'\) \{\s*content = <div className="p-8 bg-navy-800 rounded-xl text-center text-gold-400">قسم الاختبارات قيد التطوير لراوي قالون\. <br\/><button onClick=\{handleMarkCompleteAndContinue\} className="mt-4 px-6 py-2 bg-gold-500 text-navy-900 rounded-lg">تخطي مؤقتاً<\/button><\/div>;\s*\} else if \(lessonId === 'lab-1'\) \{\s*content = <QuranicLab \/>;\s*\} else \{\s*content = qalunContentMap\[lesson\.id\];\s*\}\s*\}/;

const newQalunBlock = `if (rawiId === 'qalun') {
    if (lesson?.type === 'quiz') {
      if (unitId === 'unit-0') {
        content = <QalunUnit0Quiz onComplete={handleMarkCompleteAndContinue} />;
      } else if (unitId === 'unit-1') {
        content = <QalunUnit1Quiz onComplete={handleMarkCompleteAndContinue} />;
      } else if (unitId === 'unit-2') {
        content = <QalunUnit2Quiz onComplete={handleMarkCompleteAndContinue} />;
      } else if (unitId === 'unit-3') {
        content = <QalunUnit3Quiz onComplete={handleMarkCompleteAndContinue} />;
      } else {
        content = <div className="p-8 bg-navy-800 rounded-xl text-center text-gold-400">قسم الاختبارات قيد التطوير لهذا الباب.<br/><button onClick={handleMarkCompleteAndContinue} className="mt-4 px-6 py-2 bg-gold-500 text-navy-900 rounded-lg">تخطي مؤقتاً</button></div>;
      }
    } else if (lessonId === 'lab-1') {
      content = <QuranicLab />;
    } else {
      content = qalunContentMap[lesson.id];
    }
  }`;

if (qalunBlockRegex.test(code)) {
    code = code.replace(qalunBlockRegex, newQalunBlock);
    fs.writeFileSync(path, code);
    console.log("Updated Lesson.tsx successfully.");
} else {
    console.log("Could not find qalun block in Lesson.tsx");
}
