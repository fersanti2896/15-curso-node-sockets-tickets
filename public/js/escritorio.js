
const lbEscritorio = document.querySelector('h1');
const btnAtenderTicket = document.querySelector('button');
const lbTicket = document.querySelector('small');
const divAlerta = document.querySelector('.alert');
const lblPendientes = document.querySelector('#lblPendientes');

const searchParams = new URLSearchParams( window.location.search );

if( !searchParams.has('escritorio') ) {
    window.location = 'index.html';
    throw new Error('El escritorio es obligatorio');
}

const escritorio = searchParams.get('escritorio');
lbEscritorio.innerText = `Escritorio: ${ escritorio }`;
divAlerta.style.display = 'none';

const socket = io();

socket.on('connect', () => {
    btnAtenderTicket.disabled = false;
});

socket.on('disconnect', () => {
    btnAtenderTicket.disabled = true;
});

btnAtenderTicket.addEventListener( 'click', () => {
    socket.emit( 'atender-ticket', { escritorio }, ( { ok, ticket, msg } ) => {
        if( !ok ) {
            lbTicket.innerText = 'Ningún Ticket';
            return divAlerta.style.display = '';;
        }

        lbTicket.innerText = `Ticket ${ticket.numero}`;
    } );
});

socket.on('ultimo-ticket', ( ultimo ) => {
    // lblNuevoTicket.innerText = `Ticket ${ ultimo }`;
});

socket.on( 'tickets-pendientes', ( pendientes ) => {
    if( pendientes === 0 ) {
        lblPendientes.style.display = 'none';
    } else {
        lblPendientes.style.display = '';
        lblPendientes.innerText = pendientes;
    }
})