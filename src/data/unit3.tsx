import React from 'react';
import { BookOpen, Quote, Info, CheckCircle2 } from 'lucide-react';

export const unit3Content: Record<string, React.ReactNode> = {
  'u3-l1': (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-navy-800/80 p-6 md:p-8 rounded-2xl border border-navy-700 shadow-xl relative overflow-hidden">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
          <BookOpen className="text-gold-500" />
          الهمزتان المتفقتان في الحركة
        </h2>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-navy-100 text-lg leading-relaxed mb-6">
            الهمزتان من كلمتين هما همزتا قطع متلاصقتان، تقع الأولى في آخر الكلمة الأولى، وتقع الثانية في أول الكلمة التي تليها. وينقسم هذا الباب إلى المتفقتين في الحركة والمختلفتين فيها.
          </p>

          <div className="bg-navy-900/80 p-6 rounded-xl border-r-4 border-gold-500 mb-8">
            <h3 className="text-gold-400 font-bold mb-2 flex items-center gap-2">
              <Quote className="w-5 h-5" />
              من الشاطبية (بشرح الدكتور صبري سلامة في الوسيط)
            </h3>
            <p className="font-serif text-xl leading-loose text-white text-center mb-4">
              وَأَسْقَطَ الاُولَى فِي اتِّفَاقِهِمَا مَعًا ... إِذَا كَانَتَا مِنْ كِلْمَتَيْنِ فَتَى الْعُلاَ<br/>
              ... وَالاُخْرَى كَمَدٍّ عِنْدَ وَرْشٍ وَقُنْبُلٍ ... وَقَدْ قِيلَ مَحْضُ الْمَدِّ عَنْهَا تَبَدَّلاَ
            </p>
            <p className="text-navy-200 leading-relaxed text-sm">
              <strong className="text-gold-300">شرح ما بين السطور:</strong> يوضح الدكتور صبري سلامة أن الإمام ورشاً يتعامل مع الهمزة <strong className="text-white">الثانية</strong> (وليست الأولى كأبي عمرو) بالتغيير إذا اتفقت الهمزتان في الحركة (مفتوحتان، مكسورتان، مضمومتان).
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-navy-950 p-6 rounded-xl border border-navy-800">
              <h4 className="text-lg font-bold text-white mb-4">أوجه ورش في الهمزتين المتفقتين</h4>
              <p className="text-navy-100 mb-4">لورش في الهمزة الثانية من المتفقتين وجهان، والمقدم هو الإبدال:</p>
              
              <ol className="list-decimal list-inside space-y-4 text-navy-200">
                <li className="bg-navy-900/50 p-4 rounded-lg">
                  <strong className="text-gold-300 text-lg">1. الإبدال (وهو المقدم أداءً):</strong>
                  <br/>
                  يبدل الهمزة الثانية حرف مد مجانس لحركة الهمزة الأولى.
                  <ul className="list-disc list-inside mt-2 text-sm space-y-1">
                    <li><strong className="text-white">المفتوحتان:</strong> (جاءَ أَمرنا) تبدل ألفاً. وإذا كان بعدها ساكن تمد 6 حركات (جاءَ اْمرنا).</li>
                    <li><strong className="text-white">المكسورتان:</strong> (هؤُلاءِ إِن) تبدل ياءً.</li>
                    <li><strong className="text-white">المضمومتان:</strong> (أولياءُ أُولئك) تبدل واواً.</li>
                  </ul>
                  <div className="mt-3 p-3 bg-blue-900/20 text-blue-300 border border-blue-900/50 rounded flex gap-2 text-sm items-start">
                    <Info className="w-5 h-5 flex-shrink-0" />
                    <span>ملاحظة من الوسيط: الإبدال هو محض المد، ويراعى في مقدار المد حركة الحرف الذي بعد المبدل (إن كان ساكناً مد إشباعاً، وإن كان متحركاً مد قصراً).</span>
                  </div>
                </li>
                
                <li className="bg-navy-900/50 p-4 rounded-lg">
                  <strong className="text-gold-300 text-lg">2. التسهيل:</strong>
                  <br/>
                  تسهيل الهمزة الثانية بين الهمزة وحرف المد المجانس لحركتها (بين الهمزة والألف، أو الياء، أو الواو).
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  'u3-l2': (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-navy-800/80 p-6 md:p-8 rounded-2xl border border-navy-700 shadow-xl relative overflow-hidden">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
          <BookOpen className="text-gold-500" />
          الهمزتان المختلفتان في الحركة
        </h2>
        
        <div className="prose prose-invert max-w-none">
          <div className="bg-navy-900/80 p-6 rounded-xl border-r-4 border-gold-500 mb-8">
            <h3 className="text-gold-400 font-bold mb-2 flex items-center gap-2">
              <Quote className="w-5 h-5" />
              الشاهد من الشاطبية (مع شرح الوسيط)
            </h3>
            <p className="font-serif text-xl leading-loose text-white text-center mb-4">
              وَتَسْهِيلُ الاُخْرَى فِي اخْتِلاَفِهِما سَمَا ... تَفِيءَ إِلَى مَعْ جَاءَ أُمَّةً انْزِلاَ<br/>
              نَشَاءُ أَصَبْنَا وَالسَّمَاءِ أَوِ ائْتِنَا ... فَنَوْعَانِ قُلْ كَالْيَا وَكَالْوَاوِ سُهِّلاَ<br/>
              وَنَوْعَانِ مِنْهَا أُبْدِلاَ مِنْهُمَا وَقُلْ ... يَشَاءُ إِلَى كَالْيَاءِ أَقْيَسُ مَعْدِلاَ
            </p>
            <p className="text-navy-200 leading-relaxed text-sm">
              <strong className="text-gold-300">شرح ما بين السطور:</strong> يوضح د. صبري سلامة في "الوسيط" أن أهل سما (ومنهم نافع/ورش) يغيرون الهمزة <strong className="text-white">الثانية</strong> في الهمزتين المختلفتين. والقاعدة تعتمد على مبدأ "الفتح أضعف الحركات"، فإذا تقدم الفتح سُهلت الثانية، وإذا تأخر الفتح أُبدلت، وإذا اجتمع الكسر والضم ففيها وجهان.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="bg-navy-950 p-5 rounded-xl border border-navy-800">
              <h4 className="text-gold-400 font-bold mb-3 border-b border-navy-800 pb-2">النوع الأول: الأولى مفتوحة والثانية مكسورة/مضمومة</h4>
              <p className="text-navy-200 mb-3"><strong className="text-white">الحكم:</strong> التسهيل فقط.</p>
              <ul className="text-sm text-navy-300 space-y-2 list-disc list-inside">
                <li><span className="font-serif text-white">﴿تَفِيءَ إِلَى﴾</span> تسهل الثانية بين الهمزة والياء.</li>
                <li><span className="font-serif text-white">﴿جَاءَ أُمَّةً﴾</span> تسهل الثانية بين الهمزة والواو.</li>
              </ul>
            </div>

            <div className="bg-navy-950 p-5 rounded-xl border border-navy-800">
              <h4 className="text-gold-400 font-bold mb-3 border-b border-navy-800 pb-2">النوع الثاني: الأولى مكسورة/مضمومة والثانية مفتوحة</h4>
              <p className="text-navy-200 mb-3"><strong className="text-white">الحكم:</strong> الإبدال فقط.</p>
              <ul className="text-sm text-navy-300 space-y-2 list-disc list-inside">
                <li><span className="font-serif text-white">﴿نَشَاءُ أَصَبْنَا﴾</span> تبدل واواً خالصة مفتوحة (نشاءُ وَصبنا).</li>
                <li><span className="font-serif text-white">﴿السَّمَاءِ أَوِ﴾</span> تبدل ياءً خالصة مفتوحة (السماءِ يَو).</li>
              </ul>
            </div>

            <div className="bg-navy-950 p-5 rounded-xl border border-navy-800 md:col-span-2">
              <h4 className="text-gold-400 font-bold mb-3 border-b border-navy-800 pb-2">النوع الثالث: الأولى مضمومة والثانية مكسورة</h4>
              <p className="text-navy-200 mb-3"><strong className="text-white">الحكم:</strong> الوجهان (التسهيل والإبدال واواً).</p>
              <ul className="text-sm text-navy-300 space-y-2 list-disc list-inside">
                <li><span className="font-serif text-white">﴿يَشَاءُ إِلَى﴾</span> فيها التسهيل بين الهمزة والياء، والإبدال واواً مكسورة (يَشَاءُ وِلى). وقال الشاطبي: (كالياء أقيس معدلا) أي أن الإبدال واواً أقيس كما أشار شراح كصبري سلامة.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};
