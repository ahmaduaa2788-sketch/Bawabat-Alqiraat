const fs = require('fs');
let code = fs.readFileSync('src/components/WaqfIbtidaTool.tsx', 'utf-8');

code = code.replace(/\\`/g, '`').replace(/\\\$/g, '$');
fs.writeFileSync('src/components/WaqfIbtidaTool.tsx', code);
