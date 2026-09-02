const fs = require('fs');
let data = fs.readFileSync('src/data/unit13.tsx', 'utf-8');

data = data.replace(
  /Object.keys\(groupedData\).map\(ayahStr =>/g,
  'Object.keys(groupedData).map(Number).sort((a, b) => a - b).map(ayahNum =>'
);
data = data.replace(
  /<FarshAyahCard key=\{ayahStr\} ayahNumber=\{parseInt\(ayahStr\)\} changes=\{groupedData\[parseInt\(ayahStr\)\]\} \/>/g,
  '<FarshAyahCard key={ayahNum} ayahNumber={ayahNum} changes={groupedData[ayahNum]} />'
);

fs.writeFileSync('src/data/unit13.tsx', data);
console.log("Fixed sort");
