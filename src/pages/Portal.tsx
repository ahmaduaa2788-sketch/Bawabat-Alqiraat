import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { qiraatTree } from '../data/qiraatTree';
import { useProgress } from '../context/ProgressContext';
import { Lock, BookOpen, ChevronLeft, RefreshCcw } from 'lucide-react';
import { cn } from '../lib/utils';

export function Portal() {
  const { activeQari, selectQari, resetProgress } = useProgress();
  const navigate = useNavigate();

  const handleSelectQari = (qariId: string, isLocked: boolean) => {
    if (isLocked) return;
    selectQari(qariId);
    navigate(`/qari/${qariId}`);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      <div className="text-center space-y-6 py-12">
        <div className="inline-flex items-center justify-center p-5 bg-navy-950/80 rounded-full mb-4 shadow-xl shadow-gold-500/10 border border-gold-500/20 backdrop-blur-sm">
          <BookOpen className="w-14 h-14 text-gold-500" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-sm">
          بوابة أصول القراءات
        </h1>
        <p className="text-xl text-navy-200 max-w-2xl mx-auto leading-relaxed">
          اختر القارئ للبدء في دراسة أصول قراءته. عند اختيار قارئ، سيتم إغلاق البقية حتى تنجز متطلباته المنهجية.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {qiraatTree.map((qari) => {
          const isLocked = activeQari !== null && activeQari !== qari.id;
          const isActive = activeQari === qari.id;

          return (
            <div
              key={qari.id}
              onClick={() => handleSelectQari(qari.id, isLocked)}
              className={cn(
                "relative p-8 rounded-2xl transition-all duration-500 flex flex-col items-center text-center overflow-hidden",
                isLocked 
                  ? "bg-navy-950/60 border border-navy-800/50 cursor-not-allowed opacity-60 grayscale" 
                  : `bg-gradient-to-b ${qari.theme.gradient} border border-navy-700 hover:border-gold-500/80 hover:shadow-[0_10px_40px_-10px_rgba(212,175,55,0.3)] hover:-translate-y-2 cursor-pointer group backdrop-blur-sm`,
                isActive && `border-gold-500 ${qari.theme.shadow} ring-1 ${qari.theme.ring} bg-gradient-to-b ${qari.theme.gradient}`
              )}
            >
              {/* Card Hover Gradient Effect */}
              {!isLocked && (
                <div className="absolute inset-0 bg-gradient-to-b from-gold-500/0 via-gold-500/0 to-gold-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              )}
              {isLocked && (
                <div className="absolute top-4 left-4 w-10 h-10 bg-navy-900 rounded-full flex items-center justify-center border border-navy-800 shadow-inner">
                  <Lock className="w-5 h-5 text-navy-500" />
                </div>
              )}
              
              <div className={cn(
                "w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-transform duration-500 shadow-lg border",
                isLocked 
                  ? "bg-navy-900 text-navy-600 border-navy-800" 
                  : "bg-navy-950 text-gold-500 group-hover:scale-110 border-gold-500/30"
              )}>
                <BookOpen className="w-8 h-8" />
              </div>
              
              <h2 className={cn(
                "text-2xl font-bold mb-3",
                isLocked ? "text-navy-500" : "text-white"
              )}>
                {qari.name}
              </h2>
              
              <p className={cn(
                "text-sm leading-relaxed flex-1",
                isLocked ? "text-navy-600" : "text-navy-200"
              )}>
                {qari.description}
              </p>

              {!isLocked && (
                <div className="mt-6 flex items-center text-gold-500 font-bold opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-y-0 translate-y-2">
                  دخول البوابة
                  <ChevronLeft className="w-5 h-5 ml-1" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {activeQari && (
        <div className="flex justify-center mt-12 pb-12">
          <button 
            onClick={resetProgress}
            className="flex items-center gap-2 text-navy-400 hover:text-red-400 transition-colors text-sm font-medium bg-navy-950/50 px-4 py-2 rounded-full"
          >
            <RefreshCcw className="w-4 h-4" />
            إعادة ضبط التقدم (لأغراض العرض)
          </button>
        </div>
      )}
    </div>
  );
}
