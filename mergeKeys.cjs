const fs = require('fs');
let code = fs.readFileSync('src/data/quranFarsh.ts', 'utf-8');

const tsToEval = code.replace(/export type FarshRule = [\s\S]+?export const quranFarsh: Record<string, FarshRule\[\]> = /, 'return ');

// Evaluate in a function but intercept duplicate keys?
// No, standard JS eval will just overwrite.
