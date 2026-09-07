import React from 'react';

export const qalunUnit2Content: Record<string, React.ReactNode> = {
  "u2-l1": (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white border-b-2 border-gold-500 pb-2 inline-block">الكلمات المخصوصة في هاء الكناية</h2>
      <p className="text-navy-100 text-lg leading-relaxed">
        هاء الكناية هي الهاء الزائدة الدالة على المفرد المذكر الغائب. يقرأ قالون كلمات مخصوصة في القرآن بخلاف أصل القاعدة (إما بالإسكان أو بالاختلاس).
      </p>
      
      <div className="space-y-4">
        <div className="bg-navy-800/50 p-5 rounded-lg border border-navy-700">
          <h3 className="font-bold text-gold-400 mb-3">أولاً: الكلمات التي يقرؤها بالإسكان:</h3>
          <ul className="list-disc list-inside text-navy-100 space-y-2">
            <li>(يُؤَدِّهْ) موضعي آل عمران.</li>
            <li>(نُوَلِّهْ - وَنُصْلِهْ) في النساء.</li>
            <li>(نُؤْتِهْ) في آل عمران والشورى.</li>
            <li>(فَأَلْقِهْ) في النمل.</li>
          </ul>
        </div>

        <div className="bg-navy-800/50 p-5 rounded-lg border border-navy-700">
          <h3 className="font-bold text-gold-400 mb-3">ثانياً: الكلمات التي يقرؤها بالاختلاس (دون إشباع):</h3>
          <ul className="list-disc list-inside text-navy-100 space-y-2">
            <li>(يَتَّقِهِ) في النور: بكسر القاف واختلاس كسر الهاء (يَتَّقِهِ).</li>
            <li>(يَرْضَهُ) في الزمر: بضم الهاء واختلاس الضمة (يَرْضَهُ).</li>
            <li>(يَأْتِهِ) في طه: باختلاس كسر الهاء (يَأْتِهِ)، وله وجه ثان وهو الإشباع (الصلة).</li>
          </ul>
        </div>

        <div className="bg-navy-800/50 p-5 rounded-lg border border-navy-700">
          <h3 className="font-bold text-gold-400 mb-3">ثالثاً: كلمة (يُرْجِئْهُ):</h3>
          <p className="text-navy-100">يقرأ قالون كلمة (أَرْجِهْ) في الأعراف والشعراء بزيادة همزة ساكنة وضم الهاء مع صلتها: (أَرْجِئْهُو).</p>
        </div>
      </div>
    </div>
  ),
  "u2-l2": (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white border-b-2 border-gold-500 pb-2 inline-block">المد المتصل والمنفصل</h2>
      
      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-navy-800/50 p-6 rounded-lg border border-navy-700">
          <h3 className="font-bold text-xl text-gold-400 mb-3">المد المتصل</h3>
          <p className="text-navy-200 text-sm mb-2">هو أن يقع بعد حرف المد همزة في كلمة واحدة، مثل (السَّمَاءِ).</p>
          <p className="text-white font-bold bg-navy-900 px-4 py-2 rounded">يقرأ قالون بتوسط المتصل (أربع حركات) كحفص.</p>
        </div>
        
        <div className="bg-navy-800/50 p-6 rounded-lg border border-navy-700">
          <h3 className="font-bold text-xl text-gold-400 mb-3">المد المنفصل</h3>
          <p className="text-navy-200 text-sm mb-2">هو أن يقع حرف المد في آخر الكلمة الأولى والهمزة في أول الكلمة الثانية، مثل (بِمَا أُنزِلَ).</p>
          <div className="text-white font-bold bg-navy-900 px-4 py-2 rounded space-y-2">
            <p>لقالون فيه وجهان:</p>
            <ol className="list-decimal list-inside text-sm text-navy-300 font-normal ml-2">
              <li>القصر (حركتان) - وهو المقدم.</li>
              <li>التوسط (أربع حركات).</li>
            </ol>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-l from-navy-900 to-navy-800 p-6 rounded-lg border border-gold-500/30">
        <h3 className="font-bold text-xl text-white mb-4 flex items-center gap-2">
          <span className="text-gold-400">💡</span> اجتماع المنفصل مع ميم الجمع
        </h3>
        <p className="text-navy-100 mb-4">فإذا اجتمع المد المنفصل مع ميم الجمع، يتولد لقالون <strong className="text-gold-300">أربعة أوجه</strong>:</p>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-navy-950 p-3 rounded text-center text-sm text-navy-200 border border-navy-700">1. قصر المنفصل + إسكان الميم</div>
          <div className="bg-navy-950 p-3 rounded text-center text-sm text-navy-200 border border-navy-700">2. قصر المنفصل + صلة الميم</div>
          <div className="bg-navy-950 p-3 rounded text-center text-sm text-navy-200 border border-navy-700">3. توسط المنفصل + إسكان الميم</div>
          <div className="bg-navy-950 p-3 rounded text-center text-sm text-navy-200 border border-navy-700">4. توسط المنفصل + صلة الميم</div>
        </div>
      </div>
    </div>
  )
};
