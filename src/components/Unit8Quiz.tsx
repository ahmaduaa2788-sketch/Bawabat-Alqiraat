import React from 'react';
import { QuizEngine, QuizQuestion } from './QuizEngine';

const questions: QuizQuestion[] = [
  {
    question: "ما هو مذهب ورش في (ذوات الياء) من حيث الفتح والتقليل؟",
    options: ["التقليل قولاً واحداً", "الفتح قولاً واحداً", "الخلف (الفتح والتقليل)", "الإمالة الكبرى"],
    correctAnswer: 2,
    explanation: "لورش في ذوات الياء الخلف (الفتح والتقليل)، والتقليل هو الأرجح مع توسط البدل."
  },
  {
    question: "كيف يقرأ ورش رؤوس الآي في السور الإحدى عشرة (مثل: سورة طه، والضحى)؟",
    options: ["بالتقليل وجهاً واحداً", "بالفتح وجهاً واحداً", "بالخلف", "بالإمالة الكبرى"],
    correctAnswer: 0,
    explanation: "يقرأ ورش رؤوس الآي في السور الإحدى عشرة (طهاها، النجم، وغيرها) بالتقليل قولاً واحداً."
  },
  {
    question: "ذوات الراء (مثل: اشترى، النصارى) لورش، ما هو حكمها؟",
    options: ["الفتح فقط", "التقليل قولاً واحداً", "الخلف بين الفتح والتقليل", "الإمالة الكبرى"],
    correctAnswer: 1,
    explanation: "قرأ ورش ذوات الراء (الألفات المتطرفة المسبوقة براء) بالتقليل وجهاً واحداً."
  }
];

export function Unit8Quiz({ onComplete }: { onComplete: () => void }) {
  return (
    <QuizEngine
      quizId="u8-quiz"
      title="اختبار الباب الثامن: الفتح والتقليل"
      rawiId="warsh"
      unitId="unit-8"
      questions={questions}
      onComplete={onComplete}
    />
  );
}
