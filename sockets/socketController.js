
const socketController = ( socket ) => { 
    socket.on('enviar-mensaje', async( payload, callback ) => {
        const id = 626262;
        callback( id );

        socket.broadcast.emit('enviar-mensaje', payload);
    });
}

module.exports = {
    socketController
}