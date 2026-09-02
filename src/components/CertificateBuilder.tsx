import React, { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Save, Settings } from 'lucide-react';

export interface TextElementConfig {
  show: boolean;
  x: number;
  y: number;
  fontSize: number;
  color: string;
  fontFamily?: string;
  text?: string;
}

export interface ImageElementConfig {
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
  signatureImageConfig: ImageElementConfig;
  nameConfig: TextElementConfig;
  bodyText: string;
  bodyConfig: TextElementConfig;
  dateConfig: TextElementConfig;
  signatureLabelConfig: TextElementConfig;
  stampLabelConfig: TextElementConfig;
}

const defaultConfig: CertificateConfig = {
  backgroundImage: '',
  stampImage: '',
  signatureImage: '',
  stampImageConfig: { show: true, x: 15, y: 70, width: 15 },
  signatureImageConfig: { show: true, x: 85, y: 70, width: 15 },
  nameConfig: { show: true, x: 50, y: 35, fontSize: 36, color: '#000000', fontFamily: 'system-ui' },
  bodyText: 'اجتاز مسار {course} بنسبة {score}',
  bodyConfig: { show: true, x: 50, y: 50, fontSize: 24, color: '#000000', fontFamily: 'system-ui' },
  dateConfig: { show: true, x: 50, y: 65, fontSize: 18, color: '#000000', fontFamily: 'system-ui' },
  signatureLabelConfig: { show: true, x: 85, y: 85, fontSize: 20, color: '#000000', text: 'توقيع المدرب', fontFamily: 'system-ui' },
  stampLabelConfig: { show: true, x: 15, y: 85, fontSize: 20, color: '#000000', text: 'ختم المجيز', fontFamily: 'system-ui' }
};

