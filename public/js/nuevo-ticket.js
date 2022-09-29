// Referencias HTML
const lblNuevoTicket = document.querySelector('#lblNuevoTicket')
const btnCrear = document.querySelector('#btnCrear')

const socket = io();

socket.on('connect', () => {
    btnCrear.disabled = false;
    
});

socket.on('disconnect', () => {
    btnCrear.disabled = false;
});

socket.on('ultimo-ticket', (ticket) =>{
        console.log('Desde el server', ticket  );
        lblNuevoTicket.innerText = 'Ticket ' + ticket;
})
btnCrear.addEventListener( 'click', () => {
    
    socket.emit( 'siguiente-ticket', null, ( ticket  ) => {
        lblNuevoTicket.innerText = ticket;
    });

});