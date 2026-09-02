const fs = require('fs');

let content = fs.readFileSync('src/context/ProgressContext.tsx', 'utf-8');

// Add lessonTimeSpent to ProgressState
content = content.replace(
  "  lessonNotes: Record<string, string>;\n}",
  "  lessonNotes: Record<string, string>;\n  lessonTimeSpent: Record<string, number>;\n}"
);

// Add updateLessonTime to ProgressContextType
content = content.replace(
  "  saveLessonNote: (lessonGlobalId: string, note: string) => void;",
  "  saveLessonNote: (lessonGlobalId: string, note: string) => void;\n  updateLessonTime: (lessonGlobalId: string, seconds: number) => void;"
);

// Add lessonTimeSpent to defaultState
content = content.replace(
  "  lessonNotes: {}\n};",
  "  lessonNotes: {},\n  lessonTimeSpent: {}\n};"
);

// Add to parsing from localStorage
content = content.replace(
  "lessonNotes: parsed.lessonNotes || defaultState.lessonNotes,",
  "lessonNotes: parsed.lessonNotes || defaultState.lessonNotes,\n        lessonTimeSpent: parsed.lessonTimeSpent || defaultState.lessonTimeSpent,"
);

// Add to loading from Firestore
content = content.replace(
  "lessonNotes: data.lessonNotes || defaultState.lessonNotes,",
  "lessonNotes: data.lessonNotes || defaultState.lessonNotes,\n              lessonTimeSpent: data.lessonTimeSpent || defaultState.lessonTimeSpent,"
);

// Add the updateLessonTime function implementation
const updateLessonTimeFunc = `
  const updateLessonTime = (lessonGlobalId: string, seconds: number) => {
    setState(prev => ({
      ...prev,
      lessonTimeSpent: {
        ...(prev.lessonTimeSpent || {}),
        [lessonGlobalId]: (prev.lessonTimeSpent?.[lessonGlobalId] || 0) + seconds
      }
    }));
  };
`;

content = content.replace(
  "  const resetProgress = () => {",
  updateLessonTimeFunc + "\n  const resetProgress = () => {"
);

// Expose in Provider
content = content.replace(
  "value={{ ...state, selectQari, selectRawi, completeTariq, completeLesson, saveLessonNote, resetProgress }}",
  "value={{ ...state, selectQari, selectRawi, completeTariq, completeLesson, saveLessonNote, updateLessonTime, resetProgress }}"
);

fs.writeFileSync('src/context/ProgressContext.tsx', content);
console.log("ProgressContext updated.");
