import React from 'react';
import { BookOpen, Quote, AlertTriangle, CheckCircle2, Bookmark, Sparkles, HelpCircle, Layers } from 'lucide-react';

export const unit9Content: Record<string, React.ReactNode> = {
  'u9-l1': (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700" dir="rtl">
      {/* Book Reference Banner */}
      <div className="bg-gradient-to-r from-navy-900 via-navy-850 to-navy-900 border border-gold-500/40 p-6 rounded-2xl shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gold-500/15 text-gold-400 rounded-xl border border-gold-500/30 shrink-0">
              <Bookmark className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-gold-400 uppercase tracking-widest block">المصدر المعتمد للمادة العلمية</span>
              <h1 className="text-xl md:text-2xl font-black text-white">كتاب «الثمر اليانع في رواية ورش عن نافع»</h1>
              <p className="text-xs text-navy-300 mt-0.5">فضيلة الدكتور محمد إبراهيم محمد ضمرة — الباب التاسع: أحكام الراءات</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-gold-500/10 text-gold-300 border border-gold-500/30 self-start md:self-auto">
            <Sparkles className="w-3.5 h-3.5" />
            تحريرات الشاطبية
          </span>
        </div>
      </div>

      {/* Main Lesson Content */}
      <div className="bg-navy-800/80 p-6 md:p-8 rounded-2xl border border-navy-700 shadow-xl space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
            <BookOpen className="text-gold-500" />
            أصل مذهب ورش وشروط ترقيق الراء
          </h2>
          <p className="text-navy-300 text-sm">
            بيان أصل مذهب الإمام ورش عن نافع من طريق الأزرق في ترقيق الراءات، مع استيفاء شروط الترقيق الأربعة وشواهدها من الشاطبية كما حررها الدكتور إبراهيم ضمرة في «الثمر اليانع».
          </p>
        </div>

        {/* Shatibiyyah Matn */}
        <div className="bg-navy-900/90 p-6 rounded-2xl border-r-4 border-gold-500 shadow-inner">
          <div className="flex items-center gap-2 text-gold-400 font-bold mb-3 text-sm">
            <Quote className="w-5 h-5" />
            <span>الشاهد من حرز الأماني (الشاطبية)</span>
          </div>
          <div className="font-serif text-xl md:text-2xl leading-loose text-amber-100 text-center py-2 bg-navy-950/60 rounded-xl border border-navy-800">
            «وَرَقَّقَ وَرْشٌ كُلَّ رَاءٍ وَقَبْلَهَا ... مُسَكَّنَةً يَاءٌ أَوِ الْكَسْرُ مُوصَلاَ»<br/>
            «وَلَمْ يَرَ فَصْلاً سَاكِناً بَعْدَ كَسْرَةٍ ... سِوَى حَرْفِ الاِسْتِعْلاَ سِوَى الْخَا فَكَمَّلاَ»
          </div>
          <p className="text-navy-300 text-xs mt-3 leading-relaxed">
            <strong className="text-gold-300 font-bold">بيان الشاهد:</strong> نص الإمام الشاطبي رحمه الله على أن ورشاً ينفرد عن سائر القراء بترقيق الراء المفتوحة والمضمومة إذا سُبقت بياء ساكنة أو كسرة لازمة متصلة، وأن الساكن المستفل بين الكسر والراء لا يمنع الترقيق، واستثنى من حروف الاستعلاء حرف (الخاء) فلا يمنع الترقيق.
          </p>
        </div>

        {/* Foundation */}
        <div className="bg-navy-950/80 p-6 rounded-2xl border border-navy-700/80 space-y-4">
          <h3 className="text-lg font-bold text-gold-400 border-b border-navy-800 pb-2 flex items-center gap-2">
            <Layers className="w-5 h-5 text-gold-500" />
            تأصيل القاعدة عند الدكتور إبراهيم ضمرة
          </h3>
          <p className="text-navy-200 text-sm leading-relaxed">
            يقرر الدكتور إبراهيم ضمرة في «الثمر اليانع»: <br/>
            «الأصل عند جميع القراء أن الراء المكسورة مرققة، والراء المفتوحة والمضمومة مفخمة. إلا أن الإمام ورشاً اختصّ من طريق الأزرق بترقيق الراء <strong className="text-white">المفتوحة والمضمومة</strong> إذا توفرت شروط معينة؛ طلباً للخفة والتجانس الصوتي بسبب الكسرة السابقة أو الياء الساكنة».
          </p>
        </div>

        {/* 4 Conditions */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            شروط ترقيق الراء عند ورش (المفتوحة والمضمومة)
          </h3>

          <div className="grid gap-4">
            {/* Condition 1 */}
            <div className="bg-navy-900/90 p-5 rounded-xl border border-navy-700/70 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 bg-gold-500/20 text-gold-400 border border-gold-500/40 rounded-full flex items-center justify-center font-bold text-sm">1</span>
                <h4 className="font-bold text-white text-base">أن يسبق الراء كسر لازم متصل في نفس الكلمة</h4>
              </div>
              <p className="text-navy-300 text-sm leading-relaxed pr-9">
                يُشترط أن تكون الكسرة أصلية (لازمة) وليست عارضة، وأن تكون متصلة بها في بنية الكلمة الواحدة.
              </p>
              <div className="pr-9 pt-2 flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-navy-950 text-gold-300 rounded-lg text-sm font-serif border border-navy-800">﴿سِرَاجاً﴾ [الفرقان: 61]</span>
                <span className="px-3 py-1 bg-navy-950 text-gold-300 rounded-lg text-sm font-serif border border-navy-800">﴿فِرَاشاً﴾ [البقرة: 22]</span>
                <span className="px-3 py-1 bg-navy-950 text-gold-300 rounded-lg text-sm font-serif border border-navy-800">﴿الآخِرَةِ﴾ [البقرة: 4]</span>
                <span className="px-3 py-1 bg-navy-950 text-gold-300 rounded-lg text-sm font-serif border border-navy-800">﴿نَاصِرِينَ﴾ [آل عمران: 56]</span>
                <span className="px-3 py-1 bg-navy-950 text-gold-300 rounded-lg text-sm font-serif border border-navy-800">﴿يَغْفِرُ لَكُمْ﴾ [نوح: 4]</span>
              </div>
            </div>

            {/* Condition 2 */}
            <div className="bg-navy-900/90 p-5 rounded-xl border border-navy-700/70 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 bg-gold-500/20 text-gold-400 border border-gold-500/40 rounded-full flex items-center justify-center font-bold text-sm">2</span>
                <h4 className="font-bold text-white text-base">أن يسبق الراء ياء ساكنة متصلة (مدية أو لينة)</h4>
              </div>
              <p className="text-navy-300 text-sm leading-relaxed pr-9">
                سواء كانت الياء الساكنة حرف مد (مكسور ما قبلها) أو حرف لين (مفتوح ما قبلها)، فإن الراء بعدها ترقق وصلاً ووقفاً.
              </p>
              <div className="pr-9 pt-2 flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-navy-950 text-gold-300 rounded-lg text-sm font-serif border border-navy-800">﴿خَيْرٌ﴾ (ياء لينة)</span>
                <span className="px-3 py-1 bg-navy-950 text-gold-300 rounded-lg text-sm font-serif border border-navy-800">﴿ضَيْرَ﴾ (ياء لينة)</span>
                <span className="px-3 py-1 bg-navy-950 text-gold-300 rounded-lg text-sm font-serif border border-navy-800">﴿الطَّيْرَ﴾ (ياء لينة)</span>
                <span className="px-3 py-1 bg-navy-950 text-gold-300 rounded-lg text-sm font-serif border border-navy-800">﴿بَصِيرٌ﴾ (ياء مدية)</span>
                <span className="px-3 py-1 bg-navy-950 text-gold-300 rounded-lg text-sm font-serif border border-navy-800">﴿قَدِيرٌ﴾ (ياء مدية)</span>
                <span className="px-3 py-1 bg-navy-950 text-gold-300 rounded-lg text-sm font-serif border border-navy-800">﴿نَذِيرٌ﴾ (ياء مدية)</span>
              </div>
            </div>

            {/* Condition 3 */}
            <div className="bg-navy-900/90 p-5 rounded-xl border border-navy-700/70 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 bg-gold-500/20 text-gold-400 border border-gold-500/40 rounded-full flex items-center justify-center font-bold text-sm">3</span>
                <h4 className="font-bold text-white text-base">أن يكون الفاصل بين الكسرة والراء ساكناً مستفلاً</h4>
              </div>
              <p className="text-navy-300 text-sm leading-relaxed pr-9">
                إذا فصل بين الكسرة اللازمة والراء حرف ساكن مستفل (أي ليس من حروف الاستعلاء: خص ضغط قظ)، فإن هذا الساكن الضعيف لا يمنع سراية أثر الكسرة إلى الراء، فترقق.
              </p>
              <div className="pr-9 pt-2 flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-navy-950 text-gold-300 rounded-lg text-sm font-serif border border-navy-800">﴿مِحْرَابَ﴾ (الحاء ساكن مستفل)</span>
                <span className="px-3 py-1 bg-navy-950 text-gold-300 rounded-lg text-sm font-serif border border-navy-800">﴿إِكْرَاهَ﴾ (الكاف ساكن مستفل)</span>
                <span className="px-3 py-1 bg-navy-950 text-gold-300 rounded-lg text-sm font-serif border border-navy-800">﴿الشِّرْكِ﴾ (الراء ذاتها مكسورة)</span>
                <span className="px-3 py-1 bg-navy-950 text-gold-300 rounded-lg text-sm font-serif border border-navy-800">﴿وِزْرَكَ﴾ (الزاي ساكن مستفل)</span>
                <span className="px-3 py-1 bg-navy-950 text-gold-300 rounded-lg text-sm font-serif border border-navy-800">﴿السِّحْرَ﴾ (الحاء ساكن مستفل)</span>
              </div>
            </div>

            {/* Condition 4 */}
            <div className="bg-navy-900/90 p-5 rounded-xl border border-navy-700/70 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 bg-gold-500/20 text-gold-400 border border-gold-500/40 rounded-full flex items-center justify-center font-bold text-sm">4</span>
                <h4 className="font-bold text-white text-base">استثناء حرف (الخاء) من حروف الاستعلاء الساكنة</h4>
              </div>
              <p className="text-navy-300 text-sm leading-relaxed pr-9">
                بين الدكتور إبراهيم ضمرة في «الثمر اليانع»: حرف الخاء من حروف الاستعلاء، ولكن لكونه حرفاً مهموساً رخواً وهو أضعف حروف الاستعلاء، فقد استثناه ورش فلم يمنع الترقيق إذا كان ساكناً فاصلاً بين الكسرة والراء.
              </p>
              <div className="pr-9 pt-2 flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-navy-950 text-emerald-300 rounded-lg text-sm font-serif border border-emerald-500/30">﴿إِخْرَاجاً﴾ [البقرة: 240] — مرققة قولاً واحداً</span>
                <span className="px-3 py-1 bg-navy-950 text-emerald-300 rounded-lg text-sm font-serif border border-emerald-500/30">﴿إِخْرَاجِكُمْ﴾ [الممتحنة: 9] — مرققة قولاً واحداً</span>
              </div>
            </div>
          </div>
        </div>

        {/* Important Performance Note */}
        <div className="bg-gold-500/10 border border-gold-500/30 p-5 rounded-xl space-y-2">
          <div className="flex items-center gap-2 text-gold-400 font-bold text-sm">
            <Sparkles className="w-4 h-4" />
            <span>فائدة أدائية من كتاب «الثمر اليانع» (د. إبراهيم ضمرة)</span>
          </div>
          <p className="text-navy-200 text-xs leading-relaxed">
            «ينبغي على القارئ عند ترقيق الراء لورش ألا يبالغ حتى يصير صوته شبيهاً بصوت الياء، وألا يحصر صوته حصراً يقطع جريان الصوت الرخو، بل ينطق بالراء بصفة الاستفال مع الحفاظ على التوسط والجهر والانحراف دون تكرير زائد».
          </p>
        </div>
      </div>
    </div>
  ),

  'u9-l2': (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700" dir="rtl">
      {/* Book Reference Banner */}
      <div className="bg-gradient-to-r from-navy-900 via-navy-850 to-navy-900 border border-gold-500/40 p-6 rounded-2xl shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gold-500/15 text-gold-400 rounded-xl border border-gold-500/30 shrink-0">
              <Bookmark className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-gold-400 uppercase tracking-widest block">المصدر المعتمد للمادة العلمية</span>
              <h1 className="text-xl md:text-2xl font-black text-white">كتاب «الثمر اليانع في رواية ورش عن نافع»</h1>
              <p className="text-xs text-navy-300 mt-0.5">تحريرات د. إبراهيم ضمرة — موانع ترقيق الراء ومستثنيات التفخيم</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-rose-500/10 text-rose-300 border border-rose-500/30 self-start md:self-auto">
            <AlertTriangle className="w-3.5 h-3.5" />
            المستثنيات بالتفخيم
          </span>
        </div>
      </div>

      {/* Main Lesson Content */}
      <div className="bg-navy-800/80 p-6 md:p-8 rounded-2xl border border-navy-700 shadow-xl space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
            <BookOpen className="text-gold-500" />
            موانع الترقيق ومستثنيات الباب بالتفخيم
          </h2>
          <p className="text-navy-300 text-sm">
            تفصيل الحالات التي سبقت فيها الراء بكسر أو ياء، ولكن ورشاً فخمها لوجود مانع من موانع الترقيق أو لعلة استثنائية منقولة بالأثر والرواية كما قررها الدكتور إبراهيم ضمرة.
          </p>
        </div>

        {/* Shatibiyyah Matn */}
        <div className="bg-navy-900/90 p-6 rounded-2xl border-r-4 border-gold-500 shadow-inner">
          <div className="flex items-center gap-2 text-gold-400 font-bold mb-3 text-sm">
            <Quote className="w-5 h-5" />
            <span>الشاهد من الشاطبية</span>
          </div>
          <div className="font-serif text-xl md:text-2xl leading-loose text-amber-100 text-center py-2 bg-navy-950/60 rounded-xl border border-navy-800">
            «وَفَخَّمَهَا فِي الأَعْجَمِيِّ وَفِي إِرَمْ ... وَتَكْرِيرِهَا حَتَّى يُرَى مُتَعَدِّلاَ»<br/>
            «وَتَفْخِيمُهُ فِي أَعْجَمِيٍّ وَفِي إِرَمْ ... وَتَكْرِيرِهَا كَذِكْراً وَسِتْراً بَابِهِ ثُمَّ فُصِّلاَ»
          </div>
        </div>

        {/* The 6 Barriers */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-gold-400" />
            موانع الترقيق ومستثنيات ورش الستة (من كتاب الثمر اليانع)
          </h3>

          <div className="grid gap-4">
            {/* Barrier 1 */}
            <div className="bg-navy-950 p-5 rounded-xl border border-navy-700 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-gold-400 font-bold text-base flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-gold-500/20 text-gold-300 text-xs flex items-center justify-center font-mono">1</span>
                  عروض الكسرة أو انفصالها
                </h4>
                <span className="text-xs px-2.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">تفخيم قولاً واحداً</span>
              </div>
              <p className="text-navy-300 text-xs leading-relaxed">
                إذا كانت الكسرة عارضة، كالكسرة في همزة الوصل عند الابتداء، أو كسرة النقل، أو كانت منفصلة في كلمة سابقة:
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="px-3 py-1 bg-navy-900 text-white rounded-lg text-xs font-serif">﴿ارْجِعِي﴾ [الفجر: 28] (كسرة همزة الوصل عارضة)</span>
                <span className="px-3 py-1 bg-navy-900 text-white rounded-lg text-xs font-serif">﴿امْرُؤٌ﴾ [النساء: 176] (همزة وصل)</span>
                <span className="px-3 py-1 bg-navy-900 text-white rounded-lg text-xs font-serif">﴿بِرَسُولٍ﴾ ، ﴿لِرَبِّهِمْ﴾ (الكسرة في كلمة منفصلة حكماً)</span>
                <span className="px-3 py-1 bg-navy-900 text-white rounded-lg text-xs font-serif">﴿فِي رَيْبٍ﴾ (الياء منفصلة)</span>
              </div>
            </div>

            {/* Barrier 2 */}
            <div className="bg-navy-950 p-5 rounded-xl border border-navy-700 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-gold-400 font-bold text-base flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-gold-500/20 text-gold-300 text-xs flex items-center justify-center font-mono">2</span>
                  الفصل بحرف ساكن من حروف الاستعلاء (عدا الخاء)
                </h4>
                <span className="text-xs px-2.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">تفخيم قولاً واحداً</span>
              </div>
              <p className="text-navy-300 text-xs leading-relaxed">
                إذا كان الحرف الساكن الفاصل بين الكسرة والراء من حروف الاستعلاء (الصاد، الطاء، القاف)، فإن قوته تمنع ترقيق الراء:
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="px-3 py-1 bg-navy-900 text-white rounded-lg text-xs font-serif">﴿إِصْراً﴾ [البقرة: 286] (الصاد ساكن مستعلٍ)</span>
                <span className="px-3 py-1 bg-navy-900 text-white rounded-lg text-xs font-serif">﴿مِصْرَ﴾ [يونس: 87] (الصاد ساكن مستعلٍ)</span>
                <span className="px-3 py-1 bg-navy-900 text-white rounded-lg text-xs font-serif">﴿فِطْرَتَ﴾ [الروم: 30] (الطاء ساكن مستعلٍ)</span>
                <span className="px-3 py-1 bg-navy-900 text-white rounded-lg text-xs font-serif">﴿وِقْراً﴾ [الأنعام: 25] (القاف ساكن مستعلٍ)</span>
              </div>
            </div>

            {/* Barrier 3 */}
            <div className="bg-navy-950 p-5 rounded-xl border border-navy-700 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-gold-400 font-bold text-base flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-gold-500/20 text-gold-300 text-xs flex items-center justify-center font-mono">3</span>
                  وقوع حرف استعلاء مفتوح أو مضموم بعد الراء في نفس الكلمة
                </h4>
                <span className="text-xs px-2.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">تفخيم قولاً واحداً</span>
              </div>
              <p className="text-navy-300 text-xs leading-relaxed">
                إذا وليت الراء حرف استعلاء مفتوح أو مضموم في نفس الكلمة (الصاد، الطاء، القاف)، غلب الاستعلاء ففخمت الراء. أما إذا كان في كلمة ثانية فلا يمنع الترقيق مثل ﴿فَصَبْرٌ جَمِيلٌ﴾.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="px-3 py-1 bg-navy-900 text-white rounded-lg text-xs font-serif">﴿الصِّرَاطَ﴾ (بعدها طاء)</span>
                <span className="px-3 py-1 bg-navy-900 text-white rounded-lg text-xs font-serif">﴿إِعْرَاضاً﴾ (بعدها ضاد)</span>
                <span className="px-3 py-1 bg-navy-900 text-white rounded-lg text-xs font-serif">﴿إِرْصَاداً﴾ (بعدها صاد)</span>
                <span className="px-3 py-1 bg-navy-900 text-white rounded-lg text-xs font-serif">﴿فِرَاقُ﴾ (بعدها قاف)</span>
                <span className="px-3 py-1 bg-navy-900 text-white rounded-lg text-xs font-serif">﴿قِرْطَاسٍ﴾ (بعدها طاء)</span>
                <span className="px-3 py-1 bg-navy-900 text-white rounded-lg text-xs font-serif">﴿فِرْقَةٍ﴾ (بعدها قاف)</span>
              </div>
            </div>

            {/* Barrier 4 */}
            <div className="bg-navy-950 p-5 rounded-xl border border-navy-700 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-gold-400 font-bold text-base flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-gold-500/20 text-gold-300 text-xs flex items-center justify-center font-mono">4</span>
                  الأسماء الأعجمية المستثناة
                </h4>
                <span className="text-xs px-2.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">تفخيم قولاً واحداً</span>
              </div>
              <p className="text-navy-300 text-xs leading-relaxed">
                بين الدكتور إبراهيم ضمرة في «الثمر اليانع» أن ورشاً استثنى أربعة أسماء أعجمية ففخم راءاتها جميعاً لثقل العجمة، وهي:
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="px-3 py-1 bg-navy-900 text-gold-300 rounded-lg text-xs font-serif font-bold">﴿إِبْرَاهِيمُ﴾</span>
                <span className="px-3 py-1 bg-navy-900 text-gold-300 rounded-lg text-xs font-serif font-bold">﴿إِسْرَائِيلُ﴾</span>
                <span className="px-3 py-1 bg-navy-900 text-gold-300 rounded-lg text-xs font-serif font-bold">﴿عِمْرَانُ﴾</span>
                <span className="px-3 py-1 bg-navy-900 text-gold-300 rounded-lg text-xs font-serif font-bold">﴿إِرَمَ ذَاتِ الْعِمَادِ﴾ [الفجر: 7]</span>
              </div>
            </div>

            {/* Barrier 5 */}
            <div className="bg-navy-950 p-5 rounded-xl border border-navy-700 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-gold-400 font-bold text-base flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-gold-500/20 text-gold-300 text-xs flex items-center justify-center font-mono">5</span>
                  تكرار الراء في الكلمة الواحدة
                </h4>
                <span className="text-xs px-2.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">تفخيم قولاً واحداً</span>
              </div>
              <p className="text-navy-300 text-xs leading-relaxed">
                إذا تكررت الراء في كلمة واحدة (بحيث جاءت بعدها راء أخرى مفتوحة أو مضمومة)، فُخمت الراء الأولى طلباً للتعادل والتجانس الصوتي ولثقل تكرار المرقق مع المفخم:
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="px-3 py-1 bg-navy-900 text-white rounded-lg text-xs font-serif">﴿ضِرَاراً﴾ [البقرة: 231]</span>
                <span className="px-3 py-1 bg-navy-900 text-white rounded-lg text-xs font-serif">﴿فِرَاراً﴾ [الكهف: 18]</span>
                <span className="px-3 py-1 bg-navy-900 text-white rounded-lg text-xs font-serif">﴿إِسْرَاراً﴾ [نوح: 9]</span>
                <span className="px-3 py-1 bg-navy-900 text-white rounded-lg text-xs font-serif">﴿مِدْرَاراً﴾ [الأنعام: 6]</span>
                <span className="px-3 py-1 bg-navy-900 text-white rounded-lg text-xs font-serif">﴿أَسْرَارَهُمْ﴾ [محمد: 26]</span>
              </div>
            </div>

            {/* Barrier 6 */}
            <div className="bg-navy-950 p-5 rounded-xl border border-navy-700 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-gold-400 font-bold text-base flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-gold-500/20 text-gold-300 text-xs flex items-center justify-center font-mono">6</span>
                  الكلمات الست على وزن (فِعْلاً) المنونة
                </h4>
                <span className="text-xs px-2.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">تفخيم قولاً واحداً</span>
              </div>
              <p className="text-navy-300 text-xs leading-relaxed">
                استثنى الشاطبي رحمه الله ست كلمات منونة على وزن (فِعْلاً) قرأها ورش بالتفخيم قولا واحداً، وهي:
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="px-3 py-1 bg-navy-900 text-amber-200 rounded-lg text-xs font-serif font-bold">1. ﴿ذِكْراً﴾</span>
                <span className="px-3 py-1 bg-navy-900 text-amber-200 rounded-lg text-xs font-serif font-bold">2. ﴿سِتْراً﴾</span>
                <span className="px-3 py-1 bg-navy-900 text-amber-200 rounded-lg text-xs font-serif font-bold">3. ﴿إِصْراً﴾</span>
                <span className="px-3 py-1 bg-navy-900 text-amber-200 rounded-lg text-xs font-serif font-bold">4. ﴿وِزْراً﴾</span>
                <span className="px-3 py-1 bg-navy-900 text-amber-200 rounded-lg text-xs font-serif font-bold">5. ﴿صِهْراً﴾</span>
                <span className="px-3 py-1 bg-navy-900 text-amber-200 rounded-lg text-xs font-serif font-bold">6. ﴿حِجْراً﴾</span>
              </div>
              <p className="text-gold-400 text-[11px] pt-1">
                * تنبيه من «الثمر اليانع»: إذا كانت غير منونة ومضافة نحو ﴿ذِكْرُ رَحْمَتِ رَبِّكَ﴾، فترقق على الأصل لأن الساكن مستفل.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),

  'u9-l3': (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700" dir="rtl">
      {/* Book Reference Banner */}
      <div className="bg-gradient-to-r from-navy-900 via-navy-850 to-navy-900 border border-gold-500/40 p-6 rounded-2xl shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gold-500/15 text-gold-400 rounded-xl border border-gold-500/30 shrink-0">
              <Bookmark className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-gold-400 uppercase tracking-widest block">المصدر المعتمد للمادة العلمية</span>
              <h1 className="text-xl md:text-2xl font-black text-white">كتاب «الثمر اليانع في رواية ورش عن نافع»</h1>
              <p className="text-xs text-navy-300 mt-0.5">تحريرات د. إبراهيم ضمرة — الكلمات المخصوصة وجواز الوجهين والوقف على الراءات</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30 self-start md:self-auto">
            <Sparkles className="w-3.5 h-3.5" />
            جواز الوجهين والتحريرات
          </span>
        </div>
      </div>

      {/* Main Lesson Content */}
      <div className="bg-navy-800/80 p-6 md:p-8 rounded-2xl border border-navy-700 shadow-xl space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
            <BookOpen className="text-gold-500" />
            الكلمات المخصوصة وما جاز فيه الوجهان وتوجيه الوقف
          </h2>
          <p className="text-navy-300 text-sm">
            دراسة تفصيلية لتحريرات الدكتور إبراهيم ضمرة في «الثمر اليانع» للكلمات التي يجوز فيها الترقيق والتفخيم لورش، مع تحرير أوجه الوقف والوصل.
          </p>
        </div>

        {/* Shatibiyyah Matn */}
        <div className="bg-navy-900/90 p-6 rounded-2xl border-r-4 border-gold-500 shadow-inner">
          <div className="flex items-center gap-2 text-gold-400 font-bold mb-3 text-sm">
            <Quote className="w-5 h-5" />
            <span>الشاهد من الشاطبية</span>
          </div>
          <div className="font-serif text-xl md:text-2xl leading-loose text-amber-100 text-center py-2 bg-navy-950/60 rounded-xl border border-navy-800">
            «وَفِي حَيْرَانَ تَوَّلِهِ ... وَبِشَرَرٍ مَعْ فِرْقٍ قَدْ جَلاَ»<br/>
            «وَمَا بَعْدَهُ كَسْرٌ أَوْ يَاءٌ مَفْخَمٌ ... وَالْوَقْفُ بِالرَّوْمِ كَالْوَصْلِ حُلاَ»
          </div>
        </div>

        {/* Permissible Words */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-gold-400" />
            الكلمات التي فيها الوجهان (الترقيق والتفخيم) لورش
          </h3>

          <div className="grid gap-4">
            {/* Word 1: Hayran */}
            <div className="bg-navy-950 p-5 rounded-xl border border-navy-700/80 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-gold-400 font-bold text-base">
                  1. كلمة ﴿حَيْرَانَ﴾ [الأنعام: 71]
                </h4>
                <span className="text-xs px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">الوجهان (والترقيق مقدم)</span>
              </div>
              <p className="text-navy-200 text-sm leading-relaxed">
                فيها لورش وصلاً ووقفاً وجهان: <strong className="text-emerald-400">الترقيق</strong> و<strong className="text-gold-400">التفخيم</strong>.
              </p>
              <p className="text-navy-300 text-xs">
                <strong className="text-gold-300 font-bold">توجيه د. إبراهيم ضمرة في «الثمر اليانع»:</strong> المقدم في الأداء هو <strong className="text-white">الترقيق</strong>؛ لأن الياء الساكنة قبلها لينة مستفلة تحقق شرط الترقيق، والتفخيم رُوي لمشابهتها لوزن فعلان ولأن الألف بعدها حاجزة.
              </p>
            </div>

            {/* Word 2: Bisharar */}
            <div className="bg-navy-950 p-5 rounded-xl border border-navy-700/80 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-gold-400 font-bold text-base">
                  2. كلمة ﴿بِشَرَرٍ كَالْقَصْرِ﴾ [المرسلات: 32]
                </h4>
                <span className="text-xs px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">وصلاً: الوجهان (الترقيق مقدم)</span>
              </div>
              <p className="text-navy-200 text-sm leading-relaxed">
                الكلام هنا عن <strong className="text-white">الراء الأولى المفتوحة</strong> في (بشررٍ):
              </p>
              <ul className="text-navy-300 text-xs space-y-1.5 list-disc list-inside">
                <li><strong className="text-emerald-400">حال الوصل:</strong> يجوز فيها الوجهان (الترقيق والتفخيم)، والمقدم هو <strong className="text-white">الترقيق</strong>؛ لمناسبة الراء المكسورة المتطرفة التي تليها ولتوالي الراءين.</li>
                <li><strong className="text-rose-400">حال الوقف:</strong> تسكن الراء الثانية فتبطل علة الكسر، ويتعين <strong className="text-white">التفخيم قولاً واحداً</strong> للراء الأولى لأنها مسبوقة بفتح.</li>
              </ul>
            </div>

            {/* Word 3: Firq */}
            <div className="bg-navy-950 p-5 rounded-xl border border-navy-700/80 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-gold-400 font-bold text-base">
                  3. كلمة ﴿فِرْقٍ﴾ [الشعراء: 63]
                </h4>
                <span className="text-xs px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">وصلاً: الوجهان لجميع القراء</span>
              </div>
              <p className="text-navy-200 text-sm leading-relaxed">
                الراء ساكنة قبلها كسر لازم وبعدها حرف استعلاء (القاف) مكسور:
              </p>
              <ul className="text-navy-300 text-xs space-y-1.5 list-disc list-inside">
                <li><strong className="text-emerald-400">حال الوصل:</strong> جاز الوجهان لورش وسائر القراء، والمقدم هو <strong className="text-white">الترقيق</strong>؛ لضعف استعلاء القاف المكسورة.</li>
                <li><strong className="text-rose-400">حال الوقف:</strong> إذا وُقف بالسكون زال كسر القاف وقوي استعلاؤها، فيتعين <strong className="text-white">التفخيم</strong> عند المحققين، ويجوز الترقيق بالروم.</li>
              </ul>
            </div>

            {/* Word 4: Dhikra and Dhat Al-Ya */}
            <div className="bg-navy-950 p-5 rounded-xl border border-navy-700/80 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-gold-400 font-bold text-base">
                  4. كلمات وزن (فِعْلَى) ذات الياء كـ ﴿ذِكْرَى﴾
                </h4>
                <span className="text-xs px-2.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">تحرير التقليل والترقيق</span>
              </div>
              <p className="text-navy-200 text-sm leading-relaxed">
                كلمة ﴿ذِكْرَى﴾ وما شاكلها من ذوات الراء الألفية المقصورة:
              </p>
              <p className="text-navy-300 text-xs leading-relaxed">
                يوضح الدكتور إبراهيم ضمرة في «الثمر اليانع»: أن الراء فيها تتبع الألف المنقلبة، فبما أن ورشاً يقلل ذوات الراء قولاً واحداً، فإن الراء فيها <strong className="text-emerald-300">مرققة لأجل التقليل</strong>. أما الكلمات المنونة المصدرية نحو ﴿ذِكْراً﴾ فمفخمة قولاً واحداً كما مر في مستثنيات الباب.
              </p>
            </div>
          </div>
        </div>

        {/* Waqf Rules on Raa */}
        <div className="bg-navy-950/80 p-6 rounded-2xl border border-navy-700 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            أحكام الوقف على الراءات المتطرفة لورش (تحريرات الثمر اليانع)
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-right border-collapse">
              <thead>
                <tr className="border-b border-navy-700 text-gold-400">
                  <th className="py-2.5 px-3">حالة الراء عند الوقف</th>
                  <th className="py-2.5 px-3">المثال القرآني</th>
                  <th className="py-2.5 px-3">الحكم التجويدي</th>
                  <th className="py-2.5 px-3">العلة الصوتية</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-800 text-navy-200">
                <tr>
                  <td className="py-2.5 px-3 font-bold text-white">بعد ياء ساكنة</td>
                  <td className="py-2.5 px-3 font-serif text-amber-200">﴿قَدِير﴾ ، ﴿خَبِير﴾ ، ﴿السَّيْر﴾</td>
                  <td className="py-2.5 px-3 text-emerald-400 font-bold">الترقيق قولاً واحداً</td>
                  <td className="py-2.5 px-3">لسكون الياء المرققة قبلها</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-bold text-white">بعد كسر لازم</td>
                  <td className="py-2.5 px-3 font-serif text-amber-200">﴿النَّاصِر﴾ ، ﴿مُنْكَر﴾</td>
                  <td className="py-2.5 px-3 text-emerald-400 font-bold">الترقيق قولاً واحداً</td>
                  <td className="py-2.5 px-3">لسراية الكسرة الأصلية</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-bold text-white">بعد ساكن مستفل وقبله كسر</td>
                  <td className="py-2.5 px-3 font-serif text-amber-200">﴿السِّحْر﴾ ، ﴿الذِّكْر﴾</td>
                  <td className="py-2.5 px-3 text-emerald-400 font-bold">الترقيق قولاً واحداً</td>
                  <td className="py-2.5 px-3">ضعف الساكن المستفل الفاصل</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-bold text-white">الراء المكسورة المتطرفة أصلاً</td>
                  <td className="py-2.5 px-3 font-serif text-amber-200">﴿وَالْفَجْرِ﴾ ، ﴿وَالْعَصْرِ﴾</td>
                  <td className="py-2.5 px-3 text-gold-400">بالسكون: تفخيم / بالروم: ترقيق</td>
                  <td className="py-2.5 px-3">لأن الروم كالوصل يُظهر كسرها</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Master Summary Box */}
        <div className="bg-gradient-to-r from-emerald-950/60 via-navy-900 to-emerald-950/60 border border-emerald-500/40 p-6 rounded-2xl text-center space-y-2">
          <h4 className="text-base font-black text-emerald-300">خلاصة باب أحكام الراءات من «الثمر اليانع»</h4>
          <p className="text-xs text-navy-200 max-w-2xl mx-auto leading-relaxed">
            الراء عند ورش ترقق بأحد سببين (كسر لازم متصل، أو ياء ساكنة)، ولا يمنع الترقيق فاصل ساكن مستفل ولا الخاء الساكنة. وتفخم الراء وجوباً في ست حالات (الكسر العارض أو المنفصل، الفاصل بحرف استعلاء عدا الخاء، حرف استعلاء بعدها في كلمتها، الأسماء الأعجمية الأربعة، تكرار الراء، وزن فعلاً المنون الستة). ويجوز الوجهان في (حيران) والترقيق مقدم، وفي (بشرر) وصلاً والترقيق مقدم، وفي (فرق) وصلاً.
          </p>
        </div>
      </div>
    </div>
  )
};
