const fs = require('fs');
let code = fs.readFileSync('src/pages/QariView.tsx', 'utf-8');

code = code.replace(
  /isRawiActive \|\| isRawiComplete(\s+\?\s+"opacity-100 translate-y-0 border-navy-700\/50 bg-navy-800\/50")/g,
  "role === 'admin' || isRawiActive || isRawiComplete$1"
);

fs.writeFileSync('src/pages/QariView.tsx', code);
