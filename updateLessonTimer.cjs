const fs = require('fs');

let content = fs.readFileSync('src/pages/Lesson.tsx', 'utf-8');

// Add to imports if needed, but we already have useProgress. We just need to import Clock from lucide-react if not there.
if (!content.includes('Clock')) {
    content = content.replace("import { ArrowRight, ArrowLeft, CheckCircle, Save, StickyNote } from 'lucide-react';", "import { ArrowRight, ArrowLeft, CheckCircle, Save, StickyNote, Clock } from 'lucide-react';");
}

const progressHooks = "  const { completeLesson, completedLessons, lessonNotes, saveLessonNote, updateLessonTime, lessonTimeSpent } = useProgress();";
content = content.replace("  const { completeLesson, completedLessons, lessonNotes, saveLessonNote } = useProgress();", progressHooks);

const timerLogic = `
  const [sessionTime, setSessionTime] = useState(0);

  useEffect(() => {
    // Reset session time when lesson changes
    setSessionTime(0);
    const interval = setInterval(() => {
      setSessionTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [lessonGlobalId]);

  useEffect(() => {
    // Save every 30 seconds
    if (sessionTime > 0 && sessionTime % 30 === 0) {
      updateLessonTime(lessonGlobalId, 30);
    }
  }, [sessionTime, lessonGlobalId, updateLessonTime]);

  useEffect(() => {
    // Save leftover time on unmount
    return () => {
      if (sessionTime % 30 !== 0) {
        updateLessonTime(lessonGlobalId, sessionTime % 30);
      }
    };
  }, [sessionTime, lessonGlobalId, updateLessonTime]);

  const totalTime = (lessonTimeSpent?.[lessonGlobalId] || 0) + sessionTime;
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return \`\${m}:\${s < 10 ? '0' : ''}\${s}\`;
  };
`;

content = content.replace("  const [noteContent, setNoteContent] = useState('');", timerLogic + "\n  const [noteContent, setNoteContent] = useState('');");

// Insert UI for the timer next to the Back Button or title.
const titleUI = `
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <button 
            onClick={() => navigate(\`/course/\${qariId}/\${rawiId}/\${tariqId}\`)}
            className="text-navy-300 hover:text-white mb-4 flex items-center gap-2 transition"
          >
            <ArrowRight className="w-5 h-5" />
            العودة للمسار
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{lessonData.title}</h1>
          <p className="text-gold-400">{courseMap.find(u => u.id === unitId)?.title}</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-navy-800/80 border border-navy-700 text-navy-200 px-4 py-2 rounded-xl flex items-center gap-2 font-mono text-lg shadow-lg">
            <Clock className="w-5 h-5 text-gold-500" />
            {formatTime(totalTime)}
          </div>
        </div>
      </div>
`;

// Let's find what the actual header looks like.
