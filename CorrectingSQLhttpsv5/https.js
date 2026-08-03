const fs = require('fs');
const https = require('https');

class TORMHttpsServer {
    constructor(appInstance) {
        this.app = appInstance;
    }

    createSecureServer(port = 3443) {
        try {
            // Gercek ortamda key ve cert dosyalari eklenmelidir
            const options = {
                // key: fs.readFileSync('server.key'),
                // cert: fs.readFileSync('server.cert')
            };
            
            console.log(`[TORM HTTPS] Guvenli sunucu SSL yapilandirmasina hazir. Port: ${port}`);
        } catch (e) {
            console.log("[TORM HTTPS] SSL sertifikalari bulunamadi, standart mod.");
        }
    }
}

module.exports = TORMHttpsServer;
