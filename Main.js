const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');
const ServerCloud = require('./ServerCloud.js');
const Main2 = require('./Main2.js');

class MainServer {
    constructor() {
        this.config = {};
        this.cloud = null;
    }

    async init() {
        console.log("[TORM MAIN] multiplayersystemTORM baslatiliyor...");
        await this.loadLoggingConfig();
        
        // Yardimci alt sistemleri tetikle
        Main2.bootSubsystems();

        // Cloud sunucusunu baslat
        const port = this.config.Port || 3000;
        this.cloud = new ServerCloud(port);
        this.cloud.start();
    }

    async loadLoggingConfig() {
        try {
            const xmlPath = path.join(__dirname, 'Logging.xml');
            if (fs.existsSync(xmlPath)) {
                const xmlData = fs.readFileSync(xmlPath, 'utf8');
                const parser = new xml2js.Parser();
                parser.parseString(xmlData, (err, result) => {
                    if (!err && result && result.TORM_System && result.TORM_System.Settings) {
                        const settings = result.TORM_System.Settings[0];
                        this.config.Port = parseInt(settings.Port[0]) || 3000;
                        console.log("[TORM MAIN] Logging.xml ayarlari basariyla uygulandi.");
                    }
                });
            }
        } catch (e) {
            console.log("[TORM MAIN] Varsayilan port (3000) kullaniliyor.");
        }
    }
}

const server = new MainServer();
server.init();

module.exports = MainServer;
