import React from 'react';
import { BookOpen, AlertCircle, Quote } from 'lucide-react';

export const unit2Content: Record<string, React.ReactNode> = {
  'u2-l1': (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-navy-800/80 p-6 md:p-8 rounded-2xl border border-navy-700 shadow-xl backdrop-blur-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/5 rounded-full blur-3xl"></div>
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
          <BookOpen className="text-gold-500" />
          مقدمة في الهمزتين من كلمة
        </h2>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-navy-100 text-lg leading-relaxed mb-6">
            الهمزتان من كلمة هما همزتا قطع تلاصقتا في كلمة واحدة، الأولى منهما مفتوحة دائماً (وهي همزة الاستفهام غالباً)، والثانية إما مفتوحة، أو مكسورة، أو مضمومة.
          </p>

          <div className="bg-navy-900/50 p-6 rounded-xl border border-navy-800 mb-8">
            <h3 className="text-gold-400 font-bold mb-3">أنواع الهمزتين من كلمة</h3>
            <ul className="list-disc list-inside space-y-2 text-white text-lg">
              <li>المفتوحتان: مثل <span className="font-serif text-gold-400">﴿ ءَأَنذَرۡتَهُمۡ ﴾</span></li>
              <li>المفتوحة فمكسورة: مثل <span className="font-serif text-gold-400">﴿ أَءِنَّكُمۡ ﴾</span></li>
              <li>المفتوحة فمضمومة: مثل <span className="font-serif text-gold-400">﴿ أَءُنَبِّئُكُم ﴾</span></li>
            </ul>
          </div>

          <div className="bg-navy-800 border border-navy-700 p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold text-gold-300 mb-4 border-b border-navy-700 pb-2">القاعدة العامة لورش</h3>
            <p className="text-navy-100 mb-4 text-lg">
              إذا اجتمعت همزتا قطع في كلمة واحدة، فإن الإمام ورش يقرأ بتحقيق الهمزة الأولى (لأنها همزة استفهام)، ويغير الهمزة الثانية. والتغيير يكون إما بالتسهيل أو الإبدال (حسب نوع الهمزة).
            </p>
          </div>
        </div>
      </div>
    </div>
  ),

  'u2-l2': (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-navy-800/80 p-6 md:p-8 rounded-2xl border border-navy-700 shadow-xl backdrop-blur-sm">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
          <BookOpen className="text-gold-500" />
          الهمزتان المفتوحتان
        </h2>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-navy-100 text-lg leading-relaxed mb-6">
            إذا كانت الهمزة الثانية مفتوحة (بعد الأولى المفتوحة)، ففيها لورش وجهان جائزان، والوجهان مقروء بهما.
          </p>

          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="flex-1 bg-navy-950 p-6 rounded-xl border border-gold-500/30 text-center shadow-lg">
              <h3 className="text-xl font-bold text-gold-400 mb-3">1. التسهيل</h3>
              <p className="text-navy-200 mb-4 text-sm">تسهيل الهمزة الثانية بين الهمزة والألف.</p>
              <span className="font-serif text-3xl text-white">﴿ ءَأَنذَرۡتَهُمۡ ﴾</span>
            </div>
            
            <div className="flex-1 bg-navy-950 p-6 rounded-xl border border-gold-500/30 text-center shadow-lg">
              <h3 className="text-xl font-bold text-gold-400 mb-3">2. الإبدال</h3>
              <p className="text-navy-200 mb-4 text-sm">إبدال الهمزة الثانية ألفاً خالصة (حرف مد).</p>
              <span className="font-serif text-3xl text-white">﴿ ءَآنذَرۡتَهُمۡ ﴾</span>
            </div>
          </div>

          <div className="bg-navy-900/50 p-6 rounded-xl border border-navy-800 mb-8">
            <h3 className="text-gold-400 font-bold mb-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              ملاحظة مهمة في وجه الإبدال
            </h3>
            <p className="text-white text-lg leading-relaxed">
              إذا أبدلنا الهمزة الثانية ألفاً، ننظر إلى الحرف الذي بعدها:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2 text-navy-200">
              <li>إذا كان الحرف الذي بعدها ساكناً، تُمد الألف <span className="font-bold text-gold-400">6 حركات (إشباع)</span> من باب المد اللازم، مثل: ﴿ ءَأَنذَرۡتَهُمۡ ﴾.</li>
              <li>إذا كان الحرف الذي بعدها متحركاً، تُمد الألف <span className="font-bold text-gold-400">حركتين (قصر)</span> من باب المد الطبيعي، مثل: ﴿ ءَأَلِدُ ﴾ ⬅ ﴿ ءَالِدُ ﴾.</li>
            </ul>
          </div>

          <div className="bg-navy-950 p-6 rounded-xl border-r-4 border-gold-500 mt-8">
            <h3 className="flex items-center gap-2 text-gold-400 font-bold mb-4">
              <Quote className="w-5 h-5" />
              الشاهد من الشاطبية
            </h3>
            <div className="text-center space-y-4 mb-2">
              <p className="text-xl text-white leading-loose font-arabic">
                وَتَسْهِيلُ أُخْرَى هَمْزَتَيْنِ بِكِلْمَةٍ * سَمَا وَبِذَاتِ الْفَتْحِ خُلْفٌ لِتَجْمُلاَ
              </p>
              <p className="text-xl text-white leading-loose font-arabic">
                وَقُلْ أَلِفاً عَنْ أَهْلِ مِصْرَ تَبَدَّلَتْ * لِوَرْشٍ وَفِي بَغْدَادَ يُرْوَى مُسَهَّلاَ
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),

  'u2-l3': (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-navy-800/80 p-6 md:p-8 rounded-2xl border border-navy-700 shadow-xl backdrop-blur-sm">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
          <BookOpen className="text-gold-500" />
          المفتوحة فمكسورة
        </h2>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-navy-100 text-lg leading-relaxed mb-6">
            النوع الثاني هو أن تكون الهمزة الأولى مفتوحة والثانية مكسورة.
          </p>

          <div className="bg-navy-900/50 p-6 rounded-xl border border-navy-800 text-center mb-8">
            <h3 className="text-gold-400 font-bold mb-3">حكمها لورش</h3>
            <p className="text-white text-xl">
              فيها وجه واحد فقط وهو: <span className="font-bold text-gold-500">التسهيل</span>.
            </p>
            <p className="text-navy-200 mt-2 text-sm">تُسهل الهمزة الثانية بين الهمزة والياء.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-navy-800 p-6 rounded-xl text-center shadow-md">
              <span className="text-navy-300 text-sm block mb-2">مثال (أَئِنَّكُمْ)</span>
              <span className="font-serif text-3xl text-gold-400">﴿ أَءِنَّكُمۡ ﴾</span>
            </div>
            <div className="bg-navy-800 p-6 rounded-xl text-center shadow-md">
              <span className="text-navy-300 text-sm block mb-2">مثال (أَئِذَا)</span>
              <span className="font-serif text-3xl text-gold-400">﴿ أَءِذَا ﴾</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),

  'u2-l4': (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-navy-800/80 p-6 md:p-8 rounded-2xl border border-navy-700 shadow-xl backdrop-blur-sm">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
          <BookOpen className="text-gold-500" />
          المفتوحة فمضمومة
        </h2>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-navy-100 text-lg leading-relaxed mb-6">
            النوع الثالث هو أن تكون الهمزة الأولى مفتوحة والثانية مضمومة. وقد وردت في القرآن الكريم في ثلاثة مواضع فقط.
          </p>

          <div className="bg-navy-900/50 p-6 rounded-xl border border-navy-800 text-center mb-8">
            <h3 className="text-gold-400 font-bold mb-3">حكمها لورش</h3>
            <p className="text-white text-xl">
              فيها وجه واحد فقط وهو: <span className="font-bold text-gold-500">التسهيل</span>.
            </p>
            <p className="text-navy-200 mt-2 text-sm">تُسهل الهمزة الثانية بين الهمزة والواو.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-navy-800 p-6 rounded-xl text-center shadow-md border-t-2 border-gold-500">
              <span className="text-navy-300 text-sm block mb-2">في سورة آل عمران</span>
              <span className="font-serif text-2xl text-gold-400">﴿ قُلۡ أَءُنَبِّئُكُم ﴾</span>
            </div>
            <div className="bg-navy-800 p-6 rounded-xl text-center shadow-md border-t-2 border-gold-500">
              <span className="text-navy-300 text-sm block mb-2">في سورة ص</span>
              <span className="font-serif text-2xl text-gold-400">﴿ أَءُنزِلَ عَلَيۡهِ ﴾</span>
            </div>
            <div className="bg-navy-800 p-6 rounded-xl text-center shadow-md border-t-2 border-gold-500">
              <span className="text-navy-300 text-sm block mb-2">في سورة القمر</span>
              <span className="font-serif text-2xl text-gold-400">﴿ أَءُلۡقِيَ ٱلذِّكۡرُ ﴾</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};
