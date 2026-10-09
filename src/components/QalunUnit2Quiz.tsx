import React from 'react';
import { QuizEngine, QuizQuestion } from './QuizEngine';

const questions: QuizQuestion[] = [
  {
    question: "كيف يقرأ قالون كلمة (يُؤَدِّهْ) و (نُؤْتِهْ) و (نُوَلِّهْ) و (نُصْلِهْ)؟",
    options: [
      "بالصلة مع القصر",
      "بالإسكان",
      "بالاختلاس",
      "بالصلة مع التوسط"
    ],
    correctAnswer: 1,
    explanation: "يقرأ قالون بإسكان الهاء في هذه الكلمات (يُؤَدِّهْ إِلَيْكَ)، (نُؤْتِهْ مِنْهَا)، (نُوَلِّهْ مَا تَوَلَّى)، (وَنُصْلِهْ جَهَنَّمَ)."
  },
  {
    question: "ما هو مقدار المد المنفصل لقالون؟",
    options: [
      "القصر فقط",
      "التوسط فقط",
      "القصر والتوسط (الوجهان)",
      "الإشباع"
    ],
    correctAnswer: 2,
    explanation: "لقالون في المد المنفصل وجهان: القصر (حركتان) وهو المقدم أداءً، والتوسط (4 حركات)."
  },
  {
    question: "كلمة (يَأْتِهْ) في سورة طه (وَمَن يَأْتِهِ مُؤْمِنًا)، كيف قرأها قالون؟",
    options: [
      "بالإسكان",
      "بالقصر (الاختلاس)",
      "بالصلة الكاملة",
      "بالإسكان والصلة"
    ],
    correctAnswer: 1,
    explanation: "قرأها قالون بالقصر (يسمى اختلاساً) أي بكسر الهاء كسرة خالصة من غير إشباع (دون صلة)."
  }
];

export function QalunUnit2Quiz({ onComplete }: { onComplete: () => void }) {
  return (
    <QuizEngine
      quizId="u2-quiz"
      title="اختبار الباب الثاني: هاء الكناية والمد والقصر"
      rawiId="qalun"
      unitId="unit-2"
      questions={questions}
      onComplete={onComplete}
    />
  );
}
