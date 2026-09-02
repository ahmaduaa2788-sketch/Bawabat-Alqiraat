const fs = require('fs');

let content = fs.readFileSync('src/components/CertificateBuilder.tsx', 'utf-8');

// 1. Add image config to the interface
const interfaceSearch = `export interface CertificateConfig {
  backgroundImage: string;
  stampImage: string;
  signatureImage: string;`;
const interfaceReplace = `export interface ImageElementConfig {
  show: boolean;
  x: number;
  y: number;
  width: number;
}

export interface CertificateConfig {
  backgroundImage: string;
  stampImage: string;
  signatureImage: string;
  stampImageConfig: ImageElementConfig;
  signatureImageConfig: ImageElementConfig;`;

content = content.replace(interfaceSearch, interfaceReplace);

// 2. Add to defaultConfig
const defaultSearch = `const defaultConfig: CertificateConfig = {
  backgroundImage: '',
  stampImage: '',
  signatureImage: '',`;
const defaultReplace = `const defaultConfig: CertificateConfig = {
  backgroundImage: '',
  stampImage: '',
  signatureImage: '',
  stampImageConfig: { show: true, x: 15, y: 70, width: 15 },
  signatureImageConfig: { show: true, x: 85, y: 70, width: 15 },`;

content = content.replace(defaultSearch, defaultReplace);

// 3. Render image configs in UI
const renderImageConfigCode = `
  const renderImageConfig = (title: string, field: keyof CertificateConfig) => {
    const cfg = config[field] as ImageElementConfig;
    if (!cfg) return null;
    return (
      <div className="bg-navy-900/50 p-4 rounded-xl border border-navy-700/50 space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="font-bold text-white">{title}</h4>
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="checkbox" 
              checked={cfg.show} 
              onChange={e => setConfig(prev => ({ ...prev, [field]: { ...cfg, show: e.target.checked } }))}
              className="rounded text-gold-500 focus:ring-gold-500/20 bg-navy-800 border-navy-600"
            />
            <span className="text-sm text-navy-300">إظهار</span>
          </label>
        </div>
        
        {cfg.show && (
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-navy-400 mb-1">الموضع الأفقي X (%)</label>
              <input 
                type="number" 
                value={cfg.x} 
                onChange={e => setConfig(prev => ({ ...prev, [field]: { ...cfg, x: Number(e.target.value) } }))}
                className="w-full bg-navy-800 border border-navy-600 rounded-lg px-3 py-2 text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-navy-400 mb-1">الموضع العمودي Y (%)</label>
              <input 
                type="number" 
                value={cfg.y} 
                onChange={e => setConfig(prev => ({ ...prev, [field]: { ...cfg, y: Number(e.target.value) } }))}
                className="w-full bg-navy-800 border border-navy-600 rounded-lg px-3 py-2 text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-navy-400 mb-1">الحجم (%)</label>
              <input 
                type="number" 
                value={cfg.width} 
                onChange={e => setConfig(prev => ({ ...prev, [field]: { ...cfg, width: Number(e.target.value) } }))}
                className="w-full bg-navy-800 border border-navy-600 rounded-lg px-3 py-2 text-white text-sm"
              />
            </div>
          </div>
        )}
      </div>
    );
  };
`;

content = content.replace("  const renderTextConfig", renderImageConfigCode + "\n  const renderTextConfig");

// 4. Inject UI blocks
const injectUITextSearch = `{renderTextConfig('توقيع المدرب (يمين)', 'signatureLabelConfig', true)}
            {renderTextConfig('ختم المجيز (يسار)', 'stampLabelConfig', true)}
          </div>`;
const injectUITextReplace = `{renderTextConfig('توقيع المدرب (يمين)', 'signatureLabelConfig', true)}
            {renderTextConfig('ختم المجيز (يسار)', 'stampLabelConfig', true)}
            
            <h3 className="font-bold text-white mb-4 mt-8 border-t border-navy-700 pt-6">أماكن الصور</h3>
            {renderImageConfig('موضع التوقيع', 'signatureImageConfig')}
            {renderImageConfig('موضع الختم', 'stampImageConfig')}
          </div>`;
content = content.replace(injectUITextSearch, injectUITextReplace);

// 5. Update Preview rendering
// Search for stamp rendering logic
const oldStampPreview = `{/* Stamp on the left (x=15%), Signature on the right (x=85%) roughly relative to their labels */}
            {config.stampImage && config.stampLabelConfig?.show && (
              <img src={config.stampImage} alt="Stamp" className="absolute w-24 h-24 object-contain opacity-80 mix-blend-multiply transform -translate-x-1/2" 
                style={{ left: \`\${config.stampLabelConfig.x}%\`, top: \`\${config.stampLabelConfig.y - 12}%\` }} />
            )}
            {config.signatureImage && config.signatureLabelConfig?.show && (
              <img src={config.signatureImage} alt="Signature" className="absolute w-32 h-16 object-contain mix-blend-multiply transform -translate-x-1/2" 
                style={{ left: \`\${config.signatureLabelConfig.x}%\`, top: \`\${config.signatureLabelConfig.y - 10}%\` }} />
            )}`;

const newStampPreview = `{config.stampImage && config.stampImageConfig?.show && (
              <img src={config.stampImage} alt="Stamp" className="absolute object-contain opacity-80 mix-blend-multiply transform -translate-x-1/2 -translate-y-1/2" 
                style={{ 
                  left: \`\${config.stampImageConfig.x}%\`, 
                  top: \`\${config.stampImageConfig.y}%\`,
                  width: \`\${config.stampImageConfig.width}%\`
                }} 
              />
            )}
            {config.signatureImage && config.signatureImageConfig?.show && (
              <img src={config.signatureImage} alt="Signature" className="absolute object-contain mix-blend-multiply transform -translate-x-1/2 -translate-y-1/2" 
                style={{ 
                  left: \`\${config.signatureImageConfig.x}%\`, 
                  top: \`\${config.signatureImageConfig.y}%\`,
                  width: \`\${config.signatureImageConfig.width}%\`
                }} 
              />
            )}`;

content = content.replace(oldStampPreview, newStampPreview);

fs.writeFileSync('src/components/CertificateBuilder.tsx', content);

