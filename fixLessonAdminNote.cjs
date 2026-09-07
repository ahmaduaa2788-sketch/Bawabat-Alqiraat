const fs = require('fs');
let code = fs.readFileSync('src/pages/Lesson.tsx', 'utf-8');

// I need to add Firebase imports to Lesson if they aren't there.
if (!code.includes("import { db } from '../lib/firebase';")) {
  code = code.replace(
    "import { useAuth } from '../context/AuthContext';",
    "import { useAuth } from '../context/AuthContext';\nimport { db } from '../lib/firebase';\nimport { doc, getDoc } from 'firebase/firestore';"
  );
}

// Add state for adminNote
const stateLogic = `  const [noteContent, setNoteContent] = useState('');
  const [adminNote, setAdminNote] = useState('');`;

code = code.replace("  const [noteContent, setNoteContent] = useState('');", stateLogic);

// Add useEffect to fetch admin note
const fetchLogic = `  useEffect(() => {
    setNoteContent(lessonNotes[lessonGlobalId] || '');
  }, [lessonGlobalId, lessonNotes]);
  
  useEffect(() => {
    const fetchAdminNote = async () => {
      try {
        const docRef = doc(db, 'content', 'adminNotes');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && docSnap.data()[lessonGlobalId]) {
          setAdminNote(docSnap.data()[lessonGlobalId]);
        } else {
          setAdminNote('');
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchAdminNote();
  }, [lessonGlobalId]);`;

code = code.replace(
  "  useEffect(() => {\n    setNoteContent(lessonNotes[lessonGlobalId] || '');\n  }, [lessonGlobalId, lessonNotes]);",
  fetchLogic
);

// Display the admin note
const displayNote = `          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
            {lesson.title}
          </h1>`;

const newDisplayNote = `          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
            {lesson.title}
          </h1>
        </div>
      </div>
      
      {adminNote && (
        <div className="mb-8 bg-gold-500/10 border border-gold-500/30 p-6 rounded-2xl animate-in slide-in-from-bottom-4">
          <div className="flex items-center gap-2 mb-3">
            <StickyNote className="w-5 h-5 text-gold-400" />
            <h3 className="font-bold text-gold-400">ملاحظات وتوجيهات الإدارة:</h3>
          </div>
          <div className="text-navy-100 leading-relaxed whitespace-pre-wrap">
            {adminNote}
          </div>
        </div>
      )}
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hidden">
        <div></div>`; // The hidden div is just to keep the matching balanced if we replaced closing tags

const oldHeaderArea = `          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
            {lesson.title}
          </h1>
          <div className="flex items-center gap-3">
            <div className="bg-navy-950 px-4 py-2 rounded-lg border border-navy-800 flex items-center gap-2">
              <Clock className="w-4 h-4 text-gold-500" />
              <span className="text-navy-200 font-mono font-bold">{formatTime(totalTime)}</span>
            </div>
            <button
              onClick={handleMarkCompleteAndContinue}
              className="bg-gold-500 text-navy-950 font-bold px-6 py-2 rounded-xl hover:bg-gold-400 transition flex items-center gap-2 shadow-lg shadow-gold-500/20"
            >
              <CheckCircle className="w-5 h-5" /> إتمام ومتابعة
            </button>
          </div>
        </div>
      </div>`;

const newHeaderArea = `          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
            {lesson.title}
          </h1>
          <div className="flex items-center gap-3">
            <div className="bg-navy-950 px-4 py-2 rounded-lg border border-navy-800 flex items-center gap-2">
              <Clock className="w-4 h-4 text-gold-500" />
              <span className="text-navy-200 font-mono font-bold">{formatTime(totalTime)}</span>
            </div>
            <button
              onClick={handleMarkCompleteAndContinue}
              className="bg-gold-500 text-navy-950 font-bold px-6 py-2 rounded-xl hover:bg-gold-400 transition flex items-center gap-2 shadow-lg shadow-gold-500/20"
            >
              <CheckCircle className="w-5 h-5" /> إتمام ومتابعة
            </button>
          </div>
        </div>
      </div>
      
      {adminNote && (
        <div className="mb-8 bg-gold-500/10 border border-gold-500/30 p-6 rounded-2xl animate-in slide-in-from-bottom-4 shadow-lg shadow-gold-500/5">
          <div className="flex items-center gap-2 mb-3 border-b border-gold-500/20 pb-3">
            <StickyNote className="w-5 h-5 text-gold-400" />
            <h3 className="font-bold text-gold-400 text-lg">توجيهات وملاحظات إضافية</h3>
          </div>
          <div className="text-navy-100 leading-relaxed whitespace-pre-wrap text-lg">
            {adminNote}
          </div>
        </div>
      )}`;

code = code.replace(oldHeaderArea, newHeaderArea);

fs.writeFileSync('src/pages/Lesson.tsx', code);
