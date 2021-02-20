import React from "react"
import ReactDOM from "react-dom"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter
} from "react-router-dom"
import { v4 as uuidv4 } from "uuid"
import Mousetrap from "mousetrap"

import Settings from "./settings.js"
import Chat from "./chat"
import Header from "./header.js"
import About from "./about.js"
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
        this.handleSettings = this.handleSettings.bind(this)
    }

    handleSettings(settings) {
        this.setState({
            settings: {...this.state.settings, ...settings}
        })
        localStorage.setItem("settings", JSON.stringify(this.state.settings))
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
                    socketStatus={this.state.socketStatus}
                    settings={this.state.settings}
                />
                <Switch>
                    <Route exact path="/">
                        <Chat
                            messages={this.state.messages}
                            onSend={this.handleSend}
                        />
                    </Route>
                    <Route path="/settings">
                        <Settings
                            settings={this.state.settings}
                            onChange={this.handleSettings}
                        />
                    </Route>
                    <Route path="/about">
                        <About />
                    </Route>
                </Switch>
            </div>
        )
    }

    componentDidMount() {
        this.socket.connect()
        Mousetrap.bind("ctrl+,", () => this.props.history.push("/settings"))
        Mousetrap.bind("esc", () => this.props.history.push("/"), "keyup")
    }

    componentWillUnmount() {
        Mousetrap.unbind("ctrl+,")
        Mousetrap.unbind("esc")
    }
}

const AppWithRouter = withRouter(App)

ReactDOM.render(
    <Router>
        <AppWithRouter />
    </Router>,
    document.getElementById('root')
)
