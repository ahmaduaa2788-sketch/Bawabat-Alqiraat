const fs = require('fs');
let code = fs.readFileSync('src/pages/Lesson.tsx', 'utf-8');

// Need to bring auth and logic.
if (!code.includes("const { role } = useAuth();")) {
  code = code.replace(
    "import { useProgress } from '../context/ProgressContext';",
    "import { useProgress } from '../context/ProgressContext';\nimport { useAuth } from '../context/AuthContext';"
  );
  
  code = code.replace(
    "const { showToast } = useToast();",
    "const { showToast } = useToast();\n  const { role } = useAuth();"
  );
}

// Logic to check if all OTHER lessons are complete before showing final-quiz
const oldQuizLogic = `} else if (unitId === 'unit-14') {
    if (lessonId === 'final-quiz') {
      content = <ComprehensiveQuiz onComplete={handleMarkCompleteAndContinue} />;
    } else {
      content = <QuranicLab />;
    }
  }`;

// I need to count the total lessons across the courseMap (assuming Warsh for now, or finding the displayMap).
const newQuizLogic = `} else if (unitId === 'unit-14') {
    if (lessonId === 'final-quiz') {
      const displayMap = rawiId === 'qalun' ? qalunCourseMap : courseMap;
      const totalLessons = displayMap.reduce((acc, u) => acc + (u.lessons?.length || 0), 0);
      const completedCount = displayMap.reduce((acc, u) => {
        return acc + (u.lessons?.filter(l => completedLessons.includes(\`\${rawiId}-\${u.id}-\${l.id}\`)).length || 0);
      }, 0);
      
      const isLessonCompleted = completedLessons.includes(\`\${rawiId}-\${unitId}-\${lessonId}\`);
      const completedOtherLessons = completedCount - (isLessonCompleted ? 1 : 0);
      const canAccessLesson = role === 'admin' || completedOtherLessons >= totalLessons - 1;

      if (!canAccessLesson) {
        content = (
          <div className="bg-navy-950/80 p-8 rounded-2xl border border-red-500/30 text-center max-w-2xl mx-auto shadow-2xl">
            <Lock className="w-16 h-16 mx-auto text-red-500 mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">الاختبار مقفل</h2>
            <p className="text-navy-300">يجب عليك إتمام جميع الدروس والاختبارات القصيرة السابقة قبل دخول الاختبار الشامل.</p>
            <Link to={courseBaseUrl} className="mt-6 inline-block bg-navy-800 text-white px-6 py-2 rounded-xl hover:bg-navy-700 transition">العودة للمسار</Link>
          </div>
        );
      } else {
        content = <ComprehensiveQuiz onComplete={handleMarkCompleteAndContinue} />;
      }
    } else {
      content = <QuranicLab />;
    }
  }`;

if (!code.includes("completedOtherLessons >=")) {
  code = code.replace(oldQuizLogic, newQuizLogic);
  
  if (!code.includes("import { qalunCourseMap } from '../data/qalunCourseMap';")) {
    code = code.replace(
      "import { courseMap } from '../data/courseMap';",
      "import { courseMap } from '../data/courseMap';\nimport { qalunCourseMap } from '../data/qalunCourseMap';"
    );
  }

  if (!code.includes("Lock")) {
    code = code.replace("CheckCircle, Save, StickyNote, Clock } from 'lucide-react';", "CheckCircle, Save, StickyNote, Clock, Lock } from 'lucide-react';");
  }
  
  fs.writeFileSync('src/pages/Lesson.tsx', code);
}
