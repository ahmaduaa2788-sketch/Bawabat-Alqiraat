const fs = require('fs');
let code = fs.readFileSync('src/pages/Portal.tsx', 'utf-8');

if (!code.includes("completedTuruq.length > 0")) {
  code = code.replace(
    "const { activeQari, selectQari, resetProgress } = useProgress();",
    "const { activeQari, selectQari, resetProgress, completedTuruq } = useProgress();"
  );

  const oldLock = "const isLocked = role !== 'admin' && activeQari !== null && activeQari !== qari.id;";
  const newLock = "const isLocked = role !== 'admin' && completedTuruq.length === 0 && activeQari !== null && activeQari !== qari.id;";
  
  code = code.replace(oldLock, newLock);
  
  fs.writeFileSync('src/pages/Portal.tsx', code);
}
