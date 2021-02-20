import React from "react"

export default function Header(props) {
    const background_style = {
        backgroundColor: "#F4F1DE",
        color: "#000000",
        padding: "10px",
        fontFamily: "Ubuntu",
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap"
    }
    return (
        <div style={background_style}>
            <h1 style={{flexGrow: 1000}}>React Chatroom</h1>
            <h3 style={{flexGrow: 1, marginRight: "20px", marginTop: "10px"}}>
                {props.socketStatus} as&nbsp;
                <span style={{color: props.settings.color}}>
                    {props.settings.nickname}
                </span>
            </h3>
            <i
                style={{fontSize: 40}}
                className="fas fa-cog"
                onClick={props.onSettings}
            />
        </div>
    )
}
