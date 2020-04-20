let socket = io()

let label = $('#lblNuevoTicket')

socket.on('connect', () => {
    console.log('Conectado!');
})

socket.on('estadoInicial', (req) => {
    UpdateLabel(req.ultimo)
})

$('button').click(() => {
    socket.emit('nuevoTicket', {}, (data) => {
        UpdateLabel(data.ultimo)
    })
})

function UpdateLabel(data) {
    label.text(`Ticket ${data}`)
}