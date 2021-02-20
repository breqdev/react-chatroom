import React from "react"
import { Link, NavLink } from "react-router-dom"

export default function Header(props) {
    const backgroundStyle = {
        backgroundColor: "#F4F1DE",
        color: "#000000",
        padding: "10px",
        fontFamily: "Ubuntu",
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap"
    }

    const titleStyle = {
        fontSize: 36,
        color: "#000",
        textDecoration: "none"
    }

    const statusStyle = {
        flexGrow: 1,
        marginRight: "10px",
        marginTop: "10px",
        textAlign: "center"
    }

    const iconStyle = {
        fontSize: 40,
        color: "#000",
        padding: "10px",
    }

    const activeIconStyle = {
        color: "#A8D0DB"
    }

    return (
        <div style={backgroundStyle} className="header">
            <div style={{flexGrow: 1000}}>
                <Link to="/" style={titleStyle}>
                    <span>React Chatroom</span>
                </Link>
            </div>

            <h3 style={statusStyle}>
                {props.socketStatus} as&nbsp;
                <span style={{color: props.settings.color}}>
                    {props.settings.nickname}
                </span>
            </h3>

            <div style={{textAlign: "center", flexGrow: 1}}>
                <NavLink
                    to="/"
                    exact
                    style={iconStyle}
                    activeStyle={activeIconStyle}>
                    <i className="far fa-comments" />
                </NavLink>
                <NavLink
                    to="/settings"
                    style={iconStyle}
                    activeStyle={activeIconStyle}>
                    <i className="fas fa-cog" />
                </NavLink>
                <NavLink
                    to="/about"
                    style={iconStyle}
                    activeStyle={activeIconStyle}>
                    <i className="far fa-question-circle" />
                </NavLink>
            </div>
        </div>
    )
}
