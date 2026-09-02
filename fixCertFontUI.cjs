const fs = require('fs');

let content = fs.readFileSync('src/components/CertificateBuilder.tsx', 'utf-8');

// 1. Add fontFamily to defaultConfig (using 'system-ui')
content = content.replace(
  "nameConfig: { show: true, x: 50, y: 35, fontSize: 36, color: '#000000' }",
  "nameConfig: { show: true, x: 50, y: 35, fontSize: 36, color: '#000000', fontFamily: 'system-ui' }"
);
content = content.replace(
  "bodyConfig: { show: true, x: 50, y: 50, fontSize: 24, color: '#000000' }",
  "bodyConfig: { show: true, x: 50, y: 50, fontSize: 24, color: '#000000', fontFamily: 'system-ui' }"
);
content = content.replace(
  "dateConfig: { show: true, x: 50, y: 65, fontSize: 18, color: '#000000' }",
  "dateConfig: { show: true, x: 50, y: 65, fontSize: 18, color: '#000000', fontFamily: 'system-ui' }"
);
content = content.replace(
  "signatureLabelConfig: { show: true, x: 85, y: 85, fontSize: 20, color: '#000000', text: 'توقيع المدرب' }",
  "signatureLabelConfig: { show: true, x: 85, y: 85, fontSize: 20, color: '#000000', text: 'توقيع المدرب', fontFamily: 'system-ui' }"
);
content = content.replace(
  "stampLabelConfig: { show: true, x: 15, y: 85, fontSize: 20, color: '#000000', text: 'ختم المجيز' }",
  "stampLabelConfig: { show: true, x: 15, y: 85, fontSize: 20, color: '#000000', text: 'ختم المجيز', fontFamily: 'system-ui' }"
);

// 2. Add font selection UI in renderTextConfig
const oldRenderTextConfig = `<div>
              <label className="block text-xs text-navy-400 mb-1">اللون</label>
              <input 
                type="color" 
                value={cfg.color} 
                onChange={e => setConfig(prev => ({ ...prev, [field]: { ...cfg, color: e.target.value } }))}
                className="w-full h-9 bg-navy-800 border border-navy-600 rounded-lg cursor-pointer"
              />
            </div>
          </div>
        )}
      </div>
    );
  };`;

const newRenderTextConfig = `<div>
              <label className="block text-xs text-navy-400 mb-1">اللون</label>
              <input 
                type="color" 
                value={cfg.color} 
                onChange={e => setConfig(prev => ({ ...prev, [field]: { ...cfg, color: e.target.value } }))}
                className="w-full h-9 bg-navy-800 border border-navy-600 rounded-lg cursor-pointer"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-xs text-navy-400 mb-1">نوع الخط</label>
            <select
              value={cfg.fontFamily || 'system-ui'}
              onChange={e => setConfig(prev => ({ ...prev, [field]: { ...cfg, fontFamily: e.target.value } }))}
              className="w-full bg-navy-800 border border-navy-600 rounded-lg px-3 py-2 text-white text-sm focus:ring-2 focus:ring-gold-500"
            >
              <option value="system-ui">الافتراضي (System)</option>
              <option value="'Amiri', serif">أميري (Amiri)</option>
              <option value="'Cairo', sans-serif">كايرو (Cairo)</option>
              <option value="'Tajawal', sans-serif">تجوال (Tajawal)</option>
              <option value="'Aref Ruqaa', serif">رقعة (Ruqaa)</option>
              <option value="'Reem Kufi', sans-serif">كوفي (Kufi)</option>
            </select>
          </div>
        )}
      </div>
    );
  };`;

content = content.replace(oldRenderTextConfig, newRenderTextConfig);

// 3. Apply fontFamily to inline styles in the preview (CertificateBuilder)
content = content.replace(
  "fontSize: `${config.nameConfig.fontSize}px`,",
  "fontSize: `${config.nameConfig.fontSize}px`,\n              fontFamily: config.nameConfig.fontFamily || 'system-ui',"
);
content = content.replace(
  "fontSize: `${config.bodyConfig.fontSize}px`,",
  "fontSize: `${config.bodyConfig.fontSize}px`,\n              fontFamily: config.bodyConfig.fontFamily || 'system-ui',"
);
content = content.replace(
  "fontSize: `${config.dateConfig.fontSize}px`,",
  "fontSize: `${config.dateConfig.fontSize}px`,\n              fontFamily: config.dateConfig.fontFamily || 'system-ui',"
);
content = content.replace(
  "fontSize: `${config.signatureLabelConfig.fontSize}px`,",
  "fontSize: `${config.signatureLabelConfig.fontSize}px`,\n              fontFamily: config.signatureLabelConfig.fontFamily || 'system-ui',"
);
content = content.replace(
  "fontSize: `${config.stampLabelConfig.fontSize}px`,",
  "fontSize: `${config.stampLabelConfig.fontSize}px`,\n              fontFamily: config.stampLabelConfig.fontFamily || 'system-ui',"
);

fs.writeFileSync('src/components/CertificateBuilder.tsx', content);

