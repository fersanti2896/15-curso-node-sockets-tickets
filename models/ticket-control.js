
const path = require('path');
const fs = require('fs');

const Ticket = require('./ticket');

class TicketControl {
    constructor() {
        this.ultimo        = 0;
        this.hoy           = new Date().getDate();
        this.tickets       = [];
        this.ultimosCuatro = [];

        this.init();
    }

    get toJSON() {
        return {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimosCuatro: this.ultimosCuatro
        }
    }

    init() {
        const { hoy, tickets, ultimo, ultimosCuatro } = require('../database/data.json');
        
        if( hoy === this.hoy ) {
            this.tickets = tickets;
            this.ultimo = ultimo;
            this.ultimosCuatro = ultimosCuatro;
        } else {
            this.saveDB();
        }
    }

    saveDB() {
        const dbPath = path.join( __dirname, '../database/data.json' );
        fs.writeFileSync( dbPath, JSON.stringify( this.toJSON ) )
    }

    nextTicket() {
        this.ultimo += 1;
        
        const ticket = new Ticket( this.ultimo, null );
        this.tickets.push( ticket );

        this.saveDB();

        return `Ticket ${ ticket.numero }`;
    }

    attendTicket( escritorio ) {
        if( this.tickets.length == 0 ) {
            return null;
        }

        const ticket = this.tickets.shift()
        ticket.escritorio = escritorio;

        this.ultimosCuatro.unshift( ticket );

        if( this.ultimosCuatro.length > 4 ) {
            this.ultimosCuatro.splice(-1, 1);
        }

        this.saveDB();

        return ticket;
    }
}

module.exports = TicketControl;