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
            <div className="input-group mb3" style={inputGroup}>
                <span className="input-group-text">Nickname</span>
                <input
                    type="text"
                    value={props.settings.nickname}
                    onChange={handleNicknameChange}
                    className="form-control mousetrap"
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
                className="btn btn-outline-primary"
            >
                Save
            </Link>
        </div>
    )
}
