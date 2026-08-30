import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { db } from '../lib/firebase';
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';

interface ProgressState {
  activeQari: string | null;
  activeRawiByQari: Record<string, string | null>;
  completedTuruq: string[];
  completedLessons: string[];
  lessonNotes: Record<string, string>;
}

interface ProgressContextType extends ProgressState {
  selectQari: (qariId: string) => void;
  selectRawi: (qariId: string, rawiId: string) => void;
  completeTariq: (qariId: string, rawiId: string, tariqId: string) => void;
  completeLesson: (lessonGlobalId: string) => void;
  saveLessonNote: (lessonGlobalId: string, note: string) => void;
  resetProgress: () => void;
}

const defaultState: ProgressState = {
  activeQari: null,
  activeRawiByQari: {},
  completedTuruq: [],
  completedLessons: [],
  lessonNotes: {}
};

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const { userData, role } = useAuth();
  
  const [state, setState] = useState<ProgressState>(() => {
    const saved = localStorage.getItem('qiraat_progress');
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...defaultState,
        ...parsed,
        completedTuruq: parsed.completedTuruq || defaultState.completedTuruq,
        completedLessons: parsed.completedLessons || defaultState.completedLessons,
        activeRawiByQari: parsed.activeRawiByQari || defaultState.activeRawiByQari,
        lessonNotes: parsed.lessonNotes || defaultState.lessonNotes,
      };
    }
    return defaultState;
  });

  // Load from Firestore when user logs in
  useEffect(() => {
    if (role === 'student' && userData?.id) {
      const loadProgress = async () => {
        try {
          const docRef = doc(db, 'studentProgress', userData.id!);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            const data = docSnap.data();
            setState({
              ...defaultState,
              ...data,
              completedTuruq: data.completedTuruq || defaultState.completedTuruq,
              completedLessons: data.completedLessons || defaultState.completedLessons,
              activeRawiByQari: data.activeRawiByQari || defaultState.activeRawiByQari,
              lessonNotes: data.lessonNotes || defaultState.lessonNotes,
            });
          } else {
            // Initialize in Firestore
            await setDoc(docRef, state);
          }
        } catch (error) {
          console.error("Error loading progress:", error);
        }
      };
      loadProgress();
    }
  }, [role, userData?.id]);

  // Sync to local storage and Firestore when state changes
  useEffect(() => {
    localStorage.setItem('qiraat_progress', JSON.stringify(state));
    
    if (role === 'student' && userData?.id) {
      const saveProgress = async () => {
        try {
          const docRef = doc(db, 'studentProgress', userData.id!);
          await setDoc(docRef, state, { merge: true });
        } catch (error) {
          console.error("Error saving progress:", error);
        }
      };
      saveProgress();
    }
  }, [state, role, userData?.id]);

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
    setState(prev => {
      const currentTuruq = prev.completedTuruq || [];
      return {
        ...prev,
        completedTuruq: currentTuruq.includes(id) ? currentTuruq : [...currentTuruq, id]
      };
    });
  };

  const completeLesson = (lessonGlobalId: string) => {
    setState(prev => {
      // Ensure completedLessons array exists for backward compatibility
      const currentLessons = prev.completedLessons || [];
      if (currentLessons.includes(lessonGlobalId)) return prev;
      return {
        ...prev,
        completedLessons: [...currentLessons, lessonGlobalId]
      };
    });
  };

  const saveLessonNote = (lessonGlobalId: string, note: string) => {
    setState(prev => ({
      ...prev,
      lessonNotes: {
        ...(prev.lessonNotes || {}),
        [lessonGlobalId]: note
      }
    }));
  };

  const resetProgress = () => {
    setState(defaultState);
  };

  return (
    <ProgressContext.Provider value={{ ...state, selectQari, selectRawi, completeTariq, completeLesson, saveLessonNote, resetProgress }}>
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

