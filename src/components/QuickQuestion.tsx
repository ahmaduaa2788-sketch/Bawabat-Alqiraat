import React, { useState } from 'react';
import { HelpCircle, CheckCircle, XCircle } from 'lucide-react';
import { quickQuestions } from '../data/quickQuestions';

export function QuickQuestion({ lessonId }: { lessonId: string }) {
  const questionData = quickQuestions[lessonId];
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!questionData) return null;

  const handleSelect = (idx: number) => {
    if (isSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;
    setIsSubmitted(true);
  };

  const isCorrect = selectedOption === questionData.correctAnswer;

  return (
    <div className="mt-8 bg-blue-900/20 p-6 md:p-8 rounded-2xl border border-blue-900/50 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-500/20 p-2 rounded-lg text-blue-400">
          <HelpCircle className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">سؤال سريع</h3>
          <p className="text-blue-200 text-sm">اختبر فهمك السريع للدرس</p>
        </div>
      </div>
      
      <p className="text-lg text-white font-medium mb-6 leading-relaxed">
        {questionData.question}
      </p>
      
      <div className="space-y-3 mb-6">
        {questionData.options.map((option, idx) => {
          let optionClass = "bg-navy-950 border-navy-700 hover:bg-navy-800 text-navy-100";
          if (selectedOption === idx) {
            optionClass = "bg-blue-900/50 border-blue-500 text-white";
          }
          if (isSubmitted) {
            if (idx === questionData.correctAnswer) {
              optionClass = "bg-green-900/30 border-green-500 text-white";
            } else if (idx === selectedOption) {
              optionClass = "bg-red-900/30 border-red-500 text-white";
            } else {
              optionClass = "bg-navy-950 border-navy-800 text-navy-400 opacity-50";
            }
          }
          
          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={isSubmitted}
              className={`w-full text-right p-4 rounded-xl border transition flex items-center justify-between ${optionClass}`}
            >
              <span>{option}</span>
              {isSubmitted && idx === questionData.correctAnswer && <CheckCircle className="w-5 h-5 text-green-400" />}
              {isSubmitted && idx === selectedOption && idx !== questionData.correctAnswer && <XCircle className="w-5 h-5 text-red-400" />}
            </button>
          );
        })}
      </div>
      
      {!isSubmitted && (
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={selectedOption === null}
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-xl transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            تحقق من الإجابة
          </button>
        </div>
      )}
      
      {isSubmitted && (
        <div className={`mt-4 p-4 rounded-xl text-sm font-medium ${isCorrect ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
          {isCorrect ? 'إجابة صحيحة، أحسنت!' : 'إجابة خاطئة، حاول مراجعة الدرس مرة أخرى.'}
        </div>
      )}
    </div>
  );
}
