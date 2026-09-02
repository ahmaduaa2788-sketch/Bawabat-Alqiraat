const fs = require('fs');
let content = fs.readFileSync('src/pages/Lesson.tsx', 'utf-8');

const originalHeader = `        <div className="flex justify-between items-start">
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
            {lesson.title}
          </h1>
          {isLessonComplete && (
            <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold border border-green-500/30 flex items-center gap-1">
              <CheckCircle className="w-3 h-3" /> مكتمل
            </span>
          )}`;

const newHeader = `        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
            {lesson.title}
          </h1>
          <div className="flex items-center gap-3">
            <div className="bg-navy-800/80 border border-navy-700 text-navy-200 px-3 py-1.5 rounded-lg flex items-center gap-2 font-mono text-sm shadow-sm" title="الوقت المستغرق في هذا الدرس">
              <Clock className="w-4 h-4 text-gold-500" />
              {formatTime(totalTime)}
            </div>
            {isLessonComplete && (
              <span className="bg-green-500/20 text-green-400 px-3 py-1.5 rounded-lg text-xs font-bold border border-green-500/30 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" /> مكتمل
              </span>
            )}
          </div>`;

content = content.replace(originalHeader, newHeader);
fs.writeFileSync('src/pages/Lesson.tsx', content);
