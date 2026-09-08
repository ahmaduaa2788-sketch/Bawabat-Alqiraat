const fs = require('fs');
const path = 'src/context/ProgressContext.tsx';
let code = fs.readFileSync(path, 'utf8');

const regex1 = /export function ProgressProvider\(\{ children \}: \{ children: React\.ReactNode \}\) \{\s*const \{ userData, role \} = useAuth\(\);\s*const \[state, setState\] = useState<ProgressState>\(\(\) => \{/m;
const replacement1 = `export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const { userData, role } = useAuth();
  const [loadedUserId, setLoadedUserId] = useState<string | null>(null);
  
  const [state, setState] = useState<ProgressState>(() => {`;

const regex2 = /\/\/ Load from Firestore when user logs in\s*useEffect\(\(\) => \{[\s\S]*?\}, \[state, role, userData\?\.id\]\);/m;
const replacement2 = `// Load from Firestore when user logs in
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
      const storageKey = \`qiraat_progress_\${role === 'admin' ? 'admin' : 'guest'}\`;
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

    const storageKey = role === 'student' && userData?.id ? \`qiraat_progress_\${userData.id}\` : \`qiraat_progress_\${role === 'admin' ? 'admin' : 'guest'}\`;
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
  }, [state, role, userData?.id, loadedUserId]);`;

if (regex1.test(code) && regex2.test(code)) {
    code = code.replace(regex1, replacement1);
    code = code.replace(regex2, replacement2);
    fs.writeFileSync(path, code);
    console.log("Replaced successfully!");
} else {
    console.log("Could not match regex.");
}
