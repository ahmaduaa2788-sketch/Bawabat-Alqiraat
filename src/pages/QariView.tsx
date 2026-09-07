import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { qiraatTree } from '../data/qiraatTree';
import { useProgress } from '../context/ProgressContext';
import { useAuth } from '../context/AuthContext';
import { Lock, BookOpen, ChevronLeft, ChevronRight, Unlock } from 'lucide-react';
import { cn } from '../lib/utils';

export function QariView() {
  const { qariId } = useParams<{ qariId: string }>();
  const navigate = useNavigate();
  const { role } = useAuth();
  const { activeRawiByQari, selectRawi, completedTuruq } = useProgress();

  const qari = qiraatTree.find(q => q.id === qariId);

  if (!qari) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-white">القارئ غير موجود</h2>
        <Link to="/" className="text-gold-500 hover:text-gold-400 transition mt-4 inline-block">العودة للبوابة</Link>
      </div>
    );
  }

  const activeRawi = activeRawiByQari[qari.id];

  // Helper to check if a specific track is complete
  const isBaseTariqComplete = (rId: string) => completedTuruq.includes(`${qari.id}-${rId}-shatibiyyah`);

  // Check if both Shatibiyyah tracks are complete for unlocking Tayyibah
  const allBaseTuruqComplete = qari.ruwat.every(r => isBaseTariqComplete(r.id));

  // Determine if a rawi should be locked
  const getRawiLockStatus = (rawiId: string) => {
    if (role === 'admin') return false;
    if (completedTuruq.length > 0) return false;
    // If this rawi is complete, it is never locked.
    if (isBaseTariqComplete(rawiId)) return false;
    
    // If there is an active rawi, AND it's not this one, AND the active one isn't complete -> lock this one.
    if (activeRawi && activeRawi !== rawiId) {
      if (!isBaseTariqComplete(activeRawi)) {
        return true;
      }
    }
    return false;
  };

  const handleSelectRawi = (rawiId: string, isLocked: boolean) => {
    if (isLocked) return;
    selectRawi(qari.id, rawiId);
  };

  const handleTariqClick = (rawiId: string, tariqId: string, isLocked: boolean) => {
    if (isLocked) return;
    navigate(`/course/${qari.id}/${rawiId}/${tariqId}`);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20">
      <div className="flex items-center gap-4 py-6 border-b border-navy-700">
        <Link to="/" className="p-2 bg-navy-800 hover:bg-navy-700 rounded-lg transition-colors text-navy-300 hover:text-white">
          <ChevronRight className="w-6 h-6" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white drop-shadow-sm">{qari.name}</h1>
          <p className="text-navy-300 mt-1">{qari.description}</p>
        </div>
      </div>

      <div className="space-y-12">
        <div className="bg-navy-800/80 border-r-4 border-gold-500 p-6 rounded-l-xl backdrop-blur-sm shadow-lg shadow-navy-950/50">
          <h3 className="text-lg font-bold text-gold-400 mb-2">تعليمات المنهجية</h3>
          <p className="text-navy-100 leading-relaxed">
            الرجاء اختيار الراوي للبدء. بمجرد اختيار راوٍ، سيتم إغلاق الراوي الآخر حتى تنتهي من دراسة أصول الأول. 
            تتم دراسة طريق الشاطبية أولاً. لا يُفتح طريق الطيبة إلا بعد اجتياز الشاطبية لجميع الرواة.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {qari.ruwat.map((rawi) => {
            const isRawiLocked = getRawiLockStatus(rawi.id);
            const isRawiActive = activeRawi === rawi.id;
            const isRawiComplete = isBaseTariqComplete(rawi.id);

            return (
              <div 
                key={rawi.id}
                className={cn(
                  "border rounded-2xl overflow-hidden flex flex-col transition-all duration-500 shadow-xl relative",
                  isRawiLocked ? "border-navy-800 bg-navy-950/60 opacity-70 grayscale" : `bg-gradient-to-b ${rawi.theme.gradient} border-navy-700 hover:border-gold-500/50 hover:shadow-[0_10px_30px_-10px_rgba(212,175,55,0.2)]`,
                  isRawiActive && !isRawiComplete && `border-gold-500 ${rawi.theme.shadow} ring-1 ${rawi.theme.ring}`,
                  isRawiComplete && `border-green-500/50 bg-gradient-to-b ${rawi.theme.gradient}`
                )}
              >
                {!isRawiLocked && (
                  <div className="absolute inset-0 bg-gradient-to-b from-gold-500/0 via-gold-500/0 to-gold-500/5 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                )}
                <div 
                  className={cn(
                    "p-6 flex items-center justify-between cursor-pointer transition-colors relative z-10",
                    isRawiLocked ? "hover:bg-transparent" : "hover:bg-navy-700/50",
                    isRawiActive ? "bg-navy-950 text-white" : "text-white"
                  )}
                  onClick={() => handleSelectRawi(rawi.id, isRawiLocked)}
                >
                  <div>
                    <h2 className="text-2xl font-bold mb-1 flex items-center gap-3">
                      {rawi.name}
                      {isRawiLocked && <Lock className="w-5 h-5 text-navy-500" />}
                      {isRawiComplete && <Unlock className="w-5 h-5 text-green-400" />}
                    </h2>
                    <p className={cn("text-sm", isRawiActive ? "text-navy-300" : "text-navy-400")}>
                      {rawi.description}
                    </p>
                  </div>
                  
                  {!isRawiLocked && !isRawiActive && !isRawiComplete && (
                    <button className="bg-gold-500 text-navy-950 px-6 py-2 rounded-lg font-bold hover:bg-gold-400 transition shadow-md">
                      اختيار
                    </button>
                  )}
                  {isRawiActive && !isRawiComplete && (
                    <div className="bg-gold-500 text-navy-950 px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2 shadow-sm">
                      مفعل
                    </div>
                  )}
                  {isRawiComplete && (
                    <div className="bg-green-500/20 text-green-400 border border-green-500/30 px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2">
                      مكتمل
                    </div>
                  )}
                </div>

                <div className={cn(
                  "p-6 flex-1 flex flex-col gap-4 border-t transition-all duration-500",
                  role === 'admin' || isRawiActive || isRawiComplete 
                    ? "opacity-100 translate-y-0 border-navy-700/50 bg-navy-800/50" 
                    : "opacity-50 pointer-events-none grayscale border-navy-800 bg-navy-900/20 hidden"
                )}>
                  <h3 className="font-bold text-navy-200 mb-2">الطرق المتاحة:</h3>
                  
                  {rawi.turuq.map((tariq) => {
                    let isTariqLocked = false;
                    let lockReason = "";
                    
                    if (!tariq.isBase) {
                      isTariqLocked = !allBaseTuruqComplete;
                      lockReason = "يجب إنهاء الشاطبية لجميع الرواة أولاً";
                    }
                    if (role === 'admin') isTariqLocked = false;

                    const isTariqComplete = completedTuruq.includes(`${qari.id}-${rawi.id}-${tariq.id}`);
                    const isActiveRawiOrComplete = role === 'admin' || isRawiActive || isRawiComplete;

                    return (
                      <div 
                        key={tariq.id}
                        onClick={() => handleTariqClick(rawi.id, tariq.id, isTariqLocked || !isActiveRawiOrComplete)}
                        className={cn(
                          "p-4 rounded-xl border flex items-center justify-between group transition-all",
                          isTariqLocked 
                            ? "bg-navy-900/50 border-navy-800 cursor-not-allowed" 
                            : "bg-navy-700/30 border-navy-600 hover:border-gold-500 hover:bg-navy-700/60 cursor-pointer shadow-sm",
                          isTariqComplete && "border-green-500/50 bg-green-900/10"
                        )}
                      >
                        <div className="flex items-center gap-4">
                          <div className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center border",
                            isTariqLocked ? "bg-navy-900 text-navy-600 border-navy-800" : 
                            isTariqComplete ? "bg-green-500/20 text-green-400 border-green-500/30" : "bg-navy-950 text-gold-500 border-gold-500/30 group-hover:scale-110 transition"
                          )}>
                            {isTariqLocked ? <Lock className="w-5 h-5" /> : isTariqComplete ? <Unlock className="w-5 h-5" /> : <BookOpen className="w-5 h-5" />}
                          </div>
                          <div>
                            <h4 className={cn(
                              "font-bold text-lg",
                              isTariqLocked ? "text-navy-500" : 
                              isTariqComplete ? "text-green-400" : "text-white"
                            )}>
                              {tariq.name}
                            </h4>
                            {isTariqLocked && (
                              <p className="text-xs text-red-400/80 mt-1">{lockReason}</p>
                            )}
                            {isTariqComplete && (
                              <p className="text-xs text-green-400 mt-1 font-medium">مكتمل</p>
                            )}
                          </div>
                        </div>

                        {!isTariqLocked && !isTariqComplete && (
                          <ChevronLeft className="w-5 h-5 text-navy-400 group-hover:text-gold-500 transition-transform group-hover:-translate-x-1" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
