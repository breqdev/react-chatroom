import express from "express"
import expressWs from "express-ws"

const port = process.env.PORT || 5000

const app = express()
const wss = expressWs(app)

app.ws("/socket", (ws, req) => {
    ws.on("message", (data) => {
        wss.getWss().clients.forEach((client) => {
            if (client.readyState == 1) {
                client.send(data)
            }
        })
    })
})

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"))

    app.get("*", function(req, res) {
        res.sendFile("client/build/index.html")
    })
}

app.listen(port, () => console.log(`Listening on port ${port}`))
