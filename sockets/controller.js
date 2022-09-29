
const TicketControl = require('../models/ticket-control');
const ticketControl = new TicketControl();

const socketController = (socket) => {

    
    socket.emit( 'ultimo-ticket', ticketControl.ultimo);
    socket.emit( 'estado-actual', ticketControl.ultimos4);
    socket.emit( 'tickets-pendientes', ticketControl.tickets.length);
    
    
    socket.on('siguiente-ticket', ( payload, callback ) => {
        
        const siguiente = ticketControl.siguiente();
        callback( siguiente)
        socket.broadcast.emit( 'tickets-pendientes', ticketControl.tickets.length);

        //TODO: Noficiar que hay un nuevo ticket pendiente de asignar
    })

    socket.on('atender-ticket', ({ escritorio}, callback ) => {
        // console.log( escritorio );

        if( !escritorio ){
            return callback({
                ok: false,
                msg: 'El escritorio es obligatorio'
            })
        }

        //TODO: Notificar cambios en los ultimos 4
        socket.broadcast.emit( 'estado-actual', ticketControl.ultimos4);
        socket.emit( 'tickets-pendientes', ticketControl.tickets.length);
        socket.broadcast.emit( 'tickets-pendientes', ticketControl.tickets.length);



        const ticket = ticketControl.atenderTicket( escritorio )
        console.log(ticket)
        if( !ticket) {
            console.log('entro aqui')
            callback({
                ok: false,
                msg: 'Ya no hay tickets pendientes'
            })
        }else{
            callback({
                ok: true,
                ticket
            })
        }
        //TODO: Noficiar que hay un nuevo ticket pendiente de asignar
    })

}



module.exports = { 
    socketController
}

