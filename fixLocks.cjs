const fs = require('fs');

// 1. Update Portal.tsx
let portalCode = fs.readFileSync('src/pages/Portal.tsx', 'utf-8');
portalCode = portalCode.replace(
  "const isLocked = activeQari !== null && activeQari !== qari.id;",
  "const isLocked = role !== 'admin' && activeQari !== null && activeQari !== qari.id;"
);
fs.writeFileSync('src/pages/Portal.tsx', portalCode);

// 2. Update QariView.tsx
let qariViewCode = fs.readFileSync('src/pages/QariView.tsx', 'utf-8');

// Ensure useAuth is imported in QariView
if (!qariViewCode.includes('useAuth')) {
    qariViewCode = qariViewCode.replace(
        "import { useProgress } from '../context/ProgressContext';",
        "import { useProgress } from '../context/ProgressContext';\nimport { useAuth } from '../context/AuthContext';"
    );
}

// Add role to QariView if not there
if (!qariViewCode.includes('const { role } = useAuth();')) {
    qariViewCode = qariViewCode.replace(
        "const navigate = useNavigate();",
        "const navigate = useNavigate();\n  const { role } = useAuth();"
    );
}

// Update getRawiLockStatus
qariViewCode = qariViewCode.replace(
  "const getRawiLockStatus = (rawiId: string) => {",
  "const getRawiLockStatus = (rawiId: string) => {\n    if (role === 'admin') return false;"
);

// Update isTariqLocked check
qariViewCode = qariViewCode.replace(
  "if (!tariq.isBase) {\n                      isTariqLocked = !allBaseTuruqComplete;\n                      lockReason = \"يجب إنهاء الشاطبية لجميع الرواة أولاً\";\n                    }",
  "if (!tariq.isBase) {\n                      isTariqLocked = !allBaseTuruqComplete;\n                      lockReason = \"يجب إنهاء الشاطبية لجميع الرواة أولاً\";\n                    }\n                    if (role === 'admin') isTariqLocked = false;"
);

fs.writeFileSync('src/pages/QariView.tsx', qariViewCode);
