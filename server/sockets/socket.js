const { io } = require('../server');
const { Cola } = require('../classes/ticket')

let data = new Cola()

io.on('connection', (client) => {

    console.log('Usuario conectado');

    client.emit('estadoInicial', {
        ultimo: data.getUltimo()
    });

    client.on('nuevoTicket', (req, callback) => {
        callback({ ultimo: data.siguiente() })
    })

    client.on('atender', (req, res) => {
        let escritorio = req.escritorio
        if (!escritorio)
            return { err: true, message: 'El escritorio es obligatorio' }
        let ticket = data.atender(escritorio)
        res(ticket)

        client.broadcast.emit('updateAtender', data.getAtendiendo())
    })

    client.emit('espera', data.getAtendiendo())

    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    // Escuchar el cliente
    /*client.on('enviarMensaje', (data, callback) => {

        console.log(data);

        client.broadcast.emit('enviarMensaje', data);


        // if (mensaje.usuario) {
        //     callback({
        //         resp: 'TODO SALIO BIEN!'
        //     });

        // } else {
        //     callback({
        //         resp: 'TODO SALIO MAL!!!!!!!!'
        //     });
        // }



    });
*/
});