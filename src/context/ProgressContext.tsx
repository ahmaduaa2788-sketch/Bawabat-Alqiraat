import React, { createContext, useContext, useState, useEffect } from 'react';

interface ProgressState {
  activeQari: string | null;
  activeRawiByQari: Record<string, string | null>;
  completedTuruq: string[];
}

interface ProgressContextType extends ProgressState {
  selectQari: (qariId: string) => void;
  selectRawi: (qariId: string, rawiId: string) => void;
  completeTariq: (qariId: string, rawiId: string, tariqId: string) => void;
  resetProgress: () => void;
}

const defaultState: ProgressState = {
  activeQari: null,
  activeRawiByQari: {},
  completedTuruq: []
};

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ProgressState>(() => {
    const saved = localStorage.getItem('qiraat_progress');
    return saved ? JSON.parse(saved) : defaultState;
  });

  useEffect(() => {
    localStorage.setItem('qiraat_progress', JSON.stringify(state));
  }, [state]);

  const selectQari = (qariId: string) => {
    setState(prev => ({ ...prev, activeQari: prev.activeQari || qariId }));
  };

  const selectRawi = (qariId: string, rawiId: string) => {
    setState(prev => ({
      ...prev,
      activeRawiByQari: {
        ...prev.activeRawiByQari,
        [qariId]: prev.activeRawiByQari[qariId] || rawiId
      }
    }));
  };

  const completeTariq = (qariId: string, rawiId: string, tariqId: string) => {
    const id = `${qariId}-${rawiId}-${tariqId}`;
    setState(prev => ({
      ...prev,
      completedTuruq: prev.completedTuruq.includes(id) ? prev.completedTuruq : [...prev.completedTuruq, id]
    }));
  };

  const resetProgress = () => {
    setState(defaultState);
  };

  return (
    <ProgressContext.Provider value={{ ...state, selectQari, selectRawi, completeTariq, resetProgress }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}
