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

    const div_styles = {
        width: "100%",
        padding: "10px"
    }
    const remove_outline = {
        outline: "none",
        boxShadow: "none"
    }

    return (
        <div style={div_styles}>
            <form onSubmit={handleSubmit}>
                <div className="input-group mb3">
                    <input
                        type="text"
                        value={value}
                        onChange={handleChange}
                        className="form-control mousetrap"
                        style={remove_outline}
                        ref={textbox}
                    />
                    <button
                        type="submit"
                        className="btn btn-outline-secondary active"
                        style={remove_outline}>
                        <i className="fas fa-paper-plane"></i>
                    </button>
                </div>
            </form>
        </div>
    )
}
