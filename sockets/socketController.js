const TicketControl = require('../models/ticket-control');

const ticketControl = new TicketControl();

const socketController = ( socket ) => { 
    socket.emit( 'ultimo-ticket', ticketControl.ultimo );

    socket.on('siguiente-ticket', async( payload, callback ) => {
        const siguiente = ticketControl.nextTicket();
        callback( siguiente );

        // TODO: Notifica que hay un nuevo ticket pendiente por asignar.
    });

    socket.on('atender-ticket', ({ escritorio }, callback) => {
        if( !escritorio ) {
            return callback({
                ok: false,
                msg: 'El escritorio es obligatorio.'
            });
        }

        const ticket = ticketControl.attendTicket( escritorio );

        // TODO: Notificar cambio en los ultimos 4

        if( !ticket ) {
            return callback({
                ok: false,
                msg: 'Ya no hay tickets pendientes.'
            });
        } else {
            callback({
                ok: true,
                ticket
            })
        }
    })
}

module.exports = {
    socketController
}