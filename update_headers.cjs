const fs = require('fs');
let code = fs.readFileSync('src/server/security/headers.ts', 'utf-8');

code = code.replace(
  /scriptSrc: \["'self'"\],/,
  `scriptSrc: process.env.NODE_ENV === 'production' ? ["'self'"] : ["'self'", "'unsafe-inline'", "'unsafe-eval'"],`
);

fs.writeFileSync('src/server/security/headers.ts', code);
