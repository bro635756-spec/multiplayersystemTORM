class MainSecondaryEngine {
    constructor() {
        this.subSystems = ['AuthModule', 'SyncModule', 'PhysicsModule'];
    }

    bootSubsystems() {
        console.log("[TORM MAIN2] Yardimci alt sistemler baslatiliyor...");
        this.subSystems.forEach(sys => {
            console.log(`[TORM MAIN2] -> ${sys} aktif.`);
        });
    }
}

module.exports = new MainSecondaryEngine();
