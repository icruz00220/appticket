let socket = io()

socket.on('espera', (data) => {
    mostrar(data)
})

socket.on('updateAtender', async(data) => {
    const audio = new Audio('../audio/new-ticket.mp3')
    await audio.play()
    mostrar(data)
})

function mostrar(data) {
    for (let x = 0; x < data.length; x++) {
        $(`#lblTicket${x+1}`).text(`Ticket ${data[x].numero}`)
        $(`#lblEscritorio${x+1}`).text(`Escritorio ${data[x].escritorio}`)
    }
}