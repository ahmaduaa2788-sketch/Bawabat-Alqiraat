import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { db } from '../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { courseMap } from '../data/courseMap';
import { qalunCourseMap } from '../data/qalunCourseMap';

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

export interface UnitProgressInfo {
  totalLessons: number;
  completedCount: number;
  percent: number;
  isComplete: boolean;
}

export interface CourseProgressInfo {
  totalLessons: number;
  completedCount: number;
  percent: number;
  completedUnits: string[];
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
  // Progress calculations
  getCourseProgress: (rawiId?: string) => CourseProgressInfo;
  getUnitProgress: (rawiId: string, unitId: string) => UnitProgressInfo;
  isUnitCompleted: (rawiId: string, unitId: string) => boolean;
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

  // Calculate course progress
  const getCourseProgress = (rawiId: string = 'warsh'): CourseProgressInfo => {
    const map = rawiId === 'qalun' ? qalunCourseMap : courseMap;
    let totalLessons = 0;
    let completedCount = 0;
    const completedUnits: string[] = [];

    map.forEach(unit => {
      const unitLessons = unit.lessons || [];
      totalLessons += unitLessons.length;
      
      const unitCompletedLessons = unitLessons.filter(l => 
        state.completedLessons.includes(`${rawiId}-${unit.id}-${l.id}`)
      );
      
      completedCount += unitCompletedLessons.length;

      if (unitLessons.length > 0 && unitCompletedLessons.length === unitLessons.length) {
        completedUnits.push(unit.id);
      }
    });

    const percent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
    return { totalLessons, completedCount, percent, completedUnits };
  };

  const getUnitProgress = (rawiId: string, unitId: string): UnitProgressInfo => {
    const map = rawiId === 'qalun' ? qalunCourseMap : courseMap;
    const unit = map.find(u => u.id === unitId);
    if (!unit) return { totalLessons: 0, completedCount: 0, percent: 0, isComplete: false };

    const unitLessons = unit.lessons || [];
    const totalLessons = unitLessons.length;
    const completedCount = unitLessons.filter(l => 
      state.completedLessons.includes(`${rawiId}-${unit.id}-${l.id}`)
    ).length;

    const percent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
    const isComplete = totalLessons > 0 && completedCount === totalLessons;

    return { totalLessons, completedCount, percent, isComplete };
  };

  const isUnitCompleted = (rawiId: string, unitId: string): boolean => {
    return getUnitProgress(rawiId, unitId).isComplete;
  };

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
            await setDoc(docRef, {
              ...defaultState,
              courseProgressPercent: 0,
              completedUnits: [],
              updatedAt: new Date().toISOString()
            });
          }
        } catch (error) {
          console.error("Error loading progress:", error);
        } finally {
          setLoadedUserId(userData.id!);
        }
      };
      loadProgress();
    } else if (role === 'admin' || !userData) {
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
          const warshProgress = getCourseProgress('warsh');
          const qalunProgress = getCourseProgress('qalun');
          
          const docRef = doc(db, 'studentProgress', userData.id!);
          await setDoc(docRef, {
            ...state,
            warshProgress: warshProgress.percent,
            qalunProgress: qalunProgress.percent,
            completedUnitsWarsh: warshProgress.completedUnits,
            completedUnitsQalun: qalunProgress.completedUnits,
            totalCompletedLessonsCount: state.completedLessons.length,
            updatedAt: new Date().toISOString()
          }, { merge: true });
        } catch (error) {
          console.error("Error saving progress to Firebase:", error);
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
    <ProgressContext.Provider value={{ 
      ...state, 
      selectQari, 
      selectRawi, 
      completeTariq, 
      completeLesson, 
      saveLessonNote, 
      updateLessonTime, 
      updateStreak, 
      resetProgress,
      getCourseProgress,
      getUnitProgress,
      isUnitCompleted
    }}>
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
