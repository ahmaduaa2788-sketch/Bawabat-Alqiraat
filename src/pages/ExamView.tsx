import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ExamBank } from '../components/ExamBank';
import { qiraatTree } from '../data/qiraatTree';

export function ExamView() {
  const { qariId, rawiId, tariqId } = useParams<{ qariId: string; rawiId: string; tariqId: string }>();
  const navigate = useNavigate();

  const qari = qiraatTree.find(q => q.id === qariId);
  const rawi = qari?.ruwat.find(r => r.id === rawiId);
  const tariq = rawi?.turuq.find(t => t.id === tariqId);

  if (!qari || !rawi || !tariq) {
    return <div className="p-8 text-center text-white">المسار غير موجود.</div>;
  }

  const handleComplete = () => {
    navigate(`/course/${qariId}/${rawiId}/${tariqId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-in fade-in duration-500">
      <div className="mb-8 text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold text-white">الاختبار النهائي للمسار</h1>
        <p className="text-gold-400 text-lg">
          {qari.name} - {rawi.name} ({tariq.name})
        </p>
      </div>
      
      <ExamBank onComplete={handleComplete} />
    </div>
  );
}
