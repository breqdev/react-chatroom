import React from "react"
import ReactDOM from "react-dom"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from "react-router-dom"
import { v4 as uuidv4 } from "uuid"
import Mousetrap from "mousetrap"

import Settings from "./settings.js"
import Chat from "./chat"
import Header from "./header.js"
import About from "./about.js"
import ChatSocket from "./socket.js"
import "./index.css"


function useSettings(defaultSettings) {
    const [settings, setSettings] = React.useState(defaultSettings)

    React.useEffect(() => {
        const storedSettings = JSON.parse(localStorage.getItem("settings"))

        if (storedSettings) {
            setSettings(storedSettings)
        }
    }, [])

    function updateSettings(newSettings) {
        const updatedSettings = {...settings, ...newSettings}
        setSettings(updatedSettings)
        localStorage.setItem("settings", JSON.stringify(updatedSettings))
    }

    return [settings, updateSettings]
}


function App(props) {

    const [settings, handleSettings] = useSettings({
        nickname: uuidv4().substr(0, 4),
        color: "#FFFFFF"
    })

    const [messages, setMessages] = React.useState([])

    const [socketStatus, setSocketStatus] = React.useState("not connected")

    const [socket, ] = React.useState(
        new ChatSocket({statusCallback: setSocketStatus}))

    React.useEffect(() => {
        socket.connect()

        return function() {
            socket.close()
        }
    }, [socket])

    React.useEffect(() => {
        socket.messageCallback = (
            (message) => setMessages(messages.concat([message])))
    }, [socket, messages])

    function handleSend(message) {
        socket.send({
            content: message,
            nickname: settings.nickname,
            color: settings.color
        })
    }

    const history = useHistory()

    React.useEffect(() => {
        Mousetrap.bind("ctrl+,", () => history.push("/settings"))
        Mousetrap.bind("esc", () => history.push("/"), "keyup")

        return function() {
            Mousetrap.unbind("ctrl+,")
            Mousetrap.unbind("esc")
        }
    }, [history])

    const styles = {
        display: "flex",
        flexDirection: "column",
        height: "100%"
    }

    return (
        <div style={styles}>
            <Header
                socketStatus={socketStatus}
                settings={settings}
            />
            <Switch>
                <Route exact path="/">
                    <Chat
                        messages={messages}
                        onSend={handleSend}
                    />
                </Route>
                <Route path="/settings">
                    <Settings
                        settings={settings}
                        onChange={handleSettings}
                    />
                </Route>
                <Route path="/about">
                    <About />
                </Route>
            </Switch>
        </div>
    )
}

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById('root')
)
