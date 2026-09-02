const fs = require('fs');

function updateFile(path) {
  let content = fs.readFileSync(path, 'utf-8');

  // Add fontFamily to interface if not there
  if (!content.includes('fontFamily: string;')) {
    content = content.replace(
      "  color: string;\n  text?: string;",
      "  color: string;\n  fontFamily?: string;\n  text?: string;"
    );
    // In case 'text?: string' is missing (like in Viewer)
    content = content.replace(
      "  color: string;\n}",
      "  color: string;\n  fontFamily?: string;\n}"
    );
  }

  fs.writeFileSync(path, content);
}

updateFile('src/components/CertificateBuilder.tsx');
updateFile('src/components/CertificateViewer.tsx');
console.log('Interfaces updated');
