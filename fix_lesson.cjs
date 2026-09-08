const fs = require('fs');
const path = 'src/pages/Lesson.tsx';
let code = fs.readFileSync(path, 'utf8');

const regex = /if \(lessonId === 'final-quiz'\) \{\s*const displayMap = rawiId === 'qalun' \? qalunCourseMap : courseMap;\s*const totalLessons = displayMap\.reduce\(\(acc, u\) => acc \+ \(u\.lessons\?\.length \|\| 0\), 0\);\s*const completedCount = displayMap\.reduce\(\(acc, u\) => \{\s*return acc \+ \(u\.lessons\?\.filter\(l => completedLessons\.includes\(`\$\{rawiId\}-\$\{u\.id\}-\$\{l\.id\}`\)\)\.length \|\| 0\);\s*\}, 0\);\s*const isLessonCompleted = completedLessons\.includes\(`\$\{rawiId\}-\$\{unitId\}-\$\{lessonId\}`\);\s*const completedOtherLessons = completedCount - \(isLessonCompleted \? 1 : 0\);\s*const canAccessLesson = role === 'admin' \|\| completedOtherLessons >= totalLessons - 1;\s*if \(!canAccessLesson\) \{\s*content = \([\s\S]*?<\/[dD]iv>\s*\);\s*\} else \{\s*content = <ComprehensiveQuiz onComplete=\{handleMarkCompleteAndContinue\} \/>;\s*\}\s*\} else \{\s*content = <QuranicLab \/>;\s*\}/m;

const replacement = `const displayMap = rawiId === 'qalun' ? qalunCourseMap : courseMap;
      const totalLessons = displayMap.reduce((acc, u) => acc + (u.lessons?.length || 0), 0);
      const completedCount = displayMap.reduce((acc, u) => {
        return acc + (u.lessons?.filter(l => completedLessons.includes(\`\${rawiId}-\${u.id}-\${l.id}\`)).length || 0);
      }, 0);
      
      const isLessonCompleted = completedLessons.includes(\`\${rawiId}-\${unitId}-\${lessonId}\`);
      const completedOtherLessons = completedCount - (isLessonCompleted ? 1 : 0);
      // We subtract 2 because there are 2 lessons in unit 14 (lab-1 and final-quiz)
      const canAccessLesson = role === 'admin' || completedOtherLessons >= totalLessons - 2;

      if (!canAccessLesson) {
        content = (
          <div className="bg-navy-950/80 p-8 rounded-2xl border border-red-500/30 text-center max-w-2xl mx-auto shadow-2xl">
            <Lock className="w-16 h-16 mx-auto text-red-500 mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">القسم مقفل</h2>
            <p className="text-navy-300">يجب عليك إتمام جميع الدروس والاختبارات القصيرة السابقة أولاً.</p>
            <Link to={courseBaseUrl} className="mt-6 inline-block bg-navy-800 text-white px-6 py-2 rounded-xl hover:bg-navy-700 transition">العودة للمسار</Link>
          </div>
        );
      } else {
        if (lessonId === 'final-quiz') {
          content = <ComprehensiveQuiz onComplete={handleMarkCompleteAndContinue} />;
        } else {
          content = <QuranicLab />;
        }
      }`;

if (regex.test(code)) {
    code = code.replace(regex, replacement);
    fs.writeFileSync(path, code);
    console.log("Replaced successfully!");
} else {
    console.log("Could not match regex.");
}
