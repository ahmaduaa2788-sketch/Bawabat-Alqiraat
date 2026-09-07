const fs = require('fs');

let content = fs.readFileSync('src/pages/Lesson.tsx', 'utf-8');

// Imports
if (!content.includes('qalunCourseMap')) {
  content = content.replace(
    "import { courseMap } from '../data/courseMap';",
    "import { courseMap } from '../data/courseMap';\nimport { qalunCourseMap } from '../data/qalunCourseMap';\nimport { qalunContentMap } from '../data/qalunCourseContent';"
  );
}

// Unit and lesson lookup
const oldUnitLookup = `  const unit = courseMap.find(u => u.id === unitId);
  const lesson = unit?.lessons.find(l => l.id === lessonId);
  const lessonIndex = unit?.lessons.findIndex(l => l.id === lessonId) ?? -1;`;

const newUnitLookup = `  const currentMap = rawiId === 'qalun' ? qalunCourseMap : courseMap;
  const unit = currentMap.find(u => u.id === unitId);
  const lesson = unit?.lessons.find(l => l.id === lessonId);
  const lessonIndex = unit?.lessons.findIndex(l => l.id === lessonId) ?? -1;`;

content = content.replace(oldUnitLookup, newUnitLookup);

// Content mapping logic
const oldContentLogic = `  let content = null;
  if (unitId === 'unit-0') {`;

const newContentLogic = `  let content = null;
  if (rawiId === 'qalun') {
    if (lesson?.type === 'quiz') {
      content = <div className="p-8 bg-navy-800 rounded-xl text-center text-gold-400">قسم الاختبارات قيد التطوير لراوي قالون. <br/><button onClick={handleMarkCompleteAndContinue} className="mt-4 px-6 py-2 bg-gold-500 text-navy-900 rounded-lg">تخطي مؤقتاً</button></div>;
    } else if (lessonId === 'lab-1') {
      content = <QuranicLab />;
    } else {
      content = qalunContentMap[lesson.id];
    }
  } else if (unitId === 'unit-0') {`;

content = content.replace(oldContentLogic, newContentLogic);

// Next lesson calculation
const nextLessonLogicSearch = `    if (lessonIndex < unit.lessons.length - 1) {
      return unit.lessons[lessonIndex + 1];
    }
    const unitIndex = courseMap.findIndex(u => u.id === unitId);
    if (unitIndex < courseMap.length - 1) {
      return courseMap[unitIndex + 1].lessons[0];
    }
    return null;
  })();`;

const nextLessonLogicReplace = `    if (lessonIndex < unit.lessons.length - 1) {
      return unit.lessons[lessonIndex + 1];
    }
    const unitIndex = currentMap.findIndex(u => u.id === unitId);
    if (unitIndex < currentMap.length - 1) {
      return currentMap[unitIndex + 1].lessons[0];
    }
    return null;
  })();`;

content = content.replace(nextLessonLogicSearch, nextLessonLogicReplace);

// Unit Title Header mapping
const unitTitleHeaderSearch = `{courseMap.find(u => u.id === unitId)?.title}`;
const unitTitleHeaderReplace = `{currentMap.find(u => u.id === unitId)?.title}`;
// Note: might be in the code added previously
if (content.includes(unitTitleHeaderSearch)) {
  content = content.replace(unitTitleHeaderSearch, unitTitleHeaderReplace);
}

fs.writeFileSync('src/pages/Lesson.tsx', content);
