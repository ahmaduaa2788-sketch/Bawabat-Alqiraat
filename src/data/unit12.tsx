import React from 'react';
import { BookOpen, Quote, Info } from 'lucide-react';

export const unit12Content: Record<string, React.ReactNode> = {
  'u12-l1': (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-navy-800/80 p-6 md:p-8 rounded-2xl border border-navy-700 shadow-xl relative overflow-hidden">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
          <BookOpen className="text-gold-500" />
          صلة ميم الجمع عند ورش
        </h2>
        
        <div className="prose prose-invert max-w-none">
          <div className="bg-navy-900/80 p-6 rounded-xl border-r-4 border-gold-500 mb-8">
            <h3 className="text-gold-400 font-bold mb-2 flex items-center gap-2">
              <Quote className="w-5 h-5" />
              الشاهد من الشاطبية
            </h3>
            <p className="font-serif text-xl leading-loose text-white text-center mb-4">
              وَمِنْ قَبْلِ هَمْزِ الْقَطْعِ صِلْهَا لِوَرْشِهِمْ ... وَأَسْكَنَهَا الْبَاقُونَ بَعْدُ لِتَكْمُلاَ
            </p>
          </div>

          <div className="bg-navy-950 p-6 rounded-xl border border-navy-800">
            <h4 className="text-xl font-bold text-white mb-4">الحكم العام</h4>
            <p className="text-navy-100 mb-4">
              ميم الجمع هي الميم الزائدة الدالة على جمع المذكر السالم (مثل: عليهم، أنتم، لكم). ولها أحكام عند القراء إذا وقعت قبل حرف متحرك.
            </p>
            <div className="bg-navy-900/50 p-5 rounded-lg border-r-2 border-gold-500">
              <p className="text-navy-100">
                <strong className="text-gold-300">مذهب ورش:</strong> يصل ميم الجمع بواو لفظية وتمد ست حركات (إشباعاً) <strong className="text-white">فقط</strong> إذا جاء بعدها <strong className="text-red-400">همزة قطع متحركة</strong>.
              </p>
              <ul className="mt-4 font-serif text-xl text-white space-y-2 list-disc list-inside">
                <li>﴿عَلَيْهِمْ ءَأَنذَرْتَهُمْ﴾ تُقرأ: عَلَيْهِمُوٓ ءَأَنذَرْتَهُمْ (بالصلة والإشباع).</li>
                <li>﴿لَكُمْ أَنفُسَكُمْ﴾ تُقرأ: لَكُمُوٓ أَنفُسَكُمْ.</li>
              </ul>
            </div>
            
            <p className="text-navy-200 mt-4 text-sm">
              أما إذا جاء بعد ميم الجمع أي حرف آخر غير همزة القطع (مثل: عليهم غير)، فإن ورشاً يسكن الميم كحفص والجمهور.
            </p>
          </div>
        </div>
      </div>
    </div>
  ),
  'u12-l2': (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-navy-800/80 p-6 md:p-8 rounded-2xl border border-navy-700 shadow-xl relative overflow-hidden">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
          <BookOpen className="text-gold-500" />
          ميم الجمع عند التقاء الساكنين
        </h2>
        
        <div className="prose prose-invert max-w-none">
          <div className="bg-navy-950 p-6 rounded-xl border border-navy-800 mb-6">
            <h4 className="text-xl font-bold text-white mb-4">الحكم إذا جاء بعد الميم همزة وصل</h4>
            <p className="text-navy-100 mb-4">
              إذا وقع بعد ميم الجمع ساكن (كهمزة الوصل في "ال" التعريف)، فما هو العمل للتخلص من التقاء الساكنين؟
            </p>
            
            <div className="bg-navy-900/50 p-4 rounded-lg mb-4">
              <strong className="text-gold-400 block mb-2">القاعدة:</strong>
              <p className="text-navy-200">
                يضم ورش (والقراء جميعاً) ميم الجمع للتخلص من التقاء الساكنين دون صلة.
              </p>
              <p className="font-serif text-xl text-white mt-2">
                ﴿عَلَيْهِمُ الذِّلَّةُ﴾ ، ﴿مِنكُمُ الرِّجَالُ﴾ ، ﴿بِهِمُ الأَسْبَابُ﴾
              </p>
            </div>
          </div>
          
          <div className="bg-blue-900/10 p-5 rounded-xl border border-blue-900/50 flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="text-blue-200 text-sm space-y-2">
              <p><strong className="text-blue-300">ملاحظة هامة:</strong></p>
              <p>إذا كانت الميم قبل همزة وصل وكان الحرف الذي قبل الميم هاء مكسورة، مثل: ﴿فِي قُلُوبِهِمُ الْمَرَضُ﴾، فإن ورشاً يقرؤها بضم الميم وكسر الهاء (قُلُوبِهِمُ الْمَرَضُ)، خلافاً لأبي عمرو الذي يكسر الميم أيضاً (قُلُوبِهِمِ الْمَرَضُ).</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};
