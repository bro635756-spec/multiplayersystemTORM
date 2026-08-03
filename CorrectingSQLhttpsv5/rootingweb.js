class TORMRoutingWeb {
    constructor() {
        this.routes = new Map();
    }

    addRoute(path, handler) {
        this.routes.set(path, handler);
    }

    resolve(path) {
        return this.routes.get(path) || ((req, res) => ({ error: "404 Not Found" }));
    }
}

module.exports = new TORMRoutingWeb();
