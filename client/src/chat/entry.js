import React from "react"

export default function Entry(props) {

    let [value, setValue] = React.useState("")

    let textbox = React.useRef(null)

    React.useEffect(() => textbox.current.focus(), [])

    function handleChange(event) {
        setValue(event.target.value)
    }

    function handleSubmit(event) {
        event.preventDefault()
        textbox.current.focus()
        props.onSend(value)
        setValue("")
    }

    const divStyle = {
        width: "100%",
        padding: "10px"
    }
    const inputStyle = {
        outline: "none",
        boxShadow: "none",
        flexGrow: 1
    }
    const buttonStyle = {
        outline: "none",
        boxShadow: "none",
        marginLeft: "10px",
        flexGrow: 0
    }

    return (
        <div style={divStyle}>
            <form onSubmit={handleSubmit}>
                <div style={{display: "flex"}}>
                    <input
                        type="text"
                        value={value}
                        onChange={handleChange}
                        className="input mousetrap"
                        style={inputStyle}
                        ref={textbox}
                    />
                    <button
                        type="submit"
                        className="button is-primary"
                        style={buttonStyle}>
                        <i className="fas fa-paper-plane"></i>
                    </button>
                </div>
            </form>
        </div>
    )
}
