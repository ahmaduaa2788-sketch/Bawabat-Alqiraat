import React from 'react';

export const qalunUnit1Content: Record<string, React.ReactNode> = {
  "u1-l1": (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white border-b-2 border-gold-500 pb-2 inline-block">البسملة بين السورتين</h2>
      <p className="text-navy-100 text-lg leading-relaxed">
        مذهب الإمام قالون في البسملة بين السورتين هو <strong className="text-gold-300">إثبات البسملة قولاً واحداً</strong> (أي الفصل بالبسملة بين كل سورتين متتاليتين)، وذلك كحفص تماماً.
      </p>
      <div className="bg-navy-800/50 p-6 rounded-lg border border-navy-700">
        <h3 className="font-bold text-xl text-white mb-4">بين الأنفال والتوبة</h3>
        <p className="text-navy-200 mb-4">يستثنى من ذلك ما بين سورتي الأنفال والتوبة، فله فيها الأوجه الثلاثة الجائزة لكل القراء:</p>
        <ul className="space-y-3 text-navy-100 list-decimal list-inside">
          <li><strong>الوقف:</strong> الوقف على آخر الأنفال، والتنفس، ثم الابتداء بأول التوبة.</li>
          <li><strong>السكت:</strong> السكت على آخر الأنفال سكتة لطيفة بلا تنفس، ثم الابتداء بأول التوبة.</li>
          <li><strong>الوصل:</strong> وصل آخر الأنفال بأول التوبة.</li>
        </ul>
      </div>
      <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
        <p className="text-red-300 font-bold">ملاحظة هامة: لا يجوز وصل آخر السورة بالبسملة والوقف عليها، ثم الابتداء بأول السورة التالية، فهذا الوجه ممتنع لجميع القراء.</p>
      </div>
    </div>
  ),
  "u1-l2": (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white border-b-2 border-gold-500 pb-2 inline-block">أحكام ميم الجمع</h2>
      <p className="text-navy-100 text-lg leading-relaxed">
        ميم الجمع هي الميم الزائدة الدالة على جمع المذكرين، مثل: (عَلَيْكُمْ)، (أَنْتُمْ).
      </p>
      <div className="bg-navy-800/50 p-6 rounded-lg border border-navy-700">
        <h3 className="font-bold text-xl text-gold-400 mb-4">مذهبه فيها وجهان:</h3>
        <ul className="space-y-4 text-navy-100">
          <li className="flex gap-4 p-4 bg-navy-900/50 rounded-lg">
            <span className="text-gold-500 font-bold text-xl">1</span>
            <div>
              <h4 className="font-bold text-white mb-1">الإسكان</h4>
              <p className="text-sm text-navy-300">وهو كقراءة حفص، تقرأ ساكنة (عَلَيْكُمْ أَنفُسَكُمْ).</p>
            </div>
          </li>
          <li className="flex gap-4 p-4 bg-navy-900/50 rounded-lg">
            <span className="text-gold-500 font-bold text-xl">2</span>
            <div>
              <h4 className="font-bold text-white mb-1">الصلة</h4>
              <p className="text-sm text-navy-300">وهو ضم الميم ووصلها بواو لفظية تُمَدُّ بمقدار حركتين (عَلَيْكُمُو أَنفُسَكُمُو).</p>
            </div>
          </li>
        </ul>
      </div>
      <div className="bg-blue-900/30 p-6 rounded-lg border border-blue-500/30">
        <h3 className="font-bold text-xl text-blue-300 mb-2">إذا وقع بعدها همزة قطع</h3>
        <p className="text-navy-100 leading-relaxed mb-3">تمد واو الصلة من باب المد المنفصل:</p>
        <ul className="list-disc list-inside text-navy-200 text-sm space-y-2">
          <li>فإذا قرأنا بقصر المنفصل، نمد الصلة حركتين (عَلَيْكُمُو أَنفُسَكُمُو).</li>
          <li>وإذا قرأنا بتوسط المنفصل، نمد الصلة أربع حركات (عَلَيْكُمُوو أَنفُسَكُمُو).</li>
        </ul>
      </div>
      <div className="bg-gold-500/10 p-4 rounded-lg border border-gold-500/30 text-gold-300 text-sm">
        <strong>تنبيه:</strong> إذا وقع بعد ميم الجمع حرف ساكن (مثل: عَلَيْكُمُ الصِّيَامُ)، فإنه يضم الميم تخلصاً من التقاء الساكنين، ولا يقرأ بالصلة هنا.
      </div>
    </div>
  )
};
