const fs = require('fs');

let content = fs.readFileSync('src/data/courseMap.ts', 'utf-8');

// Find the start of unit-13
const unit13Index = content.indexOf('{');
// Actually, it's safer to use regex or string manipulation.
const startIndex = content.indexOf('id: "unit-13"');
if (startIndex !== -1) {
    // Find the enclosing brace start
    const blockStart = content.lastIndexOf('{', startIndex);
    
    // Find the end of this block. We need to match braces.
    let braceCount = 0;
    let blockEnd = -1;
    for (let i = blockStart; i < content.length; i++) {
        if (content[i] === '{') braceCount++;
        else if (content[i] === '}') {
            braceCount--;
            if (braceCount === 0) {
                blockEnd = i;
                break;
            }
        }
    }
    
    if (blockEnd !== -1) {
        // Find if there's a comma after
        let removeEnd = blockEnd + 1;
        while (content[removeEnd] === ' ' || content[removeEnd] === '\n' || content[removeEnd] === '\r') removeEnd++;
        if (content[removeEnd] === ',') removeEnd++;
        
        let newContent = content.substring(0, blockStart) + content.substring(removeEnd);
        fs.writeFileSync('src/data/courseMap.ts', newContent);
        console.log("unit-13 removed.");
    } else {
        console.log("Could not find end of block");
    }
} else {
    console.log("unit-13 not found");
}

