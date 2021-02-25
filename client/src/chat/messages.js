import React from "react"
import Twemoji from "twemoji"
import tinycolor from "tinycolor2"

function Message(props) {
    const li_style = {
        listStyleType: "none",
        marginBottom: "10px"
    }

    const color = tinycolor(props.message.color)

    const author_style = {
        border: "1px solid #000",
        marginRight: "10px",
        display: "inline-block",
        padding: "0 5px",
        textAlign: "center",
        fontWeight: "bold",
        color: color.isLight() ? "#000" : "#FFF",
        backgroundColor: props.message.color
    }

    let content = props.message.content
    content = Twemoji.parse(content)

    return (
        <li style={li_style}>
            <span style={author_style}>
                {props.message.nickname}
            </span>
            <span dangerouslySetInnerHTML={{__html: content}}></span>
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
