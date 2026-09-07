const fs = require('fs');

const u0 = `import React from 'react';

export const qalunUnit0Content: Record<string, React.ReactNode> = {
  "u0-l1": (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white border-b-2 border-gold-500 pb-2 inline-block">ترجمة الإمام نافع وراويه قالون</h2>
      <div className="bg-navy-800/80 p-6 rounded-lg border border-navy-700">
        <h3 className="font-bold text-xl text-gold-400 mb-3">الإمام نافع المدني</h3>
        <p className="text-navy-100 text-lg leading-relaxed">
          هو أبو رويم نافع بن عبد الرحمن بن أبي نعيم الليثي، إمام أهل المدينة في القراءة. أخذ القراءة عن سبعين من التابعين، منهم أبو جعفر يزيد بن القعقاع.
          انتهت إليه رئاسة الإقراء بالمدينة، وكان يقرئ الناس في مسجد رسول الله صلى الله عليه وسلم أكثر من سبعين سنة.
        </p>
      </div>
      <div className="bg-navy-800/80 p-6 rounded-lg border border-navy-700">
        <h3 className="font-bold text-xl text-gold-400 mb-3">الراوي: قالون</h3>
        <p className="text-navy-100 text-lg leading-relaxed mb-4">
          هو أبو موسى عيسى بن مينا بن وردان بن عيسى الزرقي مولى بني زهرة.
        </p>
        <ul className="space-y-3 text-navy-100 text-lg">
          <li><strong className="text-gold-300">لقبه:</strong> لَقَّبه شيخه نافع بـ (قالون) لجودة قراءته، فإن (قالون) باللغة الرومية تعني: جيد.</li>
          <li><strong className="text-gold-300">أخذه للقراءة:</strong> قرأ على نافع سنة خمسين ومائة، وهو ربيب نافع (ابن زوجته)، ولزمه كثيراً حتى قال نافع: "كم تقرأ علي؟ اجلس إلى أسطوانة حتى أرسل إليك من يقرأ عليك".</li>
          <li><strong className="text-gold-300">لطيفة:</strong> كان قالون أصمَّ لا يسمع البوق، فإذا قُرئ عليه القرآن سمعه!</li>
        </ul>
      </div>
    </div>
  ),
  "u0-l2": (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white border-b-2 border-gold-500 pb-2 inline-block">مقدمة في أصول قالون</h2>
      <p className="text-navy-100 text-lg leading-relaxed">
        تتميز قراءة قالون عن نافع بمجموعة من الأصول التي تخالف رواية حفص عن عاصم، وأبرز هذه الأصول التي سندرسها في هذا المسار:
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="bg-navy-800/80 p-4 rounded border border-navy-700 shadow-sm border-r-4 border-r-gold-500">
          <h4 className="font-bold text-gold-400 mb-2">1. البسملة</h4>
          <p className="text-sm text-navy-200">يثبت البسملة بين السورتين قولاً واحداً (إلا بين الأنفال والتوبة).</p>
        </div>
        <div className="bg-navy-800/80 p-4 rounded border border-navy-700 shadow-sm border-r-4 border-r-gold-500">
          <h4 className="font-bold text-gold-400 mb-2">2. ميم الجمع</h4>
          <p className="text-sm text-navy-200">له فيها وجهان: الإسكان (كحفص)، والصلة (ضم الميم ووصلها بواو لفظية).</p>
        </div>
        <div className="bg-navy-800/80 p-4 rounded border border-navy-700 shadow-sm border-r-4 border-r-gold-500">
          <h4 className="font-bold text-gold-400 mb-2">3. المد والقصر</h4>
          <p className="text-sm text-navy-200">يقرأ بقصر المنفصل وتوسطه، وتوسط المتصل.</p>
        </div>
        <div className="bg-navy-800/80 p-4 rounded border border-navy-700 shadow-sm border-r-4 border-r-gold-500">
          <h4 className="font-bold text-gold-400 mb-2">4. هاء الكناية</h4>
          <p className="text-sm text-navy-200">يسكن الهاء أو يختلس حركتها في كلمات مخصوصة (مثل: يؤده، نوله).</p>
        </div>
        <div className="bg-navy-800/80 p-4 rounded border border-navy-700 shadow-sm border-r-4 border-r-gold-500">
          <h4 className="font-bold text-gold-400 mb-2">5. الهمزتان من كلمة</h4>
          <p className="text-sm text-navy-200">يسهل الهمزة الثانية مع إدخال ألف بينهما.</p>
        </div>
        <div className="bg-navy-800/80 p-4 rounded border border-navy-700 shadow-sm border-r-4 border-r-gold-500">
          <h4 className="font-bold text-gold-400 mb-2">6. الهمزتان من كلمتين</h4>
          <p className="text-sm text-navy-200">يُسقط الهمزة الأولى إذا اتفقتا، ويسهلها إذا اختلفتا، حسب تفصيل الباب.</p>
        </div>
      </div>
    </div>
  )
};
`;

const u1 = `import React from 'react';

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
`;

const u2 = `import React from 'react';

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
`;

const u3 = `import React from 'react';

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
`;

const contentMap = `import { qalunUnit0Content } from './qalunUnit0';
import { qalunUnit1Content } from './qalunUnit1';
import { qalunUnit2Content } from './qalunUnit2';
import { qalunUnit3Content } from './qalunUnit3';
import { ReactNode } from 'react';

export const qalunContentMap: Record<string, ReactNode> = {
  ...qalunUnit0Content,
  ...qalunUnit1Content,
  ...qalunUnit2Content,
  ...qalunUnit3Content,
};
`;

fs.writeFileSync('src/data/qalunUnit0.tsx', u0);
fs.writeFileSync('src/data/qalunUnit1.tsx', u1);
fs.writeFileSync('src/data/qalunUnit2.tsx', u2);
fs.writeFileSync('src/data/qalunUnit3.tsx', u3);
fs.writeFileSync('src/data/qalunCourseContent.tsx', contentMap);

// delete the old ts files
try { fs.unlinkSync('src/data/qalunUnit0.ts'); } catch (e) {}
try { fs.unlinkSync('src/data/qalunUnit1.ts'); } catch (e) {}
try { fs.unlinkSync('src/data/qalunUnit2.ts'); } catch (e) {}
try { fs.unlinkSync('src/data/qalunUnit3.ts'); } catch (e) {}
try { fs.unlinkSync('src/data/qalunCourseContent.ts'); } catch (e) {}
