const fs = require('fs');
let content = fs.readFileSync('src/pages/Lesson.tsx', 'utf-8');

content = content.replace("const { completeLesson, completedLessons, lessonNotes, saveLessonNote } = useProgress();", "const { completeLesson, completedLessons, lessonNotes, saveLessonNote, lessonTimeSpent, updateLessonTime } = useProgress();");

const timeEffect = `
  const totalTime = lessonTimeSpent[lessonGlobalId] || 0;
  
  useEffect(() => {
    const timer = setInterval(() => {
      updateLessonTime(lessonGlobalId, 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [lessonGlobalId, updateLessonTime]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return \`\${m}:\${s.toString().padStart(2, '0')}\`;
  };
`;

if (!content.includes('const formatTime = (seconds: number) => {')) {
  content = content.replace("const [noteContent, setNoteContent] = useState('');", timeEffect + "\n  const [noteContent, setNoteContent] = useState('');");
}

fs.writeFileSync('src/pages/Lesson.tsx', content);

// Fix App.tsx
let appContent = fs.readFileSync('src/App.tsx', 'utf-8');
appContent = appContent.replace("import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';", "import React from 'react';\nimport { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';");
fs.writeFileSync('src/App.tsx', appContent);

