import React from 'react';
import { BookOpen, Quote, AlertTriangle } from 'lucide-react';

export const unit5Content: Record<string, React.ReactNode> = {
  'u5-l1': (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-navy-800/80 p-6 md:p-8 rounded-2xl border border-navy-700 shadow-xl relative overflow-hidden">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
          <BookOpen className="text-gold-500" />
          شروط النقل عند ورش
        </h2>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-navy-100 text-lg leading-relaxed mb-6">
            النقل هو: نقل حركة همزة القطع إلى الحرف الساكن قبلها، مع حذف الهمزة. وهذا من أهم أصول الإمام ورش.
          </p>

          <div className="bg-navy-900/80 p-6 rounded-xl border-r-4 border-gold-500 mb-8">
            <h3 className="text-gold-400 font-bold mb-2 flex items-center gap-2">
              <Quote className="w-5 h-5" />
              الشاهد من الشاطبية (بشرح الوسيط)
            </h3>
            <p className="font-serif text-xl leading-loose text-white text-center mb-4">
              وَحَرِّكْ لِوَرْشٍ كُلَّ سَاكِنٍ اخِرٍ ... صَحِيحٍ بِشَكْلِ الْهَمْزِ وَاحْذِفْهُ مُسْهِلاَ
            </p>
            <p className="text-navy-200 leading-relaxed text-sm">
              <strong className="text-gold-300">شرح ما بين السطور:</strong> ذكر د. صبري سلامة في الوسيط شروط النقل عند ورش مجموعة في هذا البيت:
              أن يكون الحرف المنقول إليه <strong className="text-white">ساكناً</strong>، وأن يكون في <strong className="text-white">آخر الكلمة</strong> (والهمزة في أول الكلمة الثانية)، وأن يكون الساكن <strong className="text-white">صحيحاً</strong> (ليس حرف مد ولا ميم جمع).
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-navy-950 p-6 rounded-xl border border-navy-800">
              <h4 className="text-lg font-bold text-gold-400 mb-4 border-b border-navy-800 pb-2">شروط النقل</h4>
              <ul className="space-y-3 text-navy-100 list-decimal list-inside">
                <li>أن يكون الحرف قبل الهمزة <strong className="text-white">ساكناً</strong>.</li>
                <li>أن يكون الساكن في <strong className="text-white">كلمة</strong> والهمزة في الكلمة التي تليها (ساكن آخر).</li>
                <li>أن يكون الساكن <strong className="text-white">صحيحاً</strong> (وليس حرف مد كالواو والياء والألف).</li>
                <li>ألا يكون الساكن <strong className="text-white">ميم جمع</strong> (لأن لها حكماً خاصاً وهو الصلة).</li>
              </ul>
            </div>

            <div className="bg-navy-950 p-6 rounded-xl border border-navy-800">
              <h4 className="text-lg font-bold text-gold-400 mb-4 border-b border-navy-800 pb-2">أمثلة تطبيقية</h4>
              <ul className="space-y-4 text-navy-100">
                <li className="flex justify-between items-center bg-navy-900/50 p-3 rounded">
                  <span className="font-serif text-lg">مَنْ آمَنَ</span>
                  <span className="text-gold-400 font-bold px-2 flex items-center">&larr;</span>
                  <span className="font-serif text-xl text-white">مَنَ ามَنَ</span>
                </li>
                <li className="flex justify-between items-center bg-navy-900/50 p-3 rounded">
                  <span className="font-serif text-lg">قَدْ أَفْلَحَ</span>
                  <span className="text-gold-400 font-bold px-2 flex items-center">&larr;</span>
                  <span className="font-serif text-xl text-white">قَدَ فْلَحَ</span>
                </li>
                <li className="flex justify-between items-center bg-navy-900/50 p-3 rounded">
                  <span className="font-serif text-lg">خَلَوْا إِلَى</span>
                  <span className="text-gold-400 font-bold px-2 flex items-center">&larr;</span>
                  <span className="font-serif text-xl text-white">خَلَوِ لَى</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  'u5-l2': (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-navy-800/80 p-6 md:p-8 rounded-2xl border border-navy-700 shadow-xl relative overflow-hidden">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
          <BookOpen className="text-gold-500" />
          النقل في (أل) التعريف
        </h2>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-navy-100 text-lg mb-6">
            لام (أل) التعريف الساكنة إذا جاء بعدها همزة قطع، فإن ورشاً ينقل حركة الهمزة إليها كالقاعدة العامة، لأن (أل) تعد في حكم الكلمة المنفصلة.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            <div className="bg-navy-950 p-5 rounded-xl border border-navy-800 text-center">
              <span className="block text-navy-300 text-sm mb-2">الأصل</span>
              <span className="font-serif text-2xl text-white block">الأَرْضِ</span>
              <div className="h-px bg-navy-800 w-1/2 mx-auto my-3"></div>
              <span className="block text-navy-300 text-sm mb-2">بعد النقل لورش</span>
              <span className="font-serif text-2xl text-gold-400 block">لَـرْضِ</span>
            </div>
            
            <div className="bg-navy-950 p-5 rounded-xl border border-navy-800 text-center">
              <span className="block text-navy-300 text-sm mb-2">الأصل</span>
              <span className="font-serif text-2xl text-white block">الإِيمَانِ</span>
              <div className="h-px bg-navy-800 w-1/2 mx-auto my-3"></div>
              <span className="block text-navy-300 text-sm mb-2">بعد النقل لورش</span>
              <span className="font-serif text-2xl text-gold-400 block">لِـيمَانِ</span>
            </div>
          </div>

          <div className="bg-navy-900/50 p-6 rounded-xl border border-navy-800">
            <h4 className="text-gold-400 font-bold mb-3 border-b border-navy-800 pb-2 flex items-center gap-2">
              الابتداء بالكلمة التي نُقلت حركتها
            </h4>
            <p className="text-navy-100 mb-4">عند الابتداء بكلمة مثل (الأرض)، فلك وجهان صحيحان مقروءٌ بهما:</p>
            <ul className="list-disc list-inside space-y-4 text-navy-200">
              <li><strong className="text-white">الاعتداد بالأصل:</strong> الإتيان بهمزة الوصل مفتوحة (أَلَرْض).</li>
              <li><strong className="text-white">الاعتداد بالعارض:</strong> البدء باللام المتحركة بحركة الهمزة دون همزة وصل (لَرْض).</li>
            </ul>
            <p className="mt-4 text-sm text-gold-300">والوجهان صحيحان معمول بهما في الأداء.</p>
          </div>
        </div>
      </div>
    </div>
  ),
  'u5-l3': (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-navy-800/80 p-6 md:p-8 rounded-2xl border border-navy-700 shadow-xl relative overflow-hidden">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
          <BookOpen className="text-gold-500" />
          كتابيه إني (نقل وسكت)
        </h2>
        
        <div className="prose prose-invert max-w-none">
          <div className="bg-navy-950 p-6 rounded-xl border border-navy-800 mb-6 text-center">
            <p className="font-serif text-2xl text-white leading-loose">
              ﴿ فَأَمَّا مَنْ أُوتِيَ كِتَابَهُ بِيَمِينِهِ فَيَقُولُ هَاؤُمُ اقْرَءُوا <span className="text-gold-400">كِتَابِيَهْ ۝ إِنِّي</span> ظَنَنْتُ أَنِّي مُلَاقٍ حِسَابِيَهْ ﴾
            </p>
          </div>

          <p className="text-navy-100 text-lg mb-6">
            في سورة الحاقة عند وصل (كتابيهْ) بـ (إني)، الهاء في (كتابيه) هاء سكت وهي ساكنة سكوناً أصلياً، وبعدها همزة قطع مكسورة. لورش فيها عند الوصل وجهان (ذكرهما ابن الجزري والعلماء):
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-navy-900/50 p-6 rounded-xl border border-navy-800">
              <h4 className="text-gold-400 font-bold mb-3 text-lg">الوجه الأول: النقل</h4>
              <p className="text-navy-200 mb-4">
                تطبيقاً للقاعدة العامة (ساكن صحيح في آخر الكلمة + همزة قطع). تُنقل كسرة الهمزة إلى الهاء وتحذف الهمزة.
              </p>
              <div className="bg-navy-950 p-3 text-center rounded">
                <span className="font-serif text-xl text-white">كِتَابِيَهِ نِّي</span>
              </div>
            </div>

            <div className="bg-navy-900/50 p-6 rounded-xl border border-navy-800">
              <h4 className="text-gold-400 font-bold mb-3 text-lg">الوجه الثاني: السكت (وهو المقدم)</h4>
              <p className="text-navy-200 mb-4">
                السكت على هاء (كتابيهْ) سكتة لطيفة من غير تنفس ثم النطق بالهمزة (إني). والمقدم أداءً هو السكت للمحافظة على هاء السكت.
              </p>
              <div className="bg-navy-950 p-3 text-center rounded">
                <span className="font-serif text-xl text-white">كِتَابِيَهْ ... إِنِّي</span>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-yellow-900/20 border border-yellow-700/50 rounded-xl flex gap-3 text-yellow-500">
            <AlertTriangle className="w-6 h-6 flex-shrink-0" />
            <p className="text-sm leading-relaxed">
              <strong>تنبيه من الشاطبية (ونقل ردا...):</strong> نقل عن الإمام نافع الرد (بترك النقل) في هذه الكلمة للمحافظة على هاء السكت التي بنيت على السكون، ولذلك جرى العمل بتقديم وجه السكت.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
};
