const fs = require('fs');
let content = fs.readFileSync('src/components/CertificateViewer.tsx', 'utf-8');

const oldStampViewer = `{config.stampImage && config.stampLabelConfig?.show && (
            <img src={config.stampImage} alt="Stamp" className="absolute w-32 h-32 object-contain opacity-80 mix-blend-multiply transform -translate-x-1/2" 
              style={{ left: \`\${config.stampLabelConfig.x}%\`, top: \`\${config.stampLabelConfig.y - 12}%\` }} />
          )}
          {config.signatureImage && config.signatureLabelConfig?.show && (
            <img src={config.signatureImage} alt="Signature" className="absolute w-40 h-20 object-contain mix-blend-multiply transform -translate-x-1/2" 
              style={{ left: \`\${config.signatureLabelConfig.x}%\`, top: \`\${config.signatureLabelConfig.y - 10}%\` }} />
          )}`;

const newStampViewer = `{config.stampImage && config.stampImageConfig?.show && (
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

content = content.replace(oldStampViewer, newStampViewer);
fs.writeFileSync('src/components/CertificateViewer.tsx', content);
