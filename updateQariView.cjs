const fs = require('fs');
let code = fs.readFileSync('src/pages/QariView.tsx', 'utf-8');

code = code.replace(
  "const isActiveRawiOrComplete = isRawiActive || isRawiComplete;",
  "const isActiveRawiOrComplete = role === 'admin' || isRawiActive || isRawiComplete;"
);

// Also need to check if we hide the click inside Tariq when it's not active
code = code.replace(
  `isRawiActive || isRawiComplete \n                     ? "opacity-100 translate-y-0 border-navy-700/50 bg-navy-800/50" \n                     : "opacity-50 pointer-events-none grayscale border-navy-800 bg-navy-900/20 hidden"`,
  `role === 'admin' || isRawiActive || isRawiComplete \n                     ? "opacity-100 translate-y-0 border-navy-700/50 bg-navy-800/50" \n                     : "opacity-50 pointer-events-none grayscale border-navy-800 bg-navy-900/20 hidden"`
);

fs.writeFileSync('src/pages/QariView.tsx', code);
