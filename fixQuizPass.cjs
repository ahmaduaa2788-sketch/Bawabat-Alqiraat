const fs = require('fs');
let code = fs.readFileSync('src/components/ComprehensiveQuiz.tsx', 'utf-8');

// The pass threshold logic
const oldPass = "const isPassing = score >= (questions.length * 0.7); // 70% to pass";
const newPass = `const isPassing = score >= 35;
    const earnsCertificate = score >= 38;`;

code = code.replace(oldPass, newPass);

// The passing message
const oldPassingMessage = `<div className="space-y-6">
            <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-xl text-green-400">
              أحسنت! لقد اجتزت الاختبار الشامل بنجاح باهر وأثبت إتقانك لأصول ورش.
            </div>`;

const newPassingMessage = `<div className="space-y-6">
            <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-xl text-green-400">
              أحسنت! لقد اجتزت الاختبار الشامل بنجاح وأثبت إتقانك لأصول ورش.
            </div>
            {earnsCertificate ? (
              <div className="bg-gold-500/20 border border-gold-500/40 p-4 rounded-xl text-gold-400 font-bold">
                🎉 مبروك! نتيجة ممتازة تؤهلك للحصول على الإجازة/الشهادة (38 فأكثر).
              </div>
            ) : (
              <div className="bg-navy-800 border border-navy-700 p-4 rounded-xl text-navy-300 text-sm">
                ملاحظة: لإصدار الشهادة، يجب الحصول على 38 درجة فأكثر. يمكنك إعادة الاختبار لتحسين النتيجة.
              </div>
            )}`;

code = code.replace(oldPassingMessage, newPassingMessage);

// The failing message
const oldFailingMessage = `تحتاج إلى 70% على الأقل لاجتياز الاختبار. يمكنك مراجعة الأبواب والمحاولة مرة أخرى.`;
const newFailingMessage = `تحتاج إلى 35 من 40 على الأقل لاجتياز الاختبار. يمكنك مراجعة الأبواب والمحاولة مرة أخرى.`;

code = code.replace(oldFailingMessage, newFailingMessage);

fs.writeFileSync('src/components/ComprehensiveQuiz.tsx', code);
