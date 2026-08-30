import React from 'react';
import { BookOpen, Quote, Info } from 'lucide-react';

export const unit7Content: Record<string, React.ReactNode> = {
  'u7-l1': (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-navy-800/80 p-6 md:p-8 rounded-2xl border border-navy-700 shadow-xl relative overflow-hidden">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
          <BookOpen className="text-gold-500" />
          الوقف على هاء التأنيث
        </h2>
        
        <div className="prose prose-invert max-w-none">
          <div className="bg-navy-900/80 p-6 rounded-xl border-r-4 border-gold-500 mb-8">
            <h3 className="text-gold-400 font-bold mb-2 flex items-center gap-2">
              <Quote className="w-5 h-5" />
              الشاهد من الشاطبية
            </h3>
            <p className="font-serif text-xl leading-loose text-white text-center mb-4">
              وَإِنْ كُتِبَتْ تَاءً فَبِالْهَاءِ وُقْفُهَا ... نَدًا ضَافَ وَالْبَاقُونَ بِالتَّاءِ أَنْزَلاَ
            </p>
            <p className="text-navy-200 leading-relaxed text-sm">
              <strong className="text-gold-300">الشرح:</strong> الكلمات المنتهية بتاء التأنيث المفتوحة في المصحف (مثل: رحْمَت، نِعْمَت، شَجَرَت). وقف عليها بعض القراء بالهاء وبعضهم بالتاء المفتوحة.
            </p>
          </div>

          <div className="bg-navy-950 p-6 rounded-xl border border-navy-800">
            <h4 className="text-xl font-bold text-white mb-4">مذهب ورش في الوقف</h4>
            <p className="text-navy-100 mb-4">
              ورش يقف على تاء التأنيث المفتوحة المكتوبة في المصحف (تاءً مجرورة) بـ <strong className="text-white">التاء</strong> كما رُسمت.
            </p>
            <ul className="text-navy-200 list-disc list-inside space-y-2 mt-4 text-lg">
              <li><span className="font-serif text-white">﴿رَحْمَت﴾</span> يقف عليها: رَحْمَتْ</li>
              <li><span className="font-serif text-white">﴿نِعْمَت﴾</span> يقف عليها: نِعْمَتْ</li>
              <li><span className="font-serif text-white">﴿سُنَّت﴾</span> يقف عليها: سُنَّتْ</li>
            </ul>
            <p className="text-sm text-navy-300 mt-4">
              وذلك اتباعاً لرسم المصحف، وهو الأصل عند معظم القراء سوى من ذُكروا في البيت (ابن كثير، والكسائي، وأبو عمرو).
            </p>
          </div>
        </div>
      </div>
    </div>
  ),
  'u7-l2': (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-navy-800/80 p-6 md:p-8 rounded-2xl border border-navy-700 shadow-xl relative overflow-hidden">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
          <BookOpen className="text-gold-500" />
          المقطوع والموصول
        </h2>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-navy-100 text-lg mb-6">
            من أصول القراءة معرفة المقطوع والموصول في رسم المصحف العثماني للوقف عليها الاضطراري أو الاختباري.
          </p>
          
          <div className="bg-navy-950 p-6 rounded-xl border border-navy-800 mb-6">
            <h4 className="text-gold-400 font-bold mb-3">قاعدة الوقف لورش وللجمهور</h4>
            <p className="text-navy-200 leading-relaxed mb-4">
              يجب الوقف على الكلمات حسب رسمها في المصحف الإمام:
            </p>
            <ul className="text-navy-100 space-y-4">
              <li className="flex flex-col sm:flex-row sm:items-center gap-4 bg-navy-900/50 p-4 rounded-lg">
                <div className="flex-1">
                  <strong className="text-white block mb-1">المقطوع</strong>
                  <span className="text-sm text-navy-300">يجوز الوقف على الكلمة الأولى منهما (اختباراً أو اضطراراً).</span>
                </div>
                <div className="bg-navy-950 px-4 py-2 rounded font-serif text-gold-400">مثل: أَن لَّن (يقف على أن)</div>
              </li>
              
              <li className="flex flex-col sm:flex-row sm:items-center gap-4 bg-navy-900/50 p-4 rounded-lg">
                <div className="flex-1">
                  <strong className="text-white block mb-1">الموصول</strong>
                  <span className="text-sm text-navy-300">لا يجوز الوقف إلا على الكلمة الثانية لأنهما رُسمتا كلمة واحدة.</span>
                </div>
                <div className="bg-navy-950 px-4 py-2 rounded font-serif text-gold-400">مثل: أَلَّن (يقف على ألَّن)</div>
              </li>
            </ul>
          </div>

          <div className="bg-blue-900/10 p-5 rounded-xl border border-blue-900/50 text-sm text-blue-200 flex items-start gap-3">
            <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <p>
              يعد الوقف على المقطوع والموصول من باب الوقف الاختباري (للاختبار) أو الاضطراري (لانقطاع النفس)، ولا يُتعمد الوقف عليه في القراءة العادية. وورش يوافق الجمهور في اتباع الرسم العثماني.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
};
