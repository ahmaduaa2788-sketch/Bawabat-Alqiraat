const fs = require('fs');
const path = 'src/pages/Admin.tsx';
let code = fs.readFileSync(path, 'utf8');

// 1. Add studentProgressMap state
const stateRegex = /const \[students, setStudents\] = useState<StudentRecord\[\]>\(\[\]\);/;
if (stateRegex.test(code)) {
    code = code.replace(stateRegex, `const [students, setStudents] = useState<StudentRecord[]>([]);\n  const [studentProgressMap, setStudentProgressMap] = useState<Record<string, any>>({});`);
} else {
    console.log("Could not find state");
}

// 2. Add real-time listener and cleanup
const effectRegex = /const unsubscribeStudents = onSnapshot\(collection\(db, 'students'\), \(snapshot\) => \{[\s\S]*?\}\);\s*return \(\) => \{\s*unsubscribeTeachers\(\);\s*unsubscribeStudents\(\);\s*\};/m;
if (effectRegex.test(code)) {
    code = code.replace(effectRegex, `const unsubscribeStudents = onSnapshot(collection(db, 'students'), (snapshot) => {
        const studentsData: StudentRecord[] = [];
        snapshot.forEach((doc) => {
          studentsData.push({ id: doc.id, ...doc.data() } as StudentRecord);
        });
        setStudents(studentsData);
      });

      // Real-time listener for student progress
      const unsubscribeProgress = onSnapshot(collection(db, 'studentProgress'), (snapshot) => {
        const progressData: Record<string, any> = {};
        snapshot.forEach((doc) => {
          progressData[doc.id] = doc.data();
        });
        setStudentProgressMap(progressData);
      });

      return () => {
        unsubscribeTeachers();
        unsubscribeStudents();
        unsubscribeProgress();
      };`);
} else {
    console.log("Could not find effect logic");
}

// 3. Update table headers
const headerRegex = /<th className="pb-4 font-bold">المسار الحالي<\/th>\s*<th className="pb-4 font-bold">الحالة<\/th>\s*<th className="pb-4 font-bold">الإجراء<\/th>/;
if (headerRegex.test(code)) {
    code = code.replace(headerRegex, `<th className="pb-4 font-bold">المسار الحالي</th>
                    <th className="pb-4 font-bold text-center">الدروس المنجزة</th>
                    <th className="pb-4 font-bold text-center">أيام التفاعل</th>
                    <th className="pb-4 font-bold">الحالة</th>
                    <th className="pb-4 font-bold">الإجراء</th>`);
} else {
    console.log("Could not find headers");
}

// 4. Update table rows
const rowRegex = /<td className="py-4 text-gold-400">\{student\.currentPath\}<\/td>\s*<td className="py-4">/;
if (rowRegex.test(code)) {
    code = code.replace(rowRegex, `<td className="py-4 text-gold-400">{student.currentPath}</td>
                      <td className="py-4 text-center font-bold text-navy-200">
                        {studentProgressMap[student.id]?.completedLessons?.length || 0}
                      </td>
                      <td className="py-4 text-center font-bold text-navy-200">
                        {studentProgressMap[student.id]?.streakDays || 0}
                      </td>
                      <td className="py-4">`);
} else {
    console.log("Could not find row cells");
}

fs.writeFileSync(path, code);
console.log("Admin updated successfully!");
