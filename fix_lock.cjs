const fs = require('fs');
const path = 'src/pages/CourseView.tsx';
let code = fs.readFileSync(path, 'utf8');

const targetContent = `const isLessonCompleted = completedLessons.includes(\`\${rawiId}-\${unit.id}-\${lesson.id}\`);
                      const isFinalQuiz = lesson.id === 'final-quiz';
                      
                      // Check if all OTHER lessons are complete
                      let canAccessLesson = true;
                      let lockReason = "";
                      
                      if (isFinalQuiz && role !== 'admin') {
                        // total lessons minus 1 (the final quiz itself)
                        const completedOtherLessons = completedCount - (isLessonCompleted ? 1 : 0);
                        if (completedOtherLessons < totalLessons - 1) {
                          canAccessLesson = false;
                          lockReason = "يجب اجتياز جميع الدروس والاختبارات القصيرة أولاً";
                        }
                      }`;

const replacementContent = `const isLessonCompleted = completedLessons.includes(\`\${rawiId}-\${unit.id}-\${lesson.id}\`);
                      const isFinalSection = unit.id === 'unit-14' || unit.id === 'final';
                      
                      // Check if all OTHER lessons are complete
                      let canAccessLesson = true;
                      let lockReason = "";
                      
                      if (role !== 'admin' && isFinalSection) {
                        const completedOtherLessons = completedCount - (isLessonCompleted ? 1 : 0);
                        if (completedOtherLessons < totalLessons - unit.lessons.length) {
                          canAccessLesson = false;
                          lockReason = "يجب اجتياز جميع الدروس والاختبارات القصيرة أولاً";
                        }
                      }`;

// We will use replace with string replacing logic that ignores slight whitespace differences
const regex = /const isLessonCompleted = completedLessons\.includes\(`\$\{rawiId\}-\$\{unit\.id\}-\$\{lesson\.id\}`\);\s*const isFinalQuiz = lesson\.id === 'final-quiz';\s*\/\/ Check if all OTHER lessons are complete\s*let canAccessLesson = true;\s*let lockReason = "";\s*if \(isFinalQuiz && role !== 'admin'\) \{\s*\/\/ total lessons minus 1 \(the final quiz itself\)\s*const completedOtherLessons = completedCount - \(isLessonCompleted \? 1 : 0\);\s*if \(completedOtherLessons < totalLessons - 1\) \{\s*canAccessLesson = false;\s*lockReason = "يجب اجتياز جميع الدروس والاختبارات القصيرة أولاً";\s*\}\s*\}/m;

if (regex.test(code)) {
    code = code.replace(regex, replacementContent);
    fs.writeFileSync(path, code);
    console.log("Replaced successfully!");
} else {
    console.log("Could not match the regex.");
}
