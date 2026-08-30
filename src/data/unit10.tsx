import React from 'react';
import { BookOpen, Quote, Info } from 'lucide-react';

export const unit10Content: Record<string, React.ReactNode> = {
  'u10-l1': (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-navy-800/80 p-6 md:p-8 rounded-2xl border border-navy-700 shadow-xl relative overflow-hidden">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
          <BookOpen className="text-gold-500" />
          شروط تغليظ اللام لورش
        </h2>
        
        <div className="prose prose-invert max-w-none">
          <div className="bg-navy-900/80 p-6 rounded-xl border-r-4 border-gold-500 mb-8">
            <h3 className="text-gold-400 font-bold mb-2 flex items-center gap-2">
              <Quote className="w-5 h-5" />
              الشاهد من الشاطبية
            </h3>
            <p className="font-serif text-xl leading-loose text-white text-center mb-4">
              وَغَلَّظَ وَرْشٌ فَتْحَ لاَمٍ لِصَادِهَا ... أَوِ الطَّاءِ أَوْ لِلظَّاءِ قَبْلُ تَنَزَّلاَ<br/>
              إِذَا فُتِحَتْ أَوْ سُكِّنَتْ كَصَلاَتِهِمْ ... وَمَطْلَعِ أَيْضاً ثُمَّ ظَلَّ وَيُوصَلاَ
            </p>
            <p className="text-navy-200 leading-relaxed text-sm">
              <strong className="text-gold-300">الشرح:</strong> اختص ورش (من طريق الأزرق) بتغليظ اللام إذا توفرت فيها شروط مجتمعة تتعلق بحركتها وحركة الحرف الذي قبلها ونوع ذلك الحرف.
            </p>
          </div>

          <div className="bg-navy-950 p-6 rounded-xl border border-navy-800 mb-6">
            <h4 className="text-xl font-bold text-white mb-4 border-b border-navy-700 pb-2">شروط التغليظ الثلاثة</h4>
            <ol className="list-decimal list-inside space-y-4 text-navy-100">
              <li><strong className="text-gold-400">أن تكون اللام مفتوحة:</strong> (سواء خفيفة أو مشددة).</li>
              <li><strong className="text-gold-400">أن يسبقها أحد ثلاثة أحرف:</strong> (الصاد، الطاء، الظاء).</li>
              <li><strong className="text-gold-400">أن يكون هذا الحرف السابق:</strong> مفتوحاً أو ساكناً.</li>
            </ol>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-navy-900/50 p-4 rounded text-center">
                <span className="block text-sm text-navy-300 mb-1">بعد الصاد</span>
                <span className="font-serif text-xl text-white">الصَّلَاةَ ، يَصْلَىٰ</span>
              </div>
              <div className="bg-navy-900/50 p-4 rounded text-center">
                <span className="block text-sm text-navy-300 mb-1">بعد الطاء</span>
                <span className="font-serif text-xl text-white">الطَّلَاقُ ، مَطْلَعِ</span>
              </div>
              <div className="bg-navy-900/50 p-4 rounded text-center">
                <span className="block text-sm text-navy-300 mb-1">بعد الظاء</span>
                <span className="font-serif text-xl text-white">ظَلَمَ ، أَظْلَمَ</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  'u10-l2': (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-navy-800/80 p-6 md:p-8 rounded-2xl border border-navy-700 shadow-xl relative overflow-hidden">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
          <BookOpen className="text-gold-500" />
          اللام التي فيها الوجهان
        </h2>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-navy-100 text-lg mb-6">
            هناك حالات توافرت فيها الشروط ولكن طرأ عليها ما يضعف سبب التغليظ، فيجوز لورش فيها التغليظ (والتغليظ هو المقدم) والترقيق.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-navy-950 p-5 rounded-xl border border-navy-800">
              <h4 className="text-gold-400 font-bold mb-2">1. إذا حيل بين اللام والحرف بالألف</h4>
              <p className="text-navy-200 text-sm mb-3">وقع ذلك في ثلاث كلمات في القرآن:</p>
              <ul className="font-serif text-white space-y-2 list-disc list-inside">
                <li>طَالَ</li>
                <li>فِصَالاً</li>
                <li>يَصَّالَحَا (صَالَحَا)</li>
              </ul>
              <p className="text-xs text-gold-300 mt-2">التغليظ أقوى وأولى.</p>
            </div>

            <div className="bg-navy-950 p-5 rounded-xl border border-navy-800">
              <h4 className="text-gold-400 font-bold mb-2">2. إذا كانت اللام متطرفة ووُقف عليها</h4>
              <p className="text-navy-200 text-sm mb-3">بالسكون العارض:</p>
              <ul className="font-serif text-white space-y-2 list-disc list-inside">
                <li>بَطَلَ</li>
                <li>فَصَلَ</li>
                <li>يُوصَلَ</li>
              </ul>
              <p className="text-xs text-gold-300 mt-2">عند الوقف فيها الوجهان (التغليظ والترقيق)، وعند الوصل تغلظ قولاً واحداً.</p>
            </div>

            <div className="bg-navy-950 p-5 rounded-xl border border-navy-800 md:col-span-2">
              <h4 className="text-gold-400 font-bold mb-2">3. ذوات الياء (التقاء البابين)</h4>
              <p className="text-navy-200 text-sm mb-3">إذا اجتمع سبب التغليظ مع سبب التقليل في نفس الكلمة (مثل: مُصَلَّى، يَصْلَاهَا).</p>
              <div className="flex gap-4 mt-3 bg-navy-900/50 p-3 rounded text-sm">
                <div className="flex-1">
                  <strong className="text-white block">إذا قللت الألف (ذات الياء)</strong>
                  <span className="text-navy-300">يجب ترقيق اللام للتناسب.</span>
                </div>
                <div className="flex-1">
                  <strong className="text-white block">إذا فتحت الألف</strong>
                  <span className="text-navy-300">يجب تغليظ اللام.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};
