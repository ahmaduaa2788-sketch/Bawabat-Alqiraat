const fs = require('fs');

let content = fs.readFileSync('src/components/CertificateBuilder.tsx', 'utf-8');

const oldRenderTextConfig = `              <div>
                <label className="block text-xs text-navy-400 mb-1">لون النص</label>
                <input 
                  type="color" 
                  value={cfg.color} 
                  onChange={e => updateTextConfig(field, 'color', e.target.value)}
                  className="w-full h-9 rounded bg-navy-800 border border-navy-600 p-1 cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };`;

const newRenderTextConfig = `              <div>
                <label className="block text-xs text-navy-400 mb-1">لون النص</label>
                <input 
                  type="color" 
                  value={cfg.color} 
                  onChange={e => updateTextConfig(field, 'color', e.target.value)}
                  className="w-full h-9 rounded bg-navy-800 border border-navy-600 p-1 cursor-pointer"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-xs text-navy-400 mb-1">نوع الخط</label>
              <select
                value={cfg.fontFamily || 'system-ui'}
                onChange={e => updateTextConfig(field, 'fontFamily', e.target.value)}
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
          </div>
        )}
      </div>
    );
  };`;

if(content.includes(oldRenderTextConfig)) {
    content = content.replace(oldRenderTextConfig, newRenderTextConfig);
    fs.writeFileSync('src/components/CertificateBuilder.tsx', content);
    console.log("Updated font UI successfully.");
} else {
    console.log("Could not find text to replace.");
}
