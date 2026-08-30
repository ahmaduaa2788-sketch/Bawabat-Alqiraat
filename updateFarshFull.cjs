const fs = require('fs');

const content = `import React, { useState } from 'react';
import { BookOpen, List, Info, ChevronDown, ChevronUp } from 'lucide-react';

type ChangeType = 'أصول' | 'فرش' | 'أصول وفرش';

interface Change {
  word: string;
  type: ChangeType;
  rule: string;
  warshReading: string;
}

interface AyahDetail {
  ayah: number;
  text: string;
  changes: Change[];
}

const FarshAyahCard = ({ ayah }: { ayah: AyahDetail }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-navy-900/50 border border-navy-800 rounded-xl mb-4 overflow-hidden">
      <div
        className="p-4 flex flex-col sm:flex-row sm:items-center justify-between cursor-pointer hover:bg-navy-800/50 transition gap-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-start sm:items-center gap-4 flex-1 w-full">
          <span className="bg-gold-500/20 text-gold-400 font-bold px-3 py-1 rounded-lg text-sm whitespace-nowrap mt-1 sm:mt-0">
            آية {ayah.ayah}
          </span>
          <p className="font-serif text-lg text-white text-right leading-relaxed flex-1 w-full">
            {ayah.text}
          </p>
        </div>
        <div className="self-end sm:self-auto flex items-center justify-center p-2 rounded-full bg-navy-800">
            {isOpen ? <ChevronUp className="text-gold-400 w-5 h-5" /> : <ChevronDown className="text-gold-400 w-5 h-5" />}
        </div>
      </div>

      {isOpen && (
        <div className="p-4 border-t border-navy-800 bg-navy-950/80 overflow-x-auto">
          <table className="w-full text-right border-collapse min-w-[600px]">
            <thead>
              <tr className="text-navy-300 text-sm border-b border-navy-800">
                <th className="pb-2 px-2 w-1/4">الكلمة</th>
                <th className="pb-2 px-2 w-1/12">النوع</th>
                <th className="pb-2 px-2 w-1/4">الحكم / القاعدة</th>
                <th className="pb-2 px-2">قراءة ورش</th>
              </tr>
            </thead>
            <tbody>
              {ayah.changes.map((change, idx) => (
                <tr key={idx} className="border-b border-navy-800/50 last:border-0 hover:bg-navy-900/30 transition-colors">
                  <td className="py-4 px-2 font-serif text-gold-400 text-lg">{change.word}</td>
                  <td className="py-4 px-2">
                    <span className={\`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap \${change.type === 'فرش' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : change.type === 'أصول' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'}\`}>
                      {change.type}
                    </span>
                  </td>
                  <td className="py-4 px-2 text-navy-200 text-sm">{change.rule}</td>
                  <td className="py-4 px-2 font-serif text-white text-lg leading-relaxed">{change.warshReading}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const SurahSection = ({ title, intro, data }: { title: string, intro: string, data: AyahDetail[] }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-navy-800/80 p-6 md:p-8 rounded-2xl border border-navy-700 shadow-xl relative overflow-hidden">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
          <List className="text-gold-500" />
          {title}
        </h2>
        
        <div className="prose prose-invert max-w-none mb-6">
          <p className="text-navy-100">{intro}</p>
          <div className="bg-blue-900/10 p-5 rounded-xl border border-blue-900/30 flex items-start gap-4 mt-4">
            <Info className="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-200 m-0 leading-relaxed">
              يستعرض هذا القسم أهم <strong>(الفرشيات والأصول)</strong> بالآية لكل سورة لتسهيل الاستخراج والمراجعة.
            </p>
          </div>
        </div>

        {data.length > 0 ? (
          <div className="space-y-3">
            {data.map((ayah, idx) => (
              <FarshAyahCard key={idx} ayah={ayah} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 border border-dashed border-navy-700 rounded-xl bg-navy-900/20">
            <p className="text-navy-300">يتم حالياً رقمنة ومعالجة الآيات لهذه السور وإضافتها للموسوعة قريباً...</p>
          </div>
        )}
      </div>
    </div>
  );
};

// --- DATA ---
const fatihahData: AyahDetail[] = [
  { ayah: 1, text: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", changes: [{ word: "بِسْمِ اللَّهِ...", type: "أصول", rule: "البسملة بين السور", warshReading: "لورش 3 أوجه بين السور (البسملة، السكت، الوصل)، والبسملة واجبة في أول الفاتحة." }] },
  { ayah: 4, text: "مَالِكِ يَوْمِ الدِّينِ", changes: [{ word: "مَالِكِ", type: "فرش", rule: "حذف الألف", warshReading: "مَلِكِ (بحذف الألف)" }] },
  { ayah: 7, text: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ", changes: [{ word: "عَلَيْهِمْ", type: "أصول", rule: "ميم الجمع", warshReading: "قرأها بسكون الميم لعدم وقوع همزة قطع بعدها." }, { word: "الضَّالِّينَ", type: "أصول", rule: "المد اللازم", warshReading: "الإشباع 6 حركات." }] }
];

const baqarahData: AyahDetail[] = [
  { ayah: 2, text: "ذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ", changes: [{ word: "هُدًى", type: "أصول", rule: "ذوات الياء", warshReading: "الفتح والتقليل بخلف عنه (عند الوقف)." }] },
  { ayah: 3, text: "الَّذِينَ يُؤْمِنُونَ بِالْغَيْبِ وَيُقِيمُونَ الصَّلَاةَ وَمِمَّا رَزَقْنَاهُمْ يُنفِقُونَ", changes: [{ word: "يُؤْمِنُونَ", type: "أصول", rule: "إبدال الهمز الساكن", warshReading: "يُومِنُونَ (بإبدال الهمزة واواً)" }, { word: "الصَّلَاةَ", type: "أصول", rule: "تغليظ اللام", warshReading: "الصَّلَاةَ (بتغليظ اللام لأنها مفتوحة وقبلها صاد مفتوحة)" }] },
  { ayah: 4, text: "وَالَّذِينَ يُؤْمِنُونَ بِمَا أُنزِلَ إِلَيْكَ وَمَا أُنزِلَ مِن قَبْلِكَ وَبِالْآخِرَةِ هُمْ يُوقِنُونَ", changes: [{ word: "وَبِالْآخِرَةِ", type: "أصول وفرش", rule: "النقل + البدل + ترقيق الراء", warshReading: "وَبِلَاخِرَةِ (بنقل حركة الهمز للام، و3 أوجه في البدل، وترقيق الراء)" }] },
  { ayah: 9, text: "يُخَادِعُونَ اللَّهَ وَالَّذِينَ آمَنُوا وَمَا يَخْدَعُونَ إِلَّا أَنفُسَهُمْ وَمَا يَشْعُرُونَ", changes: [{ word: "وَمَا يَخْدَعُونَ", type: "فرش", rule: "إثبات الألف", warshReading: "وَمَا يُخَادِعُونَ (بضم الياء وفتح الخاء وإثبات الألف)" }] },
  { ayah: 10, text: "فِي قُلُوبِهِم مَّرَضٌ فَزَادَهُمُ اللَّهُ مَرَضًا ۖ وَلَهُمْ عَذَابٌ أَلِيمٌ بِمَا كَانُوا يَكْذِبُونَ", changes: [{ word: "يَكْذِبُونَ", type: "فرش", rule: "التشديد", warshReading: "يُكَذِّبُونَ (بضم الياء وفتح الكاف وتشديد الذال)" }] },
  { ayah: 125, text: "وَإِذْ جَعَلْنَا الْبَيْتَ مَثَابَةً لِّلنَّاسِ وَأَمْنًا وَاتَّخِذُوا مِن مَّقَامِ إِبْرَاهِيمَ مُصَلًّى", changes: [{ word: "وَاتَّخِذُوا", type: "فرش", rule: "فتح الخاء", warshReading: "وَاتَّخَذُوا (بفتح الخاء على أنه فعل ماضٍ)" }] },
  { ayah: 132, text: "وَوَصَّىٰ بِهَا إِبْرَاهِيمُ بَنِيهِ وَيَعْقُوبُ يَا بَنِيَّ إِنَّ اللَّهَ اصْطَفَىٰ لَكُمُ الدِّينَ", changes: [{ word: "وَوَصَّىٰ", type: "فرش", rule: "زيادة همزة", warshReading: "وَأَوْصَى (بهمزة مفتوحة وسكون الواو)" }] },
  { ayah: 140, text: "أَمْ تَقُولُونَ إِنَّ إِبْرَاهِيمَ وَإِسْمَاعِيلَ وَإِسْحَاقَ وَيَعْقُوبَ وَالْأَسْبَاطَ كَانُوا هُودًا أَوْ نَصَارَىٰ", changes: [{ word: "أَمْ تَقُولُونَ", type: "فرش", rule: "الياء بدلاً من التاء", warshReading: "أَمْ يَقُولُونَ (بياء الغيب)" }] },
  { ayah: 184, text: "أَيَّامًا مَّعْدُودَاتٍ ۚ فَمَن كَانَ مِنكُم مَّرِيضًا أَوْ عَلَىٰ سَفَرٍ فَعِدَّةٌ مِّنْ أَيَّامٍ أُخَرَ ۚ وَعَلَى الَّذِينَ يُطِيقُونَهُ فِدْيَةٌ طَعَامُ مِسْكِينٍ", changes: [{ word: "فِدْيَةٌ طَعَامُ مِسْكِينٍ", type: "فرش", rule: "جمع وتنوين", warshReading: "فِدْيَةُ طَعَامِ مَسَاكِينَ (بحذف التنوين وجمع مسكين)" }] },
  { ayah: 189, text: "وَلَيْسَ الْبِرُّ بِأَن تَأْتُوا الْبُيُوتَ مِن ظُهُورِهَا وَلَٰكِنَّ الْبِرَّ مَنِ اتَّقَىٰ ۗ وَأْتُوا الْبُيُوتَ مِنْ أَبْوَابِهَا", changes: [{ word: "الْبُيُوتَ", type: "فرش", rule: "كسر الباء", warshReading: "الْبِيُوتَ (في الموضعين بكسر الباء)" }] },
  { ayah: 219, text: "يَسْأَلُونَكَ عَنِ الْخَمْرِ وَالْمَيْسِرِ ۖ قُلْ فِيهِمَا إِثْمٌ كَبِيرٌ وَمَنَافِعُ لِلنَّاسِ", changes: [{ word: "كَبِيرٌ", type: "فرش", rule: "إبدال الباء ثاء", warshReading: "كَثِيرٌ (بالثاء المثلثة)" }] },
  { ayah: 259, text: "وَانظُرْ إِلَى الْعِظَامِ كَيْفَ نُنشِزُهَا ثُمَّ نَكْسُوهَا لَحْمًا", changes: [{ word: "نُنشِزُهَا", type: "فرش", rule: "إبدال الزاي راء", warshReading: "نُنشِرُهَا (بالراء)" }] }
];

const aalImranData: AyahDetail[] = [
  { ayah: 13, text: "قَدْ كَانَ لَكُمْ آيَةٌ فِي فِئَتَيْنِ الْتَقَتَا ۖ فِئَةٌ تُقَاتِلُ فِي سَبِيلِ اللَّهِ وَأُخْرَىٰ كَافِرَةٌ يَرَوْنَهُم مِّثْلَيْهِمْ رَأْيَ الْعَيْنِ", changes: [{ word: "يَرَوْنَهُم", type: "فرش", rule: "تاء الخطاب", warshReading: "تَرَوْنَهُم (بالتاء)" }] },
  { ayah: 37, text: "فَتَقَبَّلَهَا رَبُّهَا بِقَبُولٍ حَسَنٍ وَأَنبَتَهَا نَبَاتًا حَسَنًا وَكَفَّلَهَا زَكَرِيَّا", changes: [{ word: "وَكَفَّلَهَا", type: "فرش", rule: "تخفيف الفاء", warshReading: "وَكَفَلَهَا (بتخفيف الفاء)" }, { word: "زَكَرِيَّا", type: "فرش", rule: "الهمز والرفع", warshReading: "زَكَرِيَّاءُ (بهمزة مرفوعة)" }] },
  { ayah: 81, text: "وَإِذْ أَخَذَ اللَّهُ مِيثَاقَ النَّبِيِّينَ لَمَا آتَيْتُكُم مِّن كِتَابٍ وَحِكْمَةٍ", changes: [{ word: "لَمَا آتَيْتُكُم", type: "فرش", rule: "نون العظمة", warshReading: "لَمَا آتَيْنَاكُم (بالنون والألف بدلاً من التاء)" }] },
  { ayah: 146, text: "وَكَأَيِّن مِّن نَّبِيٍّ قَاتَلَ مَعَهُ رِبِّيُّونَ كَثِيرٌ فَمَا وَهَنُوا لِمَا أَصَابَهُمْ فِي سَبِيلِ اللَّهِ", changes: [{ word: "قَاتَلَ مَعَهُ", type: "فرش", rule: "البناء للمجهول", warshReading: "قُتِلَ مَعَهُ (بضم القاف وكسر التاء)" }, { word: "نَّبِيٍّ", type: "أصول", rule: "الهمز", warshReading: "نَبِيءٍ (بإثبات الهمز)" }] }
];

const nisaData: AyahDetail[] = [
  { ayah: 1, text: "وَاتَّقُوا اللَّهَ الَّذِي تَسَاءَلُونَ بِهِ وَالْأَرْحَامَ", changes: [{ word: "تَسَاءَلُونَ", type: "فرش", rule: "التشديد", warshReading: "تَسَّاءَلُونَ (بتشديد السين)" }] },
  { ayah: 11, text: "مِن بَعْدِ وَصِيَّةٍ يُوصِي بِهَا أَوْ دَيْنٍ", changes: [{ word: "يُوصِي", type: "فرش", rule: "البناء للمجهول", warshReading: "يُوصَى (بفتح الصاد)" }] }
];

const maidahToArafData: AyahDetail[] = [
  { ayah: 54, text: "(المائدة) يَا أَيُّهَا الَّذِينَ آمَنُوا مَن يَرْتَدَّ مِنكُمْ عَن دِينِهِ...", changes: [{ word: "يَرْتَدَّ", type: "فرش", rule: "فك الإدغام", warshReading: "يَرْتَدِدْ (بدالين: الأولى مكسورة والثانية مجزومة)" }] },
  { ayah: 67, text: "(المائدة) وَإِن لَّمْ تَفْعَلْ فَمَا بَلَّغْتَ رِسَالَتَهُ...", changes: [{ word: "رِسَالَتَهُ", type: "فرش", rule: "الجمع والكسر", warshReading: "رِسَالَاتِهِ (بالجمع مع كسر التاء)" }] },
  { ayah: 16, text: "(الأنعام) مَّن يُصْرَفْ عَنْهُ يَوْمَئِذٍ فَقَدْ رَحِمَهُ...", changes: [{ word: "يُصْرَفْ", type: "فرش", rule: "بناء للمعلوم", warshReading: "يَصْرِفْ (بفتح الياء وكسر الراء)" }] },
  { ayah: 115, text: "(الأنعام) وَتَمَّتْ كَلِمَتُ رَبِّكَ صِدْقًا وَعَدْلًا...", changes: [{ word: "كَلِمَتُ", type: "فرش", rule: "الجمع", warshReading: "كَلِمَاتُ (بالجمع المرفوع)" }] },
  { ayah: 26, text: "(الأعراف) وَلِبَاسُ التَّقْوَىٰ ذَٰلِكَ خَيْرٌ...", changes: [{ word: "وَلِبَاسُ", type: "فرش", rule: "النصب", warshReading: "وَلِبَاسَ (بنصب السين)" }] },
  { ayah: 57, text: "(الأعراف) وَهُوَ الَّذِي يُرْسِلُ الرِّيَاحَ بُشْرًا بَيْنَ يَدَيْ رَحْمَتِهِ...", changes: [{ word: "بُشْرًا", type: "فرش", rule: "ضم النون والشين", warshReading: "نُشُرًا (بالنون المضمومة وشين مضمومة)" }] }
];

const anfalToNurData: AyahDetail[] = [
  { ayah: 42, text: "(الأنفال) لِّيَهْلِكَ مَنْ هَلَكَ عَن بَيِّنَةٍ وَيَحْيَىٰ مَنْ حَيَّ عَن بَيِّنَةٍ", changes: [{ word: "حَيَّ", type: "فرش", rule: "إظهار الياءين", warshReading: "حَيِيَ (بياءين الأولى مكسورة والثانية مفتوحة)" }] },
  { ayah: 30, text: "(التوبة) وَقَالَتِ الْيَهُودُ عُزَيْرٌ ابْنُ اللَّهِ...", changes: [{ word: "عُزَيْرٌ ابْنُ", type: "أصول وفرش", rule: "ترك التنوين", warshReading: "عُزَيْرُ ابْنُ (بضم الراء من غير تنوين)" }] },
  { ayah: 100, text: "(التوبة) وَأَعَدَّ لَهُمْ جَنَّاتٍ تَجْرِي تَحْتَهَا الْأَنْهَارُ...", changes: [{ word: "تَحْتَهَا الْأَنْهَارُ", type: "فرش", rule: "زيادة مِن", warshReading: "تَجْرِي مِن تَحْتِهَا الْأَنْهَارُ (بزيادة كلمة مِن)" }] },
  { ayah: 35, text: "(يونس) قُلْ هَلْ مِن شُرَكَائِكُم مَّن يَهْدِي إِلَى الْحَقِّ... أَمَّن لَّا يَهِدِّي إِلَّا أَن يُهْدَىٰ", changes: [{ word: "يَهِدِّي", type: "فرش", rule: "فتح الهاء وتشديد الدال", warshReading: "يَهَدِّي (بفتح الهاء)" }] },
  { ayah: 42, text: "(هود) يَا بُنَيَّ ارْكَب مَّعَنَا...", changes: [{ word: "ارْكَب مَّعَنَا", type: "أصول وفرش", rule: "الإظهار", warshReading: "ارْكَبْ مَعَنَا (بإظهار الباء وعدم إدغامها في الميم)" }] },
  { ayah: 19, text: "(يوسف) قَالَ يَا بُشْرَىٰ هَٰذَا غُلَامٌ...", changes: [{ word: "يَا بُشْرَىٰ", type: "فرش", rule: "إضافة ياء المتكلم", warshReading: "يَا بُشْرَايَ (بإضافة الياء وفتحها)" }] },
  { ayah: 16, text: "(الكهف) وَيُهَيِّئْ لَكُم مِّنْ أَمْرِكُم مِّرْفَقًا", changes: [{ word: "مِّرْفَقًا", type: "فرش", rule: "فتح الميم", warshReading: "مَرْفِقًا (بفتح الميم وكسر الفاء)" }] },
  { ayah: 63, text: "(الكهف) وَمَا أَنسَانِيهُ إِلَّا الشَّيْطَانُ...", changes: [{ word: "أَنسَانِيهُ", type: "أصول وفرش", rule: "كسر الهاء", warshReading: "أَنسَانِيهِ (بكسر الهاء)" }] },
  { ayah: 19, text: "(مريم) قَالَ إِنَّمَا أَنَا رَسُولُ رَبِّكِ لِأَهَبَ لَكِ غُلَامًا زَكِيًّا", changes: [{ word: "لِأَهَبَ", type: "فرش", rule: "إبدال الهمزة ياء", warshReading: "لِيَهَبَ (بياء مفتوحة)" }] }
];

const furqanToYaseenData: AyahDetail[] = [
  { ayah: 69, text: "(الفرقان) يُضَاعَفْ لَهُ الْعَذَابُ يَوْمَ الْقِيَامَةِ وَيَخْلُدْ فِيهِ مُهَانًا", changes: [{ word: "يُضَاعَفْ / وَيَخْلُدْ", type: "فرش", rule: "التشديد والرفع", warshReading: "يُضَعَّفُ ... وَيَخْلُدُ (بالتشديد في العين، والرفع فيهما)" }] },
  { ayah: 176, text: "(الشعراء) كَذَّبَ أَصْحَابُ الْأَيْكَةِ الْمُرْسَلِينَ", changes: [{ word: "الْأَيْكَةِ", type: "فرش", rule: "حذف الهمزتين", warshReading: "لَيْكَةِ (بلام مفتوحة من غير همزة وصل ولا قطع)" }] },
  { ayah: 68, text: "(الأحزاب) رَبَّنَا آتِهِمْ ضِعْفَيْنِ مِنَ الْعَذَابِ وَالْعَنْهُمْ لَعْنًا كَبِيرًا", changes: [{ word: "كَبِيرًا", type: "فرش", rule: "الثاء المثلثة", warshReading: "كَثِيرًا (بالثاء)" }] },
  { ayah: 1, text: "(يس) يس (1) وَالْقُرْآنِ الْحَكِيمِ", changes: [{ word: "يس وَالْقُرْآنِ", type: "أصول", rule: "الإدغام", warshReading: "ياسوَّالقرآن (بإدغام النون في الواو، وهو الوجه المقدم وله الإظهار أيضاً)" }] }
];

const saffatToHujuratData: AyahDetail[] = [
  { ayah: 130, text: "(الصافات) سَلَامٌ عَلَىٰ إِلْ يَاسِينَ", changes: [{ word: "إِلْ يَاسِينَ", type: "فرش", rule: "همز ومد وكسر اللام", warshReading: "آلِ يَاسِينَ (بمد البدل وكسر اللام)" }] },
  { ayah: 57, text: "(ص) هَٰذَا فَلْيَذُوقُوهُ حَمِيمٌ وَغَسَّاقٌ", changes: [{ word: "وَغَسَّاقٌ", type: "فرش", rule: "تخفيف السين", warshReading: "وَغَسَاقٌ (بسين مخففة)" }] },
  { ayah: 19, text: "(الزخرف) وَجَعَلُوا الْمَلَائِكَةَ الَّذِينَ هُمْ عِبَادُ الرَّحْمَٰنِ إِنَاثًا", changes: [{ word: "عِبَادُ", type: "فرش", rule: "عِندَ", warshReading: "عِنْدَ الرَّحْمَٰنِ (بكسر العين وسكون النون وفتح الدال)" }] },
  { ayah: 17, text: "(الفتح) وَمَن يُطِعِ اللَّهَ وَرَسُولَهُ يُدْخِلْهُ... وَمَن يَتَوَلَّ يُعَذِّبْهُ عَذَابًا أَلِيمًا", changes: [{ word: "يُدْخِلْهُ / يُعَذِّبْهُ", type: "فرش", rule: "النون بدلاً من الياء", warshReading: "نُدْخِلْهُ / نُعَذِّبْهُ (بنون العظمة)" }] }
];

const qafToNasData: AyahDetail[] = [
  { ayah: 15, text: "(القمر) وَلَقَد تَّرَكْنَاهَا آيَةً فَهَلْ مِن مُّدَّكِرٍ", changes: [{ word: "مُّدَّكِرٍ", type: "فرش", rule: "الدال المهملة", warshReading: "مُدَّكِرٍ (بدال مهملة مشددة)" }] },
  { ayah: 31, text: "(الرحمن) سَنَفْرُغُ لَكُمْ أَيُّهَ الثَّقَلَانِ", changes: [{ word: "سَنَفْرُغُ", type: "فرش", rule: "بالياء", warshReading: "سَيَفْرُغُ (بياء الغيب)" }] },
  { ayah: 14, text: "(المطففين) كَلَّا ۖ بَلْ ۜ رَانَ عَلَىٰ قُلُوبِهِم مَّا كَانُوا يَكْسِبُونَ", changes: [{ word: "بَلْ رَانَ", type: "أصول", rule: "ترك السكت وإدغام", warshReading: "بَرَّانَ (بإدغام اللام في الراء من غير سكت)" }] },
  { ayah: 4, text: "(الطارق) إِن كُلُّ نَفْسٍ لَّمَّا عَلَيْهَا حَافِظٌ", changes: [{ word: "لَّمَّا", type: "فرش", rule: "تخفيف الميم", warshReading: "لَمَا (بميم مخففة)" }] },
  { ayah: 23, text: "(الفجر) وَجِيءَ يَوْمَئِذٍ بِجَهَنَّمَ", changes: [{ word: "وَجِيءَ", type: "أصول", rule: "إشباع المد المتصل", warshReading: "وَجِيءَ (بمد الياء 6 حركات)" }] },
  { ayah: 4, text: "(الإخلاص) وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ", changes: [{ word: "كُفُوًا", type: "فرش", rule: "الهمز", warshReading: "كُفُئًا (بضم الفاء والهمز بدلاً من الواو)" }] }
];

export const unit13Content: Record<string, React.ReactNode> = {
  'u13-l1': <SurahSection title="موسوعة الآيات: سورة الفاتحة" intro="تحليل بالآية للفرشيات والتغييرات الأصولية في سورة الفاتحة للإمام ورش." data={fatihahData} />,
  'u13-l2': <SurahSection title="موسوعة الآيات: سورة البقرة" intro="أبرز الآيات التي اختلف فيها ورش عن حفص في سورة البقرة مفصلة بالآية." data={baqarahData} />,
  'u13-l3': <SurahSection title="موسوعة الآيات: سورة آل عمران" intro="أهم الشواهد والتغييرات في سورة آل عمران للإمام ورش." data={aalImranData} />,
  'u13-l4': <SurahSection title="موسوعة الآيات: سورة النساء" intro="أهم التغييرات الفرشية في سورة النساء." data={nisaData} />,
  'u13-l5': <SurahSection title="موسوعة الآيات: المائدة إلى الأعراف" intro="تجميع لأهم الآيات التي خالف فيها ورش في سور المائدة، الأنعام، والأعراف." data={maidahToArafData} />,
  'u13-l6': <SurahSection title="موسوعة الآيات: الأنفال إلى النور" intro="مختارات من أهم الفرشيات بالآية من سورة الأنفال وحتى سورة النور." data={anfalToNurData} />,
  'u13-l7': <SurahSection title="موسوعة الآيات: الفرقان إلى يس" intro="موسوعة الآيات لسور الفرقان، الشعراء، الأحزاب ويس." data={furqanToYaseenData} />,
  'u13-l8': <SurahSection title="موسوعة الآيات: الصافات إلى الحجرات" intro="شواهد من الصافات وص والزخرف والفتح." data={saffatToHujuratData} />,
  'u13-l9': <SurahSection title="موسوعة الآيات: ق إلى الناس" intro="أبرز الأحكام والفرشيات في المفصل (من ق إلى الناس) بالآية." data={qafToNasData} />
};
`

fs.writeFileSync('src/data/unit13.tsx', content);
console.log('Done extending Farsh by Ayah to the whole Quran.');
