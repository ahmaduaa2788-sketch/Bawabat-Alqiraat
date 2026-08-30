const fs = require('fs');

const file = 'src/data/quranFarsh.ts';
let dataStr = fs.readFileSync(file, 'utf-8');

// I will just use regex or JS parsing to fix this, but it's easier to execute node to parse the file and re-serialize it.
// Oh wait, quranFarsh.ts has `export type FarshRule = ...` at the top.

let content = dataStr.replace(/export type FarshRule = [\s\S]+?export const quranFarsh: Record<string, FarshRule\[\]> = /, 'module.exports = ');
fs.writeFileSync('temp.js', content);
