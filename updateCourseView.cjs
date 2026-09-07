const fs = require('fs');

let code = fs.readFileSync('src/pages/CourseView.tsx', 'utf-8');

if (!code.includes('useAuth')) {
  code = code.replace(
    "import { useProgress } from '../context/ProgressContext';",
    "import { useProgress } from '../context/ProgressContext';\nimport { useAuth } from '../context/AuthContext';"
  );
  
  code = code.replace(
    "const { completeTariq, completedTuruq, completedLessons } = useProgress();",
    "const { completeTariq, completedTuruq, completedLessons } = useProgress();\n  const { role } = useAuth();"
  );
}

const isAllLessonsCompletedCode = `  const totalLessons = displayMap.reduce((acc, unit) => acc + (unit.lessons?.length || 0), 0);
  const completedCount = displayMap.reduce((acc, unit) => {
    return acc + (unit.lessons?.filter(l => completedLessons.includes(\`\${rawiId}-\${unit.id}-\${l.id}\`)).length || 0);
  }, 0);
  const isAllLessonsCompleted = totalLessons > 0 && completedCount === totalLessons;
  const canTakeExam = isAllLessonsCompleted || role === 'admin';`;

code = code.replace(
  `const totalLessons = displayMap.reduce((acc, unit) => acc + (unit.lessons?.length || 0), 0);`,
  isAllLessonsCompletedCode
);

const examLinkCodeOld = `              {!isComplete ? (
                <Link 
                  to={\`/exam/\${qariId}/\${rawiId}/\${tariqId}\`}
                  className="inline-block bg-gold-500 text-navy-950 font-bold px-8 py-3 rounded-xl hover:bg-gold-400 transition shadow-lg shadow-gold-500/20 w-full md:w-auto text-lg"
                >
                  الدخول للاختبار النظري الشامل
                </Link>
              ) : (`;

const examLinkCodeNew = `              {!isComplete ? (
                canTakeExam ? (
                  <Link 
                    to={\`/exam/\${qariId}/\${rawiId}/\${tariqId}\`}
                    className="inline-block bg-gold-500 text-navy-950 font-bold px-8 py-3 rounded-xl hover:bg-gold-400 transition shadow-lg shadow-gold-500/20 w-full md:w-auto text-lg"
                  >
                    الدخول للاختبار النظري الشامل
                  </Link>
                ) : (
                  <div className="inline-block bg-navy-800 text-navy-400 font-bold px-8 py-3 rounded-xl border border-navy-700 w-full md:w-auto text-lg cursor-not-allowed">
                    يجب إتمام جميع الدروس أولاً 🔒
                  </div>
                )
              ) : (`;

code = code.replace(examLinkCodeOld, examLinkCodeNew);

// Remove the duplicate totalLessons code that got shifted down
code = code.replace(
  `  const completedCount = displayMap.reduce((acc, unit) => {
    return acc + (unit.lessons?.filter(l => completedLessons.includes(\`\${rawiId}-\${unit.id}-\${l.id}\`)).length || 0);
  }, 0);`,
  ``
);

// We need to fix that replace, it might be messy. Let's do it cleanly by editing the exact file lines.
fs.writeFileSync('fixCourseView2.cjs', 'done'); // dummy
