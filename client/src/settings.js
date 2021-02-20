import React from "react"
import { Link } from "react-router-dom"
import { TwitterPicker } from "react-color"


export default class Settings extends React.Component {
    constructor(props) {
        super(props)

        this.handleNicknameChange = this.handleNicknameChange.bind(this)
        this.handleColorChange = this.handleColorChange.bind(this)
    }

    handleNicknameChange(event) {
        this.props.onChange({nickname: event.target.value})
    }

    handleColorChange(color, event) {
        this.props.onChange({color: color.hex})
    }

    render() {
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
                        value={this.props.settings.nickname}
                        onChange={this.handleNicknameChange}
                        className="form-control mousetrap"
                    />
                </div>
                <div style={{ marginBottom: "20px" }}>
                    <TwitterPicker
                        color={this.props.settings.color}
                        onChangeComplete={this.handleColorChange}
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
}
