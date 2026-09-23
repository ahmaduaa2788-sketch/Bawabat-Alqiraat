import React from 'react';
import { QuizEngine, QuizQuestion } from './QuizEngine';

const questions: QuizQuestion[] = [
  {
    question: "ما هو مقدار مد المتصل والمنفصل لورش من طريق الشاطبية؟",
    options: ["التوسط (4 حركات)", "القصر (حركتان)", "الإشباع (6 حركات)", "التوسط والإشباع"],
    correctAnswer: 2,
    explanation: "يقرأ ورش بإشباع (تطويل) المد المتصل والمنفصل بمقدار 6 حركات قولاً واحداً."
  },
  {
    question: "أي من الكلمات التالية يُستثنى من جواز الأوجه الثلاثة في البدل ويُقرأ بالقصر فقط لورش؟",
    options: ["ءَامَنُواْ", "قُرۡءَان", "أُوتُواْ", "إِيمَٰنًا"],
    correctAnswer: 1,
    explanation: "كلمة (قرآن) مستثناة لأن الهمز سبق بساكن صحيح متصل."
  },
  {
    question: "ما هو مقدار مد اللين المهموز لورش من طريق الشاطبية؟",
    options: ["القصر والتوسط (2، 4)", "التوسط والإشباع (4، 6)", "الإشباع فقط (6)", "التوسط فقط (4)"],
    correctAnswer: 1,
    explanation: "يقرأ ورش مد اللين المهموز بوجهين: التوسط (4) والإشباع (6)."
  },
  {
    question: "إذا قرأت لورش بتوسط البدل (4 حركات)، فما هو الوجه الجائز في اللين المهموز؟",
    options: ["الإشباع فقط (6)", "التوسط والإشباع (4، 6)", "القصر (2)", "التوسط فقط (4)"],
    correctAnswer: 3,
    explanation: "على توسط البدل (4)، يتعين توسط اللين المهموز (4)."
  }
];

export function Unit1Quiz({ onComplete }: { onComplete: () => void }) {
  return (
    <QuizEngine
      quizId="u1-quiz"
      title="اختبار الباب الأول: المد والقصر"
      rawiId="warsh"
      unitId="unit-1"
      questions={questions}
      onComplete={onComplete}
    />
  );
}
