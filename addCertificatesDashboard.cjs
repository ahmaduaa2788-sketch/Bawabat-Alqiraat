const fs = require('fs');

let content = fs.readFileSync('src/components/StudentDashboard.tsx', 'utf-8');

// Add imports
if (!content.includes('import { CertificateViewer }')) {
    content = content.replace("import { Award, BookOpen, Clock, Activity } from 'lucide-react';", "import { Award, BookOpen, Clock, Activity } from 'lucide-react';\nimport { CertificateViewer } from './CertificateViewer';\nimport { qiraatTree } from '../data/qiraatTree';\nimport { useState } from 'react';");
}

const progressDestructuring = "const { completedLessons, completedTuruq = [] } = useProgress();";
content = content.replace("const { completedLessons } = useProgress();", progressDestructuring);

const stateAndLogic = `
  const [selectedCert, setSelectedCert] = useState<{name: string, date: string} | null>(null);

  const getCourseName = (id: string) => {
    const parts = id.split('-');
    if (parts.length < 3) return id;
    const qari = qiraatTree.find(q => q.id === parts[0]);
    const rawi = qari?.ruwat.find(r => r.id === parts[1]);
    const tariq = rawi?.turuq.find(t => t.id === parts[2]);
    if (qari && rawi && tariq) {
      return \`\${qari.name} - \${rawi.name} (\${tariq.name})\`;
    }
    return id;
  };
`;

content = content.replace("if (!userData) return null;", stateAndLogic + "\n  if (!userData) return null;");

const certUI = `
      {/* Certificates Section */}
      {completedTuruq.length > 0 && (
        <div className="bg-navy-950 border border-navy-800 rounded-2xl p-6 md:p-8 shadow-xl mt-6">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
            <Award className="text-gold-500" />
            شهادات الإتمام
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {completedTuruq.map(tariqId => (
              <div key={tariqId} className="bg-navy-900 border border-gold-500/30 p-5 rounded-xl flex flex-col justify-between items-center text-center gap-4 hover:border-gold-500 transition">
                <Award className="w-12 h-12 text-gold-500" />
                <h4 className="font-bold text-white">{getCourseName(tariqId)}</h4>
                <button 
                  onClick={() => setSelectedCert({ name: getCourseName(tariqId), date: new Date().toLocaleDateString('ar-EG') })}
                  className="bg-gold-500 text-navy-900 px-4 py-2 rounded-lg font-bold hover:bg-gold-400 w-full"
                >
                  عرض الشهادة
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedCert && (
        <div className="fixed inset-0 z-50 bg-navy-950/90 backdrop-blur-sm p-4 md:p-8 overflow-y-auto flex items-start justify-center pt-10">
          <CertificateViewer 
            studentName={userData.name}
            courseName={selectedCert.name}
            score="ناجح"
            date={selectedCert.date}
            onClose={() => setSelectedCert(null)}
          />
        </div>
      )}
`;

content = content.replace("</div>\n    </div>\n  );\n}", "</div>\n" + certUI + "\n    </div>\n  );\n}");

fs.writeFileSync('src/components/StudentDashboard.tsx', content);
console.log("StudentDashboard updated");
