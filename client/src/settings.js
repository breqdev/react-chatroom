import React from "react"
import { Link } from "react-router-dom"
import { TwitterPicker } from "react-color"


export default function Settings(props) {
    function handleNicknameChange(event) {
        props.onChange({nickname: event.target.value})
    }

    function handleColorChange(color, event) {
        props.onChange({color: color.hex})
    }

    const flexbox = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "20px",
    }

    const inputGroup = {
        maxWidth: "400px",
        marginBottom: "20px"
    }

    return (
        <div style={flexbox}>
            <div style={inputGroup}>
                <label className="label">Nickname</label>
                <input
                    type="text"
                    value={props.settings.nickname}
                    onChange={handleNicknameChange}
                    className="input mousetrap"
                />
            </div>
            <div style={{ marginBottom: "20px" }}>
                <TwitterPicker
                    color={props.settings.color}
                    onChangeComplete={handleColorChange}
                    triangle="hide"
                />
            </div>
            <Link
                to="/"
                className="button is-primary"
            >
                Save
            </Link>
        </div>
    )
}
