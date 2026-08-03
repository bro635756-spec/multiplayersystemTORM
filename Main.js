const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js'); // XML okumak için

class MainServer {
    constructor() {
        this.config = {};
        this.isInitialized = false;
    }

    async init() {
        console.log("[TORM] Sistem baslatiliyor...");
        await this.loadLoggingConfig();
        this.startEngine();
    }

    async loadLoggingConfig() {
        try {
            const xmlPath = path.join(__dirname, 'Logging.xml');
            const xmlData = fs.readFileSync(xmlPath, 'utf8');
            const parser = new xml2js.Parser();
            
            parser.parseString(xmlData, (err, result) => {
                if (err) {
                    console.error("[TORM] Logging.xml okunamadi:", err);
                    return;
                }
                this.config = result;
                console.log("[TORM] Logging.xml basariyla yüklendi ve ayarlari aldi.");
            });
        } catch (e) {
            console.log("[TORM] Varsayilan log ayarlari kullaniliyor.");
        }
    }

    startEngine() {
        this.isInitialized = true;
        console.log("[TORM] ServerCloud ve Database modulleri entegre edilmeye hazir.");
    }
}

const tormServer = new MainServer();
tormServer.init();

module.exports = MainServer;
