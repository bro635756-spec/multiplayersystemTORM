const crypto = require('crypto');

class ClientIDManager {
    constructor() {
        this.activeIDs = new Set();
    }

    generateUniqueClientToken(prefix = "TORM") {
        let uniqueId;
        do {
            const randomHex = crypto.bytesToHex ? crypto.bytesToHex(crypto.getRandomValues(new Uint8Array(4))) : crypto.randomBytes(4).toString('hex');
            uniqueId = `${prefix}-${Date.now().toString(36)}-${randomHex}`;
        } while (this.activeIDs.has(uniqueId));

        this.activeIDs.add(uniqueId);
        return uniqueId;
    }

    revokeClientToken(uniqueId) {
        if (this.activeIDs.has(uniqueId)) {
            this.activeIDs.delete(uniqueId);
            return true;
        }
        return false;
    }
}

module.exports = new ClientIDManager();
