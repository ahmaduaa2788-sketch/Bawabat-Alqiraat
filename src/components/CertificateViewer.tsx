import React, { useEffect, useState, useRef } from 'react';
import { db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Download, Award, Printer } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface CertificateProps {
  studentName: string;
  courseName: string;
  score: string;
  date: string;
  onClose?: () => void;
}

export const CertificateViewer: React.FC<CertificateProps> = ({ studentName, courseName, score, date, onClose }) => {
  const [config, setConfig] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const certificateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const docRef = doc(db, 'settings', 'certificate');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setConfig(docSnap.data());
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchConfig();
  }, []);


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
      pdf.save(`شهادة_${studentName.replace(/\s/g, '_')}.pdf`);
    } catch (err) {
      console.error('Error generating PDF', err);
      alert('حدث خطأ أثناء تحميل الشهادة كملف PDF.');
    }
  };

  const handleDownload = async () => {
    if (!certificateRef.current) return;
    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 3,
        useCORS: true,
        backgroundColor: null
      });
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      const link = document.createElement('a');
      link.download = `شهادة_${studentName.replace(/\s/g, '_')}.jpg`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Error generating certificate image', err);
      alert('حدث خطأ أثناء تحميل الشهادة.');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return <div className="text-white text-center py-8">جاري استخراج الشهادة...</div>;
  }

  if (!config || !config.backgroundImage) {
    return (
      <div className="bg-navy-900 border border-navy-700 p-8 rounded-xl text-center text-white">
        <Award className="w-16 h-16 text-gold-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-2">إصدار الشهادة</h3>
        <p className="text-navy-300">
          لم يقم الإدارة برفع نموذج الشهادة بعد. يرجى مراجعة المعلم.
        </p>
        {onClose && (
          <button onClick={onClose} className="mt-6 bg-navy-700 px-6 py-2 rounded-lg font-bold hover:bg-navy-600">
            إغلاق
          </button>
        )}
      </div>
    );
  }

  const renderedBodyText = (config.bodyText || 'اجتاز مسار {course} بنسبة {score}')
    .replace('{course}', courseName)
    .replace('{score}', score);

  return (
    <div className="bg-navy-950 p-4 sm:p-8 rounded-2xl border border-gold-500/20 shadow-2xl w-full max-w-5xl mx-auto">
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <h3 className="text-2xl font-bold text-white flex items-center gap-3">
          <Award className="text-gold-500 w-8 h-8" />
          شهادة إتمام المسار
        </h3>
        <div className="flex gap-3">
          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 bg-navy-800 text-white px-4 py-2 rounded-lg font-bold hover:bg-navy-700 transition print:hidden"
          >
            <Printer className="w-4 h-4" /> طباعة
          </button>
          <button 
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
          </button>
          {onClose && (
            <button onClick={onClose} className="px-4 py-2 bg-navy-800 text-navy-200 rounded-lg font-bold print:hidden">إغلاق</button>
          )}
        </div>
      </div>

      <div className="overflow-auto bg-navy-900 p-4 rounded-xl print:p-0 print:bg-transparent flex justify-center">
        <div 
          ref={certificateRef}
          className="relative bg-white shadow-2xl print:shadow-none mx-auto w-[1000px] h-[707px] max-w-full print:w-full print:h-auto overflow-hidden shrink-0"
          style={{
            backgroundImage: `url(${config.backgroundImage})`,
            backgroundSize: '100% 100%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            aspectRatio: '1.414',
            direction: 'rtl'
          }}
        >
          {config.stampImage && config.stampImageConfig?.show && (
            <img src={config.stampImage} alt="Stamp" className="absolute object-contain opacity-80 mix-blend-multiply transform -translate-x-1/2 -translate-y-1/2" 
              style={{ 
                left: `${config.stampImageConfig.x}%`, 
                top: `${config.stampImageConfig.y}%`,
                width: `${config.stampImageConfig.width}%`
              }} 
            />
          )}
          {config.signatureImage && config.signatureImageConfig?.show && (
            <img src={config.signatureImage} alt="Signature" className="absolute object-contain mix-blend-multiply transform -translate-x-1/2 -translate-y-1/2" 
              style={{ 
                left: `${config.signatureImageConfig.x}%`, 
                top: `${config.signatureImageConfig.y}%`,
                width: `${config.signatureImageConfig.width}%`
              }} 
            />
          )}

          {config.nameConfig?.show && (
            <div className="absolute font-bold transform -translate-x-1/2 -translate-y-1/2 whitespace-nowrap" style={{ 
              left: `${config.nameConfig.x}%`, 
              top: `${config.nameConfig.y}%`, 
              fontSize: `${config.nameConfig.fontSize}px`,
              fontFamily: config.nameConfig.fontFamily || 'system-ui',
              color: config.nameConfig.color
            }}>
              {studentName}
            </div>
          )}
          
          {config.bodyConfig?.show && (
            <div className="absolute transform -translate-x-1/2 -translate-y-1/2 whitespace-nowrap" style={{ 
              left: `${config.bodyConfig.x}%`, 
              top: `${config.bodyConfig.y}%`, 
              fontSize: `${config.bodyConfig.fontSize}px`,
              fontFamily: config.bodyConfig.fontFamily || 'system-ui',
              color: config.bodyConfig.color
            }}>
              {renderedBodyText}
            </div>
          )}

          {config.dateConfig?.show && (
            <div className="absolute transform -translate-x-1/2 -translate-y-1/2 whitespace-nowrap" style={{ 
              left: `${config.dateConfig.x}%`, 
              top: `${config.dateConfig.y}%`, 
              fontSize: `${config.dateConfig.fontSize}px`,
              fontFamily: config.dateConfig.fontFamily || 'system-ui',
              color: config.dateConfig.color
            }}>
              {date}
            </div>
          )}

          {config.signatureLabelConfig?.show && (
            <div className="absolute transform -translate-x-1/2 -translate-y-1/2 whitespace-nowrap" style={{ 
              left: `${config.signatureLabelConfig.x}%`, 
              top: `${config.signatureLabelConfig.y}%`, 
              fontSize: `${config.signatureLabelConfig.fontSize}px`,
              fontFamily: config.signatureLabelConfig.fontFamily || 'system-ui',
              color: config.signatureLabelConfig.color
            }}>
              {config.signatureLabelConfig.text}
            </div>
          )}

          {config.stampLabelConfig?.show && (
            <div className="absolute transform -translate-x-1/2 -translate-y-1/2 whitespace-nowrap" style={{ 
              left: `${config.stampLabelConfig.x}%`, 
              top: `${config.stampLabelConfig.y}%`, 
              fontSize: `${config.stampLabelConfig.fontSize}px`,
              fontFamily: config.stampLabelConfig.fontFamily || 'system-ui',
              color: config.stampLabelConfig.color
            }}>
              {config.stampLabelConfig.text}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
