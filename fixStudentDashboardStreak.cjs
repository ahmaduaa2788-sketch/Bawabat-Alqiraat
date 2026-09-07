const fs = require('fs');
let code = fs.readFileSync('src/components/StudentDashboard.tsx', 'utf-8');

// Replace the old streakDays useState
code = code.replace(
  "const { completedLessons, completedTuruq = [], lessonTimeSpent = {} } = useProgress();",
  "const { completedLessons, completedTuruq = [], lessonTimeSpent = {}, streakDays, updateStreak } = useProgress();\n\n  React.useEffect(() => {\n    updateStreak();\n  }, [updateStreak]);"
);

// Remove the old local storage based streakDays
code = code.replace(/const \[streakDays\] = useState\(\(\) => \{[\s\S]*?\}\);\n/, '');

fs.writeFileSync('src/components/StudentDashboard.tsx', code);
