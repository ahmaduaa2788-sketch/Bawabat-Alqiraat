import React from 'react';

export const qalunUnit5Content: Record<string, React.ReactNode> = {
  "u5-l1": (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white border-b-2 border-gold-500 pb-2 inline-block">ياءات الإضافة</h2>
      <p className="text-navy-100 text-lg leading-relaxed">
        ياء الإضافة هي الياء الزائدة الدالة على المتكلم. مذهب قالون فيها يعتمد على الحرف الذي يقع بعدها:
      </p>
      
      <div className="grid gap-4 md:grid-cols-2">
        <div className="bg-navy-800/50 p-4 rounded border border-navy-700 shadow-sm border-r-4 border-r-gold-500">
          <h4 className="font-bold text-gold-400 mb-2">1. بعدها همزة قطع مفتوحة:</h4>
          <p className="text-sm text-navy-200">الفتح (إِنِّيَ أَعْلَمُ).</p>
        </div>
        <div className="bg-navy-800/50 p-4 rounded border border-navy-700 shadow-sm border-r-4 border-r-gold-500">
          <h4 className="font-bold text-gold-400 mb-2">2. بعدها همزة قطع مكسورة:</h4>
          <p className="text-sm text-navy-200">الفتح (مِن دُونِيَ آلِهَةً) إلا في كلمات مخصوصة.</p>
        </div>
        <div className="bg-navy-800/50 p-4 rounded border border-navy-700 shadow-sm border-r-4 border-r-gold-500">
          <h4 className="font-bold text-gold-400 mb-2">3. بعدها همزة وصل:</h4>
          <p className="text-sm text-navy-200">الفتح، سواء كانت همزة وصل مفردة أو مع لام التعريف (إِنِّيَ اصْطَفَيْتُكَ).</p>
        </div>
        <div className="bg-navy-800/50 p-4 rounded border border-navy-700 shadow-sm border-r-4 border-r-gold-500">
          <h4 className="font-bold text-gold-400 mb-2">4. بعدها أي حرف آخر:</h4>
          <p className="text-sm text-navy-200">الإسكان كالأصل، إلا في كلمات مثل (وَمَحْيَايَ) يقرؤها بالسكون.</p>
        </div>
      </div>
    </div>
  ),
  "u5-l2": (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white border-b-2 border-gold-500 pb-2 inline-block">الياءات الزوائد</h2>
      <p className="text-navy-100 text-lg leading-relaxed">
        الياء الزائدة هي ياء متطرفة تُحذف في رسم المصحف العثماني تخفيفاً. يثبت قالون بعض هذه الياءات وصلاً.
      </p>

      <div className="bg-navy-800/50 p-6 rounded-lg border border-navy-700">
        <h3 className="font-bold text-xl text-gold-400 mb-4">أمثلة على ما يثبته قالون وصلاً فقط:</h3>
        <ul className="space-y-4 text-navy-100">
          <li className="p-3 bg-navy-900/50 rounded-lg border-r-4 border-r-gold-500">
            <strong>(يَوْمَ يَأْتِ) في هود:</strong>
            <p className="text-navy-300 mt-2">يقرؤها بإثبات الياء وصلاً (يَوْمَ يَأْتِي لا تَكَلَّمُ)، ويحذفها وقفاً.</p>
          </li>
          <li className="p-3 bg-navy-900/50 rounded-lg border-r-4 border-r-gold-500">
            <strong>(دَعْوَةَ الدَّاعِ إِذَا دَعَانِ) في البقرة:</strong>
            <p className="text-navy-300 mt-2">يثبت ياء (الدَّاعِي) و (دَعَانِي) في الوصل، ويحذفهما في الوقف.</p>
          </li>
        </ul>
      </div>
    </div>
  )
};
