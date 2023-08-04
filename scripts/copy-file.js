const fs = require('fs-extra');

const sourceDir = 'src/shared/email/templates';
const targetDir = 'dist/src/shared/email/templates';

fs.copySync(sourceDir, targetDir);
