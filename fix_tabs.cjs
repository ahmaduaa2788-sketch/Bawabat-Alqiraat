const fs = require('fs');
const path = 'src/pages/Admin.tsx';
let code = fs.readFileSync(path, 'utf8');

// 1. Fix the questions button className
const regexButton = /<button \s*onClick=\{\(\) => setActiveTab\('questions'\)\}\s*className=\{`px-6 py-2\.5 rounded-lg font-bold text-sm transition-all whitespace-nowrap flex items-center gap-2 \$\s*\{activeTab === 'lessons' && \(\s*<div className="animate-in fade-in slide-in-from-bottom-4 duration-500">\s*<AdminLessonsManager \/>\s*<\/div>\s*\)\}\s*\{activeTab === 'questions' \? 'bg-gold-500 text-navy-950 shadow-md' : 'text-navy-300 hover:text-white hover:bg-navy-700'\}`\}\s*>/m;

const replacementButton = `<button 
          onClick={() => setActiveTab('questions')}
          className={\`px-6 py-2.5 rounded-lg font-bold text-sm transition-all whitespace-nowrap flex items-center gap-2 \${activeTab === 'questions' ? 'bg-gold-500 text-navy-950 shadow-md' : 'text-navy-300 hover:text-white hover:bg-navy-700'}\`}
        >`;

if (regexButton.test(code)) {
    code = code.replace(regexButton, replacementButton);
    console.log("Replaced button!");
} else {
    console.log("Could not find button");
}

// 2. Insert activeTab === 'lessons' rendering block after dashboard rendering block ends (or right before it)
const dashboardRegex = /\{activeTab === 'dashboard' && \(/;
const lessonsBlock = `{activeTab === 'lessons' && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <AdminLessonsManager />
        </div>
      )}\n\n      `;
if (dashboardRegex.test(code)) {
    code = code.replace(dashboardRegex, lessonsBlock + `{activeTab === 'dashboard' && (`);
    console.log("Added lessons rendering block!");
} else {
    console.log("Could not find dashboard block");
}

fs.writeFileSync(path, code);
