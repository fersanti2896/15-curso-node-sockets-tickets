const express = require('express');
const cors = require('cors');
const { socketController } = require('../sockets/socketController');

class Server {
    constructor() {
        /* Se crea servidor de Express */
        this.app = express();
        this.port = process.env.PORT;
        /* Se crea el servidor de Socket IO en conjunto con Express */
        this.server = require('http').createServer( this.app );
        /* Información de todos los Sockets que están conectados al Servidor de Socket */
        this.io = require('socket.io')( this.server );

        this.paths = { }

        /* Middlewares */
        this.middlewares();
        /* Rutas de mi aplicación */
        this.routes();
        /* Eventos de Sockets */
        this.sockets();
    }

    middlewares() {
        /* CORS */
        this.app.use( cors() );
        /* Directorio Público */
        this.app.use( express.static('public') );
    }

    routes() {
        // this.app.use( this.paths.auth, require('../routes/auth') );
    }

    sockets() {
        this.io.on('connection', socketController);
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log(`Web Socket Server corriendo en el puerto: ${ this.port }`);
        });
    }    
}

module.exports = Server;