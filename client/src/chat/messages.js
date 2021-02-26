import React from "react"
import Twemoji from "twemoji"
import Badge from "../badge.js"

function Message(props) {
    const li_style = {
        listStyleType: "none",
        marginBottom: "10px"
    }

    let content = props.message.content
    content = Twemoji.parse(content)

    return (
        <li style={li_style}>
            <Badge color={props.message.color} name={props.message.nickname} />
            <span
                style={{marginLeft: "10px"}}
                dangerouslySetInnerHTML={{__html: content}}
            ></span>
        </li>
    )
}

export default function Messages(props) {
    let messagesEnd = React.useRef(null)

    React.useEffect(() => {
        if (messagesEnd.current) {
            messagesEnd.current.scrollIntoView({behavior: "smooth"})
        }
    })

    const style = {
        flexGrow: 1,
        minHeight: 0,
        fontFamily: "Lato",
        padding: "10px",
        fontSize: 16,
        overflowY: "scroll",
    }

    let messages = []
    for (let index in props.messages) {
        messages.push(
            <Message message={props.messages[index]} key={index} />
        )
    }

    return (
        <ul style={style}>
            {messages}
            <div ref={messagesEnd}></div>
        </ul>
    )
}
