import React from 'react';
import { BookOpen, AlertCircle, Info, Quote, CheckCircle2 } from 'lucide-react';

export const unit1Content: Record<string, React.ReactNode> = {
  'u1-l1': (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-navy-800/80 p-6 md:p-8 rounded-2xl border border-navy-700 shadow-xl backdrop-blur-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/5 rounded-full blur-3xl"></div>
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
          <BookOpen className="text-gold-500" />
          المد المتصل والمنفصل
        </h2>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-navy-100 text-lg leading-relaxed mb-6">
            المد هو إطالة الصوت بحرف من حروف المد (الألف، الواو، الياء) عند وجود سبب لذلك، كالهمز أو السكون.
            في هذا الدرس سنتعرف على مذهب الإمام ورش في المدين المتصل والمنفصل.
          </p>

          <div className="bg-navy-900/50 p-6 rounded-xl border border-navy-800 mb-8">
            <h3 className="text-gold-400 font-bold mb-3">القاعدة عند ورش من طريق الشاطبية</h3>
            <p className="text-white text-lg">
              يقرأ ورش بإشباع (تطويل) المد المتصل والمنفصل بمقدار <span className="font-bold text-gold-500">6 حركات</span> قولاً واحداً.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-navy-800 border border-navy-700 p-6 rounded-xl shadow-md">
              <h4 className="text-xl font-bold text-gold-300 mb-4 border-b border-navy-700 pb-2">المد المتصل</h4>
              <p className="text-navy-200 mb-4 text-sm">أن يجتمع حرف المد والهمز في كلمة واحدة.</p>
              <div className="space-y-3">
                <div className="bg-navy-950 p-3 rounded-lg text-center">
                  <span className="font-serif text-2xl text-gold-400">﴿ جَآءَ ﴾</span>
                </div>
                <div className="bg-navy-950 p-3 rounded-lg text-center">
                  <span className="font-serif text-2xl text-gold-400">﴿ سُوٓءَ ﴾</span>
                </div>
                <div className="bg-navy-950 p-3 rounded-lg text-center">
                  <span className="font-serif text-2xl text-gold-400">﴿ سِيٓءَتۡ ﴾</span>
                </div>
              </div>
            </div>

            <div className="bg-navy-800 border border-navy-700 p-6 rounded-xl shadow-md">
              <h4 className="text-xl font-bold text-gold-300 mb-4 border-b border-navy-700 pb-2">المد المنفصل</h4>
              <p className="text-navy-200 mb-4 text-sm">أن يكون حرف المد في آخر الكلمة والهمز في أول الكلمة التالية.</p>
              <div className="space-y-3">
                <div className="bg-navy-950 p-3 rounded-lg text-center">
                  <span className="font-serif text-2xl text-gold-400">﴿ بِمَآ أُنزِلَ ﴾</span>
                </div>
                <div className="bg-navy-950 p-3 rounded-lg text-center">
                  <span className="font-serif text-2xl text-gold-400">﴿ قُوٓاْ أَنفُسَكُمۡ ﴾</span>
                </div>
                <div className="bg-navy-950 p-3 rounded-lg text-center">
                  <span className="font-serif text-2xl text-gold-400">﴿ فِيٓ أَنفُسِكُمۡ ﴾</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-navy-950 p-6 rounded-xl border-r-4 border-gold-500 shadow-lg mt-8">
            <h3 className="flex items-center gap-2 text-gold-400 font-bold mb-4">
              <Quote className="w-5 h-5" />
              الشاهد من الشاطبية
            </h3>
            <div className="text-center space-y-4 mb-4">
              <p className="text-xl text-white leading-loose font-arabic">
                إِذَا أَلِفٌ أَوْ يَاؤُهَا بَعْدَ كَسْرَةٍ * أَوِ الْوَاوُ عَنْ ضَمٍّ لَقِيَ الْهَمْزَ طُوِّلاَ
              </p>
              <p className="text-xl text-white leading-loose font-arabic">
                فَإِنْ يَنْفَصِلْ فَالْقَصْرُ بَادَرَه طَالِبًا * بِخُلْفِهِماَ يُرْوِيكَ دَرًّا وَمُخْضَلاَ
              </p>
            </div>
            <p className="text-navy-300 text-sm">
              * ملحوظة: لم يُذكر ورش مع أصحاب القصر أو التوسط، فبقي على الأصل وهو "الطول" (6 حركات) كالإمام حمزة.
            </p>
          </div>
        </div>
      </div>
    </div>
  ),

  'u1-l2': (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-navy-800/80 p-6 md:p-8 rounded-2xl border border-navy-700 shadow-xl backdrop-blur-sm">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
          <BookOpen className="text-gold-500" />
          مد البدل
        </h2>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-navy-100 text-lg leading-relaxed mb-6">
            من أهم الأبواب التي ينفرد بها الإمام ورش من طريق الشاطبية هو (مد البدل)، حيث اختصه الشاطبي بأحكام دقيقة تميزه عن بقية القراء.
          </p>

          <div className="bg-navy-900/50 p-6 rounded-xl border border-navy-800 mb-6">
            <h3 className="text-gold-400 font-bold mb-3 flex items-center gap-2">
              <Info className="w-5 h-5" />
              تعريف مد البدل
            </h3>
            <p className="text-white text-lg">
              هو كل همز ممدود، أي أن يتقدم الهمز على حرف المد في كلمة واحدة، وليس بعد حرف المد همز أو سكون.
            </p>
          </div>

          <div className="bg-navy-800 border border-navy-700 p-6 rounded-xl shadow-md mb-8">
            <h3 className="text-gold-300 font-bold mb-4 border-b border-navy-700 pb-2">مذهب ورش في البدل</h3>
            <p className="text-navy-100 mb-4">
              لورش في البدل من طريق الشاطبية ثلاثة أوجه جائزة:
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center mt-6">
              <div className="flex-1 bg-navy-950 p-4 rounded-lg text-center border border-navy-800">
                <span className="block text-xl font-bold text-white mb-2">القصر</span>
                <span className="text-gold-400">حركتان (2)</span>
              </div>
              <div className="flex-1 bg-navy-950 p-4 rounded-lg text-center border border-gold-500/30 ring-1 ring-gold-500/20 shadow-[0_0_15px_rgba(212,175,55,0.1)]">
                <span className="block text-xl font-bold text-white mb-2">التوسط</span>
                <span className="text-gold-400">4 حركات</span>
                <span className="block text-xs text-navy-400 mt-2">(وهو الوجه المقدم أداءً في كثير من المدارس)</span>
              </div>
              <div className="flex-1 bg-navy-950 p-4 rounded-lg text-center border border-navy-800">
                <span className="block text-xl font-bold text-white mb-2">الإشباع</span>
                <span className="text-gold-400">6 حركات</span>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold text-white mb-4">أمثلة بالرسم العثماني</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-navy-800 p-4 rounded-xl text-center shadow-md">
                <span className="text-navy-300 text-sm block mb-2">الهمز مع الألف</span>
                <span className="font-serif text-3xl text-gold-400">﴿ ءَامَنُواْ ﴾</span>
              </div>
              <div className="bg-navy-800 p-4 rounded-xl text-center shadow-md">
                <span className="text-navy-300 text-sm block mb-2">الهمز مع الواو</span>
                <span className="font-serif text-3xl text-gold-400">﴿ أُوتُواْ ﴾</span>
              </div>
              <div className="bg-navy-800 p-4 rounded-xl text-center shadow-md">
                <span className="text-navy-300 text-sm block mb-2">الهمز مع الياء</span>
                <span className="font-serif text-3xl text-gold-400">﴿ إِيمَٰنًا ﴾</span>
              </div>
            </div>
          </div>

          <div className="bg-navy-950 p-6 rounded-xl border-r-4 border-gold-500 mt-8">
            <h3 className="flex items-center gap-2 text-gold-400 font-bold mb-4">
              <Quote className="w-5 h-5" />
              الشاهد من الشاطبية
            </h3>
            <div className="text-center space-y-4 mb-2">
              <p className="text-xl text-white leading-loose font-arabic">
                وَمَا بَعْدَ هَمْزٍ ثَابِتٍ أَوْ مُغَيَّرٍ * فَقَصْرٌ وَقَدْ يُرْوَى لِوَرْشٍ مُطَوَّلاَ
              </p>
              <p className="text-xl text-white leading-loose font-arabic">
                وَوَسَّطَهُ قَوْمٌ كَآمَنَ هؤُلاَ * ءَالِهَةً آتَى لِلْإِيمَانِ مُثِّلاَ
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),

  'u1-l3': (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-navy-800/80 p-6 md:p-8 rounded-2xl border border-navy-700 shadow-xl backdrop-blur-sm">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
          <AlertCircle className="text-gold-500" />
          استثناءات مد البدل
        </h2>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-navy-100 text-lg leading-relaxed mb-6">
            رغم أن القاعدة عند ورش هي جواز الأوجه الثلاثة في البدل، إلا أن هناك كلمات وحالات استثناها الرواة، ولا يجوز فيها لورش إلا <span className="font-bold text-gold-400">القصر (حركتان)</span> فقط.
          </p>

          <div className="space-y-6">
            <div className="bg-navy-900/50 p-5 rounded-xl border border-navy-800 flex flex-col md:flex-row gap-6 items-center">
              <div className="flex-1">
                <h4 className="text-gold-300 font-bold mb-2">1. أن يسبق الهمز ساكن صحيح متصل</h4>
                <p className="text-navy-200 text-sm">إذا جاء قبل الهمزة حرف ساكن سكوناً صحيحاً (ليس حرف مد) في نفس الكلمة.</p>
              </div>
              <div className="flex gap-4">
                <div className="bg-navy-950 px-4 py-2 rounded-lg"><span className="font-serif text-2xl text-gold-400">﴿ قُرۡءَان ﴾</span></div>
                <div className="bg-navy-950 px-4 py-2 rounded-lg"><span className="font-serif text-2xl text-gold-400">﴿ مَسۡـُٔولًا ﴾</span></div>
              </div>
            </div>

            <div className="bg-navy-900/50 p-5 rounded-xl border border-navy-800 flex flex-col md:flex-row gap-6 items-center">
              <div className="flex-1">
                <h4 className="text-gold-300 font-bold mb-2">2. همزة الوصل عند الابتداء</h4>
                <p className="text-navy-200 text-sm">إذا كان الهمز مبدلاً من همزة وصل عند الابتداء بالكلمة.</p>
              </div>
              <div className="flex gap-4">
                <div className="bg-navy-950 px-4 py-2 rounded-lg"><span className="font-serif text-2xl text-gold-400">﴿ ٱئۡتِ ﴾ <span className="text-sm text-navy-400 mx-2">تُقرأ ابتداءً:</span> إِيتِ</span></div>
              </div>
            </div>

            <div className="bg-navy-900/50 p-5 rounded-xl border border-navy-800 flex flex-col md:flex-row gap-6 items-center">
              <div className="flex-1">
                <h4 className="text-gold-300 font-bold mb-2">3. كلمة (يؤاخذ) ومشتقاتها</h4>
                <p className="text-navy-200 text-sm">حيثما وردت في القرآن الكريم.</p>
              </div>
              <div className="flex gap-4">
                <div className="bg-navy-950 px-4 py-2 rounded-lg"><span className="font-serif text-2xl text-gold-400">﴿ يُؤَاخِذُ ﴾</span></div>
              </div>
            </div>

            <div className="bg-navy-900/50 p-5 rounded-xl border border-navy-800 flex flex-col md:flex-row gap-6 items-center">
              <div className="flex-1">
                <h4 className="text-gold-300 font-bold mb-2">4. كلمة (إسرائيل)</h4>
                <p className="text-navy-200 text-sm">يُقصد الياء التي بعد الهمزة، فيها القصر فقط لورش.</p>
              </div>
              <div className="flex gap-4">
                <div className="bg-navy-950 px-4 py-2 rounded-lg"><span className="font-serif text-2xl text-gold-400">﴿ إِسۡرَٰٓءِيل ﴾</span></div>
              </div>
            </div>
          </div>

          <div className="bg-navy-950 p-6 rounded-xl border-r-4 border-gold-500 mt-8">
            <h3 className="flex items-center gap-2 text-gold-400 font-bold mb-4">
              <Quote className="w-5 h-5" />
              الشاهد من الشاطبية
            </h3>
            <div className="text-center space-y-4 mb-2">
              <p className="text-xl text-white leading-loose font-arabic">
                سِوَى يَاءِ إِسْرَائِيلَ أَوْ بَعْدَ سَاكِنٍ * صَحِيحٍ كَقُرْآنٍ وَمَسْئُولاً اسْأَلاَ
              </p>
              <p className="text-xl text-white leading-loose font-arabic">
                وَمَا بَعْدَ هَمْزِ الْوَصْلِ إِيتِ وَبَعْضُهُمْ * يُؤَاخِذُكُمُ الآنَ مُسْتَفْهِماً تَلاَ
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),

  'u1-l4': (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-navy-800/80 p-6 md:p-8 rounded-2xl border border-navy-700 shadow-xl backdrop-blur-sm">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
          <BookOpen className="text-gold-500" />
          مد اللين المهموز
        </h2>
        
        <div className="prose prose-invert max-w-none">
          <div className="bg-navy-900/50 p-6 rounded-xl border border-navy-800 mb-6">
            <h3 className="text-gold-400 font-bold mb-3">تعريف اللين المهموز</h3>
            <p className="text-white text-lg">
              هو أن تقع الواو أو الياء الساكنتان المفتوح ما قبلهما، وبعدهما همزة في كلمة واحدة.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-navy-800 border border-navy-700 p-6 rounded-xl text-center">
              <h4 className="text-gold-300 font-bold mb-4">مثال الياء</h4>
              <span className="font-serif text-4xl text-gold-400 block mb-2">﴿ شَيۡءٖ ﴾</span>
            </div>
            <div className="bg-navy-800 border border-navy-700 p-6 rounded-xl text-center">
              <h4 className="text-gold-300 font-bold mb-4">مثال الواو</h4>
              <span className="font-serif text-4xl text-gold-400 block mb-2">﴿ سَوۡءَةَ ﴾</span>
            </div>
          </div>

          <div className="bg-navy-800 border border-navy-700 p-6 rounded-xl mb-8">
            <h3 className="text-gold-300 font-bold mb-4 border-b border-navy-700 pb-2">مذهب ورش فيه</h3>
            <p className="text-navy-100 mb-6">
              لورش في مد اللين المهموز وجهان فقط من طريق الشاطبية (وصلاً ووقفاً):
            </p>
            <div className="flex gap-4 justify-center">
              <div className="bg-navy-950 px-8 py-4 rounded-xl border border-navy-800 text-center">
                <span className="block text-xl font-bold text-white mb-2">التوسط</span>
                <span className="text-gold-400">4 حركات</span>
              </div>
              <div className="bg-navy-950 px-8 py-4 rounded-xl border border-navy-800 text-center">
                <span className="block text-xl font-bold text-white mb-2">الإشباع</span>
                <span className="text-gold-400">6 حركات</span>
              </div>
            </div>
          </div>

          <div className="bg-red-950/30 border border-red-900/50 p-6 rounded-xl mb-8">
            <h3 className="text-red-400 font-bold mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              مستثنيات اللين المهموز
            </h3>
            <p className="text-white mb-4">استُثني لورش كلمتان لا مد فيهما (تُقرأ بالقصر - حركتان فقط):</p>
            <div className="flex gap-4">
              <div className="bg-navy-950 px-6 py-3 rounded-lg"><span className="font-serif text-2xl text-gold-400">﴿ مَوۡئِلًا ﴾</span> <span className="text-sm text-navy-400 ml-2">(الكهف)</span></div>
              <div className="bg-navy-950 px-6 py-3 rounded-lg"><span className="font-serif text-2xl text-gold-400">﴿ ٱلۡمَوۡءُۥدَةُ ﴾</span> <span className="text-sm text-navy-400 ml-2">(التكوير - الواو الأولى)</span></div>
            </div>
          </div>

          <div className="bg-navy-950 p-6 rounded-xl border-r-4 border-gold-500">
            <h3 className="flex items-center gap-2 text-gold-400 font-bold mb-4">
              <Quote className="w-5 h-5" />
              الشاهد من الشاطبية
            </h3>
            <div className="text-center space-y-4 mb-2">
              <p className="text-xl text-white leading-loose font-arabic">
                وَإِنْ تَسْكُنِ الْيَا بَيْنَ فَتْحٍ وَهَمْزَةٍ * بِكِلْمَةٍ أَوْ وَاوٌ فَوَجْهَانِ جُمِّلاَ
              </p>
              <p className="text-xl text-white leading-loose font-arabic">
                بِطُولٍ وَقَصْرٍ وَصْلُ وَرْشٍ وَوَقْفُهُ * وَعَنْ كُلٍّ الْمَوْءُودَةُ اقْصُرْ وَمَوْئِلاَ
              </p>
              <p className="text-navy-400 text-sm mt-4">
                * ملاحظة: مصطلح "قصر" في هذا البيت يُقصد به "التوسط" (4 حركات) بالنسبة للطول (6)، لأن اللين لا مد فيه أصلاً.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),

  'u1-l5': (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-navy-800/80 p-6 md:p-8 rounded-2xl border border-navy-700 shadow-xl backdrop-blur-sm">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
          <BookOpen className="text-gold-500" />
          اجتماع البدل مع اللين المهموز
        </h2>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-navy-100 text-lg leading-relaxed mb-6">
            إذا اجتمع مد البدل مع مد اللين المهموز في تلاوة واحدة، فلا يجوز ضرب جميع الأوجه ببعضها، بل هناك أوجه مقروء بها (محررة) وأوجه ممتنعة.
          </p>

          <div className="bg-navy-950 border border-gold-500/30 rounded-xl overflow-hidden mb-8">
            <div className="bg-navy-900 px-6 py-4 border-b border-gold-500/30">
              <h3 className="text-gold-400 font-bold text-lg m-0">جدول الأوجه الجائزة لورش</h3>
            </div>
            <div className="p-6 overflow-x-auto">
              <table className="w-full text-center border-collapse">
                <thead>
                  <tr className="border-b border-navy-700">
                    <th className="pb-3 text-gold-300 font-bold w-1/3">وجه البدل</th>
                    <th className="pb-3 text-gold-300 font-bold w-1/3">وجه اللين المهموز</th>
                    <th className="pb-3 text-navy-400 font-bold w-1/3">الحكم</th>
                  </tr>
                </thead>
                <tbody className="text-lg">
                  <tr className="border-b border-navy-800/50 hover:bg-navy-900/50 transition">
                    <td className="py-4 text-white">قصر (2)</td>
                    <td className="py-4 text-white">توسط (4)</td>
                    <td className="py-4"><span className="inline-flex items-center gap-1 text-green-400 text-sm bg-green-400/10 px-3 py-1 rounded-full"><CheckCircle2 className="w-4 h-4"/> جائز</span></td>
                  </tr>
                  <tr className="border-b border-navy-800/50 hover:bg-navy-900/50 transition">
                    <td className="py-4 text-white">توسط (4)</td>
                    <td className="py-4 text-white">توسط (4)</td>
                    <td className="py-4"><span className="inline-flex items-center gap-1 text-green-400 text-sm bg-green-400/10 px-3 py-1 rounded-full"><CheckCircle2 className="w-4 h-4"/> جائز</span></td>
                  </tr>
                  <tr className="border-b border-navy-800/50 hover:bg-navy-900/50 transition">
                    <td className="py-4 text-white">إشباع (6)</td>
                    <td className="py-4 text-white">توسط (4)</td>
                    <td className="py-4"><span className="inline-flex items-center gap-1 text-green-400 text-sm bg-green-400/10 px-3 py-1 rounded-full"><CheckCircle2 className="w-4 h-4"/> جائز</span></td>
                  </tr>
                  <tr className="hover:bg-navy-900/50 transition bg-navy-900/20">
                    <td className="py-4 text-white font-bold">إشباع (6)</td>
                    <td className="py-4 text-white font-bold">إشباع (6)</td>
                    <td className="py-4"><span className="inline-flex items-center gap-1 text-green-400 text-sm bg-green-400/10 px-3 py-1 rounded-full"><CheckCircle2 className="w-4 h-4"/> جائز</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-navy-900/50 p-6 rounded-xl border border-navy-800">
            <h3 className="text-gold-400 font-bold mb-3 flex items-center gap-2">
              <Info className="w-5 h-5" />
              الخلاصة
            </h3>
            <ul className="list-disc list-inside space-y-2 text-navy-100 text-lg">
              <li>اللين المهموز يُقرأ بـ <span className="text-gold-300 font-bold">التوسط (4)</span> على جميع أوجه البدل (2، 4، 6).</li>
              <li>اللين المهموز يُقرأ بـ <span className="text-gold-300 font-bold">الإشباع (6)</span> <span className="underline decoration-red-500">فقط</span> إذا قُرئ البدل بـ الإشباع (6).</li>
              <li>مجموع الأوجه الجائزة: <span className="font-bold text-gold-500">4 أوجه</span>.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
};
