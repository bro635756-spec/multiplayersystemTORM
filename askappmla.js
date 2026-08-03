class TORMAskAppMLA {
    constructor() {
        this.queue = [];
    }

    enqueueRequest(requestData) {
        this.queue.push({
            ...requestData,
            receivedAt: Date.now()
        });
        this.processQueue();
    }

    processQueue() {
        while (this.queue.length > 0) {
            const req = this.queue.shift();
            // Asenkron istek işleme simülasyonu
            this.handleAsyncPacket(req);
        }
    }

    handleAsyncPacket(packet) {
        // Gelen paket türüne göre yönlendirme
        console.log(`[TORM MLA] Asenkron istek işlendi, Tip: ${packet.type || 'Bilinmiyor'}`);
    }
}

module.exports = new TORMAskAppMLA();
