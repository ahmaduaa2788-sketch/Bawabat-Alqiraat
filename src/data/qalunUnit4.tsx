import React from 'react';

export const qalunUnit4Content: Record<string, React.ReactNode> = {
  "u4-l1": (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white border-b-2 border-gold-500 pb-2 inline-block">الإدغام في كلمات مخصوصة</h2>
      <p className="text-navy-100 text-lg leading-relaxed">
        الأصل عند قالون هو الإظهار كحفص في كثير من المواضع التي يدغمها غيره، لكن له إدغامات في كلمات مخصوصة، ومن أبرزها:
      </p>
      
      <div className="bg-navy-800/50 p-6 rounded-lg border border-navy-700">
        <ul className="space-y-4 text-navy-100">
          <li className="p-3 bg-navy-900/50 rounded-lg border-r-4 border-r-gold-500">
            <strong>1. (يَلْهَث ذَّلِكَ) في الأعراف:</strong>
            <p className="text-navy-300 mt-2">لقالون فيها الوجهان: <strong>الإدغام</strong> (يَلْهَذَّلِكَ)، و<strong>الإظهار</strong> (يَلْهَثْ ذَّلِكَ).</p>
          </li>
          <li className="p-3 bg-navy-900/50 rounded-lg border-r-4 border-r-gold-500">
            <strong>2. (ارْكَب مَّعَنَا) في هود:</strong>
            <p className="text-navy-300 mt-2">لقالون فيها الوجهان أيضاً: <strong>الإدغام</strong> (ارْكَمَّعَنَا)، و<strong>الإظهار</strong> (ارْكَبْ مَّعَنَا).</p>
          </li>
          <li className="p-3 bg-navy-900/50 rounded-lg border-r-4 border-r-gold-500">
            <strong>3. (يُعَذِّبُ مَن يَشَاءُ) في البقرة:</strong>
            <p className="text-navy-300 mt-2">يقرؤها بالإدغام (يُعَذِّمَّن) لأن الباء عنده ساكنة في هذا الموضع.</p>
          </li>
        </ul>
      </div>
    </div>
  ),
  "u4-l2": (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white border-b-2 border-gold-500 pb-2 inline-block">أحكام النون الساكنة والتنوين</h2>
      <p className="text-navy-100 text-lg leading-relaxed">
        قواعد النون الساكنة والتنوين عند قالون مطابقة لما عند حفص من حيث (الإظهار، الإدغام، القلب، الإخفاء).
      </p>

      <div className="bg-navy-800/50 p-6 rounded-lg border border-navy-700">
        <h3 className="font-bold text-xl text-gold-400 mb-4">استثناءات هامة:</h3>
        <ul className="space-y-4 text-navy-100">
          <li className="p-3 bg-navy-900/50 rounded-lg border-r-4 border-r-gold-500">
            <strong>يس والقرآن، ن والقلم:</strong>
            <p className="text-navy-300 mt-2">يقرأ قالون بـ <strong>الإظهار</strong> (يسنْ وَالْقُرْآنِ)، (نُوْنْ وَالْقَلَمِ) حال الوصل.</p>
          </li>
        </ul>
      </div>
    </div>
  )
};
