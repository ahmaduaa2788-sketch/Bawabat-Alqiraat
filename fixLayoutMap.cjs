const fs = require('fs');

let layout = fs.readFileSync('src/components/Layout.tsx', 'utf-8');
layout = layout.replace("import { courseMap } from '../data/courseMap';", "import { courseMap } from '../data/courseMap';\nimport { qalunCourseMap } from '../data/qalunCourseMap';");
layout = layout.replace("{courseMap.map((unit) => (", "{ (rawiId === 'qalun' ? qalunCourseMap : courseMap).map((unit) => (");
fs.writeFileSync('src/components/Layout.tsx', layout);

