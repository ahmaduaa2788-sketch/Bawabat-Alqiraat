import React from 'react';
import { QuizEngine, QuizQuestion } from './QuizEngine';

const questions: QuizQuestion[] = [
  {
    question: "كيف يقرأ قالون قوله تعالى (يَلْهَث ذَّلِكَ) في سورة الأعراف؟",
    options: [
      "بالإظهار قولاً واحداً",
      "بالإدغام قولاً واحداً",
      "بالإظهار والإدغام (الوجهان)",
      "بالسكت"
    ],
    correctAnswer: 2,
    explanation: "لقالون في (يلهث ذلك) الوجهان: الإظهار، والإدغام، والمقدم أداءً هو الإظهار."
  },
  {
    question: "كيف يقرأ قالون قوله تعالى (ارْكَب مَّعَنَا) في سورة هود؟",
    options: [
      "بالإدغام والإظهار (الوجهان)",
      "بالإدغام قولاً واحداً",
      "بالإظهار قولاً واحداً",
      "بالسكت"
    ],
    correctAnswer: 0,
    explanation: "لقالون فيها الوجهان (الإظهار والإدغام)، بخلاف ورش الذي يقرأها بالإظهار وجهاً واحداً."
  },
  {
    question: "كيف قرأ قالون كلمة (يُعَذِّبُ مَن) في سورة البقرة؟",
    options: [
      "بالإدغام كأبي عمرو",
      "بالإظهار مع ضم الباء رفعاً (وَيُعَذِّبُ مَن)",
      "بالإسكان والسكت",
      "بالإخفاء"
    ],
    correctAnswer: 1,
    explanation: "قرأها قالون بالإظهار (يعذبُ من) مع ضم الباء رفعاً، خلافاً لمن قرأ بسكون الباء وإدغامها كأبي عمرو."
  }
];

export function QalunUnit4Quiz({ onComplete }: { onComplete: () => void }) {
  return (
    <QuizEngine
      quizId="u4-quiz"
      title="اختبار الباب الرابع: الإدغام والإظهار لقالون"
      rawiId="qalun"
      unitId="unit-4"
      questions={questions}
      onComplete={onComplete}
    />
  );
}
