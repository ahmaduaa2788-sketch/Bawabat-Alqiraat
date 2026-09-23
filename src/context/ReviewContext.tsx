import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { db } from '../lib/firebase';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';

export interface MistakeItem {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  userAnswer?: number;
  sourceQuiz: string;
  rawiId?: string;
  unitId?: string;
  timesWrong: number;
  lastWrongAt: string;
  mastered: boolean;
}

interface ReviewContextType {
  mistakes: Record<string, MistakeItem>;
  unmasteredMistakes: MistakeItem[];
  masteredCount: number;
  totalMistakesCount: number;
  recordMistake: (item: Omit<MistakeItem, 'timesWrong' | 'lastWrongAt' | 'mastered'>) => void;
  markMastered: (questionId: string) => void;
  unmarkMastered: (questionId: string) => void;
  removeMistake: (questionId: string) => void;
  clearAllMistakes: () => void;
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

export function ReviewProvider({ children }: { children: React.ReactNode }) {
  const { userData, role } = useAuth();
  const [mistakes, setMistakes] = useState<Record<string, MistakeItem>>(() => {
    try {
      const saved = localStorage.getItem('student_mistakes_cache');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Sync from Firestore for logged-in student
  useEffect(() => {
    if (role === 'student' && userData?.id) {
      const docRef = doc(db, 'studentMistakes', userData.id);
      const unsubscribe = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data?.mistakes) {
            setMistakes(data.mistakes);
            localStorage.setItem('student_mistakes_cache', JSON.stringify(data.mistakes));
          }
        }
      }, (err) => {
        console.error("Error subscribing to student mistakes:", err);
      });

      return () => unsubscribe();
    } else {
      // Local storage for guests or admin
      try {
        const saved = localStorage.getItem('student_mistakes_cache');
        if (saved) {
          setMistakes(JSON.parse(saved));
        }
      } catch (err) {
        console.error(err);
      }
    }
  }, [role, userData?.id]);

  // Helper to persist mistakes
  const persistMistakes = async (newMistakes: Record<string, MistakeItem>) => {
    setMistakes(newMistakes);
    try {
      localStorage.setItem('student_mistakes_cache', JSON.stringify(newMistakes));
    } catch (err) {
      console.error("Local storage error:", err);
    }

    if (role === 'student' && userData?.id) {
      try {
        const docRef = doc(db, 'studentMistakes', userData.id);
        await setDoc(docRef, {
          mistakes: newMistakes,
          updatedAt: new Date().toISOString()
        }, { merge: true });
      } catch (err) {
        console.error("Error saving mistakes to Firestore:", err);
      }
    }
  };

  const recordMistake = (item: Omit<MistakeItem, 'timesWrong' | 'lastWrongAt' | 'mastered'>) => {
    setMistakes(prev => {
      const existing = prev[item.id];
      const updated: MistakeItem = {
        ...item,
        timesWrong: (existing?.timesWrong || 0) + 1,
        lastWrongAt: new Date().toISOString(),
        mastered: false
      };
      const nextState = { ...prev, [item.id]: updated };
      persistMistakes(nextState);
      return nextState;
    });
  };

  const markMastered = (questionId: string) => {
    setMistakes(prev => {
      if (!prev[questionId]) return prev;
      const nextState = {
        ...prev,
        [questionId]: {
          ...prev[questionId],
          mastered: true
        }
      };
      persistMistakes(nextState);
      return nextState;
    });
  };

  const unmarkMastered = (questionId: string) => {
    setMistakes(prev => {
      if (!prev[questionId]) return prev;
      const nextState = {
        ...prev,
        [questionId]: {
          ...prev[questionId],
          mastered: false
        }
      };
      persistMistakes(nextState);
      return nextState;
    });
  };

  const removeMistake = (questionId: string) => {
    setMistakes(prev => {
      const nextState = { ...prev };
      delete nextState[questionId];
      persistMistakes(nextState);
      return nextState;
    });
  };

  const clearAllMistakes = () => {
    persistMistakes({});
  };

  const allItems: MistakeItem[] = Object.values(mistakes);
  const unmasteredMistakes = allItems.filter(m => !m.mastered);
  const masteredCount = allItems.filter(m => m.mastered).length;
  const totalMistakesCount = allItems.length;

  return (
    <ReviewContext.Provider value={{
      mistakes,
      unmasteredMistakes,
      masteredCount,
      totalMistakesCount,
      recordMistake,
      markMastered,
      unmarkMastered,
      removeMistake,
      clearAllMistakes
    }}>
      {children}
    </ReviewContext.Provider>
  );
}

export function useReview() {
  const context = useContext(ReviewContext);
  if (!context) {
    throw new Error('useReview must be used within a ReviewProvider');
  }
  return context;
}
