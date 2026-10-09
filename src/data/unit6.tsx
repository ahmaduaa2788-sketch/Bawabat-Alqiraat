import React from 'react';
import { BookOpen, Quote, AlertCircle, CheckCircle2, Info } from 'lucide-react';

export const unit6Content: Record<string, React.ReactNode> = {
  'u6-l1': (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-navy-800/80 p-6 md:p-8 rounded-2xl border border-navy-700 shadow-xl relative overflow-hidden">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
          <BookOpen className="text-gold-500" />
          إدغام ذال (إذ) ودال (قد)
        </h2>
        
        <div className="prose prose-invert max-w-none">
          <div className="bg-navy-900/80 p-6 rounded-xl border-r-4 border-gold-500 mb-8">
            <h3 className="text-gold-400 font-bold mb-2 flex items-center gap-2">
              <Quote className="w-5 h-5" />
              من الشاطبية
            </h3>
            <p className="font-serif text-xl leading-loose text-white text-center mb-4">
              نَعَمْ إِذْ تَمَشَّتْ زَيْنَبٌ صَالَ دَلُّهَا ... سَمِيَّ جَمَالٍ وَاصِلاً مَنْ تَوَصَّلاَ
            </p>
            <p className="text-navy-200 leading-relaxed text-sm">
              <strong className="text-gold-300">مذهب ورش في (إذ):</strong> يظهر ورش ذال (إذ) عند جميع حروفها الستة (التاء، الزاي، الصاد، الدال، السين، الجيم). فلا يدغمها في شيء منها.
            </p>
          </div>

          <div className="bg-navy-950 p-6 rounded-xl border border-navy-800">
            <h4 className="text-xl font-bold text-white mb-4 border-b border-navy-700 pb-2">حكم دال (قد)</h4>
            <p className="font-serif text-xl leading-loose text-white text-center mb-4 bg-navy-900/50 p-4 rounded-lg">
              وَقَدْ سَحَبَتْ ذَيْلاً ضَفَا ظَلَّ زَرْنَبٌ ... جَلاَتْهُ صَبَاهُ شَائِقاً وَمُعَلِّلاَ<br/>
              ... وَوَرْشٌ جَمِيعَ الْبَابِ كَانَ مُقَلِّلاَ (أي مقللاً للإدغام، فيظهر عند البعض ويدغم في البعض)
            </p>
            <p className="text-navy-100 mb-4">
              أدغم الإمام ورش دال (قد) في حرفين فقط وأظهرها عند الباقي:
            </p>
            <ul className="text-navy-100 list-disc list-inside space-y-2">
              <li><strong className="text-gold-400">الضاد:</strong> ﴿فَقَد ضَّلَّ﴾ يدغم الدال في الضاد إدغاماً كاملاً.</li>
              <li><strong className="text-gold-400">الظاء:</strong> ﴿فَقَد ظَّلَمَ﴾ يدغم الدال في الظاء إدغاماً كاملاً.</li>
              <li>أما عند بقية الحروف (السين، الذال، الزاي، الجيم، الصاد، الشين) فإنه <strong className="text-white">يظهرها</strong>.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  ),
  'u6-l2': (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-navy-800/80 p-6 md:p-8 rounded-2xl border border-navy-700 shadow-xl relative overflow-hidden">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
          <BookOpen className="text-gold-500" />
          تاء التأنيث ولام (هل) و(بل)
        </h2>
        
        <div className="prose prose-invert max-w-none">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-navy-950 p-6 rounded-xl border border-navy-800">
              <h4 className="text-gold-400 font-bold mb-3 text-lg border-b border-navy-800 pb-2">تاء التأنيث الساكنة</h4>
              <p className="text-navy-200 mb-4">
                تأتي تاء التأنيث قبل ستة أحرف: السين، الثاء، الصاد، الزاي، الطاء، الجيم.
              </p>
              <p className="text-navy-100 mb-4">
                <strong className="text-white block mb-2">مذهب ورش:</strong>
                أدغم ورش تاء التأنيث في حرف واحد فقط وهو <strong className="text-gold-400">الظاء</strong> في قوله تعالى: <span className="font-serif text-white">﴿كَانَت ظَّالِمَةً﴾</span> [الأنبياء: 11] فتقرأ بالظاء المشددة. وأظهرها عند باقي الحروف الستة، مثل: <span className="font-serif">﴿حَصِرَتْ صُدُورُهُم﴾</span>، <span className="font-serif">﴿نَضَجَتْ جُلُودُهُم﴾</span>.
              </p>
            </div>

            <div className="bg-navy-950 p-6 rounded-xl border border-navy-800">
              <h4 className="text-gold-400 font-bold mb-3 text-lg border-b border-navy-800 pb-2">لام (هل) و(بل)</h4>
              <p className="text-navy-200 mb-4">
                تقع لام (هل وبل) قبل ثمانية أحرف خلافية بين القراء.
              </p>
              <p className="text-navy-100 mb-4">
                <strong className="text-white block mb-2">مذهب ورش:</strong>
                أظهر ورش لام (هل) و(بل) عند جميع الحروف الخلافية، وأدغمها فقط في (اللام والراء) للتماثل والتقارب العام المتفق عليه لجميع القراء (مثل: ﴿بَل رَّفَعَهُ﴾، ﴿بَل لَّا يَخَافُونَ﴾).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  'u6-l3': (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700" dir="rtl">
      <div className="bg-navy-800/80 p-6 md:p-8 rounded-2xl border border-navy-700 shadow-xl relative overflow-hidden">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
          <BookOpen className="text-gold-500" />
          الحروف المتقاربة والمتجانسة المخصوصة عند ورش
        </h2>
        
        <div className="prose prose-invert max-w-none space-y-6">
          <div className="bg-navy-900/80 p-6 rounded-xl border-r-4 border-gold-500">
            <h3 className="text-gold-400 font-bold mb-2 flex items-center gap-2">
              <Quote className="w-5 h-5" />
              الشاهد من الشاطبية
            </h3>
            <p className="font-serif text-xl leading-loose text-white text-center py-2 bg-navy-950/60 rounded-xl border border-navy-800">
              وَيَلْهَثْ عِذْ دِنَا فَتَى حُمْلٍ ... وَارْكَبْ مَّعَنَا فِي هُودَ بِالْخُلْفِ غَلَّبَا<br/>
              وَأَخَذْتُمْ وَاتَّخَذْتُمُ ... لِوَرْشٍ أَدْغَمَا مُوصَلاَ
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* YalHath Thalik */}
            <div className="bg-navy-950 p-6 rounded-xl border border-navy-800 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-lg border-b border-navy-800 pb-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>1. ﴿يَلۡهَث ذَّٰلِكَ﴾ [الأعراف: 176]</span>
              </div>
              <p className="text-navy-200 text-sm leading-relaxed">
                <strong className="text-gold-300">مذهب ورش من طريق الشاطبية:</strong>
                يقرؤها بـ <strong className="text-white text-base">الإدغام الكامل وجهاً واحداً</strong>، فتدغم الثاء في الذال وتلفظ: <span className="font-serif text-gold-400 text-lg">﴿يَلْهَذَّلِكَ﴾</span> بذال مشددة خالصة دون أي إظهار.
              </p>
            </div>

            {/* Irkab Ma'ana */}
            <div className="bg-navy-950 p-6 rounded-xl border border-navy-800 space-y-3">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-lg border-b border-navy-800 pb-2">
                <Info className="w-5 h-5" />
                <span>2. ﴿يَٰبُنَيَّ ٱرۡكَب مَّعَنَا﴾ [هود: 42]</span>
              </div>
              <p className="text-navy-200 text-sm leading-relaxed">
                <strong className="text-gold-300">مذهب ورش من طريق الشاطبية:</strong>
                يقرؤها بـ <strong className="text-white text-base">الإظهار وجهاً واحداً</strong>، فتقرأ: <span className="font-serif text-gold-400 text-lg">﴿ارْكَبْ مَعَنَا﴾</span> بإظهار الباء مقلقلة قبل الميم، خلافاً لحفص الذي يدغمها.
              </p>
            </div>
          </div>

          {/* Other specific letters */}
          <div className="bg-navy-950 p-6 rounded-xl border border-navy-800 space-y-4">
            <h4 className="text-gold-400 font-bold text-base border-b border-navy-800 pb-2">
              كلمات أخرى مخصوصة بالإدغام عند ورش:
            </h4>
            <div className="grid sm:grid-cols-2 gap-4 text-sm text-navy-200">
              <div className="bg-navy-900/60 p-4 rounded-lg">
                <strong className="text-white block mb-1">إدغام الذال في التاء وجهاً واحداً:</strong>
                <p>في نحو: ﴿أَخَذْتُم﴾، ﴿اتَّخَذْتُم﴾، ﴿عُذْتُ﴾، ﴿فَنَبَذْتُهَا﴾ فتلفظ بتاء مشددة (اتَّخَتُّم).</p>
              </div>
              <div className="bg-navy-900/60 p-4 rounded-lg">
                <strong className="text-white block mb-1">إدغام الثاء في التاء وجهاً واحداً:</strong>
                <p>في نحو: ﴿لَبِثْتَ﴾، ﴿لَبِثْتُمْ﴾، ﴿أَوْرَثْتُمُوهَا﴾ فتلفظ بتاء مشددة (لَبِتَّ).</p>
              </div>
              <div className="bg-navy-900/60 p-4 rounded-lg sm:col-span-2">
                <strong className="text-white block mb-1">إدغام النون في الواو وصلاً:</strong>
                <p>في فاتحتي: ﴿يس ۝ وَالْقُرْآنِ﴾ و ﴿ن ۝ وَالْقَلَمِ﴾ يقرؤها ورش بالإدغام وصلاً بغنة (يَسِـيَّ وَالْقُرْآنِ، نُوَّ الْقَلَمِ).</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};
