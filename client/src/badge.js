import React from "react"
import tinycolor from "tinycolor2"

export default function Badge(props) {
    const color = tinycolor(props.color)

    const style = {
        border: "1px solid #000",
        display: "inline-block",
        padding: "0 5px",
        textAlign: "center",
        fontWeight: "bold",
        color: color.isLight() ? "#000" : "#FFF",
        backgroundColor: props.color
    }

    return (
        <span style={style}>{props.name}</span>
    )
}
