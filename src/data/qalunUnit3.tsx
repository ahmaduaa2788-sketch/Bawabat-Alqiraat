import React from 'react';

export const qalunUnit3Content: Record<string, React.ReactNode> = {
  "u3-l1": (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white border-b-2 border-gold-500 pb-2 inline-block">الهمزتان من كلمة (مع الإدخال)</h2>
      <p className="text-navy-100 text-lg leading-relaxed">
        إذا التقت همزتا قطع في كلمة واحدة، فإن قالون يقرأ <strong className="text-gold-300">بتسهيل الهمزة الثانية</strong> مع <strong className="text-gold-300">إدخال ألف الفصل</strong> بينهما (بمقدار حركتين).
      </p>
      
      <div className="space-y-4">
        <div className="bg-navy-800/50 p-5 rounded-lg border border-navy-700 flex flex-col md:flex-row gap-4 items-center">
          <div className="text-3xl font-serif text-gold-500 bg-navy-900 px-4 py-2 rounded-lg">أَأَ</div>
          <div>
            <h4 className="font-bold text-white">المفتوحتان (أَأَنذَرْتَهُمْ)</h4>
            <p className="text-navy-300 text-sm">بتحقيق الأولى وتسهيل الثانية بين الهمزة والألف، مع الإدخال (ءَاـأَنذَرْتَهُمْ).</p>
          </div>
        </div>
        
        <div className="bg-navy-800/50 p-5 rounded-lg border border-navy-700 flex flex-col md:flex-row gap-4 items-center">
          <div className="text-3xl font-serif text-gold-500 bg-navy-900 px-4 py-2 rounded-lg">أَإِ</div>
          <div>
            <h4 className="font-bold text-white">المفتوحة فمكسورة (أَءِنَّكُمْ)</h4>
            <p className="text-navy-300 text-sm">بتحقيق الأولى وتسهيل الثانية بين الهمزة والياء، مع الإدخال (ءَاـإِنَّكُمْ).</p>
          </div>
        </div>

        <div className="bg-navy-800/50 p-5 rounded-lg border border-navy-700 flex flex-col md:flex-row gap-4 items-center">
          <div className="text-3xl font-serif text-gold-500 bg-navy-900 px-4 py-2 rounded-lg">أَأُ</div>
          <div>
            <h4 className="font-bold text-white">المفتوحة فمضمومة (أَؤُنَبِّئُكُم)</h4>
            <p className="text-navy-300 text-sm">بتحقيق الأولى وتسهيل الثانية بين الهمزة والواو، مع الإدخال (ءَاـؤُنَبِّئُكُم).</p>
          </div>
        </div>
      </div>
      
      <div className="bg-gold-500/10 p-4 rounded-lg border border-gold-500/30 text-gold-300">
        <strong>استثناء:</strong> كلمة (أَئِمَّةً) يقرؤها بتسهيل الثانية دون إدخال.
      </div>
    </div>
  ),
  "u3-l2": (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white border-b-2 border-gold-500 pb-2 inline-block">الهمزتان من كلمتين</h2>
      <p className="text-navy-100 text-lg leading-relaxed">
        همزتا القطع المتلاصقتان وصلاً في كلمتين. لهما حالتان: متفقتان في الحركة، ومختلفتان.
      </p>

      <div className="bg-navy-800/50 p-6 rounded-lg border border-navy-700">
        <h3 className="font-bold text-xl text-gold-400 mb-4">أولاً: المتفقتان في الحركة</h3>
        <ul className="space-y-4 text-navy-100">
          <li className="p-3 bg-navy-900/50 rounded-lg border-r-4 border-r-gold-500">
            <strong>1. المفتوحتان (جَاءَ أَمْرُنَا):</strong> يُسقط الهمزة الأولى بالكلية ويحقق الثانية. (مع جواز القصر والتوسط في المد قبلها).
          </li>
          <li className="p-3 bg-navy-900/50 rounded-lg border-r-4 border-r-gold-500">
            <strong>2. المكسورتان (هَؤُلاَءِ إِن كُنتُمْ):</strong> يُسهّل الهمزة الأولى بينها وبين الياء، ويحقق الثانية.
          </li>
          <li className="p-3 bg-navy-900/50 rounded-lg border-r-4 border-r-gold-500">
            <strong>3. المضمومتان (أَوْلِيَاءُ أُوْلَئِكَ):</strong> يُسهّل الهمزة الأولى بينها وبين الواو، ويحقق الثانية.
          </li>
        </ul>
      </div>

      <div className="bg-navy-800/50 p-6 rounded-lg border border-navy-700">
        <h3 className="font-bold text-xl text-blue-400 mb-4">ثانياً: المختلفتان في الحركة</h3>
        <p className="text-navy-200 text-sm mb-4">القاعدة فيها: تُسَهَّل الهمزة الثانية وفق حركة الأولى:</p>
        <div className="grid md:grid-cols-2 gap-3 text-navy-100 text-sm">
          <div className="p-3 bg-navy-900/50 rounded border border-navy-700">
            <strong>مفتوحة فمكسورة:</strong> تُسهل الثانية بين الهمزة والياء (شُهَدَاءَ إِذْ).
          </div>
          <div className="p-3 bg-navy-900/50 rounded border border-navy-700">
            <strong>مفتوحة فمضمومة:</strong> تُسهل الثانية بين الهمزة والواو (جَاءَ أُمَّةً).
          </div>
          <div className="p-3 bg-navy-900/50 rounded border border-navy-700">
            <strong>مكسورة فمفتوحة:</strong> تُبدل الثانية ياءً خالصة (مِّنَ السَّمَاءِ آيَةً).
          </div>
          <div className="p-3 bg-navy-900/50 rounded border border-navy-700">
            <strong>مضمومة فمفتوحة:</strong> تُبدل الثانية واواً خالصة (يَشَاءُ إِلَى).
          </div>
          <div className="p-3 bg-navy-900/50 rounded border border-navy-700 md:col-span-2">
            <strong>مضمومة فمكسورة (يَشَاءُ إِلَىٰ):</strong> فيها وجهان، التسهيل أو الإبدال واواً مكسورة.
          </div>
        </div>
      </div>
    </div>
  )
};
