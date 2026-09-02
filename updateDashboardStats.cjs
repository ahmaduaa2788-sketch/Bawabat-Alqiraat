const fs = require('fs');

let content = fs.readFileSync('src/components/StudentDashboard.tsx', 'utf-8');

// Replace progress import
content = content.replace(
  "const { completedLessons, completedTuruq = [] } = useProgress();",
  "const { completedLessons, completedTuruq = [], lessonTimeSpent = {} } = useProgress();"
);

const timeCalcLogic = `
  const totalTimeSeconds = Object.values(lessonTimeSpent).reduce((acc, curr) => acc + curr, 0);
  const totalHours = Math.floor(totalTimeSeconds / 3600);
  const totalMinutes = Math.floor((totalTimeSeconds % 3600) / 60);
  const formattedTime = totalHours > 0 ? \`\${totalHours} ساعة و \${totalMinutes} دقيقة\` : \`\${totalMinutes} دقيقة\`;
  
  // Real data for chart if possible, or keeping mock if we don't track timestamps yet. We will just use mockActivityData for now since we don't track timestamp per day.
`;

content = content.replace("  if (!userData) return null;", timeCalcLogic + "\n  if (!userData) return null;");

content = content.replace(
  `<div className="text-2xl font-bold text-white mb-1">12 ساعة</div>`,
  `<div className="text-2xl font-bold text-white mb-1" dir="rtl">{formattedTime}</div>`
);

content = content.replace(
  `<p className="text-sm text-navy-400">الوقت الإجمالي</p>`,
  `<p className="text-sm text-navy-400">وقت التعلم الفعلي</p>`
);


fs.writeFileSync('src/components/StudentDashboard.tsx', content);
