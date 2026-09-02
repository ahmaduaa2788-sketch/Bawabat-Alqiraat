const fs = require('fs');
let content = fs.readFileSync('src/components/CertificateViewer.tsx', 'utf-8');

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

fs.writeFileSync('src/components/CertificateViewer.tsx', content);
