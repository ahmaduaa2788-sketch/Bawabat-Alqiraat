const fs = require('fs');
let code = fs.readFileSync('src/pages/Admin.tsx', 'utf-8');

// Add import
if (!code.includes("AdminLessonsManager")) {
  code = code.replace(
    "import { AdminQuestionsManager } from '../components/AdminQuestionsManager';",
    "import { AdminQuestionsManager } from '../components/AdminQuestionsManager';\nimport { AdminLessonsManager } from '../components/AdminLessonsManager';"
  );
}

// Update the type
code = code.replace(
  "const [activeTab, setActiveTab] = useState<'dashboard' | 'teachers' | 'settings' | 'certificates'>('dashboard');",
  "const [activeTab, setActiveTab] = useState<'dashboard' | 'lessons' | 'questions' | 'teachers' | 'settings' | 'certificates'>('dashboard');"
);

// Fix the tabs rendering
const oldTabsHtml = `<div className="flex gap-2 mb-8 bg-navy-800 p-1.5 rounded-xl border border-navy-700 w-full md:w-max overflow-x-auto hide-scrollbar">
        <button 
          onClick={() => setActiveTab('dashboard')}
          className={\`px-6 py-2.5 rounded-lg font-bold text-sm transition-all whitespace-nowrap \${activeTab === 'dashboard' ? 'bg-gold-500 text-navy-950 shadow-md' : 'text-navy-300 hover:text-white hover:bg-navy-700'}\`}
        >
          نظرة عامة
        </button>
        <button 
          onClick={() => setActiveTab('questions')}
          className={\`pb-4 px-2 font-bold transition-all border-b-2 \${activeTab === 'questions' ? 'border-gold-500 text-gold-400' : 'border-transparent text-navy-400 hover:text-navy-300'}\`}
        >
          إدارة بنك الأسئلة
        </button>
        <button 
          onClick={() => setActiveTab('teachers')}
          className={\`px-6 py-2.5 rounded-lg font-bold text-sm transition-all whitespace-nowrap flex items-center gap-2 \${activeTab === 'teachers' ? 'bg-gold-500 text-navy-950 shadow-md' : 'text-navy-300 hover:text-white hover:bg-navy-700'}\`}
        >
          <Users className="w-4 h-4" /> المعلمين والشيوخ
        </button>
        <button 
          onClick={() => setActiveTab('settings')}
          className={\`px-6 py-2.5 rounded-lg font-bold text-sm transition-all whitespace-nowrap flex items-center gap-2 \${activeTab === 'settings' ? 'bg-gold-500 text-navy-950 shadow-md' : 'text-navy-300 hover:text-white hover:bg-navy-700'}\`}
        >
          <Key className="w-4 h-4" /> الإعدادات والأمان
        </button>
        <button 
          onClick={() => setActiveTab('certificates')}
          className={\`px-6 py-2.5 rounded-lg font-bold text-sm transition-all whitespace-nowrap flex items-center gap-2 \${activeTab === 'certificates' ? 'bg-gold-500 text-navy-950 shadow-md' : 'text-navy-300 hover:text-white hover:bg-navy-700'}\`}
        >
          <CheckCircle2 className="w-4 h-4" /> نماذج الشهادات
        </button>
      </div>`;

const newTabsHtml = `<div className="flex gap-2 mb-8 bg-navy-800 p-1.5 rounded-xl border border-navy-700 w-full md:w-max overflow-x-auto hide-scrollbar">
        <button 
          onClick={() => setActiveTab('dashboard')}
          className={\`px-6 py-2.5 rounded-lg font-bold text-sm transition-all whitespace-nowrap \${activeTab === 'dashboard' ? 'bg-gold-500 text-navy-950 shadow-md' : 'text-navy-300 hover:text-white hover:bg-navy-700'}\`}
        >
          نظرة عامة
        </button>
        <button 
          onClick={() => setActiveTab('lessons')}
          className={\`px-6 py-2.5 rounded-lg font-bold text-sm transition-all whitespace-nowrap flex items-center gap-2 \${activeTab === 'lessons' ? 'bg-gold-500 text-navy-950 shadow-md' : 'text-navy-300 hover:text-white hover:bg-navy-700'}\`}
        >
          📝 إدارة محتوى الدروس
        </button>
        <button 
          onClick={() => setActiveTab('questions')}
          className={\`px-6 py-2.5 rounded-lg font-bold text-sm transition-all whitespace-nowrap flex items-center gap-2 \${activeTab === 'questions' ? 'bg-gold-500 text-navy-950 shadow-md' : 'text-navy-300 hover:text-white hover:bg-navy-700'}\`}
        >
          ❓ إدارة بنك الأسئلة
        </button>
        <button 
          onClick={() => setActiveTab('teachers')}
          className={\`px-6 py-2.5 rounded-lg font-bold text-sm transition-all whitespace-nowrap flex items-center gap-2 \${activeTab === 'teachers' ? 'bg-gold-500 text-navy-950 shadow-md' : 'text-navy-300 hover:text-white hover:bg-navy-700'}\`}
        >
          <Users className="w-4 h-4" /> المعلمين والشيوخ
        </button>
        <button 
          onClick={() => setActiveTab('settings')}
          className={\`px-6 py-2.5 rounded-lg font-bold text-sm transition-all whitespace-nowrap flex items-center gap-2 \${activeTab === 'settings' ? 'bg-gold-500 text-navy-950 shadow-md' : 'text-navy-300 hover:text-white hover:bg-navy-700'}\`}
        >
          <Key className="w-4 h-4" /> الإعدادات والأمان
        </button>
        <button 
          onClick={() => setActiveTab('certificates')}
          className={\`px-6 py-2.5 rounded-lg font-bold text-sm transition-all whitespace-nowrap flex items-center gap-2 \${activeTab === 'certificates' ? 'bg-gold-500 text-navy-950 shadow-md' : 'text-navy-300 hover:text-white hover:bg-navy-700'}\`}
        >
          <CheckCircle2 className="w-4 h-4" /> نماذج الشهادات
        </button>
      </div>`;

code = code.replace(oldTabsHtml, newTabsHtml);

// Add the lessons tab content
const lessonsTabContent = `      {activeTab === 'lessons' && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <AdminLessonsManager />
        </div>
      )}
      
      {activeTab === 'questions'`;

code = code.replace("{activeTab === 'questions'", lessonsTabContent);

fs.writeFileSync('src/pages/Admin.tsx', code);
