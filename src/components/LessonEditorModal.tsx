import React, { useState, useEffect } from 'react';
import { 
  Save, X, RotateCcw, Eye, Edit3, Sparkles, AlertCircle, 
  CheckCircle2, BookOpen, Quote, HelpCircle, Table, Check
} from 'lucide-react';
import { db } from '../lib/firebase';
import { doc, getDoc, setDoc, serverTimestamp, deleteDoc } from 'firebase/firestore';
import { getDefaultLessonText } from '../data/defaultLessonTexts';
import { CustomLessonRenderer } from './CustomLessonRenderer';

interface LessonEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  rawiId: string;
  unitId: string;
  lessonId: string;
  lessonTitle: string;
  onSaved?: (savedContent: string) => void;
}

export function LessonEditorModal({
  isOpen,
  onClose,
  rawiId,
  unitId,
  lessonId,
  lessonTitle,
  onSaved
}: LessonEditorModalProps) {
  const lessonGlobalId = `${rawiId}-${unitId}-${lessonId}`;
  
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [content, setContent] = useState('');
  const [ruleSummary, setRuleSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [isCustomized, setIsCustomized] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const loadContent = async () => {
      setLoading(true);
      setStatusMessage(null);
      try {
        const docRef = doc(db, 'lessonContents', lessonGlobalId);
        const snap = await getDoc(docRef);
        if (snap.exists() && snap.data().content) {
          const data = snap.data();
          setContent(data.content);
          setRuleSummary(data.ruleSummary || '');
          setIsCustomized(true);
        } else {
          // Load default text from default texts registry
          const defaultText = getDefaultLessonText(rawiId, unitId, lessonId);
          setContent(defaultText);
          setRuleSummary('');
          setIsCustomized(false);
        }
      } catch (err) {
        console.error("Error loading lesson content:", err);
        const defaultText = getDefaultLessonText(rawiId, unitId, lessonId);
        setContent(defaultText);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [isOpen, lessonGlobalId, rawiId, unitId, lessonId]);

  if (!isOpen) return null;

  const insertSnippet = (snippet: string) => {
    setContent(prev => prev + '\n' + snippet + '\n');
  };

  const handleSave = async () => {
    if (!content.trim()) {
      setStatusMessage({ text: 'لا يمكن حفظ محتوى فارغ للدرس.', type: 'error' });
      return;
    }

    setSaving(true);
    setStatusMessage(null);
    try {
      const docRef = doc(db, 'lessonContents', lessonGlobalId);
      await setDoc(docRef, {
        lessonGlobalId,
        rawiId,
        unitId,
        lessonId,
        title: lessonTitle,
        content: content.trim(),
        ruleSummary: ruleSummary.trim(),
        updatedAt: serverTimestamp(),
        updatedBy: 'الشيخ المشرف'
      }, { merge: true });

      setIsCustomized(true);
      setStatusMessage({ text: 'تم حفظ واعتماد التعديلات بنجاح! سيراها الطلاب فوراً.', type: 'success' });
      if (onSaved) {
        onSaved(content.trim());
      }
      setTimeout(() => {
        setStatusMessage(null);
      }, 3500);
    } catch (err) {
      console.error("Error saving lesson content:", err);
      setStatusMessage({ text: 'حدث خطأ أثناء الحفظ على الخادم. يرجى المحاولة مرة أخرى.', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleResetToDefault = async () => {
    if (!window.confirm('هل أنت متأكد من استعادة المحتوى الأصلي للدرس وإلغاء أي تعديلات مخصصة؟')) {
      return;
    }

    setSaving(true);
    try {
      const docRef = doc(db, 'lessonContents', lessonGlobalId);
      await deleteDoc(docRef);
      const defaultText = getDefaultLessonText(rawiId, unitId, lessonId);
      setContent(defaultText);
      setRuleSummary('');
      setIsCustomized(false);
      setStatusMessage({ text: 'تمت استعادة المحتوى الأصلي للدرس بنجاح.', type: 'info' });
      if (onSaved) {
        onSaved('');
      }
    } catch (err) {
      console.error("Error resetting lesson:", err);
      setStatusMessage({ text: 'حدث خطأ أثناء استعادة المحتوى.', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-navy-950/80 backdrop-blur-md overflow-y-auto" dir="rtl">
      <div className="bg-navy-900 border border-navy-700 w-full max-w-5xl rounded-3xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 md:px-8 border-b border-navy-800 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-navy-950/60">
          <div>
            <div className="flex items-center gap-3">
              <span className="p-2 bg-gold-500/20 text-gold-400 rounded-xl border border-gold-500/30">
                <Edit3 className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                  تعديل المادة العلمية: {lessonTitle}
                </h3>
                <p className="text-xs md:text-sm text-navy-300 mt-0.5">
                  المسار: {rawiId === 'qalun' ? 'رواية قالون عن نافع' : 'رواية ورش عن نافع'} • {isCustomized ? 'محتوى معدّل ومحفوظ' : 'المحتوى الافتراضي'}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* View Tabs */}
            <div className="flex bg-navy-950 p-1 rounded-xl border border-navy-800">
              <button
                onClick={() => setActiveTab('editor')}
                className={`px-4 py-1.5 rounded-lg text-sm font-bold flex items-center gap-2 transition ${
                  activeTab === 'editor' 
                    ? 'bg-gold-500 text-navy-950 shadow-sm' 
                    : 'text-navy-300 hover:text-white'
                }`}
              >
                <Edit3 className="w-4 h-4" /> المحرر
              </button>
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-4 py-1.5 rounded-lg text-sm font-bold flex items-center gap-2 transition ${
                  activeTab === 'preview' 
                    ? 'bg-gold-500 text-navy-950 shadow-sm' 
                    : 'text-navy-300 hover:text-white'
                }`}
              >
                <Eye className="w-4 h-4" /> المعاينة كما تظهر للطالب
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-navy-400 hover:text-white hover:bg-navy-800 transition"
              title="إغلاق"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Status Message */}
        {statusMessage && (
          <div className={`px-6 py-3 text-sm font-bold border-b flex items-center justify-between ${
            statusMessage.type === 'success' 
              ? 'bg-green-500/20 border-green-500/30 text-green-300' 
              : statusMessage.type === 'error'
              ? 'bg-red-500/20 border-red-500/30 text-red-300'
              : 'bg-blue-500/20 border-blue-500/30 text-blue-300'
          }`}>
            <span className="flex items-center gap-2">
              {statusMessage.type === 'success' && <CheckCircle2 className="w-4 h-4 text-green-400" />}
              {statusMessage.type === 'error' && <AlertCircle className="w-4 h-4 text-red-400" />}
              {statusMessage.text}
            </span>
            <button onClick={() => setStatusMessage(null)} className="text-xs hover:underline">إخفاء</button>
          </div>
        )}

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 md:p-8 space-y-6">
          {loading ? (
            <div className="py-20 text-center text-navy-300 flex flex-col items-center justify-center gap-3">
              <div className="w-8 h-8 border-3 border-gold-500 border-t-transparent rounded-full animate-spin" />
              <span>جاري تحميل نص المادة العلمية...</span>
            </div>
          ) : activeTab === 'editor' ? (
            <div className="space-y-6">
              
              {/* Quick Rule / Summary Box */}
              <div>
                <label className="block text-sm font-bold text-gold-400 mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  خلاصة سريعة / أصل الباب (اختياري - يظهر أعلى الدرس للطالب)
                </label>
                <input
                  type="text"
                  value={ruleSummary}
                  onChange={e => setRuleSummary(e.target.value)}
                  placeholder="مثال: يقرأ ورش بإشباع المد المتصل والمنفصل 6 حركات قولاً واحداً."
                  className="w-full bg-navy-950 border border-navy-700 text-white p-3.5 rounded-xl focus:border-gold-500 outline-none text-base"
                />
              </div>

              {/* Formatting Toolbar */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-bold text-navy-200">
                    نص المادة العلمية والشروح والأمثلة
                  </label>
                  <span className="text-xs text-navy-400">
                    يدعم الآيات القرآنية، العناوين، القواعد، والتنبيهات
                  </span>
                </div>

                {/* Insertion shortcuts */}
                <div className="flex flex-wrap gap-2 p-2 bg-navy-950 rounded-xl border border-navy-800 mb-2">
                  <button
                    type="button"
                    onClick={() => insertSnippet('﴿ يَا أَيُّهَا الَّذِينَ آمَنُوا ﴾')}
                    className="px-3 py-1.5 bg-navy-900 hover:bg-gold-500/20 text-gold-400 rounded-lg text-xs font-serif font-bold border border-navy-700 hover:border-gold-500/50 transition"
                  >
                    + ﴿آية قرآنية﴾
                  </button>
                  <button
                    type="button"
                    onClick={() => insertSnippet('## عنوان رئيسي جديد')}
                    className="px-3 py-1.5 bg-navy-900 hover:bg-navy-800 text-white rounded-lg text-xs font-bold border border-navy-700 transition"
                  >
                    ## عنوان رئيسي
                  </button>
                  <button
                    type="button"
                    onClick={() => insertSnippet('### عنوان فرعي')}
                    className="px-3 py-1.5 bg-navy-900 hover:bg-navy-800 text-navy-200 rounded-lg text-xs font-bold border border-navy-700 transition"
                  >
                    ### عنوان فرعي
                  </button>
                  <button
                    type="button"
                    onClick={() => insertSnippet('> [قاعدة] نص القاعدة التجويدية أو المذهب هنا')}
                    className="px-3 py-1.5 bg-navy-900 hover:bg-navy-800 text-gold-300 rounded-lg text-xs font-bold border border-navy-700 transition"
                  >
                    📌 قاعدة / أصل
                  </button>
                  <button
                    type="button"
                    onClick={() => insertSnippet('> [مثال] مثل قوله تعالى: ﴿ ... ﴾')}
                    className="px-3 py-1.5 bg-navy-900 hover:bg-navy-800 text-emerald-300 rounded-lg text-xs font-bold border border-navy-700 transition"
                  >
                    💡 مثال توضيحي
                  </button>
                  <button
                    type="button"
                    onClick={() => insertSnippet('> [تنبيه] انتبه للاستثناء التالي: ...')}
                    className="px-3 py-1.5 bg-navy-900 hover:bg-navy-800 text-red-300 rounded-lg text-xs font-bold border border-navy-700 transition"
                  >
                    ⚠️ تنبيه / استثناء
                  </button>
                  <button
                    type="button"
                    onClick={() => insertSnippet('| الكلمة | الحكم عند قالون | الحكم عند ورش |\n| --- | --- | --- |\n| ﴿ عَلَيْهِمْ ﴾ | الصلة والإسكان | الصلة عند همز القطع |')}
                    className="px-3 py-1.5 bg-navy-900 hover:bg-navy-800 text-blue-300 rounded-lg text-xs font-bold border border-navy-700 transition flex items-center gap-1"
                  >
                    <Table className="w-3 h-3" /> جدول مقارنة
                  </button>
                </div>

                {/* Editor Textarea */}
                <textarea
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  placeholder="اكتب هنا المادة العلمية للدرس، القواعد، الأمثلة، والتوجيهات..."
                  className="w-full h-96 bg-navy-950 border border-navy-700 text-white p-4 rounded-xl focus:border-gold-500 outline-none resize-y leading-relaxed text-base md:text-lg font-mono"
                  dir="rtl"
                />
              </div>

            </div>
          ) : (
            <div className="bg-navy-950/80 p-6 md:p-10 rounded-2xl border border-navy-800 min-h-[400px]">
              <div className="mb-6 pb-4 border-b border-navy-800 flex items-center justify-between">
                <span className="text-xs bg-gold-500/20 text-gold-400 px-3 py-1 rounded-full font-bold">
                  معاينة حية للمادة العلمية
                </span>
                <span className="text-xs text-navy-400">
                  هذا ما سيشاهده الطالب تماماً داخل صفحة الدرس
                </span>
              </div>
              <CustomLessonRenderer content={content} ruleSummary={ruleSummary} />
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="p-5 md:px-8 border-t border-navy-800 bg-navy-950/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            {isCustomized && (
              <button
                type="button"
                onClick={handleResetToDefault}
                disabled={saving}
                className="text-red-400 hover:text-red-300 text-sm font-bold flex items-center gap-2 hover:bg-red-500/10 px-3 py-2 rounded-xl transition"
              >
                <RotateCcw className="w-4 h-4" />
                استعادة المحتوى الأصلي الافتراضي
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-3 rounded-xl border border-navy-700 text-navy-200 hover:text-white hover:bg-navy-800 font-bold transition"
            >
              إلغاء
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="w-full sm:w-auto px-8 py-3 bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold rounded-xl shadow-lg transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Save className="w-5 h-5" />
              {saving ? 'جاري الحفظ...' : 'حفظ واعتماد المادة العلمية'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
