import React from 'react';
import { QuizEngine, QuizQuestion } from './QuizEngine';

const questions: QuizQuestion[] = [
  {
    question: "ما مذهب قالون في الياءات الزوائد إذا كان بعدها همزة قطع؟",
    options: [
      "إثباتها وصلاً فقط",
      "إثباتها وصلاً ووقفاً",
      "حذفها وصلاً ووقفاً",
      "إثباتها وقفاً فقط"
    ],
    correctAnswer: 0,
    explanation: "يثبت قالون معظم الياءات الزوائد وصلاً فقط (مثل الداعِ إذا دعانِ، يوم يأتِ)، ويحذفها وقفاً."
  },
  {
    question: "كيف يقرأ قالون ياء الإضافة في (مَحْيَايَ)؟",
    options: [
      "بالفتح كورش",
      "بالإسكان (وَمَحْيَايْ)",
      "بالفتح والإسكان",
      "بالحذف"
    ],
    correctAnswer: 1,
    explanation: "قرأ قالون (ومحيايْ) بإسكان الياء، بخلاف ورش الذي فتحها."
  },
  {
    question: "في كلمة (عَهْدِي الظَّالِمِينَ)، كيف قرأ قالون الياء؟",
    options: [
      "بالفتح (عَهْدِيَ الظَّالِمِينَ) كحفص",
      "بالإسكان",
      "بالإسقاط",
      "بالإبدال"
    ],
    correctAnswer: 0,
    explanation: "قرأ قالون (عَهْدِيَ الظَّالِمِينَ) بفتح الياء قبل همزة الوصل كحفص والجمهور."
  }
];

export function QalunUnit5Quiz({ onComplete }: { onComplete: () => void }) {
  return (
    <QuizEngine
      quizId="u5-quiz"
      title="اختبار الباب الخامس: ياءات الإضافة والزوائد"
      rawiId="qalun"
      unitId="unit-5"
      questions={questions}
      onComplete={onComplete}
    />
  );
}
