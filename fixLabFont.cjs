const fs = require('fs');
let code = fs.readFileSync('src/components/QuranicLab.tsx', 'utf-8');

code = code.replace(
  'className="font-serif text-3xl md:text-5xl text-white leading-[2.5] md:leading-[2.5] mt-10 mb-6 flex flex-wrap justify-center gap-x-3 gap-y-6 dir-rtl"',
  'className="font-quran text-3xl md:text-5xl text-white leading-[2.5] md:leading-[2.5] mt-10 mb-6 flex flex-wrap justify-center gap-x-3 gap-y-6 dir-rtl"'
);

fs.writeFileSync('src/components/QuranicLab.tsx', code);
