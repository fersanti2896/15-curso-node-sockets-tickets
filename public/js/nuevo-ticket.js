
const lblNuevoTicket = document.querySelector('#lblNuevoTicket');
const btNuevoTicket = document.querySelector('button');

const socket = io();

socket.on('connect', () => {
    btNuevoTicket.disabled = false;
});

socket.on('disconnect', () => {
    btNuevoTicket.disabled = true;
});

btNuevoTicket.addEventListener( 'click', () => {
    socket.emit( 'siguiente-ticket', null, ( ticket ) => {
        lblNuevoTicket.innerText = ticket;
    });

});

socket.on('ultimo-ticket', ( ultimo ) => {
    lblNuevoTicket.innerText = `Ticket ${ ultimo }`;
});