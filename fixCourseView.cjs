const fs = require('fs');

let code = fs.readFileSync('src/pages/CourseView.tsx', 'utf-8');

if (!code.includes('FlashcardsReview')) {
  code = code.replace(
    "import { CourseUnit } from '../data/courseMap';",
    "import { CourseUnit } from '../data/courseMap';\nimport { FlashcardsReview } from '../components/Flashcards';\nimport { RotateCcw } from 'lucide-react';"
  );
  
  code = code.replace(
    "const [hasContent, setHasContent] = useState(false);",
    "const [hasContent, setHasContent] = useState(false);\n  const [showFlashcards, setShowFlashcards] = useState(false);"
  );
  
  const headerSection = `    <div className="max-w-5xl mx-auto space-y-12 pb-20">
      {showFlashcards && <FlashcardsReview onClose={() => setShowFlashcards(false)} />}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 py-6 border-b border-navy-700">`;
      
  code = code.replace(
    `<div className="max-w-5xl mx-auto space-y-12 pb-20">\n      <div className="flex items-center gap-4 py-6 border-b border-navy-700">`,
    headerSection
  );

  const headerButtonSection = `      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 py-6 border-b border-navy-700">
        <div className="flex items-center gap-4">
          <Link to={\`/qari/\${qariId}\`} className="p-2 bg-navy-800 hover:bg-navy-700 rounded-lg transition-colors text-navy-300 hover:text-white">
            <ChevronRight className="w-6 h-6" />
          </Link>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow-sm">مسار: {rawiName}</h1>
            <p className="text-navy-300 mt-1">{tariqName}</p>
          </div>
        </div>
        
        {hasContent && (
          <button 
            onClick={() => setShowFlashcards(true)}
            className="flex items-center gap-2 bg-navy-800 text-gold-400 hover:bg-gold-500/20 px-5 py-2.5 rounded-xl font-bold transition border border-gold-500/30"
          >
            <RotateCcw className="w-5 h-5" /> وضع المراجعة السريعة
          </button>
        )}
      </div>`;

  code = code.replace(
    `<div className="flex items-center gap-4 py-6 border-b border-navy-700">
        <Link to={\`/qari/\${qariId}\`} className="p-2 bg-navy-800 hover:bg-navy-700 rounded-lg transition-colors text-navy-300 hover:text-white">
          <ChevronRight className="w-6 h-6" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white drop-shadow-sm">مسار: {rawiName}</h1>
          <p className="text-navy-300 mt-1">{tariqName}</p>
        </div>
      </div>`,
    headerButtonSection
  );
}

// Modify roadmap visuals (it's already a tree, let's just make it look more like a tree)
fs.writeFileSync('src/pages/CourseView.tsx', code);
