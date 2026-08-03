class TORMLogOfInteractions {
    constructor() {
        this.actionHistory = [];
    }

    recordAction(clientId, actionType, details) {
        const logEntry = {
            clientId,
            actionType,
            details,
            timestamp: new Date().toISOString()
        };
        this.actionHistory.push(logEntry);
        
        // Bellek şişmesin diye son 1000 olayı tutalım
        if (this.actionHistory.length > 1000) {
            this.actionHistory.shift();
        }

        console.log(`[TORM LOI] (${actionType}) Oyuncu: ${clientId}`);
        return true;
    }

    getHistory(clientId) {
        return this.actionHistory.filter(item => item.clientId === clientId);
    }
}

module.exports = new TORMLogOfInteractions();
