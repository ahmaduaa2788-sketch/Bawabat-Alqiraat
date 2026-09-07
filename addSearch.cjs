const fs = require('fs');
let code = fs.readFileSync('src/pages/Portal.tsx', 'utf-8');

const importSearch = `import { Search } from 'lucide-react';\nimport { courseMap } from '../data/courseMap';\nimport { useState } from 'react';\n`;

// Add useState and search logic inside Portal
const searchLogic = `
  const [searchQuery, setSearchQuery] = useState('');
  
  const searchResults = searchQuery.trim() === '' ? [] : courseMap.flatMap(unit => {
    return unit.lessons
      .filter(lesson => lesson.title.includes(searchQuery) || unit.title.includes(searchQuery))
      .map(lesson => ({
        unitTitle: unit.title,
        unitId: unit.id,
        lessonTitle: lesson.title,
        lessonId: lesson.id,
      }));
  }).slice(0, 5); // top 5 matches
`;

const searchUi = `
      <div className="max-w-2xl mx-auto relative z-20">
        <div className="relative">
          <input
            type="text"
            placeholder="ابحث عن درس في منهج رواية ورش (مثال: مد البدل)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-navy-900 border border-navy-700 text-white px-6 py-4 rounded-2xl pl-12 focus:outline-none focus:border-gold-500 shadow-lg"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-navy-400 w-6 h-6" />
        </div>
        {searchResults.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-navy-900 border border-navy-700 rounded-xl shadow-2xl overflow-hidden text-right z-50">
            {searchResults.map((result, idx) => (
              <button
                key={idx}
                onClick={() => navigate(\`/lesson/nafi/warsh/shatibiyyah/\${result.unitId}/\${result.lessonId}\`)}
                className="w-full text-right p-4 border-b border-navy-800 hover:bg-navy-800 transition flex flex-col gap-1 last:border-0"
              >
                <span className="text-white font-bold">{result.lessonTitle}</span>
                <span className="text-navy-400 text-sm">{result.unitTitle}</span>
              </button>
            ))}
          </div>
        )}
      </div>
`;

code = code.replace("import { Lock, BookOpen, ChevronLeft, RefreshCcw } from 'lucide-react';", "import { Lock, BookOpen, ChevronLeft, RefreshCcw, Search } from 'lucide-react';");
if (!code.includes("courseMap")) {
    code = code.replace("import { StudentDashboard } from '../components/StudentDashboard';", "import { StudentDashboard } from '../components/StudentDashboard';\nimport { courseMap } from '../data/courseMap';\nimport { useState } from 'react';");
}

code = code.replace("export function Portal() {", "export function Portal() {\n  const [searchQuery, setSearchQuery] = useState('');\n  \n  const searchResults = searchQuery.trim() === '' ? [] : courseMap.flatMap(unit => {\n    return unit.lessons\n      .filter(lesson => lesson.title.includes(searchQuery) || unit.title.includes(searchQuery))\n      .map(lesson => ({\n        unitTitle: unit.title,\n        unitId: unit.id,\n        lessonTitle: lesson.title,\n        lessonId: lesson.id,\n      }));\n  }).slice(0, 5);\n");

code = code.replace(
  '<div className="text-center space-y-6 py-12">',
  '<div className="text-center space-y-6 py-12">\n' + searchUi
);

fs.writeFileSync('src/pages/Portal.tsx', code);
