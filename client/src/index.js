import React from "react"
import ReactDOM from "react-dom"
import { v4 as uuidv4 } from "uuid"
import Mousetrap from "mousetrap"

import Messages from "./messages.js"
import Settings from "./settings.js"
import Entry from "./entry.js"
import Header from "./header.js"
import ChatSocket from "./socket.js"
import "./index.css"

class App extends React.Component {
    constructor(props) {
        super(props)

        let settings = JSON.parse(localStorage.getItem("settings"))

        if (!settings) {
            settings = {
                nickname: uuidv4().substr(0, 4),
                color: "#FFFFFF"
            }
        }

        this.state = {
            messages: [],
            uuid: uuidv4(),
            showSettings: false,
            socketStatus: "not connected",
            settings: settings
        }

        this.socket = new ChatSocket(
            this.handleReceive.bind(this),
            this.handleSocketStatus.bind(this)
        )

        this.handleSend = this.handleSend.bind(this)
        this.handleOpenSettings = this.handleOpenSettings.bind(this)
        this.handleCloseSettings = this.handleCloseSettings.bind(this)
    }

    handleOpenSettings() {
        this.setState({ showSettings: true })
    }

    handleCloseSettings(settings) {
        this.setState({
            showSettings: false,
            settings: settings
        })
        localStorage.setItem("settings", JSON.stringify(settings))
    }

    handleSocketStatus(status) {
        this.setState({socketStatus: status})
    }

    handleSend(message) {
        this.socket.send({
            content: message,
            author: this.state.uuid,
            nickname: this.state.settings.nickname,
            color: this.state.settings.color
        })
    }

    handleReceive(message) {
        this.setState({
            messages: this.state.messages.concat([message])
        })
    }

    render() {
        const styles = {
            display: "flex",
            flexDirection: "column",
            height: "100%"
        }

        return (
            <div style={styles}>
                <Header
                    onSettings={this.handleOpenSettings}
                    socketStatus={this.state.socketStatus}
                    settings={this.state.settings}
                />
                <Messages messages={this.state.messages}/>
                <Entry onSend={this.handleSend}/>
                <Settings
                    settings={this.state.settings}
                    show={this.state.showSettings}
                    onClose={this.handleCloseSettings}
                />
            </div>
        )
    }

    componentDidMount() {
        this.socket.connect()
        Mousetrap.bind("ctrl+,", this.handleOpenSettings)
    }

    componentWillUnmount() {
        Mousetrap.bind("ctrl+,")
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)
