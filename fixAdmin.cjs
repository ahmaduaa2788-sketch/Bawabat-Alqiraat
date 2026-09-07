const fs = require('fs');

let adminCode = fs.readFileSync('src/pages/Admin.tsx', 'utf-8');

// 1. Add import
if (!adminCode.includes('AdminQuestionsManager')) {
  adminCode = adminCode.replace(
    "import { CertificateBuilder } from '../components/CertificateBuilder';",
    "import { CertificateBuilder } from '../components/CertificateBuilder';\nimport { AdminQuestionsManager } from '../components/AdminQuestionsManager';"
  );
}

// 2. Add Tab
adminCode = adminCode.replace(
  "<button \n          onClick={() => setActiveTab('teachers')}",
  `<button \n          onClick={() => setActiveTab('questions')}\n          className={\`pb-4 px-2 font-bold transition-all border-b-2 \${activeTab === 'questions' ? 'border-gold-500 text-gold-400' : 'border-transparent text-navy-400 hover:text-navy-300'}\`}\n        >\n          إدارة بنك الأسئلة\n        </button>\n        <button \n          onClick={() => setActiveTab('teachers')}`
);

// 3. Add Tab Content
adminCode = adminCode.replace(
  "{activeTab === 'settings' && (",
  `{activeTab === 'questions' && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <AdminQuestionsManager />
        </div>
      )}
      
      {activeTab === 'settings' && (`
);

fs.writeFileSync('src/pages/Admin.tsx', adminCode);
