const fs = require('fs');
let dataStr = fs.readFileSync('src/data/unit13.tsx', 'utf-8');

dataStr = dataStr.replace(
  /<div className="prose prose-invert max-w-none mb-6">[\s\S]+?<\/div>\s*<\/div>/,
  `{data.length > 0 && (
          <div className="prose prose-invert max-w-none mb-6">
            <p className="text-navy-100">{intro}</p>
            <div className="bg-blue-900/10 p-5 rounded-xl border border-blue-900/30 flex items-start gap-4 mt-4">
              <Info className="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-200 m-0 leading-relaxed">
                هذا الجدول مستمد حرفياً من كتاب <strong>(الثمر اليانع في رواية ورش عن نافع)</strong> ليمشي آية بآية لعرض اختلافات ورش عن حفص.
              </p>
            </div>
          </div>
        )}`
);

fs.writeFileSync('src/data/unit13.tsx', dataStr);
console.log("Fixed intro block");
