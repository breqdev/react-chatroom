import React from "react"

import Messages from "./messages.js"
import Entry from "./entry.js"

export default function Chat(props) {
    const style = {
        flexGrow: 1,
        flexShrink: 1,
        minHeight: "0px",
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
