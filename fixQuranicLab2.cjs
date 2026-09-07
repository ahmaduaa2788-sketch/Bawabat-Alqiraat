const fs = require('fs');
let content = fs.readFileSync('src/components/QuranicLab.tsx', 'utf-8');

content = content.replace("{isQalun ? 'ميم الجمع' : {isQalun ? 'ميم الجمع' : 'قسم النقل'}}", "(isQalun ? 'ميم الجمع' : 'قسم النقل')");
content = content.replace("{isQalun ? 'ميم الجمع' : 'قسم النقل'}", "(isQalun ? 'ميم الجمع' : 'قسم النقل')");
fs.writeFileSync('src/components/QuranicLab.tsx', content);
