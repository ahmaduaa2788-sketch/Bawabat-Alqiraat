import React from 'react';
import { BookOpen, Quote, Info, CheckCircle2 } from 'lucide-react';

export const unit8Content: Record<string, React.ReactNode> = {
  'u8-l1': (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-navy-800/80 p-6 md:p-8 rounded-2xl border border-navy-700 shadow-xl relative overflow-hidden">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
          <BookOpen className="text-gold-500" />
          ذوات الياء
        </h2>
        
        <div className="prose prose-invert max-w-none">
          <div className="bg-navy-900/80 p-6 rounded-xl border-r-4 border-gold-500 mb-8">
            <h3 className="text-gold-400 font-bold mb-2 flex items-center gap-2">
              <Quote className="w-5 h-5" />
              الشاهد من الشاطبية (بشرح الوسيط)
            </h3>
            <p className="font-serif text-xl leading-loose text-white text-center mb-4">
              وَذُو الرَّاءِ وَرْشٌ بَيْنَ بَيْنَ وَفِي أَرَا ... كَهُمْ وَذَوَاتِ الْيَا لَهُ الْخُلْفُ جُمِّلاَ
            </p>
            <p className="text-navy-200 leading-relaxed text-sm">
              <strong className="text-gold-300">شرح ما بين السطور:</strong> التقليل (أو الإمالة الصغرى، أو بين بين) هو النطق بالألف بين الفتح والإمالة الكبرى. يذكر الإمام الشاطبي أن ورشاً يقلل ذوات الراء قولاً واحداً، أما "ذوات الياء" ففيها الخُلف (الوجهان: الفتح والتقليل).
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-navy-950 p-6 rounded-xl border border-navy-800">
              <h4 className="text-lg font-bold text-white mb-4">ما هي ذوات الياء؟</h4>
              <p className="text-navy-100 mb-4">هي كل ألف متطرفة أصلية منقلبة عن ياء، أو رُسمت في المصحف ياءً (غير ذوات الراء). مثل:</p>
              <ul className="text-gold-400 font-serif text-xl space-y-2 list-disc list-inside mb-4">
                <li>الْهُدَى</li>
                <li>مُوسَى</li>
                <li>يَحْيَى</li>
                <li>سَعَى</li>
              </ul>
              <div className="p-4 bg-navy-900 border border-navy-800 rounded-lg">
                <p className="text-white font-bold mb-2">كيف نعرف أصل الألف؟</p>
                <ul className="text-sm text-navy-200 space-y-2 list-disc list-inside">
                  <li>في الأسماء: بالتثنية (فتى &larr; فتيان) إذن هي منقلبة عن ياء.</li>
                  <li>في الأفعال: بإسناد الفعل لنفسك (سعى &larr; سعيتُ) إذن هي منقلبة عن ياء.</li>
                </ul>
              </div>
            </div>

            <div className="bg-navy-950 p-6 rounded-xl border border-navy-800">
              <h4 className="text-lg font-bold text-gold-400 mb-2">أوجه ورش في ذوات الياء (غير الراء)</h4>
              <p className="text-navy-100 mb-4">لورش فيها وجهان: <strong className="text-white">الفتح</strong> و<strong className="text-white">التقليل</strong>.</p>
              
              <div className="p-4 bg-blue-900/10 border border-blue-900/50 rounded-lg text-sm text-blue-200">
                <Info className="w-5 h-5 mb-2 inline-block" /> 
                <strong>ارتباطها بمد البدل:</strong>
                <p className="mt-1">كما علمنا من باب المد، هناك ارتباط بين البدل وذوات الياء عند ورش:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>إذا قصرت البدل (2) &larr; لك في ذات الياء (الفتح).</li>
                  <li>إذا توسطت البدل (4) &larr; لك في ذات الياء (التقليل).</li>
                  <li>إذا أشبعت البدل (6) &larr; لك في ذات الياء (الفتح والتقليل).</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  'u8-l2': (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-navy-800/80 p-6 md:p-8 rounded-2xl border border-navy-700 shadow-xl relative overflow-hidden">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
          <BookOpen className="text-gold-500" />
          ذوات الراء
        </h2>
        
        <div className="prose prose-invert max-w-none">
          <div className="bg-navy-900/80 p-6 rounded-xl border-r-4 border-gold-500 mb-8">
            <h3 className="text-gold-400 font-bold mb-2 flex items-center gap-2">
              <Quote className="w-5 h-5" />
              الشاهد من الشاطبية (بشرح الوسيط)
            </h3>
            <p className="font-serif text-xl leading-loose text-white text-center mb-4">
              وَذُو الرَّاءِ وَرْشٌ بَيْنَ بَيْنَ...
            </p>
            <p className="text-navy-200 leading-relaxed text-sm">
              <strong className="text-gold-300">شرح ما بين السطور:</strong> ذوات الراء هي كل ألف متطرفة منقلبة عن ياء وسبقها حرف الراء. حكمها عند ورش: التقليل قولاً واحداً (وجهاً واحداً).
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-navy-950 p-6 rounded-xl border border-navy-800">
              <h4 className="text-lg font-bold text-white mb-4">أمثلة لذوات الراء</h4>
              <ul className="text-gold-400 font-serif text-xl space-y-4">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-500"/> ﴿ النَّصَارَى ﴾</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-500"/> ﴿ أَسْكَارَى ﴾</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-500"/> ﴿ اشْتَرَى ﴾</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-500"/> ﴿ تَرَى ﴾</li>
              </ul>
            </div>

            <div className="bg-navy-900/50 p-6 rounded-xl border border-navy-800">
              <h4 className="text-lg font-bold text-gold-400 mb-3">حكمها</h4>
              <p className="text-navy-100 text-lg">
                <strong className="text-white block mb-2">التقليل قولاً واحداً</strong>
                بخلاف ذوات الياء (غير الراء) التي فيها الوجهان. ذوات الراء ليس لورش فيها إلا التقليل فقط، سواء قرأت بقصر البدل أو توسطه أو مده.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  'u8-l3': (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-navy-800/80 p-6 md:p-8 rounded-2xl border border-navy-700 shadow-xl relative overflow-hidden">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
          <BookOpen className="text-gold-500" />
          رؤوس الآي ومستثنيات الباب
        </h2>
        
        <div className="prose prose-invert max-w-none">
          <div className="bg-navy-950 p-6 rounded-xl border border-navy-800 mb-6">
            <h3 className="text-gold-400 font-bold mb-4">رؤوس الآي في السور الإحدى عشرة</h3>
            <p className="text-navy-100 mb-4">
              رؤوس الآي هي الكلمات التي تنتهي بها الآيات. لورش في رؤوس الآي لـ 11 سورة حكم خاص وهو <strong className="text-white">التقليل قولاً واحداً</strong> (إذا لم تكن منتهية بهاء التأنيث).
            </p>
            <p className="text-sm text-navy-300 mb-2">والسور هي:</p>
            <p className="text-gold-300 font-serif leading-loose">
              (طه، النجم، المعارج، القيامة، النازعات، عبس، الأعلى، الشمس، الليل، الضحى، العلق).
            </p>
            <div className="mt-4 p-3 bg-navy-900 rounded border border-navy-800 text-sm text-navy-200">
              <strong>مثال:</strong> <span className="font-serif">﴿ وَالضُّحَى ۝ وَاللَّيْلِ إِذَا سَجَى ﴾</span> تقلل قولاً واحداً.
              <br/>
              <strong>استثناء:</strong> إذا اتصلت بها (ها) التأنيث مثل <span className="font-serif">﴿ وَالشَّمْسِ وَضُحَاهَا ﴾</span> فتعود للقاعدة الأصلية (ذوات الياء) وفيها الوجهان (الفتح والتقليل).
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};
