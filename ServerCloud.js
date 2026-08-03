const http = require('http');
const { Server } = require('socket.io');
const db = require('./Database.js');

class ServerCloud {
    constructor(port = 3000) {
        this.port = port;
        this.server = http.createServer();
        this.io = new Server(this.server, {
            cors: { origin: "*" }
        });
        this.initListeners();
    }

    initListeners() {
        this.io.on('connection', (socket) => {
            console.log(`[TORM CLOUD] Yeni oyuncu baglandi: ${socket.id}`);

            socket.on('player_data_update', (packet) => {
                db.set(socket.id, packet);
                socket.broadcast.emit('sync_player', { id: socket.id, data: packet });
            });

            socket.on('disconnect', () => {
                console.log(`[TORM CLOUD] Oyuncu ayrildi: ${socket.id}`);
                db.remove(socket.id);
                this.io.emit('player_left', socket.id);
            });
        });
    }

    start() {
        this.server.listen(this.port, () => {
            console.log(`[TORM CLOUD] Bulut sunucusu aktif! Port: ${this.port}`);
        });
    }
}

module.exports = ServerCloud;
