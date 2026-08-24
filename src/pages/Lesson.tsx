import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { courseMap } from '../data/courseMap';
import { unit0Content } from '../data/unit0';
import { unit1Content } from '../data/unit1';
import { unit2Content } from '../data/unit2';
import { Unit0Quiz } from '../components/Unit0Quiz';
import { Unit1Quiz } from '../components/Unit1Quiz';
import { Unit2Quiz } from '../components/Unit2Quiz';
import { QuranicLab } from '../components/QuranicLab';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { qiraatTree } from '../data/qiraatTree';

export function Lesson() {
  const { qariId, rawiId, tariqId, unitId, lessonId } = useParams<{ 
    qariId: string; 
    rawiId: string; 
    tariqId: string;
    unitId: string; 
    lessonId: string;
  }>();
  
  const navigate = useNavigate();

  const unit = courseMap.find(u => u.id === unitId);
  const lesson = unit?.lessons.find(l => l.id === lessonId);
  const lessonIndex = unit?.lessons.findIndex(l => l.id === lessonId) ?? -1;

  if (!unit || !lesson) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gold-400 mb-4">الدرس غير موجود</h2>
        <Link to={`/course/${qariId}/${rawiId}/${tariqId}`} className="text-gold-600 hover:underline">العودة لخريطة المسار</Link>
      </div>
    );
  }

  // Next and Prev Lesson logic
  const prevLesson = lessonIndex > 0 ? unit.lessons[lessonIndex - 1] : null;
  const nextLesson = lessonIndex < unit.lessons.length - 1 ? unit.lessons[lessonIndex + 1] : null;

  // Render content based on unit and lesson type
  let content = null;
  if (unitId === 'unit-0') {
    if (lesson.type === 'quiz') {
      content = <Unit0Quiz onComplete={() => navigate(`/course/${qariId}/${rawiId}/${tariqId}`)} />;
    } else {
      content = unit0Content[lesson.id];
    }
  } else if (unitId === 'unit-1') {
    if (lesson.type === 'quiz') {
      content = <Unit1Quiz onComplete={() => navigate(`/course/${qariId}/${rawiId}/${tariqId}`)} />;
    } else {
      content = unit1Content[lesson.id];
    }
  } else if (unitId === 'unit-2') {
    if (lesson.type === 'quiz') {
      content = <Unit2Quiz onComplete={() => navigate(`/course/${qariId}/${rawiId}/${tariqId}`)} />;
    } else {
      content = unit2Content[lesson.id];
    }
  } else if (unitId === 'unit-14') {
    content = <QuranicLab />;
  }

  const courseBaseUrl = `/course/${qariId}/${rawiId}/${tariqId}`;

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="mb-8">
        <div className="text-sm font-bold text-gold-600 mb-2 flex items-center gap-2">
          <Link to={courseBaseUrl} className="hover:underline">المسار</Link>
          <span>/</span>
          <span>{unit.title}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
          {lesson.title}
        </h1>
      </div>

      <div className="prose prose-slate max-w-none prose-headings:font-bold prose-a:text-gold-600 prose-p:leading-relaxed">
        {content || (
          <div className="bg-gold-500/10 p-6 rounded-lg text-gold-300 text-center border border-gold-500/30">
            محتوى هذا الدرس قيد الإعداد...
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      <div className="mt-16 pt-8 border-t border-navy-700 flex flex-col sm:flex-row gap-4 justify-between items-center">
        {prevLesson ? (
          <Link
            to={`/lesson/${qariId}/${rawiId}/${tariqId}/${unit.id}/${prevLesson.id}`}
            className="flex items-center gap-2 text-navy-300 hover:text-white font-medium px-4 py-2 rounded-lg hover:bg-navy-100 transition"
          >
            <ArrowRight className="w-5 h-5" />
            الدرس السابق
          </Link>
        ) : <div />}

        {nextLesson ? (
          <Link
            to={`/lesson/${qariId}/${rawiId}/${tariqId}/${unit.id}/${nextLesson.id}`}
            className="flex items-center gap-2 bg-navy-950 text-white font-medium px-6 py-3 rounded-lg hover:bg-navy-900 transition shadow-sm"
          >
            الدرس التالي
            <ArrowLeft className="w-5 h-5" />
          </Link>
        ) : (
          <Link
            to={courseBaseUrl}
            className="flex items-center gap-2 bg-gold-500/100 text-white font-medium px-6 py-3 rounded-lg hover:bg-gold-600 transition shadow-sm"
          >
            إكمال الوحدة والعودة للمسار
            <ArrowLeft className="w-5 h-5" />
          </Link>
        )}
      </div>
    </div>
  );
}
