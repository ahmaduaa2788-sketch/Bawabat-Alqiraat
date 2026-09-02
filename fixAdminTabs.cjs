const fs = require('fs');

let content = fs.readFileSync('src/pages/Admin.tsx', 'utf-8');

// First, remove it from the login screen (lines 140-146)
const incorrectTab = `        <button 
          onClick={() => setActiveTab('certificates')}
          className={\`px-6 py-2.5 rounded-lg font-bold text-sm transition-all whitespace-nowrap flex items-center gap-2 \${activeTab === 'certificates' ? 'bg-gold-500 text-navy-950 shadow-md' : 'text-navy-300 hover:text-white hover:bg-navy-700'}\`}
        >
          <CheckCircle2 className="w-4 h-4" /> نماذج الشهادات
        </button>`;
content = content.replace(incorrectTab, '');

// Now insert it in the actual tabs container:
const properTabPosition = `<button 
          onClick={() => setActiveTab('settings')}
          className={\`px-6 py-2.5 rounded-lg font-bold text-sm transition-all whitespace-nowrap flex items-center gap-2 \${activeTab === 'settings' ? 'bg-gold-500 text-navy-950 shadow-md' : 'text-navy-300 hover:text-white hover:bg-navy-700'}\`}
        >
          <Key className="w-4 h-4" /> الإعدادات والأمان
        </button>`;
        
const properTabWithCert = `<button 
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
        </button>`;

content = content.replace(properTabPosition, properTabWithCert);

fs.writeFileSync('src/pages/Admin.tsx', content);
console.log("Admin tabs fixed.");
