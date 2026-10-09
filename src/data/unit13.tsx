import React from 'react';
import { WaqfIbtidaTool } from '../components/WaqfIbtidaTool';
import { BookOpen, Quote, CheckCircle2, AlertTriangle, Info, Bookmark, HelpCircle } from 'lucide-react';

export const unit13Content: Record<string, React.ReactNode> = {
  'u13-l1': (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700" dir="rtl">
      <div className="bg-gradient-to-r from-navy-900 via-navy-850 to-navy-900 border border-gold-500/40 p-6 md:p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-white mb-3 flex items-center gap-3">
          <BookOpen className="text-gold-500" />
          أقسام الوقف الاختياري: الوقف التام والوقف الكافي
        </h2>
        <p className="text-navy-200 leading-relaxed text-base">
          الوقف حلية التلاوة ودليل فهم المعاني وإعجاز النظم القرآني. قال الإمام علي بن أبي طالب رضي الله عنه في تفسير قوله تعالى: ﴿وَرَتِّلِ الْقُرْآنَ تَرْتِيلاً﴾: «التَّرْتِيلُ هُوَ تَجْوِيدُ الْحُرُوفِ وَمَعْرِفَةُ الْوُقُوفِ».
        </p>
      </div>

      <div className="bg-navy-900/90 p-6 rounded-2xl border-r-4 border-gold-500 shadow-inner">
        <h3 className="text-gold-400 font-bold mb-2 flex items-center gap-2">
          <Quote className="w-5 h-5" />
          الشاهد من المنظومة الجزرية
        </h3>
        <p className="font-serif text-xl md:text-2xl leading-loose text-white text-center py-3 bg-navy-950/60 rounded-xl border border-navy-800">
          وَبَعْدَ تَجْوِيدِكَ لِلْحُرُوفِ ... لاَبُدَّ مِنْ مَعْرِفَةِ الْوُقُوفِ<br/>
          وَالابْتِدَاءِ وَهْيَ تُقْسَمُ إِذَنْ ... ثَلاَثَةً: تَامٌ وَكَافٍ وَحَسَنْ<br/>
          وَهْيَ لِمَا تَمَّ فَإِنْ لَمْ يُوجَدِ ... تَعَلُّقٌ أَوْ كَانَ مَعْنًى فَابْتَدِي<br/>
          فَالتَّامُ فَالْكَافِي وَلَفْظاً فَامْنَعَنْ ... إِلاَّ رُؤُوسَ الآيِ جَوِّزْ فَالْحَسَنْ
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Waqf Tam */}
        <div className="bg-navy-950 p-6 rounded-2xl border border-navy-800 space-y-4">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-lg border-b border-navy-800 pb-2">
            <CheckCircle2 className="w-5 h-5" />
            <span>1. الوقف التام</span>
          </div>
          <p className="text-navy-200 text-sm leading-relaxed">
            <strong className="text-white block mb-1">التعريف الاصطلاحي:</strong>
            هو الوقف على كلام تمّ معناه واستقل بنفسه، <strong className="text-gold-300">ولم يتعلق بما بعده لا لفظاً (إعراباً) ولا معنى</strong>.
          </p>
          <div className="bg-navy-900/60 p-4 rounded-xl border border-navy-850 space-y-2">
            <span className="text-xs text-gold-400 font-bold block">مواضعه وأمثلته:</span>
            <ul className="text-sm text-navy-200 space-y-2 list-disc list-inside">
              <li>الوقف على أواخر السور وتمام القصص.</li>
              <li>الوقف على ﴿وَأُولَـٰئِكَ هُمُ الْمُفْلِحُونَ﴾ [البقرة: 5] قبل الشروع في ذكر الكفار ﴿إِنَّ الَّذِينَ كَفَرُوا...﴾.</li>
              <li>الوقف على ﴿مَالِكِ يَوْمِ الدِّينِ﴾ [الفاتحة: 4].</li>
            </ul>
          </div>
          <div className="p-3 bg-emerald-500/10 text-emerald-300 rounded-lg text-xs font-semibold">
            حكمه: يحسن الوقف عليه ويحسن الابتداء بما بعده بالإجماع.
          </div>
        </div>

        {/* Waqf Kafi */}
        <div className="bg-navy-950 p-6 rounded-2xl border border-navy-800 space-y-4">
          <div className="flex items-center gap-2 text-blue-400 font-bold text-lg border-b border-navy-800 pb-2">
            <Info className="w-5 h-5" />
            <span>2. الوقف الكافي</span>
          </div>
          <p className="text-navy-200 text-sm leading-relaxed">
            <strong className="text-white block mb-1">التعريف الاصطلاحي:</strong>
            هو الوقف على كلام تمّ في ذاته، <strong className="text-gold-300">ولكنه تعلق بما بعده معنى لا لفظاً (أي انقطع التعلق الإعرابي ولكن المعنى متصل كالاستمرار في سياق نفس الموضوع)</strong>.
          </p>
          <div className="bg-navy-900/60 p-4 rounded-xl border border-navy-850 space-y-2">
            <span className="text-xs text-gold-400 font-bold block">مواضعه وأمثلته:</span>
            <ul className="text-sm text-navy-200 space-y-2 list-disc list-inside">
              <li>الوقف على ﴿أَمْ لَمْ تُنذِرْهُمْ لَا يُؤْمِنُونَ﴾ [البقرة: 6]، والابتداء بـ ﴿خَتَمَ اللَّهُ عَلَىٰ قُلُوبِهِمْ﴾. فالجملة الثانية مستأنفة إعراباً ولكنها في تتمة شأن الكافرين.</li>
              <li>الوقف على ﴿حَرَّمْنَا عَلَيْهِمْ طَيِّبَاتٍ أُحِلَّتْ لَهُمْ﴾ [النساء: 160].</li>
            </ul>
          </div>
          <div className="p-3 bg-blue-500/10 text-blue-300 rounded-lg text-xs font-semibold">
            حكمه: يحسن الوقف عليه ويحسن الابتداء بما بعده كالوقف التام، إلا أن التام أكثر استقلالاً منه.
          </div>
        </div>
      </div>

      {/* Comparison table */}
      <div className="bg-navy-900/80 p-6 rounded-2xl border border-navy-700">
        <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Bookmark className="w-5 h-5 text-gold-400" />
          الفرق الدقيق في نوع التعلق بين التام والكافي
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead>
              <tr className="border-b border-navy-700 text-gold-400">
                <th className="py-2.5 px-4 font-bold">نوع الوقف</th>
                <th className="py-2.5 px-4 font-bold">التعلق اللفظي (الإعراب)</th>
                <th className="py-2.5 px-4 font-bold">التعلق المعنوي (السياق والموضوع)</th>
                <th className="py-2.5 px-4 font-bold">الحكم الأدائي</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-800 text-navy-200">
              <tr>
                <td className="py-3 px-4 font-bold text-emerald-400">الوقف التام</td>
                <td className="py-3 px-4">منقطع تماماً (لا تعلق إعرابي)</td>
                <td className="py-3 px-4">منقطع تماماً (موضوع جديد أو ختام)</td>
                <td className="py-3 px-4 text-white">يحسن الوقف ويحسن الابتداء بما بعده</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-blue-400">الوقف الكافي</td>
                <td className="py-3 px-4">منقطع (لا يعرب ما بعده صفة أو معطوفاً)</td>
                <td className="py-3 px-4 text-amber-300 font-semibold">موجود ومستمر (نفس السياق أو القصة)</td>
                <td className="py-3 px-4 text-white">يحسن الوقف ويحسن الابتداء بما بعده</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ),

  'u13-l2': (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700" dir="rtl">
      <div className="bg-gradient-to-r from-navy-900 via-navy-850 to-navy-900 border border-gold-500/40 p-6 md:p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-white mb-3 flex items-center gap-3">
          <BookOpen className="text-gold-500" />
          الوقف الحسن والوقف القبيح وقواعد الابتداء
        </h2>
        <p className="text-navy-200 leading-relaxed text-base">
          دراسة الوقف الذي تعلق لفظاً ومعنى (الوقف الحسن)، وما لا يجوز تعمد الوقف عليه (الوقف القبيح)، وضوابط الابتداء السليم.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Waqf Hasan */}
        <div className="bg-navy-950 p-6 rounded-2xl border border-navy-800 space-y-4">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-lg border-b border-navy-800 pb-2">
            <CheckCircle2 className="w-5 h-5" />
            <span>3. الوقف الحسن</span>
          </div>
          <p className="text-navy-200 text-sm leading-relaxed">
            <strong className="text-white block mb-1">التعريف الاصطلاحي:</strong>
            هو الوقف على كلام أفاد معنى في ذاته، <strong className="text-gold-300">ولكنه تعلق بما بعده لفظاً (إعراباً) ومعنى</strong>، كالوقف على المبتدأ دون خبره التام، أو الفعل والفاعل دون مفعوله، أو الموصوف دون صفته.
          </p>
          <div className="bg-navy-900/60 p-4 rounded-xl border border-navy-850 space-y-2">
            <span className="text-xs text-gold-400 font-bold block">أمثلة وتطبيقات:</span>
            <ul className="text-sm text-navy-200 space-y-2 list-disc list-inside">
              <li>الوقف على ﴿الْحَمْدُ لِلَّهِ﴾: أفاد معنى حسناً لكن ما بعده ﴿رَبِّ الْعَالَمِينَ﴾ صفة وجر لفظي تابع له.</li>
              <li>الوقف على ﴿بِسْمِ اللَّهِ﴾ دون ﴿الرَّحْمَـٰنِ الرَّحِيمِ﴾.</li>
            </ul>
          </div>
          <div className="p-3 bg-amber-500/10 text-amber-300 rounded-lg text-xs leading-relaxed font-semibold">
            حكمه: <strong className="text-white">يحسن الوقف عليه، ولا يحسن الابتداء بما بعده</strong> بل يعاد ما قبله ليتم المعنى، <span className="text-gold-400">إلا إذا كان رأس آية فالوقف على رؤوس الآي سُنّة متبعة</span> كـ ﴿ٱلۡحَمۡدُ لِلَّهِ رَبِّ ٱلۡعَٰلَمِينَ﴾.
          </div>
        </div>

        {/* Waqf Qabih */}
        <div className="bg-navy-950 p-6 rounded-2xl border border-red-900/40 space-y-4">
          <div className="flex items-center gap-2 text-red-400 font-bold text-lg border-b border-navy-800 pb-2">
            <AlertTriangle className="w-5 h-5" />
            <span>4. الوقف القبيح (الممنوع)</span>
          </div>
          <p className="text-navy-200 text-sm leading-relaxed">
            <strong className="text-white block mb-1">التعريف الاصطلاحي:</strong>
            هو الوقف على ما لا يتم به كلام ولا يفيد معنى لشدة تعلقه بما بعده، <strong className="text-red-400">أو يوهم معنى باطلاً وفاسداً لا يليق بجلال الله تعالى إن لم يتصل بما بعده</strong>.
          </p>
          <div className="bg-navy-900/60 p-4 rounded-xl border border-navy-850 space-y-2">
            <span className="text-xs text-red-400 font-bold block">نماذج خطيرة للوقف القبيح:</span>
            <ul className="text-sm text-navy-200 space-y-2 list-disc list-inside">
              <li>الوقف على: ﴿لَا تَقْرَبُوا الصَّلَاةَ﴾ دون إكمال ﴿وَأَنتُمْ سُكَارَىٰ﴾.</li>
              <li>الوقف على: ﴿إِنَّ اللَّهَ لَا يَسْتَحْيِي﴾ دون إكمال ﴿أَن يَضْرِبَ مَثَلاً...﴾.</li>
              <li>الوقف على: ﴿فَبُهِتَ الَّذِي كَفَرَ﴾ إذا لم يتبين المعنى، أو الوقف على نفي الألوهية كـ ﴿لَا إِلَـٰهَ﴾ دون ﴿إِلَّا اللَّهُ﴾.</li>
            </ul>
          </div>
          <div className="p-3 bg-red-500/10 text-red-300 rounded-lg text-xs leading-relaxed font-semibold">
            حكمه: <strong className="text-white">لا يجوز تعمده باختيار القارئ</strong>، وإذا وقف عليه مضطراً لنَفَس أو سعال، وجب عليه العود والابتداء بما يصلح المعنى.
          </div>
        </div>
      </div>

      {/* Categories of Waqf */}
      <div className="bg-navy-950 p-6 rounded-2xl border border-navy-800 space-y-4">
        <h4 className="text-lg font-bold text-white flex items-center gap-2 border-b border-navy-800 pb-2">
          <Bookmark className="w-5 h-5 text-gold-400" />
          أقسام الوقف الأربعة العامة لدى أهل الأداء
        </h4>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-4 bg-navy-900/60 rounded-xl border border-navy-800">
            <span className="text-gold-400 font-bold block mb-1">1. الوقف الاضطراري</span>
            <span className="text-xs text-navy-300">ما يعرض للقارئ بسبب انقطاع نَفَس أو عطاس أو نسيان.</span>
          </div>
          <div className="p-4 bg-navy-900/60 rounded-xl border border-navy-800">
            <span className="text-gold-400 font-bold block mb-1">2. الوقف الانتظاري</span>
            <span className="text-xs text-navy-300">الوقف على كلمة لعطف وجوه القراءات الأخرى عليها عند التلقي.</span>
          </div>
          <div className="p-4 bg-navy-900/60 rounded-xl border border-navy-800">
            <span className="text-gold-400 font-bold block mb-1">3. الوقف الاختباري</span>
            <span className="text-xs text-navy-300">الوقف في مقام الامتحان لبيان مرسوم الخط أو أصل الكلمة.</span>
          </div>
          <div className="p-4 bg-navy-900/60 rounded-xl border border-navy-800">
            <span className="text-gold-400 font-bold block mb-1">4. الوقف الاختياري</span>
            <span className="text-xs text-navy-300">الوقف بمحض إرادة القارئ دون عارض (وهو التام والكافي والحسن والقبيح).</span>
          </div>
        </div>
      </div>
    </div>
  ),

  'waqf-tool': (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-navy-900 border border-navy-800 p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-white mb-4">أداة الوقف والابتداء التفاعلية</h2>
        <p className="text-navy-200 leading-relaxed text-lg">
          بعد دراستك لأقسام الوقف التام والكافي والحسن والقبيح في الدرسين السابقين، استخدم هذه الأداة التفاعلية العملية للتدرب على مواضع الوقف وشواهدها في القرآن الكريم وفق أصول الأداء.
        </p>
      </div>

      <WaqfIbtidaTool />
    </div>
  )
};

