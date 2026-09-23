import React, { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { doc, getDoc, setDoc, serverTimestamp, deleteDoc } from 'firebase/firestore';
import { courseMap } from '../data/courseMap';
import { qalunCourseMap } from '../data/qalunCourseMap';
import { getDefaultLessonText } from '../data/defaultLessonTexts';
import { CustomLessonRenderer } from './CustomLessonRenderer';
import { 
  Save, Edit2, BookOpen, Eye, Edit3, RotateCcw, 
  Sparkles, CheckCircle2, AlertCircle, Table, FileText
} from 'lucide-react';

export function AdminLessonsManager() {
  const [selectedRawi, setSelectedRawi] = useState('warsh');
  const [selectedUnit, setSelectedUnit] = useState(courseMap[0].id);
  const [selectedLesson, setSelectedLesson] = useState(courseMap[0].lessons[0]?.id || '');

  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [content, setContent] = useState('');
  const [ruleSummary, setRuleSummary] = useState('');
  const [adminNote, setAdminNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [isCustomized, setIsCustomized] = useState(false);

  const currentMap = selectedRawi === 'warsh' ? courseMap : qalunCourseMap;
  const activeUnit = currentMap.find(u => u.id === selectedUnit) || currentMap[0];
  const activeLesson = activeUnit?.lessons.find(l => l.id === selectedLesson) || activeUnit?.lessons[0];

  // Update selected lesson when unit or rawi changes
  useEffect(() => {
    if (activeUnit && activeUnit.lessons.length > 0) {
      if (!activeUnit.lessons.find(l => l.id === selectedLesson)) {
        setSelectedLesson(activeUnit.lessons[0].id);
      }
    }
  }, [selectedUnit, selectedRawi]);

  // Load lesson data from Firestore or defaults
  useEffect(() => {
    const loadLessonData = async () => {
      if (!selectedRawi || !selectedUnit || !selectedLesson) return;
      setLoading(true);
      setSaveMessage(null);

      const lessonGlobalId = `${selectedRawi}-${selectedUnit}-${selectedLesson}`;

      try {
        // 1. Fetch custom lesson content
        const lessonDocRef = doc(db, 'lessonContents', lessonGlobalId);
        const lessonSnap = await getDoc(lessonDocRef);

        if (lessonSnap.exists() && lessonSnap.data().content) {
          const data = lessonSnap.data();
          setContent(data.content);
          setRuleSummary(data.ruleSummary || '');
          setIsCustomized(true);
        } else {
          // Fallback to default registered text
          const defaultText = getDefaultLessonText(selectedRawi, selectedUnit, selectedLesson);
          setContent(defaultText);
          setRuleSummary('');
          setIsCustomized(false);
        }

        // 2. Fetch admin notes
        const notesRef = doc(db, 'content', 'adminNotes');
        const notesSnap = await getDoc(notesRef);
        if (notesSnap.exists() && notesSnap.data()[lessonGlobalId]) {
          setAdminNote(notesSnap.data()[lessonGlobalId]);
        } else {
          setAdminNote('');
        }
      } catch (err) {
        console.error("Error loading lesson content:", err);
        const defaultText = getDefaultLessonText(selectedRawi, selectedUnit, selectedLesson);
        setContent(defaultText);
      } finally {
        setLoading(false);
      }
    };

    loadLessonData();
  }, [selectedRawi, selectedUnit, selectedLesson]);

  const insertSnippet = (snippet: string) => {
    setContent(prev => prev + '\n' + snippet + '\n');
  };

  const handleSave = async () => {
    if (!content.trim()) {
      setSaveMessage({ text: 'لا يمكن حفظ مادة علمية فارغة.', type: 'error' });
      return;
    }

    setSaving(true);
    setSaveMessage(null);
    const lessonGlobalId = `${selectedRawi}-${selectedUnit}-${selectedLesson}`;

    try {
      // 1. Save lesson content
      const lessonDocRef = doc(db, 'lessonContents', lessonGlobalId);
      await setDoc(lessonDocRef, {
        lessonGlobalId,
        rawiId: selectedRawi,
        unitId: selectedUnit,
        lessonId: selectedLesson,
        title: activeLesson?.title || '',
        content: content.trim(),
        ruleSummary: ruleSummary.trim(),
        updatedAt: serverTimestamp(),
        updatedBy: 'الشيخ المشرف'
      }, { merge: true });

      // 2. Save admin note if present
      if (adminNote.trim()) {
        const notesRef = doc(db, 'content', 'adminNotes');
        await setDoc(notesRef, { [lessonGlobalId]: adminNote.trim() }, { merge: true });
      }

      setIsCustomized(true);
      setSaveMessage({ text: 'تم حفظ واعتماد المادة العلمية بنجاح! التغييرات فعالة فوراً لجميع الطلاب.', type: 'success' });
      setTimeout(() => setSaveMessage(null), 4000);
    } catch (err) {
      console.error("Error saving lesson:", err);
      setSaveMessage({ text: 'حدث خطأ أثناء الحفظ. تأكد من اتصال الإنترنت وحاول مجدداً.', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    if (!window.confirm('هل أنت متأكد من استعادة المحتوى الأصلي للدرس وإلغاء أي تعديلات مخصصة؟')) {
      return;
    }

    setSaving(true);
    const lessonGlobalId = `${selectedRawi}-${selectedUnit}-${selectedLesson}`;
    try {
      const lessonDocRef = doc(db, 'lessonContents', lessonGlobalId);
      await deleteDoc(lessonDocRef);
      const defaultText = getDefaultLessonText(selectedRawi, selectedUnit, selectedLesson);
      setContent(defaultText);
      setRuleSummary('');
      setIsCustomized(false);
      setSaveMessage({ text: 'تمت استعادة المحتوى الافتراضي الأصلي للدرس.', type: 'info' });
      setTimeout(() => setSaveMessage(null), 3500);
    } catch (err) {
      console.error(err);
      setSaveMessage({ text: 'حدث خطأ أثناء استعادة المحتوى.', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-navy-900 p-6 rounded-2xl border border-navy-700 shadow-xl">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
            <BookOpen className="text-gold-400 w-6 h-6" />
            إدارة وتعديل المادة العلمية للدروس
          </h2>
          <p className="text-navy-300 text-sm">
            يمكنك هنا مراجعة وتصحيح أي مادة علمية أو قاعدة تجويدية في مساري ورش وقالون مع الحفظ الفوري المباشر.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {isCustomized && (
            <button
              onClick={handleReset}
              disabled={saving}
              className="text-red-400 hover:text-red-300 px-4 py-2 rounded-xl text-sm font-bold border border-red-500/20 hover:bg-red-500/10 transition flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" /> استعادة الأصلي
            </button>
          )}

          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-gold-500 text-navy-950 font-bold px-7 py-3 rounded-xl hover:bg-gold-400 transition flex items-center gap-2 shadow-lg disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            {saving ? 'جاري الحفظ...' : 'حفظ واعتماد التعديلات'}
          </button>
        </div>
      </div>

      {/* Save Message */}
      {saveMessage && (
        <div className={`p-4 rounded-xl font-bold flex items-center gap-3 animate-in fade-in ${
          saveMessage.type === 'success' 
            ? 'bg-green-500/20 border border-green-500/30 text-green-300' 
            : saveMessage.type === 'error'
            ? 'bg-red-500/20 border border-red-500/30 text-red-300'
            : 'bg-blue-500/20 border border-blue-500/30 text-blue-300'
        }`}>
          {saveMessage.type === 'success' && <CheckCircle2 className="w-5 h-5 text-green-400" />}
          {saveMessage.type === 'error' && <AlertCircle className="w-5 h-5 text-red-400" />}
          {saveMessage.text}
        </div>
      )}

      {/* Selection Form */}
      <div className="bg-navy-900 border border-navy-700 p-6 rounded-2xl space-y-6 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-navy-300 text-sm font-bold mb-2">الرواية المقروء بها</label>
            <select
              value={selectedRawi}
              onChange={e => setSelectedRawi(e.target.value)}
              className="w-full bg-navy-950 border border-navy-700 text-white p-3.5 rounded-xl focus:border-gold-500 outline-none font-bold"
            >
              <option value="warsh">رواية ورش عن نافع (طريق الشاطبية)</option>
              <option value="qalun">رواية قالون عن نافع</option>
            </select>
          </div>

          <div>
            <label className="block text-navy-300 text-sm font-bold mb-2">الباب (الوحدة)</label>
            <select
              value={selectedUnit}
              onChange={e => setSelectedUnit(e.target.value)}
              className="w-full bg-navy-950 border border-navy-700 text-white p-3.5 rounded-xl focus:border-gold-500 outline-none font-medium"
            >
              {currentMap.map(u => (
                <option key={u.id} value={u.id}>{u.title}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-navy-300 text-sm font-bold mb-2">الدرس المراد تعديله</label>
            <select
              value={selectedLesson}
              onChange={e => setSelectedLesson(e.target.value)}
              className="w-full bg-navy-950 border border-navy-700 text-white p-3.5 rounded-xl focus:border-gold-500 outline-none font-medium text-gold-300"
            >
              {activeUnit?.lessons.map(l => (
                <option key={l.id} value={l.id}>{l.title} {l.type === 'quiz' ? '(اختبار)' : ''}</option>
              ))}
            </select>
          </div>
        </div>

        {activeLesson && (
          <div className="pt-4 border-t border-navy-800 space-y-6">
            
            {/* Editor vs Preview tabs */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Edit2 className="w-5 h-5 text-gold-400" />
                <span className="text-white font-bold text-lg">
                  محتوى الدرس: {activeLesson.title}
                </span>
                {isCustomized ? (
                  <span className="text-xs bg-gold-500/20 text-gold-300 border border-gold-500/30 px-2.5 py-0.5 rounded-full font-bold">
                    معدل ومحفوظ
                  </span>
                ) : (
                  <span className="text-xs bg-navy-800 text-navy-300 px-2.5 py-0.5 rounded-full">
                    المحتوى الافتراضي
                  </span>
                )}
              </div>

              <div className="flex bg-navy-950 p-1 rounded-xl border border-navy-800">
                <button
                  type="button"
                  onClick={() => setActiveTab('editor')}
                  className={`px-4 py-1.5 rounded-lg text-sm font-bold flex items-center gap-2 transition ${
                    activeTab === 'editor' ? 'bg-gold-500 text-navy-950 shadow-sm' : 'text-navy-300 hover:text-white'
                  }`}
                >
                  <Edit3 className="w-4 h-4" /> المحرر
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('preview')}
                  className={`px-4 py-1.5 rounded-lg text-sm font-bold flex items-center gap-2 transition ${
                    activeTab === 'preview' ? 'bg-gold-500 text-navy-950 shadow-sm' : 'text-navy-300 hover:text-white'
                  }`}
                >
                  <Eye className="w-4 h-4" /> معاينة كما تظهر للطالب
                </button>
              </div>
            </div>

            {loading ? (
              <div className="h-64 flex flex-col items-center justify-center bg-navy-950/50 rounded-2xl border border-navy-800 text-navy-400 gap-3">
                <div className="w-8 h-8 border-3 border-gold-500 border-t-transparent rounded-full animate-spin" />
                <span>جاري تحميل المادة العلمية لهذا الدرس...</span>
              </div>
            ) : activeTab === 'editor' ? (
              <div className="space-y-4">
                {/* Summary / Rule callout */}
                <div>
                  <label className="block text-sm font-bold text-gold-400 mb-1 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    خلاصة سريعة / أصل الباب (تظهر في صندوق ذهبي أنيق بأعلى الدرس)
                  </label>
                  <input
                    type="text"
                    value={ruleSummary}
                    onChange={e => setRuleSummary(e.target.value)}
                    placeholder="مثال: يقرأ ورش بإشباع المدين المتصل والمنفصل 6 حركات قولاً واحداً."
                    className="w-full bg-navy-950 border border-navy-700 text-white p-3.5 rounded-xl focus:border-gold-500 outline-none"
                  />
                </div>

                {/* Insertion shortcuts */}
                <div>
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
                      onClick={() => insertSnippet('## عنوان رئيسي')}
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
                      onClick={() => insertSnippet('| الكلمة | الحكم | الشاهد |\n| --- | --- | --- |\n| ﴿ مِثَال ﴾ | بيان الحكم | الشاهد من المنظومة |')}
                      className="px-3 py-1.5 bg-navy-900 hover:bg-navy-800 text-blue-300 rounded-lg text-xs font-bold border border-navy-700 transition flex items-center gap-1"
                    >
                      <Table className="w-3 h-3" /> جدول مقارنة
                    </button>
                  </div>

                  <textarea
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    placeholder="اكتب هنا المادة العلمية للدرس، القواعد التجويدية، الشروح، والأمثلة..."
                    className="w-full h-96 bg-navy-950 border border-navy-700 text-white p-4 rounded-xl focus:border-gold-500 outline-none resize-y leading-relaxed text-base md:text-lg font-mono"
                    dir="rtl"
                  />
                </div>

                {/* Additional Admin Note */}
                <div className="pt-2">
                  <label className="block text-navy-300 text-sm font-bold mb-1">
                    ملاحظة إضافية للدرس (اختياري - تنبيهات عامة أو توجيهات للدارسين):
                  </label>
                  <input
                    type="text"
                    value={adminNote}
                    onChange={e => setAdminNote(e.target.value)}
                    placeholder="مثال: يرجى التركيز على الأمثلة العملية قبل أداء الاختبار."
                    className="w-full bg-navy-950 border border-navy-700 text-navy-200 p-3 rounded-xl focus:border-gold-500 outline-none text-sm"
                  />
                </div>
              </div>
            ) : (
              <div className="bg-navy-950/80 p-6 md:p-10 rounded-2xl border border-navy-800 min-h-[400px]">
                <CustomLessonRenderer content={content} ruleSummary={ruleSummary} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
