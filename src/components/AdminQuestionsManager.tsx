import React, { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { questionBank as defaultQuestions, Question } from '../data/questionsBank';
import { Save, Plus, Trash2, Edit2, CheckCircle2 } from 'lucide-react';

export function AdminQuestionsManager() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [saveMessage, setSaveMessage] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Load questions from Firestore, fallback to local
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const docRef = doc(db, 'content', 'questions');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && docSnap.data().questions) {
          setQuestions(docSnap.data().questions);
        } else {
          setQuestions(defaultQuestions);
        }
      } catch (err) {
        console.error("Error loading questions", err);
        setQuestions(defaultQuestions);
      }
      setLoading(false);
    };
    loadQuestions();
  }, []);

  const handleSaveAll = async () => {
    try {
      setSaveMessage('جاري الحفظ...');
      await setDoc(doc(db, 'content', 'questions'), { questions });
      setSaveMessage('تم الحفظ بنجاح!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (err) {
      setSaveMessage('حدث خطأ أثناء الحفظ.');
      console.error(err);
    }
  };

  const updateQuestion = (id: string, field: keyof Question, value: any) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, [field]: value } : q));
  };

  const updateOption = (id: string, index: number, value: string) => {
    setQuestions(questions.map(q => {
      if (q.id === id) {
        const newOptions = [...q.options];
        newOptions[index] = value;
        return { ...q, options: newOptions };
      }
      return q;
    }));
  };

  const addQuestion = () => {
    const newId = `qb_custom_${Date.now()}`;
    const newQ: Question = {
      id: newId,
      question: "سؤال جديد",
      options: ["خيار 1", "خيار 2", "خيار 3", "خيار 4"],
      correctAnswer: 0,
      explanation: "شرح الإجابة"
    };
    setQuestions([newQ, ...questions]);
    setEditingId(newId);
  };

  const deleteQuestion = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا السؤال؟')) {
      setQuestions(questions.filter(q => q.id !== id));
    }
  };

  if (loading) return <div className="text-navy-300 text-center py-10">جاري تحميل الأسئلة...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-navy-900 p-6 rounded-2xl border border-navy-700">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">إدارة بنك الأسئلة</h2>
          <p className="text-navy-300 text-sm">تعديل وإضافة أسئلة للمختبر. الإجمالي: {questions.length} سؤال</p>
        </div>
        <div className="flex gap-4">
          <button onClick={addQuestion} className="bg-navy-800 text-gold-400 border border-gold-500/30 hover:bg-gold-500/10 px-4 py-2 rounded-xl flex items-center gap-2 transition">
            <Plus className="w-5 h-5" /> إضافة سؤال
          </button>
          <button onClick={handleSaveAll} className="bg-gold-500 text-navy-950 font-bold px-6 py-2 rounded-xl hover:bg-gold-400 transition flex items-center gap-2">
            <Save className="w-5 h-5" /> حفظ التعديلات
          </button>
        </div>
      </div>
      
      {saveMessage && (
        <div className={`p-4 rounded-xl text-center font-bold ${saveMessage.includes('بنجاح') ? 'bg-green-500/20 text-green-400' : 'bg-gold-500/20 text-gold-400'}`}>
          {saveMessage}
        </div>
      )}

      <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
        {questions.map((q, idx) => (
          <div key={q.id} className="bg-navy-900 border border-navy-700 p-6 rounded-2xl">
            {editingId === q.id ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-navy-300 text-sm mb-1">نص السؤال</label>
                  <input type="text" value={q.question} onChange={e => updateQuestion(q.id, 'question', e.target.value)} className="w-full bg-navy-950 border border-navy-700 text-white p-3 rounded-xl focus:border-gold-500 outline-none" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {q.options.map((opt, oIdx) => (
                    <div key={oIdx} className="flex items-center gap-2">
                      <input type="radio" name={`correct_${q.id}`} checked={q.correctAnswer === oIdx} onChange={() => updateQuestion(q.id, 'correctAnswer', oIdx)} className="w-5 h-5 accent-gold-500" />
                      <input type="text" value={opt} onChange={e => updateOption(q.id, oIdx, e.target.value)} className="flex-1 bg-navy-950 border border-navy-700 text-white p-2 rounded-xl focus:border-gold-500 outline-none text-sm" />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="block text-navy-300 text-sm mb-1">شرح الإجابة (التبرير)</label>
                  <textarea value={q.explanation} onChange={e => updateQuestion(q.id, 'explanation', e.target.value)} className="w-full bg-navy-950 border border-navy-700 text-white p-3 rounded-xl focus:border-gold-500 outline-none resize-none h-20" />
                </div>
                <div className="flex justify-end">
                  <button onClick={() => setEditingId(null)} className="bg-green-500/20 text-green-400 border border-green-500/30 px-6 py-2 rounded-xl hover:bg-green-500/30 transition flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" /> تم التعديل
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-white font-bold text-lg mb-2"><span className="text-gold-400">{idx + 1}.</span> {q.question}</h3>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {q.options.map((opt, oIdx) => (
                      <div key={oIdx} className={`p-2 rounded-lg text-sm ${q.correctAnswer === oIdx ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-navy-950 text-navy-300'}`}>
                        {opt}
                      </div>
                    ))}
                  </div>
                  <p className="text-navy-400 text-sm bg-navy-950/50 p-3 rounded-lg border border-navy-800">
                    <span className="text-gold-500 font-bold ml-1">الشرح:</span>
                    {q.explanation}
                  </p>
                </div>
                <div className="flex md:flex-col gap-2 justify-start md:justify-center">
                  <button onClick={() => setEditingId(q.id)} className="p-3 bg-navy-800 text-blue-400 hover:bg-blue-500/20 rounded-xl transition border border-transparent hover:border-blue-500/30" title="تعديل">
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button onClick={() => deleteQuestion(q.id)} className="p-3 bg-navy-800 text-red-400 hover:bg-red-500/20 rounded-xl transition border border-transparent hover:border-red-500/30" title="حذف">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
