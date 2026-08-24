import React from 'react';

export const unit0Content: Record<string, React.ReactNode> = {
  "u0-l1": (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white border-b-2 border-gold-500 pb-2 inline-block">ما علم القراءات؟</h2>
      
      <div className="bg-navy-800/50 p-6 rounded-lg border border-navy-700">
        <h3 className="text-xl font-semibold text-gold-400 mb-4 flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-navy-950 text-white flex items-center justify-center text-sm">1</span>
          تعريف القراءة
        </h3>
        <p className="text-navy-100 leading-relaxed text-lg">
          القراءة هي: المذهب الذي ذهب إليه إمام من أئمة القراء في كيفية النطق بالقرآن الكريم، والذي ينسب إليه لكونه قد لزمه وأقرأ به، مع اتفاق هذا المذهب مع خط المصحف العثماني وتلقيه بالسند المتصل إلى رسول الله ﷺ.
        </p>
      </div>

      <div className="bg-navy-800/50 p-6 rounded-lg border border-navy-700">
        <h3 className="text-xl font-semibold text-gold-400 mb-4 flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-navy-950 text-white flex items-center justify-center text-sm">2</span>
          تعريف الرواية
        </h3>
        <p className="text-navy-100 leading-relaxed text-lg">
          الرواية هي: ما نُسب للراوي عن الإمام. والراوي هو من أخذ القراءة عن الإمام مباشرة أو بواسطة. فكل ما يُنسب إلى ورش عن نافع يُسمى "رواية".
        </p>
      </div>

      <div className="bg-navy-800/50 p-6 rounded-lg border border-navy-700">
        <h3 className="text-xl font-semibold text-gold-400 mb-4 flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-navy-950 text-white flex items-center justify-center text-sm">3</span>
          تعريف الطريق
        </h3>
        <p className="text-navy-100 leading-relaxed text-lg">
          الطريق هو: ما نُسب للآخذ عن الراوي وإن سفل. فمثلاً طريق "الأزرق" عن ورش، وطريق "الشاطبية" (التي اختارت طريق الأزرق) عن ورش.
        </p>
      </div>

      <div className="bg-navy-950 text-white p-6 rounded-lg shadow-md border-r-4 border-gold-500">
        <h3 className="text-xl font-semibold mb-3 text-gold-500">خلاصة المعنى</h3>
        <ul className="space-y-4 text-lg">
          <li className="flex items-start gap-3">
            <span className="text-gold-500 font-bold">•</span>
            <span><strong>القراءة:</strong> نافع (الإمام)</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-gold-500 font-bold">•</span>
            <span><strong>الرواية:</strong> ورش (عن نافع)</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-gold-500 font-bold">•</span>
            <span><strong>الطريق:</strong> الشاطبية (بواسطة الأزرق عن ورش)</span>
          </li>
        </ul>
      </div>
    </div>
  ),
  "u0-l2": (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white border-b-2 border-gold-500 pb-2 inline-block">ترجمة الإمام نافع</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-navy-800/80 p-6 rounded-lg border border-navy-700 shadow-sm">
          <h3 className="font-semibold text-gold-400 mb-2">اسمه ونسبه</h3>
          <p className="text-navy-300">نافع بن عبد الرحمن بن أبي نعيم، الليثي بالولاء، المدني.</p>
        </div>
        <div className="bg-navy-800/80 p-6 rounded-lg border border-navy-700 shadow-sm">
          <h3 className="font-semibold text-gold-400 mb-2">كنيته</h3>
          <p className="text-navy-300">أبو رُوَيم، وقيل: أبو الحسن، وقيل: أبو عبد الرحمن.</p>
        </div>
        <div className="bg-navy-800/80 p-6 rounded-lg border border-navy-700 shadow-sm">
          <h3 className="font-semibold text-gold-400 mb-2">مولده ووفاته</h3>
          <p className="text-navy-300">ولد في حدود سنة (70هـ)، وتوفي بالمدينة المنورة سنة (169هـ) وقيل غير ذلك.</p>
        </div>
        <div className="bg-navy-800/80 p-6 rounded-lg border border-navy-700 shadow-sm">
          <h3 className="font-semibold text-gold-400 mb-2">مكانته العلمية</h3>
          <p className="text-navy-300">إمام دار الهجرة في القراءة. انتهت إليه رياسة الإقراء بالمدينة، وأجمع الناس على قراءته.</p>
        </div>
      </div>

      <div className="bg-navy-800/50 p-6 rounded-lg border border-navy-700 mt-6">
        <h3 className="text-xl font-semibold text-gold-400 mb-4">شيوخه في القراءة</h3>
        <p className="text-navy-100 leading-relaxed text-lg mb-4">
          أخذ القراءة عرضاً عن سبعين من التابعين، من أبرزهم:
        </p>
        <ul className="list-disc list-inside text-navy-100 space-y-2 marker:text-gold-500">
          <li>أبو جعفر يزيد بن القعقاع</li>
          <li>شيبة بن نصاح</li>
          <li>عبد الرحمن بن هرمز الأعرج</li>
          <li>مسلم بن جندب</li>
          <li>يزيد بن رومان</li>
        </ul>
      </div>

      <div className="bg-navy-800/50 p-6 rounded-lg border border-navy-700">
        <h3 className="text-xl font-semibold text-gold-400 mb-4">أشهر من قرأ عليه (الرواة)</h3>
        <p className="text-navy-100 leading-relaxed text-lg">
          قرأ عليه خلائق لا يحصون، واشتهر من الرواة عنه راويان أساسيان في منظومة القراءات السبع:
        </p>
        <div className="flex gap-4 mt-4">
          <div className="flex-1 bg-navy-800/80 p-4 text-center rounded border border-navy-700 font-bold text-gold-400">1. قالون (عيسى بن مينا)</div>
          <div className="flex-1 bg-navy-800/80 p-4 text-center rounded border border-gold-500 font-bold text-gold-600 bg-gold-500/10">2. ورش (عثمان بن سعيد)</div>
        </div>
      </div>
    </div>
  ),
  "u0-l3": (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white border-b-2 border-gold-500 pb-2 inline-block">إسناد قراءة الإمام نافع</h2>
      
      <p className="text-navy-100 text-lg">إسناد قراءة الإمام نافع من أعلى الأسانيد وأوثقها، متصل بالنبي ﷺ عبر الصحابة والتابعين في المدينة المنورة.</p>

      <div className="relative py-8">
        <div className="absolute right-1/2 w-1 h-full bg-gold-200 transform trannavy-x-1/2"></div>
        
        <div className="relative z-10 flex flex-col items-center gap-8">
          
          <div className="bg-navy-800/80 px-8 py-4 rounded-xl shadow-md border-2 border-gold-500 text-center min-w-[300px]">
            <h3 className="font-bold text-xl text-white">النبي محمد ﷺ</h3>
          </div>

          <div className="w-1 h-8 bg-gold-500/100"></div>

          <div className="bg-navy-800/50 px-8 py-4 rounded-xl shadow-sm border border-navy-600 text-center min-w-[300px]">
            <h3 className="font-bold text-lg text-gold-400 mb-2">كبار الصحابة</h3>
            <p className="text-sm text-navy-300">أبي بن كعب، زيد بن ثابت، عمر بن الخطاب، عبد الله بن عباس (رضي الله عنهم)</p>
          </div>

          <div className="w-1 h-8 bg-gold-500/100"></div>

          <div className="bg-navy-800/50 px-8 py-4 rounded-xl shadow-sm border border-navy-600 text-center min-w-[300px]">
            <h3 className="font-bold text-lg text-gold-400 mb-2">أئمة التابعين بالمدينة</h3>
            <p className="text-sm text-navy-300">أبو هريرة (قرأ على أبي بن كعب)، ابن عباس (قرأ على زيد وأبي)</p>
            <p className="text-sm text-navy-300 mt-2 border-t pt-2">عبد الرحمن بن هرمز الأعرج، أبو جعفر يزيد بن القعقاع، شيبة بن نصاح</p>
          </div>

          <div className="w-1 h-8 bg-gold-500/100"></div>

          <div className="bg-navy-900 px-8 py-4 rounded-xl shadow-lg border-2 border-gold-500 text-center min-w-[300px]">
            <h3 className="font-bold text-xl text-white">الإمام نافع المدني</h3>
            <p className="text-gold-400 text-sm mt-1">أخذ عن سبعين من التابعين</p>
          </div>

          <div className="flex gap-16 mt-4 relative w-full justify-center">
            <div className="absolute top-0 right-1/2 w-[200px] h-1 bg-gold-200 transform trannavy-x-1/2"></div>
            <div className="absolute top-0 right-1/2 w-1 h-8 bg-gold-200 transform trannavy-x-[100px]"></div>
            <div className="absolute top-0 right-1/2 w-1 h-8 bg-gold-200 transform -trannavy-x-[100px]"></div>
            
            <div className="mt-8 bg-navy-800/80 px-6 py-3 rounded-lg border border-navy-600 text-center w-40 z-10">
              <h4 className="font-bold text-gold-400">قالون</h4>
            </div>
            
            <div className="mt-8 bg-gold-500/10 px-6 py-3 rounded-lg border-2 border-gold-500 text-center w-40 z-10 shadow-md">
              <h4 className="font-bold text-gold-700">ورش</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  "u0-l4": (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white border-b-2 border-gold-500 pb-2 inline-block">ترجمة الإمام ورش</h2>
      
      <div className="bg-navy-800/50 p-6 rounded-lg border border-navy-700">
        <h3 className="text-xl font-semibold text-gold-400 mb-4">البطاقة الشخصية</h3>
        <ul className="space-y-3 text-lg text-navy-100">
          <li><strong>الاسم:</strong> عثمان بن سعيد بن عبد الله، المصري، وقيل: القبطي، وقيل: مولى آل الزبير.</li>
          <li><strong>الكنية:</strong> أبو سعيد.</li>
          <li><strong>اللقب:</strong> ورش (وهو اللقب الذي اشتهر به).</li>
          <li><strong>المولد:</strong> وُلد في مصر سنة (110 هـ).</li>
          <li><strong>الوفاة:</strong> توفي بمصر سنة (197 هـ).</li>
        </ul>
      </div>

      <div className="bg-navy-800/80 p-6 rounded-lg shadow-sm border border-navy-700">
        <h3 className="text-xl font-semibold text-gold-400 mb-3 text-gold-600">سبب تسميته بـ "ورش"</h3>
        <p className="text-navy-100 leading-relaxed">
          ذكر العلماء أن الإمام نافعًا هو من لقبه بـ "ورش" لشدة بياضه (والورش شيء يصنع من اللبن). وقيل: لقصره وخفة حركته تشبيهاً بطائر يسمى الورشان. وكان الإمام ورش يفتخر بهذا اللقب ويقول: "أستاذي سماني به".
        </p>
      </div>

      <div className="bg-navy-950 text-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-3 text-gold-400">رحلته إلى الإمام نافع</h3>
        <p className="leading-relaxed mb-4">
          رحل ورش من مصر إلى المدينة المنورة سنة (155 هـ) ليقرأ على الإمام نافع. فلما وصل إلى مسجد نافع، وجده مزدحماً بالقراء، فشفع له بعض أقارب نافع ليقرأ عليه. 
        </p>
        <p className="leading-relaxed">
          كان ورش حسن الصوت جداً، فقرأ على نافع ختمات عدة. وقيل إنه قرأ عليه أربع ختمات في شهر، ثم رجع إلى مصر وانتهت إليه رياسة الإقراء بها.
        </p>
      </div>
    </div>
  ),
  "u0-l5": (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white border-b-2 border-gold-500 pb-2 inline-block">إسناد رواية ورش عن نافع</h2>
      
      <p className="text-navy-100 text-lg leading-relaxed">
        أخذ ورش القراءة عرضاً وتلاوة عن الإمام نافع في المدينة المنورة. وعاد إلى مصر، فأقرأ الناس هناك، فانتشرت روايته في مصر والمغرب والأندلس.
      </p>

      <div className="bg-navy-800/50 p-6 rounded-lg border border-navy-700">
        <h3 className="text-xl font-semibold text-gold-400 mb-4">كيف وصلت الرواية من ورش إلى الشاطبي؟</h3>
        <p className="text-navy-100 mb-6">من أهم الطرق التي نقلت لنا قراءة ورش هو طريق تلميذه <strong>أبي يعقوب الأزرق</strong>، وهو الطريق الذي اعتمده الإمام الشاطبي في منظومته.</p>
        
        <div className="flex flex-col items-center gap-2 text-center text-navy-100">
          <div className="bg-navy-950 text-white px-6 py-2 rounded shadow w-64 font-bold text-lg">الإمام نافع المدني</div>
          <div className="h-6 w-0.5 bg-gold-500/100"></div>
          <div className="bg-gold-500/20 text-gold-400 px-6 py-2 rounded border border-gold-500/40 shadow w-64 font-bold">الإمام ورش</div>
          <div className="h-6 w-0.5 bg-gold-500/100"></div>
          <div className="bg-navy-800/80 px-6 py-2 rounded border border-navy-600 shadow w-64">أبو يعقوب الأزرق</div>
          <div className="text-xs text-navy-400">عنه أخذ أئمة القراءة، ومنهم:</div>
          <div className="h-6 w-0.5 bg-navy-300"></div>
          <div className="bg-navy-800/80 px-6 py-2 rounded border border-navy-600 shadow w-64">أبو بكر بن سيف</div>
          <div className="h-6 w-0.5 bg-navy-300"></div>
          <div className="bg-navy-800/80 px-6 py-2 rounded border border-navy-600 shadow w-64 text-sm">أبو محمد النحاس</div>
          <div className="h-6 w-0.5 bg-navy-300"></div>
          <div className="bg-navy-800/80 px-6 py-2 rounded border border-navy-600 shadow w-64 text-sm">أبو عمرو الداني (صاحب التيسير)</div>
          <div className="h-6 w-0.5 bg-navy-300"></div>
          <div className="bg-navy-950 text-white px-6 py-2 rounded shadow w-64 font-bold">الإمام الشاطبي (صاحب الحرز)</div>
        </div>
      </div>
    </div>
  ),
  "u0-l6": (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white border-b-2 border-gold-500 pb-2 inline-block">الشاطبي وحرز الأماني</h2>
      
      <div className="bg-navy-800/80 p-6 rounded-lg border border-navy-700 shadow-sm">
        <h3 className="font-bold text-xl text-gold-400 mb-3">من هو الإمام الشاطبي؟</h3>
        <p className="text-navy-100 text-lg leading-relaxed">
          هو القاسم بن فيرُّه بن خلف بن أحمد الشاطبي الرعيني الأندلسي (538 هـ - 590 هـ). إمام كبير من أئمة القراءات، ضرير البصر، بصير البصيرة. وُلِد بشاطبة في الأندلس واستقر بمصر.
        </p>
      </div>

      <div className="bg-navy-800/50 p-6 rounded-lg border border-navy-700">
        <h3 className="font-bold text-xl text-gold-400 mb-4">كتابه: حرز الأماني ووجه التهاني</h3>
        <p className="text-navy-100 text-lg leading-relaxed mb-4">
          وتُعرف اختصاراً بـ <strong>"الشاطبية"</strong>. هي منظومة شعرية (قصيدة لامية) في علم القراءات السبع، تتكون من 1173 بيتاً.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-navy-800/80 p-4 rounded border border-gold-500/30 border-l-4 border-l-gold-500">
            <h4 className="font-bold text-gold-700 mb-1">أصلها:</h4>
            <p className="text-sm text-navy-300">نظم فيها كتاب "التيسير في القراءات السبع" للإمام أبي عمرو الداني، وزاد عليه بعض الأوجه (تسمى زيادات القصيد).</p>
          </div>
          <div className="bg-navy-800/80 p-4 rounded border border-gold-500/30 border-l-4 border-l-gold-500">
            <h4 className="font-bold text-gold-700 mb-1">مكانتها:</h4>
            <p className="text-sm text-navy-300">تلقاها العلماء بالقبول، وصارت العمدة في تعلم القراءات السبع وإقرائها، وشُرحت عشرات الشروح.</p>
          </div>
        </div>
      </div>

      <div className="bg-navy-950 text-white p-6 rounded-lg">
        <h3 className="font-bold text-xl mb-3 flex items-center gap-2">
          <span className="text-gold-400">💡</span>
          فائدة للطالب
        </h3>
        <p className="text-lg leading-relaxed text-navy-200">
          في دراستنا لرواية ورش من هذا المنهج، سنعتمد على <strong>"الشاطبية"</strong> كمرجع أساسي في تقرير الأوجه والأحكام. وسنذكر أبيات الشاطبي كدليل وحجة لكل حكمندرسه. ولذلك يُنسب هذا الطريق في القراءة إلى "الشاطبية".
        </p>
      </div>
    </div>
  ),
  "u0-l7": (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white border-b-2 border-gold-500 pb-2 inline-block">ما معنى "ورش عن نافع من طريق الشاطبية"؟</h2>
      
      <p className="text-navy-100 text-lg leading-relaxed">
        الآن، وبعد أن عرفنا مصطلحات (القراءة، الرواية، الطريق) وتراجم الأئمة، يمكننا تفكيك هذا العنوان الذي يمثل منهجنا:
      </p>

      <div className="space-y-4">
        <div className="flex gap-4 items-stretch">
          <div className="bg-navy-950 text-white px-6 py-4 rounded-lg w-1/3 flex items-center justify-center text-xl font-bold shadow-md">
            نافع
          </div>
          <div className="bg-navy-800/50 p-4 rounded-lg border border-navy-700 w-2/3 flex items-center">
            <p className="text-navy-100"><strong>الإمام صاحب القراءة:</strong> وهو الذي نُسبت إليه القراءة جملةً، وهو أحد القراء السبعة.</p>
          </div>
        </div>

        <div className="flex gap-4 items-stretch">
          <div className="bg-gold-500/100 text-white px-6 py-4 rounded-lg w-1/3 flex items-center justify-center text-xl font-bold shadow-md">
            ورش (عن نافع)
          </div>
          <div className="bg-navy-800/50 p-4 rounded-lg border border-navy-700 w-2/3 flex items-center">
            <p className="text-navy-100"><strong>الراوي عن الإمام:</strong> نقل اختيارات نافع ورواها عنه، مع ما اختص به ورش من الأصول والفرش.</p>
          </div>
        </div>

        <div className="flex gap-4 items-stretch">
          <div className="bg-navy-700 text-white px-6 py-4 rounded-lg w-1/3 flex items-center justify-center text-xl font-bold shadow-md text-center">
            من طريق الشاطبية (الأزرق)
          </div>
          <div className="bg-navy-800/50 p-4 rounded-lg border border-navy-700 w-2/3 flex flex-col justify-center">
            <p className="text-navy-100 mb-2"><strong>طريق نقل الرواية:</strong> لورش طرق كثيرة عنه (كالأزرق والأصبهاني). الشاطبية اعتمدت طريق <strong>أبي يعقوب الأزرق</strong>.</p>
            <p className="text-sm text-navy-400">فكل ما في الشاطبية لورش هو من طريق الأزرق. وإذا أُطلق "ورش من طريق الشاطبية" قُصد به طريق الأزرق المدوّن في حرز الأماني للتيسير.</p>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-red-50 border-r-4 border-red-500 p-6 rounded-l-lg">
        <h3 className="text-xl font-bold text-red-800 mb-2">⚠️ تنبيه منهجي هام جداً</h3>
        <p className="text-red-900 leading-relaxed text-lg">
          التزامنا بـ "طريق الشاطبية" يعني أننا <strong>لا يجوز</strong> أن نقرأ بوجه لورش لم يذكره الشاطبي أو لم يُنقل من طريق الأزرق من هذا الكتاب، حتى وإن صح ذلك الوجه من كتاب آخر (مثل "طيبة النشر"). الخلط بين الطرق يسمى "التركيب"، وهو معيب عند أهل الأداء.
        </p>
      </div>
    </div>
  ),
};
