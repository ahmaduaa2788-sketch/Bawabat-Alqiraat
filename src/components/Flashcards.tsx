import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';

export interface Flashcard {
  id: number;
  front: string;
  back: string;
  chapter: string;
}

export const flashcardsData: Flashcard[] = [
  { id: 1, chapter: "البسملة", front: "ما هي أوجه قراءة ورش بين السورتين؟", back: "السكت (المقدم)، الوصل، والبسملة." },
  { id: 2, chapter: "البسملة", front: "هل يبسمل ورش بين الأنفال والتوبة؟", back: "لا، له السكت والوصل والوقف كباقي القراء." },
  { id: 3, chapter: "المدود", front: "ما مقدار المد المتصل والمنفصل لورش؟", back: "الإشباع (6 حركات) وجهاً واحداً." },
  { id: 4, chapter: "المدود", front: "ما هي أوجه مد البدل لورش؟", back: "القصر (2)، التوسط (4)، والإشباع (6)." },
  { id: 5, chapter: "المدود", front: "ما مقدار مد اللين المهموز (مثل: شيء)؟", back: "التوسط (4) أو الإشباع (6)." },
  { id: 6, chapter: "الهمز المفرد", front: "ما شرط إبدال الهمز المفرد لورش؟", back: "أن تكون الهمزة ساكنة وواقعة فاء للكلمة (مثل: يُؤْمِنُونَ -> يُومِنُونَ)." },
  { id: 7, chapter: "الهمزتين من كلمة", front: "كيف يقرأ ورش الهمزتين المفتوحتين (ءَأَنذَرْتَهُمْ)؟", back: "التسهيل بين بين، أو الإبدال ألفاً." },
  { id: 8, chapter: "الهمزتين من كلمتين", front: "متفقتان في الحركة (مفتوحتان): جاءَ أَمْرُنَا", back: "تسهيل الثانية، أو إبدالها حرف مد (المقدم)." },
  { id: 9, chapter: "النقل", front: "ما شرط النقل لورش؟", back: "أن يكون الحرف الساكن قبل الهمزة صحيحاً ومفصولاً (مثل: مَنْ ءَامَنَ -> مَنَ امَنَ)." },
  { id: 10, chapter: "النقل", front: "كيف يقرأ ورش (كِتَابِيَهْ إِنِّي) بالوصل؟", back: "النقل (كتابيهِ نّي)، أو ترك النقل (المقدم) وهو بالسكت." },
  { id: 11, chapter: "الراءات", front: "متى يرقق ورش الراء المفتوحة والمضمومة؟", back: "إذا سبقت بكسر أصلي متصل، أو ياء ساكنة." },
  { id: 12, chapter: "الراءات", front: "هل ترقق الراء في (فِرَاقٍ)؟", back: "لا، تفخم بسبب حرف الاستعلاء (القاف)." },
  { id: 13, chapter: "اللامات", front: "ما شروط تغليظ اللام لورش؟", back: "أن تكون مفتوحة، وقبلها (ص، ط، ظ) مفتوحة أو ساكنة." },
  { id: 14, chapter: "الفتح والتقليل", front: "ما حكم ذوات الياء لورش؟", back: "الفتح والتقليل (الخلف)، باستثناء رؤوس آي السور الإحدى عشرة فتقلل قولا واحدا." },
  { id: 15, chapter: "الفتح والتقليل", front: "ما حكم ذوات الراء (مثل: افترى)؟", back: "التقليل قولاً واحداً." },
];

export function FlashcardsReview({ onClose }: { onClose: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const card = flashcardsData[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % flashcardsData.length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + flashcardsData.length) % flashcardsData.length);
    }, 150);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/90 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className="bg-navy-900 border border-navy-700 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-6 border-b border-navy-800 bg-navy-950/50">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <RotateCcw className="text-gold-500 w-6 h-6" /> وضع المراجعة السريعة
            </h2>
            <p className="text-navy-300 text-sm mt-1">بطاقات تعليمية لأهم القواعد</p>
          </div>
          <button onClick={onClose} className="text-navy-400 hover:text-white bg-navy-800 p-2 rounded-xl transition">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8 flex flex-col items-center justify-center min-h-[400px] perspective-1000">
          <div className="text-gold-400 font-bold mb-6 bg-gold-500/10 px-4 py-1.5 rounded-full border border-gold-500/20 text-sm">
            الباب: {card.chapter}
          </div>

          {/* Card */}
          <div 
            onClick={() => setIsFlipped(!isFlipped)}
            className="relative w-full max-w-lg h-64 cursor-pointer group transform-style-3d transition-transform duration-500"
            style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
          >
            {/* Front */}
            <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-navy-800 to-navy-900 border border-navy-700 rounded-2xl shadow-xl p-8 flex items-center justify-center text-center">
              <div>
                <p className="text-navy-400 text-sm mb-4 uppercase tracking-widest font-bold">السؤال</p>
                <h3 className="text-2xl font-bold text-white leading-relaxed">{card.front}</h3>
                <p className="text-navy-500 text-sm mt-8 animate-pulse">انقر لرؤية الإجابة</p>
              </div>
            </div>

            {/* Back */}
            <div 
              className="absolute inset-0 backface-hidden bg-gradient-to-br from-gold-600 to-gold-700 border border-gold-500 rounded-2xl shadow-xl p-8 flex items-center justify-center text-center"
              style={{ transform: 'rotateY(180deg)' }}
            >
              <div>
                <p className="text-gold-200 text-sm mb-4 uppercase tracking-widest font-bold">الإجابة</p>
                <h3 className="text-2xl font-bold text-navy-950 leading-relaxed">{card.back}</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-navy-800 bg-navy-950/50 flex justify-between items-center">
          <button 
            onClick={handlePrev}
            className="flex items-center gap-2 text-navy-300 hover:text-white bg-navy-800 px-4 py-2 rounded-xl transition"
          >
            <ChevronRight className="w-5 h-5" /> السابق
          </button>
          
          <div className="font-mono text-navy-400 font-bold">
            {currentIndex + 1} / {flashcardsData.length}
          </div>

          <button 
            onClick={handleNext}
            className="flex items-center gap-2 text-navy-950 font-bold bg-gold-500 hover:bg-gold-400 px-4 py-2 rounded-xl transition"
          >
            التالي <ChevronLeft className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
