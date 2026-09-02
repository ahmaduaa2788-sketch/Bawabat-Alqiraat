const fs = require('fs');

let content = fs.readFileSync('src/pages/Admin.tsx', 'utf-8');

const tabButtonInsert = `
        <button 
          onClick={() => setActiveTab('certificates')}
          className={\`px-6 py-2.5 rounded-lg font-bold text-sm transition-all whitespace-nowrap flex items-center gap-2 \${activeTab === 'certificates' ? 'bg-gold-500 text-navy-950 shadow-md' : 'text-navy-300 hover:text-white hover:bg-navy-700'}\`}
        >
          <CheckCircle2 className="w-4 h-4" /> نماذج الشهادات
        </button>
      </div>`;

content = content.replace('      </div>', tabButtonInsert);

const tabContentInsert = `
      {activeTab === 'certificates' && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <CertificateBuilder />
        </div>
      )}
      
      {activeTab === 'settings' && (`;

content = content.replace("      {activeTab === 'settings' && (", tabContentInsert);

fs.writeFileSync('src/pages/Admin.tsx', content);
console.log("Admin tabs updated.");
