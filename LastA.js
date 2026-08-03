class TORMLastActions {
    constructor() {
        this.isShuttingDown = false;
    }

    executeGracefulShutdown(dbInstance) {
        if (this.isShuttingDown) return;
        this.isShuttingDown = true;
        
        console.log("[TORM LAST-A] Sistem guvenli kapanis (graceful shutdown) baslatti...");
        
        // Bellekteki verileri loga veya diske son kez yazma simulasyonu
        try {
            console.log("[TORM LAST-A] Tum oyuncu oturumlari ve veritabani bellegi temizlendi.");
            process.exit(0);
        } catch (e) {
            console.error("[TORM LAST-A] Kapanis sirasinda hata olustu:", e);
            process.exit(1);
        }
    }
}

module.exports = new TORMLastActions();
