const fs = require('fs');

let quizCode = fs.readFileSync('src/components/ComprehensiveQuiz.tsx', 'utf-8');

// Add imports
quizCode = quizCode.replace(
  "import { questionBank, Question } from '../data/questionsBank';",
  "import { questionBank as defaultQuestionBank, Question } from '../data/questionsBank';\nimport { db } from '../lib/firebase';\nimport { doc, getDoc } from 'firebase/firestore';"
);

// Replace hook logic
const oldUseEffect = `useEffect(() => {
    // Select up to 30 random questions from the bank
    const shuffled = shuffleArray(questionBank);
    const selected = shuffled.slice(0, 30);
    setQuestions(selected);
  }, []);`;

const newUseEffect = `const [allQuestions, setAllQuestions] = useState<Question[]>(defaultQuestionBank);
  const QUESTION_COUNT = 40;

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const docRef = doc(db, 'content', 'questions');
        const docSnap = await getDoc(docRef);
        let loadedQuestions = defaultQuestionBank;
        if (docSnap.exists() && docSnap.data().questions) {
          loadedQuestions = docSnap.data().questions;
        }
        setAllQuestions(loadedQuestions);
        const shuffled = shuffleArray(loadedQuestions);
        const selected = shuffled.slice(0, QUESTION_COUNT);
        setQuestions(selected);
      } catch (err) {
        console.error(err);
        const shuffled = shuffleArray(defaultQuestionBank);
        const selected = shuffled.slice(0, QUESTION_COUNT);
        setQuestions(selected);
      }
    };
    loadQuestions();
  }, []);`;

quizCode = quizCode.replace(oldUseEffect, newUseEffect);

// Replace reset logic
const oldReset = `const resetQuiz = () => {
    const shuffled = shuffleArray(questionBank);
    const selected = shuffled.slice(0, 30);
    setQuestions(selected);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizFinished(false);
  };`;

const newReset = `const resetQuiz = () => {
    const shuffled = shuffleArray(allQuestions);
    const selected = shuffled.slice(0, QUESTION_COUNT);
    setQuestions(selected);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizFinished(false);
  };`;

quizCode = quizCode.replace(oldReset, newReset);

fs.writeFileSync('src/components/ComprehensiveQuiz.tsx', quizCode);
