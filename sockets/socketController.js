const TicketControl = require('../models/ticket-control');

const ticketControl = new TicketControl();

const socketController = ( socket ) => { 
    // Cuando un nuevo cliente se conecta, se mandan estos eventos.
    socket.emit( 'ultimo-ticket', ticketControl.ultimo );
    socket.emit( 'estado-actual', ticketControl.ultimosCuatro );
    socket.emit( 'tickets-pendientes', ticketControl.tickets.length );

    socket.on('siguiente-ticket', async( payload, callback ) => {
        const siguiente = ticketControl.nextTicket();
        callback( siguiente );

        // TODO: Notifica que hay un nuevo ticket pendiente por asignar.
        socket.broadcast.emit( 'tickets-pendientes', ticketControl.tickets.length );
    });

    socket.on( 'atender-ticket', ({ escritorio }, callback) => {
        if( !escritorio ) {
            return callback({
                ok: false,
                msg: 'El escritorio es obligatorio.'
            });
        }

        const ticket = ticketControl.attendTicket( escritorio );

        // TODO: Notificar cambio en los ultimos 4
        socket.broadcast.emit( 'estado-actual', ticketControl.ultimosCuatro );

        // TODO: Notifica cuantos tickets faltan por atender
        socket.emit( 'tickets-pendientes', ticketControl.tickets.length );
        socket.broadcast.emit( 'tickets-pendientes', ticketControl.tickets.length );

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
    });
}

module.exports = {
    socketController
}