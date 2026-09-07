const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf-8');

if (!css.includes('Amiri Quran')) {
  css = `@import url('https://fonts.googleapis.com/css2?family=Amiri+Quran&display=swap');\n\n` + css;
  css += `\n\n@utility font-quran {\n  font-family: 'Amiri Quran', serif;\n}`;
  fs.writeFileSync('src/index.css', css);
}
