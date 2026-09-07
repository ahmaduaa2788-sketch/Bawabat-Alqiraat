import React from 'react';
import { WaqfIbtidaTool } from '../components/WaqfIbtidaTool';

export const unit13Content: Record<string, React.ReactNode> = {
  'waqf-tool': (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-navy-900 border border-navy-800 p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-white mb-4">الوقف والابتداء</h2>
        <p className="text-navy-200 leading-relaxed text-lg">
          باب الوقف والابتداء من أهم أبواب التجويد، وقد روي عن الإمام علي بن أبي طالب رضي الله عنه في قوله تعالى: (وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا) أنه قال: الترتيل هو تجويد الحروف ومعرفة الوقوف.
          استخدم الأداة التفاعلية أدناه للتدرب على أحكام الوقف والابتداء في قراءة ورش.
        </p>
      </div>

      <WaqfIbtidaTool />
    </div>
  )
};
