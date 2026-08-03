class SharedUnity {
    constructor() {
        this.packetRegistry = new Map();
    }

    processUnityVector(socketId, rawData) {
        try {
            const parsed = typeof rawData === 'string' ? JSON.parse(rawData) : rawData;
            
            const normalizedData = {
                x: parseFloat(parsed.x) || 0,
                y: parseFloat(parsed.y) || 0,
                z: parseFloat(parsed.z) || 0,
                rotY: parseFloat(parsed.rotY) || 0,
                animState: parsed.animState || "idle",
                timestamp: Date.now()
            };

            this.packetRegistry.set(socketId, normalizedData);
            return normalizedData;
        } catch (e) {
            console.error("[TORM UNITY] Paketcozumleme hatasi:", e);
            return null;
        }
    }

    getRegistryData(socketId) {
        return this.packetRegistry.get(socketId) || null;
    }
}

module.exports = new SharedUnity();