export const CertificateBuilder = () => {
  const [config, setConfig] = useState<CertificateConfig>(defaultConfig);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const docRef = doc(db, 'settings', 'certificate');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data() as any;
          // Merge with default config to ensure new fields exist
          setConfig({ ...defaultConfig, ...data });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchConfig();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    try {
      await setDoc(doc(db, 'settings', 'certificate'), config);
      setMessage('تم حفظ الإعدادات بنجاح!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error(err);
      setMessage('حدث خطأ أثناء الحفظ');
    }
    setSaving(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field: keyof CertificateConfig) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        if (field === 'backgroundImage' && width > 1200) {
          const ratio = 1200 / width;
          width = 1200;
          height = height * ratio;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const base64 = canvas.toDataURL(field === 'backgroundImage' ? 'image/jpeg' : 'image/png', 0.8);
          setConfig(prev => ({ ...prev, [field]: base64 }));
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const updateTextConfig = (field: keyof CertificateConfig, subField: keyof TextElementConfig, value: any) => {
    setConfig(prev => ({
      ...prev,
      [field]: {
        ...(prev[field] as TextElementConfig),
        [subField]: value
      }
    }));
  };


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

  const renderTextConfig = (title: string, field: keyof CertificateConfig, hasTextInput = false) => {
    const cfg = config[field] as TextElementConfig;
    if (!cfg) return null;
    return (
      <div className="bg-navy-900/50 p-4 rounded-xl border border-navy-700/50 space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="font-bold text-white">{title}</h4>
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="checkbox" 
              checked={cfg.show} 
              onChange={e => updateTextConfig(field, 'show', e.target.checked)}
              className="rounded text-gold-500 focus:ring-gold-500/20 bg-navy-800 border-navy-600"
            />
            <span className="text-sm text-navy-300">إظهار</span>
          </label>
        </div>
        
        {cfg.show && (
          <div className="space-y-4">
            {hasTextInput && (
              <div>
                <label className="block text-xs text-navy-400 mb-1">النص</label>
                <input 
                  type="text" 
                  value={cfg.text || ''} 
                  onChange={e => updateTextConfig(field, 'text', e.target.value)}
                  className="w-full bg-navy-800 border border-navy-600 rounded-lg px-3 py-2 text-white text-sm"
                />
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-navy-400 mb-1">الموضع الأفقي X (%)</label>
                <input 
                  type="number" 
                  value={cfg.x} 
                  onChange={e => updateTextConfig(field, 'x', Number(e.target.value))}
                  className="w-full bg-navy-800 border border-navy-600 rounded-lg px-3 py-2 text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-navy-400 mb-1">الموضع العمودي Y (%)</label>
                <input 
                  type="number" 
                  value={cfg.y} 
                  onChange={e => updateTextConfig(field, 'y', Number(e.target.value))}
                  className="w-full bg-navy-800 border border-navy-600 rounded-lg px-3 py-2 text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-navy-400 mb-1">حجم الخط (px)</label>
                <input 
                  type="number" 
                  value={cfg.fontSize} 
                  onChange={e => updateTextConfig(field, 'fontSize', Number(e.target.value))}
                  className="w-full bg-navy-800 border border-navy-600 rounded-lg px-3 py-2 text-white text-sm"
                />
              </div>
              <div>
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
  };

  if (loading) return <div className="text-center py-10 text-white">جاري التحميل...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <Settings className="text-gold-500" />
          إعدادات نموذج الشهادة
        </h2>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="bg-gold-500 hover:bg-gold-400 text-navy-900 font-bold px-6 py-2 rounded-xl transition flex items-center gap-2"
        >
          {saving ? 'جاري الحفظ...' : <><Save className="w-5 h-5" /> حفظ الإعدادات</>}
        </button>
      </div>

      {message && (
        <div className="bg-green-500/20 border border-green-500/50 text-green-200 px-4 py-3 rounded-xl text-center">
          {message}
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-navy-800/80 p-6 rounded-2xl border border-navy-700 shadow-xl space-y-4">
            <h3 className="font-bold text-white mb-4">الصور والملفات</h3>
            
            <div>
              <label className="block text-sm font-bold text-navy-200 mb-2">خلفية الشهادة (النموذج)</label>
              <input 
                type="file" 
                accept="image/*"
                onChange={e => handleImageUpload(e, 'backgroundImage')}
                className="block w-full text-sm text-navy-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gold-500/20 file:text-gold-400 hover:file:bg-gold-500/30 cursor-pointer"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-navy-200 mb-2">الختم</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={e => handleImageUpload(e, 'stampImage')}
                  className="block w-full text-sm text-navy-300 file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-500/20 file:text-blue-400 hover:file:bg-blue-500/30 cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-navy-200 mb-2">التوقيع</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={e => handleImageUpload(e, 'signatureImage')}
                  className="block w-full text-sm text-navy-300 file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-500/20 file:text-blue-400 hover:file:bg-blue-500/30 cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="bg-navy-800/80 p-6 rounded-2xl border border-navy-700 shadow-xl space-y-4">
            <h3 className="font-bold text-white mb-4">النصوص</h3>
            {renderTextConfig('اسم المتدرب', 'nameConfig')}
            
            <div className="bg-navy-900/50 p-4 rounded-xl border border-navy-700/50 space-y-4">
              <h4 className="font-bold text-white">موضوع الشهادة</h4>
              <div>
                <label className="block text-xs text-navy-400 mb-1">
                  النص المتغير (استخدم المتغيرات <code className="text-gold-400">{"{course}"}</code> للمسار و <code className="text-gold-400">{"{score}"}</code> للنسبة)
                </label>
                <textarea 
                  value={config.bodyText} 
                  onChange={e => setConfig({...config, bodyText: e.target.value})}
                  className="w-full bg-navy-800 border border-navy-600 rounded-lg px-3 py-2 text-white text-sm min-h-[80px]"
                  dir="rtl"
                />
              </div>
              {renderTextConfig('تنسيق الخط والموضع', 'bodyConfig')}
            </div>

            {renderTextConfig('التاريخ', 'dateConfig')}
            {renderTextConfig('توقيع المدرب (يمين)', 'signatureLabelConfig', true)}
            {renderTextConfig('ختم المجيز (يسار)', 'stampLabelConfig', true)}
            
            <h3 className="font-bold text-white mb-4 mt-8 border-t border-navy-700 pt-6">أماكن الصور</h3>
            {renderImageConfig('موضع التوقيع', 'signatureImageConfig')}
            {renderImageConfig('موضع الختم', 'stampImageConfig')}
          </div>
        </div>

        {/* Preview */}
        <div className="bg-navy-800/80 p-6 rounded-2xl border border-navy-700 shadow-xl">
          <h3 className="font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            معاينة حية للشهادة
          </h3>
          <p className="text-sm text-navy-400 mb-4">ستظهر النصوص هنا وفقاً للإحداثيات لتتمكن من ضبط مكانها بدقة.</p>
          
          <div className="w-full aspect-[1.414] bg-white rounded shadow-inner relative overflow-hidden text-center mx-auto max-w-full" style={{
            backgroundImage: config.backgroundImage ? `url(${config.backgroundImage})` : 'none',
            backgroundSize: '100% 100%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            direction: 'rtl'
          }}>
            {!config.backgroundImage && (
              <div className="absolute inset-0 flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 m-4 rounded-xl">
                يرجى رفع صورة خلفية للشهادة
              </div>
            )}
            
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
                أحمد محمد عبد الله
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
                {(config.bodyText || '').replace('{course}', 'أصول رواية ورش عن الإمام نافع').replace('{score}', '95')}
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
                2026/09/02
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
    </div>
  );
};
