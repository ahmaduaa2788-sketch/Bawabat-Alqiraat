const fs = require('fs');
let code = fs.readFileSync('src/pages/QariView.tsx', 'utf-8');

const oldLogic = `  const getRawiLockStatus = (rawiId: string) => {
    if (role === 'admin') return false;
    // If this rawi is complete, it is never locked.
    if (isBaseTariqComplete(rawiId)) return false;`;

const newLogic = `  const getRawiLockStatus = (rawiId: string) => {
    if (role === 'admin') return false;
    if (completedTuruq.length > 0) return false;
    // If this rawi is complete, it is never locked.
    if (isBaseTariqComplete(rawiId)) return false;`;

code = code.replace(oldLogic, newLogic);
fs.writeFileSync('src/pages/QariView.tsx', code);
