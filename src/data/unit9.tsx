import React from 'react';
import { BookOpen, Quote, AlertTriangle } from 'lucide-react';

export const unit9Content: Record<string, React.ReactNode> = {
  'u9-l1': (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-navy-800/80 p-6 md:p-8 rounded-2xl border border-navy-700 shadow-xl relative overflow-hidden">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
          <BookOpen className="text-gold-500" />
          شروط ترقيق الراء
        </h2>
        
        <div className="prose prose-invert max-w-none">
          <div className="bg-navy-900/80 p-6 rounded-xl border-r-4 border-gold-500 mb-8">
            <h3 className="text-gold-400 font-bold mb-2 flex items-center gap-2">
              <Quote className="w-5 h-5" />
              الشاهد من الشاطبية (بشرح الوسيط)
            </h3>
            <p className="font-serif text-xl leading-loose text-white text-center mb-4">
              وَرَقَّقَ وَرْشٌ كُلَّ رَاءٍ وَقَبْلَهَا ... مُسَكَّنَةً يَاءٌ أَوِ الْكَسْرُ مُوصَلاَ<br/>
              وَلَمْ يَرَ فَصْلاً سَاكِناً بَعْدَ كَسْرَةٍ ... سِوَى حَرْفِ الاِسْتِعْلاَ سِوَى الْخَا فَكَمَّلاَ
            </p>
            <p className="text-navy-200 leading-relaxed text-sm">
              <strong className="text-gold-300">شرح ما بين السطور:</strong> الراء في الأصل مفخمة إذا كانت مفتوحة أو مضمومة. ولكن ورشاً يرققها بشروط محددة ذكرها الإمام الشاطبي، ووضحها د. صبري سلامة في الوسيط، وهي تدور حول تأثير الكسرة أو الياء على الراء.
            </p>
          </div>

          <div className="bg-navy-950 p-6 rounded-xl border border-navy-800 mb-6">
            <h4 className="text-xl font-bold text-white mb-4 border-b border-navy-700 pb-2">شروط الترقيق</h4>
            <p className="text-navy-100 mb-4">ترقق الراء المفتوحة أو المضمومة لورش إذا توفر فيها أحد الأسباب التالية:</p>
            
            <ul className="space-y-4">
              <li className="bg-navy-900/50 p-4 rounded-lg">
                <strong className="text-gold-400 text-lg block mb-2">1. أن يسبقها كسر أصلي متصل بها</strong>
                <p className="text-navy-200 mb-2">يجب أن تكون الكسرة في نفس الكلمة وأصلية.</p>
                <div className="font-serif text-white text-lg">أمثلة: ﴿سِرَاجاً﴾ ، ﴿الآخِرَة﴾ ، ﴿فِرَاشاً﴾</div>
              </li>
              
              <li className="bg-navy-900/50 p-4 rounded-lg">
                <strong className="text-gold-400 text-lg block mb-2">2. أن يسبقها ياء ساكنة</strong>
                <p className="text-navy-200 mb-2">سواء كانت الياء للين أو للمد.</p>
                <div className="font-serif text-white text-lg">أمثلة: ﴿خَيْر﴾ ، ﴿بَصِير﴾ ، ﴿الطَّيْر﴾</div>
              </li>

              <li className="bg-navy-900/50 p-4 rounded-lg">
                <strong className="text-gold-400 text-lg block mb-2">3. أن يفصل بينها وبين الكسر الساكن غير حرف استعلاء</strong>
                <p className="text-navy-200 mb-2">يجوز الفصل بحرف ساكن مستفل (مرقق)، ويُستثنى من حروف الاستعلاء حرف (الخاء) فإنه لا يمنع الترقيق.</p>
                <div className="font-serif text-white text-lg">أمثلة: ﴿إِكْرَاه﴾ ، ﴿إِخْرَاج﴾ (الخاء مستعلية ولكنها مستثناة).</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  ),
  'u9-l2': (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-navy-800/80 p-6 md:p-8 rounded-2xl border border-navy-700 shadow-xl relative overflow-hidden">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
          <BookOpen className="text-gold-500" />
          ما يفخم من الراءات استثناءً
        </h2>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-navy-100 text-lg mb-6">
            هناك راءات توافرت فيها شروط الترقيق، لكن الإمام ورشاً استثناها ففخمها.
          </p>

          <div className="grid gap-4">
            <div className="bg-navy-950 p-5 rounded-xl border border-red-900/30">
              <h4 className="text-gold-400 font-bold mb-2">1. الأسماء الأعجمية</h4>
              <p className="text-navy-200 mb-2">مثل: <span className="font-serif text-white">﴿إِبْرَاهِيم﴾، ﴿إِسْرَائِيل﴾، ﴿عِمْرَان﴾</span></p>
              <p className="text-sm text-navy-300">السبب: لأن العجمة تمنع الترقيق كما تمنع الصرف.</p>
            </div>

            <div className="bg-navy-950 p-5 rounded-xl border border-red-900/30">
              <h4 className="text-gold-400 font-bold mb-2">2. الراء المكررة (التي بعدها راء)</h4>
              <p className="text-navy-200 mb-2">مثل: <span className="font-serif text-white">﴿ضِرَاراً﴾، ﴿فِرَاراً﴾، ﴿إِسْرَاراً﴾</span></p>
              <p className="text-sm text-navy-300">السبب: لثقل تكرار الراء، ففخمت لتناسب أختها.</p>
            </div>

            <div className="bg-navy-950 p-5 rounded-xl border border-red-900/30">
              <h4 className="text-gold-400 font-bold mb-2">3. وزن (فِعْلاً) المستثنى</h4>
              <p className="text-navy-200 mb-2">ذكرت الشاطبية كلمات مخصوصة: <span className="font-serif text-white">﴿إِرَماً﴾</span> وكلمات وزن (فِعلاً) وهي: <span className="font-serif text-white">﴿سِتْراً﴾، ﴿وِزْراً﴾، ﴿إِصْراً﴾، ﴿ذِكْراً﴾، ﴿صِهْراً﴾، ﴿حِجْراً﴾</span></p>
              <p className="text-sm text-navy-300">كلها مفخمة قولاً واحداً (وفي ذكرى الوجهان لأنها ذات ياء).</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};
