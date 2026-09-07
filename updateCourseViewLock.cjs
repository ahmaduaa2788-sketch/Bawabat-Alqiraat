const fs = require('fs');
let code = fs.readFileSync('src/pages/CourseView.tsx', 'utf-8');

// The lessons map
const oldLessonsMap = `{unit.lessons.map((lesson, i) => {
                      const isLessonCompleted = completedLessons.includes(\`\${rawiId}-\${unit.id}-\${lesson.id}\`);
                      return (
                        <div key={lesson.id} className="relative flex items-center group/lesson">`;

const newLessonsMap = `{unit.lessons.map((lesson, i) => {
                      const isLessonCompleted = completedLessons.includes(\`\${rawiId}-\${unit.id}-\${lesson.id}\`);
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
                      }
                      
                      return (
                        <div key={lesson.id} className="relative flex items-center group/lesson">`;

code = code.replace(oldLessonsMap, newLessonsMap);

const oldLink = `<Link
                            to={\`/lesson/\${qariId}/\${rawiId}/\${tariqId}/\${unit.id}/\${lesson.id}\`}
                            className={\`flex-1 mr-8 flex items-center justify-between p-3 rounded-xl shadow-sm border transition-all \${isLessonCompleted ? 'bg-green-500/10 border-green-500/30 hover:bg-green-500/20' : 'bg-navy-800/80 border-navy-700 hover:border-gold-500/50 hover:bg-navy-700/80'}\`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={\`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border shadow-sm \${isLessonCompleted ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-navy-950 text-gold-500 border-gold-500/30'}\`}>
                                {isLessonCompleted ? <CheckCircle className="w-4 h-4" /> : i + 1}
                              </div>
                              <div>
                                <span className={\`font-bold \${isLessonCompleted ? 'text-green-300' : 'text-white'}\`}>{lesson.title}</span>
                                {isLessonCompleted && <p className="text-xs text-green-500 mt-0.5">مكتمل (اضغط للمراجعة)</p>}
                              </div>
                            </div>
                            <ChevronLeft className={\`w-5 h-5 \${isLessonCompleted ? 'text-green-500' : 'text-navy-400 group-hover/lesson:text-gold-500'} transition-transform group-hover/lesson:-translate-x-1\`} />
                          </Link>`;

const newLink = `                          {canAccessLesson ? (
                            <Link
                              to={\`/lesson/\${qariId}/\${rawiId}/\${tariqId}/\${unit.id}/\${lesson.id}\`}
                              className={\`flex-1 mr-8 flex items-center justify-between p-3 rounded-xl shadow-sm border transition-all \${isLessonCompleted ? 'bg-green-500/10 border-green-500/30 hover:bg-green-500/20' : 'bg-navy-800/80 border-navy-700 hover:border-gold-500/50 hover:bg-navy-700/80'}\`}
                            >
                              <div className="flex items-center gap-3">
                                <div className={\`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border shadow-sm \${isLessonCompleted ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-navy-950 text-gold-500 border-gold-500/30'}\`}>
                                  {isLessonCompleted ? <CheckCircle className="w-4 h-4" /> : i + 1}
                                </div>
                                <div>
                                  <span className={\`font-bold \${isLessonCompleted ? 'text-green-300' : 'text-white'}\`}>{lesson.title}</span>
                                  {isLessonCompleted && <p className="text-xs text-green-500 mt-0.5">مكتمل (اضغط للمراجعة)</p>}
                                </div>
                              </div>
                              <ChevronLeft className={\`w-5 h-5 \${isLessonCompleted ? 'text-green-500' : 'text-navy-400 group-hover/lesson:text-gold-500'} transition-transform group-hover/lesson:-translate-x-1\`} />
                            </Link>
                          ) : (
                            <div className="flex-1 mr-8 flex items-center justify-between p-3 rounded-xl shadow-sm border transition-all bg-navy-900/50 border-navy-800 opacity-60 cursor-not-allowed">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border shadow-sm bg-navy-950 text-navy-500 border-navy-700">
                                  <Lock className="w-4 h-4" />
                                </div>
                                <div>
                                  <span className="font-bold text-navy-400">{lesson.title}</span>
                                  <p className="text-xs text-red-400/80 mt-0.5">{lockReason}</p>
                                </div>
                              </div>
                            </div>
                          )}`;

// I need to add Lock icon import to CourseView.tsx
if (!code.includes("Lock")) {
  code = code.replace("CheckCircle } from 'lucide-react';", "CheckCircle, Lock } from 'lucide-react';");
}

code = code.replace(oldLink, newLink);

fs.writeFileSync('src/pages/CourseView.tsx', code);
