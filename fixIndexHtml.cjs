const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf-8');

const oldLink = '<link href="https://fonts.googleapis.com/css2?family=Amiri+Quran&family=Tajawal:wght@300;400;500;700;800;900&display=swap" rel="stylesheet">';
const newLink = '<link href="https://fonts.googleapis.com/css2?family=Amiri+Quran&family=Amiri:wght@400;700&family=Cairo:wght@400;700&family=Tajawal:wght@300;400;500;700;800;900&family=Aref+Ruqaa:wght@400;700&family=Reem+Kufi:wght@400;700&display=swap" rel="stylesheet">';

content = content.replace(oldLink, newLink);

fs.writeFileSync('index.html', content);
