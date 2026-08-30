const fs = require('fs');

// We need to merge them. To merge, we should read the string, but wait, `require` will lose the first occurrence.
// Instead of complex logic, I'll just write a script to re-generate the whole quranFarsh.ts cleanly.
