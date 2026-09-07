const fs = require('fs');

let content = fs.readFileSync('src/pages/CourseView.tsx', 'utf-8');

const progressLogic = `  const handleCompleteCourse = () => {
    completeTariq(qariId, rawiId, tariqId);
    navigate(\`/qari/\${qariId}\`);
  };

  const totalLessons = displayMap.reduce((acc, unit) => acc + (unit.lessons?.length || 0), 0);
  const completedCount = displayMap.reduce((acc, unit) => {
    return acc + (unit.lessons?.filter(l => completedLessons.includes(\`\${unit.id}-\${l.id}\`)).length || 0);
  }, 0);
  const progressPercentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;`;

content = content.replace(/  const handleCompleteCourse = \(\) => {[\s\S]*?};/, progressLogic);

const progressBarUI = `      <div className="flex items-center gap-4 py-4 border-b border-navy-800">`;
const newProgressBarUI = `      {hasContent && (
        <div className="bg-navy-900/50 p-6 rounded-2xl border border-navy-700/50 shadow-lg">
          <div className="flex justify-between items-end mb-3">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">نسبة الإنجاز في هذا المسار</h3>
              <p className="text-sm text-navy-300">أكملت {completedCount} من أصل {totalLessons} درس</p>
            </div>
            <div className="text-3xl font-bold text-gold-400">{progressPercentage}%</div>
          </div>
          <div className="w-full bg-navy-950 rounded-full h-3 overflow-hidden border border-navy-800">
            <div 
              className="bg-gradient-to-l from-gold-400 to-gold-600 h-3 rounded-full transition-all duration-1000 ease-out relative"
              style={{ width: \`\${progressPercentage}%\` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center gap-4 py-4 border-b border-navy-800">`;

if(!content.includes("نسبة الإنجاز في هذا المسار")) {
    content = content.replace(progressBarUI, newProgressBarUI);
}

fs.writeFileSync('src/pages/CourseView.tsx', content);
