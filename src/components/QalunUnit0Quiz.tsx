import React from 'react';
import { QuizEngine, QuizQuestion } from './QuizEngine';

const questions: QuizQuestion[] = [
  {
    question: "من هو الراوي الأول للإمام نافع المدني؟",
    options: [
      "ورش",
      "قالون",
      "حفص",
      "الدوري"
    ],
    correctAnswer: 1,
    explanation: "الإمام نافع روى عنه راويان أساسيان: الأول قالون (عيسى بن مينا) والثاني ورش (عثمان بن سعيد)."
  },
  {
    question: "ما معنى لقب 'قالون' في اللغة الرومية؟",
    options: [
      "الطويل",
      "القصير",
      "الجيد",
      "السريع"
    ],
    correctAnswer: 2,
    explanation: "لقب 'قالون' أطلقه الإمام نافع على تلميذه عيسى بن مينا لجودة قراءته، وتعني 'جيد' باللغة الرومية."
  },
  {
    question: "هل يقرأ الإمام قالون بالبسملة بين السورتين؟",
    options: [
      "له الوصل فقط",
      "له السكت فقط",
      "له البسملة قولاً واحداً",
      "له البسملة والسكت"
    ],
    correctAnswer: 2,
    explanation: "مذهب قالون كابن كثير وعاصم والكسائي وأبي جعفر؛ يقرؤون بالبسملة بين كل سورتين قولاً واحداً (إلا بين الأنفال والتوبة)."
  }
];

export function QalunUnit0Quiz({ onComplete }: { onComplete: () => void }) {
  return (
    <QuizEngine
      quizId="u0-quiz"
      title="اختبار الوحدة التمهيدية: رواية قالون عن نافع"
      rawiId="qalun"
      unitId="unit-0"
      questions={questions}
      onComplete={onComplete}
    />
  );
}
