class TORMNodeBalancer {
    constructor() {
        this.nodes = new Map();
        this.activeLoad = 0;
    }

    registerNode(nodeId, endpoint) {
        this.nodes.set(nodeId, { endpoint, load: 0, status: "active" });
        console.log(`[TORM BALANCER] Yeni node kaydi yapildi: ${nodeId} (${endpoint})`);
    }

    routeClient(clientId) {
        // Basit round-robin veya dusuk yuku secme mantigi
        let selectedNode = null;
        let minLoad = Infinity;

        for (let [id, node] of this.nodes.entries()) {
            if (node.status === "active" && node.load < minLoad) {
                minLoad = node.load;
                selectedNode = id;
            }
        }

        if (selectedNode) {
            this.nodes.get(selectedNode).load += 1;
            console.log(`[TORM BALANCER] ${clientId} istemcisi ${selectedNode} node'una yonlendirildi.`);
        }
        return selectedNode;
    }
}

module.exports = new TORMNodeBalancer();
