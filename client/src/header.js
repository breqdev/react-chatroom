import React from "react"
import { Link, NavLink } from "react-router-dom"

export default function Header(props) {
    const backgroundStyle = {
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

    return (
        <div style={backgroundStyle} className="header has-background-primary">
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
                    activeClassName="has-text-light">
                    <i className="far fa-comments" />
                </NavLink>
                <NavLink
                    to="/settings"
                    style={iconStyle}
                    activeClassName="has-text-light">
                    <i className="fas fa-cog" />
                </NavLink>
                <NavLink
                    to="/about"
                    style={iconStyle}
                    activeClassName="has-text-light">
                    <i className="far fa-question-circle" />
                </NavLink>
            </div>
        </div>
    )
}
