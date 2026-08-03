class TORMSecureHttpHandler {
    constructor() {}

    intercept(req, res, next) {
        console.log(`[TORM HTTP v5] Istek yakalandi ve duzenlendi: ${req.url || 'Internal'}`);
        if (next) next();
    }
}

module.exports = new TORMSecureHttpHandler();
