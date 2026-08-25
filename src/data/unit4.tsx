import React from 'react';
import { BookOpen, Quote, AlertCircle, Info } from 'lucide-react';

export const unit4Content: Record<string, React.ReactNode> = {
  'u4-l1': (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-navy-800/80 p-6 md:p-8 rounded-2xl border border-navy-700 shadow-xl relative overflow-hidden">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
          <BookOpen className="text-gold-500" />
          الهمز الساكن المبدل
        </h2>
        
        <div className="prose prose-invert max-w-none">
          <div className="bg-navy-900/80 p-6 rounded-xl border-r-4 border-gold-500 mb-8">
            <h3 className="text-gold-400 font-bold mb-2 flex items-center gap-2">
              <Quote className="w-5 h-5" />
              الشاهد من الشاطبية (مع شرح الوسيط)
            </h3>
            <p className="font-serif text-xl leading-loose text-white text-center mb-4">
              إِذَا سَكَنَتْ فَاءً مِنَ الْفِعْلِ هَمْزَةٌ ... فَوَرْشٌ يُرِيهَا حَرْفَ مَدٍّ مُبَدَّلاَ<br/>
              سِوَى جُمْلَةِ الايوَاءِ وَالْوَاوُ عَنْهُ إِنْ ... تَفَتَّحَ إِثْرَ الضَّمِّ نَحْوَ مُؤَجَّلاَ
            </p>
            <p className="text-navy-200 leading-relaxed text-sm">
              <strong className="text-gold-300">شرح ما بين السطور:</strong> يوضح د. صبري سلامة في "الوسيط" أن ورشاً يبدل كل همزة ساكنة وقعت (فاءً للكلمة) بحرف مد يجانس حركة ما قبلها، ويستثني من ذلك الكلمات المشتقة من مادة الإيواء (مثل مأوى، المأوى، مأواهم، فأووا، وتؤوي).
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-xl font-bold text-white mb-4 border-b border-navy-700 pb-2">شرح القاعدة والأمثلة</h4>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-navy-950 p-4 rounded-xl border border-navy-800">
                <h5 className="text-gold-400 font-bold mb-2">قبلها فتح (تبدل ألفاً)</h5>
                <ul className="text-navy-100 list-disc list-inside space-y-1">
                  <li><span className="font-serif text-white">﴿يَأْكُلُ﴾</span> تُقرأ: يَاكُلُ</li>
                  <li><span className="font-serif text-white">﴿فَأْتُوا﴾</span> تُقرأ: فَاتُوا</li>
                  <li><span className="font-serif text-white">﴿يَأْمُرُكُمْ﴾</span> تُقرأ: يَامُرُكُمْ</li>
                </ul>
              </div>

              <div className="bg-navy-950 p-4 rounded-xl border border-navy-800">
                <h5 className="text-gold-400 font-bold mb-2">قبلها كسر (تبدل ياءً)</h5>
                <ul className="text-navy-100 list-disc list-inside space-y-1">
                  <li><span className="font-serif text-white">﴿بِئْسَ﴾</span> تُقرأ: بِيسَ</li>
                  <li><span className="font-serif text-white">﴿شِئْتَ﴾</span> تُقرأ: شِيتَ</li>
                  <li><span className="font-serif text-white">﴿الذِّئْبُ﴾</span> تُقرأ: الذِّيبُ</li>
                </ul>
              </div>
              
              <div className="bg-navy-950 p-4 rounded-xl border border-navy-800">
                <h5 className="text-gold-400 font-bold mb-2">قبلها ضم (تبدل واواً)</h5>
                <ul className="text-navy-100 list-disc list-inside space-y-1">
                  <li><span className="font-serif text-white">﴿يُؤْمِنُ﴾</span> تُقرأ: يُومِنُ</li>
                  <li><span className="font-serif text-white">﴿الْمُؤْتَفِكَةِ﴾</span> تُقرأ: الْمُوتَفِكَةِ</li>
                </ul>
              </div>

              <div className="bg-navy-950 p-4 rounded-xl border border-red-900/50">
                <h5 className="text-red-400 font-bold mb-2 flex items-center gap-1"><AlertCircle className="w-4 h-4"/> المستثنيات (مادة الإيواء)</h5>
                <ul className="text-navy-100 list-disc list-inside space-y-1">
                  <li><span className="font-serif">﴿المأوى﴾</span>، <span className="font-serif">﴿مأواهم﴾</span></li>
                  <li><span className="font-serif">﴿فأووا﴾</span>، <span className="font-serif">﴿تؤوي﴾</span></li>
                  <li className="text-xs text-navy-300 mt-2">تُقرأ بالهمز لورش بلا إبدال.</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-blue-900/10 border border-blue-900/50 rounded-lg">
              <h5 className="text-blue-400 font-bold mb-2 flex items-center gap-2"><Info className="w-4 h-4"/> كيف نعرف أنها فاء الكلمة؟</h5>
              <p className="text-navy-200 text-sm leading-relaxed">
                في علم الصرف تُوزن الكلمة بـ (فَعَلَ)، فإذا قابلت الهمزة حرف (الفاء) في الوزن فهي فاء الكلمة. مثال: يَأْكُل على وزن يَفْعُل، الهمزة تقابل الفاء فهي فاء الكلمة. أما (الرَّأْس) على وزن الفَعْل، فالهمزة تقابل العين فلا تبدل لورش.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  'u4-l2': (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-navy-800/80 p-6 md:p-8 rounded-2xl border border-navy-700 shadow-xl relative overflow-hidden">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
          <BookOpen className="text-gold-500" />
          الهمز المتحرك المبدل
        </h2>
        
        <div className="prose prose-invert max-w-none">
          <div className="bg-navy-900/80 p-6 rounded-xl border-r-4 border-gold-500 mb-8">
            <h3 className="text-gold-400 font-bold mb-2 flex items-center gap-2">
              <Quote className="w-5 h-5" />
              الشاهد من الشاطبية
            </h3>
            <p className="font-serif text-xl leading-loose text-white text-center mb-4">
              وَالْوَاوُ عَنْهُ إِنْ ... تَفَتَّحَ إِثْرَ الضَّمِّ نَحْوَ مُؤَجَّلاَ
            </p>
            <p className="text-navy-200 leading-relaxed text-sm">
              <strong className="text-gold-300">الشرح (الوسيط):</strong> إذا كانت الهمزة فاءً للكلمة، وكانت مفتوحة وما قبلها مضموم، فإن ورشاً يبدلها واواً مفتوحة.
            </p>
          </div>

          <div className="bg-navy-950 p-6 rounded-xl border border-navy-800">
            <h4 className="text-xl font-bold text-white mb-4">أمثلة الهمز المتحرك المبدل</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <ul className="text-navy-100 list-disc list-inside space-y-3">
                <li><span className="font-serif text-gold-300">﴿مُؤَجَّلًا﴾</span> تقرأ: مَوَجَّلًا</li>
                <li><span className="font-serif text-gold-300">﴿مُؤَذِّنٌ﴾</span> تقرأ: مُوَذِّنٌ</li>
                <li><span className="font-serif text-gold-300">﴿الْمُؤَلَّفَةِ﴾</span> تقرأ: الْمُوَ‌لَّفَةِ</li>
              </ul>
              <ul className="text-navy-100 list-disc list-inside space-y-3">
                <li><span className="font-serif text-gold-300">﴿يُؤَخِّرُ﴾</span> تقرأ: يُوَخِّرُ</li>
                <li><span className="font-serif text-gold-300">﴿لَا تُؤَاخِذْنَا﴾</span> تقرأ: لَا تُوَاخِذْنَا</li>
              </ul>
            </div>
            
            <div className="mt-6 p-4 bg-navy-900/50 rounded-lg text-sm text-navy-200 border border-navy-800">
              <strong className="text-gold-400 block mb-1">ملاحظة هامة:</strong> يشترط أن تكون فاء الكلمة. فإذا كانت عين الكلمة مثل <span className="font-serif text-white">﴿فُؤَاد﴾</span> فلا تبدل.
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  'u4-l3': (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-navy-800/80 p-6 md:p-8 rounded-2xl border border-navy-700 shadow-xl relative overflow-hidden">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
          <BookOpen className="text-gold-500" />
          الكلمات المخصوصة بالهمز المفرد
        </h2>
        <div className="prose prose-invert max-w-none">
          <p className="text-navy-100 mb-6">هناك كلمات لا تدخل تحت القاعدة العامة للهمز (ليست فاء الكلمة)، لكن الإمام ورشاً اختصها بالإبدال حفظاً وأداءً.</p>
          
          <div className="grid gap-4">
            <div className="bg-navy-950 p-5 rounded-xl border border-navy-800 flex items-start gap-4">
              <div className="bg-gold-500/20 p-3 rounded-full text-gold-500">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-1">بِئْر / ذِئْب</h4>
                <p className="text-navy-200 text-sm">يبدل ورش همزتهما ياءً مدية (بِير، ذِيب)، وهي عين الكلمة وليست فاءها. (الشاهد: وبئر في طيئ...)</p>
              </div>
            </div>

            <div className="bg-navy-950 p-5 rounded-xl border border-navy-800 flex items-start gap-4">
              <div className="bg-gold-500/20 p-3 rounded-full text-gold-500">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-1">بِئْسَ (وما اشتق منها)</h4>
                <p className="text-navy-200 text-sm">يبدلها ورش ياءً (بِيسَ). (الشاهد: وفي بئس ورش...)</p>
              </div>
            </div>

            <div className="bg-navy-950 p-5 rounded-xl border border-navy-800 flex items-start gap-4">
              <div className="bg-gold-500/20 p-3 rounded-full text-gold-500">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-1">النَّسِيءُ</h4>
                <p className="text-navy-200 text-sm">في سورة التوبة، يبدل الهمزة ياءً ويدغمها في الياء قبلها فتصير ياءً مشددة (النَّسِيُّ).</p>
              </div>
            </div>
            
            <div className="bg-navy-950 p-5 rounded-xl border border-navy-800 flex items-start gap-4">
              <div className="bg-gold-500/20 p-3 rounded-full text-gold-500">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-1">كلمات أخرى</h4>
                <p className="text-navy-200 text-sm">مثل (رِئْياً) بسورة مريم تدغم ياءين (رِيّاً). ومثل (ضِيزَى) بسورة النجم تبدل ياء.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};
