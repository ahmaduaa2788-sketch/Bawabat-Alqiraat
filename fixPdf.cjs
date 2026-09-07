const fs = require('fs');

let content = fs.readFileSync('src/components/CertificateViewer.tsx', 'utf-8');

if (!content.includes('import jsPDF')) {
  content = content.replace("import html2canvas from 'html2canvas';", "import html2canvas from 'html2canvas';\nimport jsPDF from 'jspdf';");
}

const pdfFunction = `
  const handleDownloadPDF = async () => {
    if (!certificateRef.current) return;
    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 3,
        useCORS: true,
        backgroundColor: null
      });
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });
      
      pdf.addImage(dataUrl, 'JPEG', 0, 0, canvas.width, canvas.height);
      pdf.save(\`شهادة_\${studentName.replace(/\\s/g, '_')}.pdf\`);
    } catch (err) {
      console.error('Error generating PDF', err);
      alert('حدث خطأ أثناء تحميل الشهادة كملف PDF.');
    }
  };
`;

if (!content.includes('handleDownloadPDF')) {
  content = content.replace("  const handleDownload = async () => {", pdfFunction + "\n  const handleDownload = async () => {");
}

const downloadBtnSearch = `<button 
            onClick={handleDownload}
            className="flex items-center gap-2 bg-gold-500 text-navy-900 px-4 py-2 rounded-lg font-bold hover:bg-gold-400 transition print:hidden shadow-lg shadow-gold-500/20"
          >
            <Download className="w-4 h-4" /> تحميل كصورة
          </button>`;

const downloadBtnReplace = `<button 
            onClick={handleDownload}
            className="flex items-center gap-2 bg-gold-500 text-navy-900 px-4 py-2 rounded-lg font-bold hover:bg-gold-400 transition print:hidden shadow-lg shadow-gold-500/20"
          >
            <Download className="w-4 h-4" /> صورة
          </button>
          <button 
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 bg-rose-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-rose-500 transition print:hidden shadow-lg shadow-rose-600/20"
          >
            <Download className="w-4 h-4" /> PDF
          </button>`;

if (content.includes(downloadBtnSearch)) {
    content = content.replace(downloadBtnSearch, downloadBtnReplace);
}

fs.writeFileSync('src/components/CertificateViewer.tsx', content);
