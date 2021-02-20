import React from "react"

import Messages from "./messages.js"
import Entry from "./entry.js"

export default function Chat(props) {
    const style = {
        height: "100%",
        display: "flex",
        flexDirection: "column"
    }
    return (
        <div style={style}>
            <Messages messages={props.messages} />
            <Entry onSend={props.onSend} />
        </div>
    )
}
