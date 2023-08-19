const TicketControl = require('../models/ticket-control');

const ticketControl = new TicketControl();

const socketController = ( socket ) => { 
    socket.emit( 'ultimo-ticket', ticketControl.ultimo );

    socket.on('siguiente-ticket', async( payload, callback ) => {
        const siguiente = ticketControl.nextTicket();
        callback( siguiente );

        // TODO: Notifica que hay un nuevo ticket pendiente por asignar.
    });
}

module.exports = {
    socketController
}