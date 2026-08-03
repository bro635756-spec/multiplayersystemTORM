const fs = require('fs');
const path = require('path');

class TORMDatabase {
    constructor() {
        this.memoryStore = new Map();
        this.logFilePath = path.join(__dirname, 'DatabaseMeta.log');
    }

    set(key, value) {
        const timestamp = new Date().toISOString();
        this.memoryStore.set(key, { data: value, updated_at: timestamp });
        this.writeLog(`[WRITE] Key: ${key} | Time: ${timestamp}`);
    }

    get(key) {
        const item = this.memoryStore.get(key);
        if (item) {
            return item.data;
        }
        return null;
    }

    remove(key) {
        this.memoryStore.delete(key);
        this.writeLog(`[DELETE] Key: ${key}`);
    }

    writeLog(message) {
        const logEntry = `${message}\n`;
        try {
            fs.appendFileSync(this.logFilePath, logEntry, 'utf8');
        } catch (err) {
            console.error("[TORM DB] Log yazilamadi:", err);
        }
    }
}

module.exports = new TORMDatabase();
