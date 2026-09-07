const fs = require('fs');
let code = fs.readFileSync('src/pages/CourseView.tsx', 'utf-8');

// The roadmap is this section:
/*
        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-auto before:mr-auto before:-translate-x-1/2 before:w-1 before:bg-navy-800 before:z-0 md:before:mr-[40px] md:before:-translate-x-0">
          {displayMap.map((unit, index) => {
*/

// Let's modify the unit logic to add "needs review" state and more tree-like visual.

const oldUnitLessonsList = `{unit.lessons.map((lesson, i) => (
                      <Link
                        key={lesson.id}
                        to={\`/lesson/\${qariId}/\${rawiId}/\${tariqId}/\${unit.id}/\${lesson.id}\`}
                        className="flex items-center justify-between p-3 rounded-lg bg-navy-800/50 hover:bg-navy-700 shadow-sm border border-navy-700/50 hover:border-gold-500/30 transition group/link"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-full bg-navy-950 text-gold-500 flex items-center justify-center text-xs font-bold border border-gold-500/20 shadow-sm">
                            {i + 1}
                          </div>
                          <span className="font-medium text-navy-100 group-hover/link:text-white">{lesson.title}</span>
                        </div>
                        <ChevronLeft className="w-5 h-5 text-navy-400 group-hover/link:text-gold-500 transition-transform group-hover/link:-translate-x-1" />
                      </Link>
                    ))}`;

const newUnitLessonsList = `{unit.lessons.map((lesson, i) => {
                      const isLessonCompleted = completedLessons.includes(\`\${rawiId}-\${unit.id}-\${lesson.id}\`);
                      return (
                        <div key={lesson.id} className="relative flex items-center group/lesson">
                          {/* Tree branch connector */}
                          <div className="absolute right-3.5 top-1/2 w-4 border-t-2 border-navy-700 -z-10"></div>
                          <div className="absolute right-3.5 top-0 bottom-1/2 border-r-2 border-navy-700 -z-10"></div>
                          {i !== unit.lessons.length - 1 && (
                            <div className="absolute right-3.5 top-1/2 bottom-0 border-r-2 border-navy-700 -z-10"></div>
                          )}
                          
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
                        </div>
                      );
                    })}`;

code = code.replace(oldUnitLessonsList, newUnitLessonsList);
fs.writeFileSync('src/pages/CourseView.tsx', code);
