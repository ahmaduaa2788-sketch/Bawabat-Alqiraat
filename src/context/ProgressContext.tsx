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
  lessonTimeSpent: Record<string, number>;
  streakDays: number;
  lastActiveDate: string | null;
}

interface ProgressContextType extends ProgressState {
  selectQari: (qariId: string) => void;
  selectRawi: (qariId: string, rawiId: string) => void;
  completeTariq: (qariId: string, rawiId: string, tariqId: string) => void;
  completeLesson: (lessonGlobalId: string) => void;
  saveLessonNote: (lessonGlobalId: string, note: string) => void;
  updateLessonTime: (lessonGlobalId: string, seconds: number) => void;
  updateStreak: () => void;
  resetProgress: () => void;
}

const defaultState: ProgressState = {
  activeQari: null,
  activeRawiByQari: {},
  completedTuruq: [],
  completedLessons: [],
  lessonNotes: {},
  lessonTimeSpent: {},
  streakDays: 0,
  lastActiveDate: null
};

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const { userData, role } = useAuth();
  const [loadedUserId, setLoadedUserId] = useState<string | null>(null);
  
  const [state, setState] = useState<ProgressState>(() => {
    const saved = localStorage.getItem('qiraat_progress_guest') || localStorage.getItem('qiraat_progress');
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...defaultState,
        ...parsed,
        completedTuruq: parsed.completedTuruq || defaultState.completedTuruq,
        completedLessons: parsed.completedLessons || defaultState.completedLessons,
        activeRawiByQari: parsed.activeRawiByQari || defaultState.activeRawiByQari,
        lessonNotes: parsed.lessonNotes || defaultState.lessonNotes,
        lessonTimeSpent: parsed.lessonTimeSpent || defaultState.lessonTimeSpent,
        streakDays: parsed.streakDays || defaultState.streakDays,
        lastActiveDate: parsed.lastActiveDate || defaultState.lastActiveDate,
      };
    }
    return defaultState;
  });

  // Load from Firestore when user logs in
  useEffect(() => {
    setLoadedUserId(null);
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
              lessonTimeSpent: data.lessonTimeSpent || defaultState.lessonTimeSpent,
              streakDays: data.streakDays || defaultState.streakDays,
              lastActiveDate: data.lastActiveDate || defaultState.lastActiveDate,
            });
          } else {
            // New student: reset to default and initialize in Firestore
            setState(defaultState);
            await setDoc(docRef, defaultState);
          }
        } catch (error) {
          console.error("Error loading progress:", error);
        } finally {
          setLoadedUserId(userData.id!);
        }
      };
      loadProgress();
    } else if (role === 'admin' || !userData) {
      // Avoid leaking local progress from other sessions
      const storageKey = `qiraat_progress_${role === 'admin' ? 'admin' : 'guest'}`;
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        setState({ ...defaultState, ...JSON.parse(saved) });
      } else {
        setState(defaultState);
      }
      setLoadedUserId(role === 'admin' ? 'admin' : 'guest');
    }
  }, [role, userData?.id]);

  // Sync to local storage and Firestore when state changes
  useEffect(() => {
    const currentId = role === 'student' && userData?.id ? userData.id : (role === 'admin' ? 'admin' : 'guest');
    if (loadedUserId !== currentId) return;

    const storageKey = role === 'student' && userData?.id ? `qiraat_progress_${userData.id}` : `qiraat_progress_${role === 'admin' ? 'admin' : 'guest'}`;
    localStorage.setItem(storageKey, JSON.stringify(state));
    
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
  }, [state, role, userData?.id, loadedUserId]);

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


  const updateLessonTime = (lessonGlobalId: string, seconds: number) => {
    setState(prev => ({
      ...prev,
      lessonTimeSpent: {
        ...(prev.lessonTimeSpent || {}),
        [lessonGlobalId]: (prev.lessonTimeSpent?.[lessonGlobalId] || 0) + seconds
      }
    }));
  };

  
  const updateStreak = () => {
    setState(prev => {
      const today = new Date().toDateString();
      if (prev.lastActiveDate === today) {
        return prev;
      }
      
      const lastActive = prev.lastActiveDate ? new Date(prev.lastActiveDate) : null;
      let newStreak = prev.streakDays;
      
      if (lastActive) {
        const diffTime = Math.abs(new Date().getTime() - lastActive.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        
        if (diffDays === 1) {
          newStreak += 1;
        } else if (diffDays > 1) {
          newStreak = 1;
        }
      } else {
        newStreak = 1;
      }

      return {
        ...prev,
        streakDays: newStreak,
        lastActiveDate: today
      };
    });
  };

  const resetProgress = () => {
    setState(defaultState);
  };

  return (
    <ProgressContext.Provider value={{ ...state, selectQari, selectRawi, completeTariq, completeLesson, saveLessonNote, updateLessonTime, updateStreak, resetProgress }}>
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

