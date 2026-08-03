const ServerCloud = require('./ServerCloud.js');
const PORT = process.env.PORT || 3000;

const cloudInstance = new ServerCloud(PORT);
cloudInstance.start();

console.log(`[TORM WWW] Ag basariyla ayaga kaldirildi.`);
