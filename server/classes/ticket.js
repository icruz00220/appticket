const fs = require('fs')

class Ticket {

    constructor(numero, escritorio) {
        this.numero = numero
        this.escritorio = escritorio
    }
}

class Cola {

    constructor() {
        this.ultimo = 0
        this.hoy = new Date().getDate()
        this.tickets = []
        this.atendiendo = []

        let data = require('../data/log-ticket.json')

        if (this.hoy === data.hoy) {
            this.ultimo = data.ultimo
            this.tickets = data.tickets
            this.atendiendo = data.atendiendo
        } else
            this.reiniciar()
    }

    reiniciar() {
        this.ultimo = 0
        this.tickets = []
        this.atendiendo = []
        this.grabar()
    }

    siguiente() {
        this.ultimo++;
        let nuevoticket = new Ticket(this.ultimo, null)
        this.tickets.push(nuevoticket)
        this.grabar()

        return this.ultimo
    }

    getUltimo() {
        return this.ultimo
    }

    getAtendiendo() {
        return this.atendiendo
    }

    atender(escritorio) {
        if (this.tickets.length === 0)
            return "No hay Tickets en espera"

        let ticketAtender = this.tickets[0].numero
        this.tickets.shift()

        let ticketActual = new Ticket(ticketAtender, escritorio)

        this.atendiendo.unshift(ticketActual)

        if (this.atendiendo.length > 4)
            this.atendiendo.splice(-1, 1)

        this.grabar()

        return ticketAtender
    }

    grabar() {
        let data = {
            "ultimo": this.ultimo,
            "hoy": this.hoy,
            "tickets": this.tickets,
            "atendiendo": this.atendiendo
        }

        let dataJSON = JSON.stringify(data)
        fs.writeFileSync('./server/data/log-ticket.json', dataJSON)
    }

}

module.exports = { Cola }