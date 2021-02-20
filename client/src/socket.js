export default class ChatSocket {
    constructor(messageCallback, statusCallback) {
        this.messageCallback = messageCallback
        this.statusCallback = statusCallback
        this.ws = null

        this.connect = this.connect.bind(this)
    }

    get url() {
        return (`${(window.location.protocol === "https:") ? "wss:" : "ws:"}`
            + `//${window.location.host}/socket`)
    }

    connect() {
        this.ws = new WebSocket(this.url)

        this.ws.onopen = this.onopen.bind(this)
        this.ws.onclose = this.onclose.bind(this)
        this.ws.onerror = this.onerror.bind(this)
        this.ws.onmessage = this.onmessage.bind(this)
    }

    onopen() {
        this.statusCallback("connected")
    }

    onclose() {
        this.statusCallback("not connected")
        setTimeout(this.connect, 1000)
    }

    onerror(error) {

    }

    onmessage(message) {
        let data = JSON.parse(message.data)
        this.messageCallback(data)
    }

    send(message) {
        if (!this.ws) {
            return
        }

        let data = JSON.stringify(message)
        this.ws.send(data)
    }
}
