import React from 'react';
import { BookOpen, Quote, Info } from 'lucide-react';

export const unit11Content: Record<string, React.ReactNode> = {
  'u11-l1': (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-navy-800/80 p-6 md:p-8 rounded-2xl border border-navy-700 shadow-xl relative overflow-hidden">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
          <BookOpen className="text-gold-500" />
          أحوال صلة هاء الكناية
        </h2>
        
        <div className="prose prose-invert max-w-none">
          <div className="bg-navy-900/80 p-6 rounded-xl border-r-4 border-gold-500 mb-8">
            <h3 className="text-gold-400 font-bold mb-2 flex items-center gap-2">
              <Quote className="w-5 h-5" />
              الشاهد من الشاطبية
            </h3>
            <p className="font-serif text-xl leading-loose text-white text-center mb-4">
              وَلَمْ يَصِلُوا هَاءَ مُضْمَرٍ قَبْلَ سَاكِنٍ ... وَمَا قَبْلَهُ التَّحْرِيكُ لِلْكُلِّ وُصِّلاَ<br/>
              وَمَا قَبْلَهُ التَّسْكِينُ لِابْنِ كَثِيرِهِمْ ...
            </p>
          </div>

          <div className="bg-navy-950 p-6 rounded-xl border border-navy-800">
            <h4 className="text-xl font-bold text-white mb-4">القاعدة العامة لورش</h4>
            <p className="text-navy-100 mb-4">هاء الكناية (هاء الضمير المفرد المذكر الغائب)، لها أحوال:</p>
            
            <ul className="space-y-4">
              <li className="bg-navy-900/50 p-4 rounded-lg">
                <strong className="text-gold-400 text-lg block mb-1">1. أن تقع بين متحركين</strong>
                <p className="text-navy-200 mb-2">يصلها ورش (والقراء جميعاً) بواو إن كانت مضمومة، وبياء إن كانت مكسورة.</p>
                <div className="font-serif text-white">﴿إِنَّهُۥ كَانَ بِعِبَادِهِۦ خَبِيرًا﴾</div>
              </li>
              
              <li className="bg-navy-900/50 p-4 rounded-lg">
                <strong className="text-gold-400 text-lg block mb-1">2. أن تقع قبل ساكن (سواء ما قبلها متحرك أو ساكن)</strong>
                <p className="text-navy-200 mb-2">لا يصلها ورش ولا أحد من القراء.</p>
                <div className="font-serif text-white">﴿لَهُ الْمُلْكُ﴾ ، ﴿عَلَيْهِ اللَّهُ﴾</div>
              </li>

              <li className="bg-navy-900/50 p-4 rounded-lg">
                <strong className="text-gold-400 text-lg block mb-1">3. أن تقع بعد ساكن وقبل متحرك</strong>
                <p className="text-navy-200 mb-2">لا يصلها ورش (ويصلها ابن كثير فقط).</p>
                <div className="font-serif text-white">﴿فِيهِ هُدًى﴾ يقرؤها ورش بكسر الهاء بدون صلة (ياء).</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  ),
  'u11-l2': (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-navy-800/80 p-6 md:p-8 rounded-2xl border border-navy-700 shadow-xl relative overflow-hidden">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
          <BookOpen className="text-gold-500" />
          الاستثناءات والكلمات المخصوصة
        </h2>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-navy-100 text-lg mb-6">
            هناك كلمات خرجت عن القاعدة الأصلية ونصّ عليها الأئمة في القراءة لورش.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-navy-950 p-5 rounded-xl border border-navy-800">
              <h4 className="text-gold-400 font-bold mb-2 font-serif text-xl">﴿يَرْضَهُ لَكُمْ﴾</h4>
              <p className="text-navy-200 text-sm">قرأها ورش بضم الهاء من غير صلة (مع أنها بين متحركين). (الشاهد: وفي يرضه يمناً...)</p>
            </div>

            <div className="bg-navy-950 p-5 rounded-xl border border-navy-800">
              <h4 className="text-gold-400 font-bold mb-2 font-serif text-xl">﴿يَتَّقْهِ﴾</h4>
              <p className="text-navy-200 text-sm">في سورة النور (ويتقهْ فأولئك). قرأها ورش بكسر القاف وكسر الهاء مع الصلة (يَتَّقِهِۦ).</p>
            </div>

            <div className="bg-navy-950 p-5 rounded-xl border border-navy-800">
              <h4 className="text-gold-400 font-bold mb-2 font-serif text-xl">﴿يَأْتِهِ﴾</h4>
              <p className="text-navy-200 text-sm">في سورة طه (ومن يأته مؤمناً). قرأها ورش بكسر الهاء وقصرها (من غير صلة).</p>
            </div>

            <div className="bg-navy-950 p-5 rounded-xl border border-navy-800">
              <h4 className="text-gold-400 font-bold mb-2 font-serif text-xl">﴿أَرْجِهْ﴾</h4>
              <p className="text-navy-200 text-sm">في الأعراف والشعراء. قرأها ورش بزيادة همزة ساكنة وضم الهاء مع الصلة (أَرْجِئْهُۥ).</p>
            </div>
            
            <div className="bg-navy-950 p-5 rounded-xl border border-navy-800 md:col-span-2">
              <h4 className="text-gold-400 font-bold mb-2 font-serif text-xl">﴿فَأَلْقِهْ﴾</h4>
              <p className="text-navy-200 text-sm">في سورة النمل (فألقه إليهم). قرأها ورش بكسر الهاء مع الصلة (فَأَلْقِهِۦٓ إِلَيْهِمْ)، وتمد إشباعاً لأن بعدها همزة قطع.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};
