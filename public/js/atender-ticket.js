let socket = io()

let label = $('small')

let urlSearchParams = new URLSearchParams(window.location.search)
if (!urlSearchParams.has('escritorio')) {
    window.location = 'index.html'
    throw new Error('El escritorio es necesario')
}

let escritorio = urlSearchParams.get('escritorio')

$('h1').text(`Escritorio ${escritorio}`)

$('button').on('click', () => {
    socket.emit('atender', { escritorio }, (data) => {
        if (data === "No hay Tickets en espera") {
            alert(data)
            return
        }
        label.text(`Ticket ${data}`)
    })
})