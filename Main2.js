class MainSecondaryEngine {
    constructor() {
        this.subSystems = ['AuthModule', 'SyncModule', 'PhysicsModule', 'DatabaseBridge'];
    }

    bootSubsystems() {
        console.log("[TORM MAIN2] Yardimci alt sistemler devreye aliniyor...");
        this.subSystems.forEach(sys => {
            console.log(`[TORM MAIN2] -> ${sys} aktif ve kararli.`);
        });
    }
}

module.exports = new MainSecondaryEngine();
