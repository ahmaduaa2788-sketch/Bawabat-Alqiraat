import React, { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { courseMap } from '../data/courseMap';
import { qalunCourseMap } from '../data/qalunCourseMap';
import { Save, Edit2, BookOpen } from 'lucide-react';

export function AdminLessonsManager() {
  const [selectedRawi, setSelectedRawi] = useState('warsh');
  const [selectedUnit, setSelectedUnit] = useState(courseMap[0].id);
  const [selectedLesson, setSelectedLesson] = useState(courseMap[0].lessons[0]?.id || '');
  
  const [adminNote, setAdminNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const currentMap = selectedRawi === 'warsh' ? courseMap : qalunCourseMap;
  const activeUnit = currentMap.find(u => u.id === selectedUnit) || currentMap[0];
  const activeLesson = activeUnit.lessons.find(l => l.id === selectedLesson) || activeUnit.lessons[0];

  useEffect(() => {
    if (activeUnit && activeUnit.lessons.length > 0) {
      if (!activeUnit.lessons.find(l => l.id === selectedLesson)) {
        setSelectedLesson(activeUnit.lessons[0].id);
      }
    }
  }, [selectedUnit, currentMap]);

  useEffect(() => {
    const loadAdminNote = async () => {
      if (!selectedRawi || !selectedUnit || !selectedLesson) return;
      setLoading(true);
      try {
        const lessonGlobalId = `${selectedRawi}-${selectedUnit}-${selectedLesson}`;
        const docRef = doc(db, 'content', 'adminNotes');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && docSnap.data()[lessonGlobalId]) {
          setAdminNote(docSnap.data()[lessonGlobalId]);
        } else {
          setAdminNote('');
        }
      } catch (err) {
        console.error("Error loading note", err);
        setAdminNote('');
      }
      setLoading(false);
    };
    loadAdminNote();
  }, [selectedRawi, selectedUnit, selectedLesson]);

  const handleSave = async () => {
    try {
      setSaveMessage('جاري الحفظ...');
      const lessonGlobalId = `${selectedRawi}-${selectedUnit}-${selectedLesson}`;
      const docRef = doc(db, 'content', 'adminNotes');
      await setDoc(docRef, { [lessonGlobalId]: adminNote }, { merge: true });
      setSaveMessage('تم الحفظ بنجاح!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (err) {
      setSaveMessage('حدث خطأ أثناء الحفظ.');
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-navy-900 p-6 rounded-2xl border border-navy-700">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">إدارة محتوى الدروس</h2>
          <p className="text-navy-300 text-sm">إضافة ملاحظات توضيحية أو إثراء محتوى الدرس للطلاب.</p>
        </div>
        <div>
          <button onClick={handleSave} className="bg-gold-500 text-navy-950 font-bold px-6 py-2 rounded-xl hover:bg-gold-400 transition flex items-center gap-2">
            <Save className="w-5 h-5" /> حفظ التعديلات
          </button>
        </div>
      </div>

      {saveMessage && (
        <div className={`p-4 rounded-xl text-center font-bold ${saveMessage.includes('بنجاح') ? 'bg-green-500/20 text-green-400' : 'bg-gold-500/20 text-gold-400'}`}>
          {saveMessage}
        </div>
      )}

      <div className="bg-navy-900 border border-navy-700 p-6 rounded-2xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-navy-300 text-sm mb-2">الرواية</label>
            <select value={selectedRawi} onChange={e => setSelectedRawi(e.target.value)} className="w-full bg-navy-950 border border-navy-700 text-white p-3 rounded-xl focus:border-gold-500 outline-none">
              <option value="warsh">رواية ورش</option>
              <option value="qalun">رواية قالون</option>
            </select>
          </div>
          <div>
            <label className="block text-navy-300 text-sm mb-2">الباب (الوحدة)</label>
            <select value={selectedUnit} onChange={e => setSelectedUnit(e.target.value)} className="w-full bg-navy-950 border border-navy-700 text-white p-3 rounded-xl focus:border-gold-500 outline-none">
              {currentMap.map(u => (
                <option key={u.id} value={u.id}>{u.title}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-navy-300 text-sm mb-2">الدرس</label>
            <select value={selectedLesson} onChange={e => setSelectedLesson(e.target.value)} className="w-full bg-navy-950 border border-navy-700 text-white p-3 rounded-xl focus:border-gold-500 outline-none">
              {activeUnit?.lessons.map(l => (
                <option key={l.id} value={l.id}>{l.title}</option>
              ))}
            </select>
          </div>
        </div>

        {activeLesson && (
          <div className="pt-4 border-t border-navy-800">
            <label className="block text-navy-200 font-bold mb-2 flex items-center gap-2">
              <Edit2 className="w-4 h-4 text-gold-400" />
              ملاحظات الإدارة والمحتوى الإضافي لهذا الدرس
            </label>
            <p className="text-sm text-navy-400 mb-4">
              سيظهر هذا المحتوى أعلى الدرس للطلاب بوضوح تام، يمكنك استخدامه لإضافة تنبيهات، شروح إضافية، أو مراجعات للمحتوى الأساسي.
            </p>
            {loading ? (
              <div className="h-40 flex items-center justify-center bg-navy-950/50 rounded-xl border border-navy-800">
                <span className="text-navy-400">جاري التحميل...</span>
              </div>
            ) : (
              <textarea 
                value={adminNote} 
                onChange={e => setAdminNote(e.target.value)} 
                placeholder="اكتب هنا أي محتوى إضافي أو ملاحظات توضيحية للطلاب بخصوص هذا الدرس..."
                className="w-full h-64 bg-navy-950 border border-navy-700 text-white p-4 rounded-xl focus:border-gold-500 outline-none resize-y leading-relaxed"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
