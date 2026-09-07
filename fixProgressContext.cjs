const fs = require('fs');
let code = fs.readFileSync('src/context/ProgressContext.tsx', 'utf-8');

// Replace the load from Firestore logic to reset state for new users
const oldLoadLogic = `          if (docSnap.exists()) {
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
            // Initialize in Firestore
            await setDoc(docRef, state);
          }`;

const newLoadLogic = `          if (docSnap.exists()) {
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
          }`;

code = code.replace(oldLoadLogic, newLoadLogic);

// Add an effect to clear progress if role is admin to avoid them seeing leaked student/guest progress
const oldDeps = `      loadProgress();
    }
  }, [role, userData?.id]);`;

const newDeps = `      loadProgress();
    } else if (role === 'admin' || !userData) {
      // Avoid leaking local progress from other sessions
      const storageKey = \`qiraat_progress_\${role === 'admin' ? 'admin' : 'guest'}\`;
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        setState({ ...defaultState, ...JSON.parse(saved) });
      } else {
        setState(defaultState);
      }
    }
  }, [role, userData?.id]);`;

code = code.replace(oldDeps, newDeps);

// Change the localStorage save to scope by user/role
const oldSave = `localStorage.setItem('qiraat_progress', JSON.stringify(state));`;
const newSave = `const storageKey = role === 'student' && userData?.id ? \`qiraat_progress_\${userData.id}\` : \`qiraat_progress_\${role === 'admin' ? 'admin' : 'guest'}\`;
    localStorage.setItem(storageKey, JSON.stringify(state));`;

code = code.replace(oldSave, newSave);

// Change the initial state loader to also check the storageKey
const oldInit = `const saved = localStorage.getItem('qiraat_progress');`;
const newInit = `const saved = localStorage.getItem('qiraat_progress_guest') || localStorage.getItem('qiraat_progress');`;

code = code.replace(oldInit, newInit);

fs.writeFileSync('src/context/ProgressContext.tsx', code);
