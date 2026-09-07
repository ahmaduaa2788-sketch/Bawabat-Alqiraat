const fs = require('fs');
let code = fs.readFileSync('src/pages/CourseView.tsx', 'utf-8');

// Add useAuth import
if (!code.includes("import { useAuth } from '../context/AuthContext';")) {
  code = code.replace(
    "import { useProgress } from '../context/ProgressContext';",
    "import { useProgress } from '../context/ProgressContext';\nimport { useAuth } from '../context/AuthContext';"
  );
}

// Add role
if (!code.includes("const { role } = useAuth();")) {
  code = code.replace(
    "const { completeTariq, completedTuruq, completedLessons } = useProgress();",
    "const { completeTariq, completedTuruq, completedLessons } = useProgress();\n  const { role } = useAuth();"
  );
}

// Check exam lock
const examCheckLogic = `  const isAllLessonsCompleted = totalLessons > 0 && completedCount === totalLessons;
  const canTakeExam = isAllLessonsCompleted || role === 'admin';
  const progressPercentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;`;

if (!code.includes('canTakeExam')) {
  code = code.replace(
    "const progressPercentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;",
    examCheckLogic
  );
}

// Replace exam link
const oldExamHTML = `              {!isComplete ? (
                <Link 
                  to={\`/exam/\${qariId}/\${rawiId}/\${tariqId}\`}
                  className="inline-block bg-gold-500 text-navy-950 font-bold px-8 py-3 rounded-xl hover:bg-gold-400 transition shadow-lg shadow-gold-500/20 w-full md:w-auto text-lg"
                >
                  الدخول للاختبار النظري الشامل
                </Link>
              ) : (`;

const newExamHTML = `              {!isComplete ? (
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

code = code.replace(oldExamHTML, newExamHTML);

fs.writeFileSync('src/pages/CourseView.tsx', code);
