import React from "react"

export default class Entry extends React.Component {
    constructor(props) {
        super(props)
        this.state = {value: ''}
        this.textbox = React.createRef()
        this.button = React.createRef()

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({value: event.target.value})
    }

    handleSubmit(event) {
        event.preventDefault()
        this.textbox.current.focus()
        this.props.onSend(this.state.value)
        this.setState({value: ''})
    }

    render() {
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
                <form onSubmit={this.handleSubmit}>
                    <div className="input-group mb3">
                        <input
                            type="text"
                            value={this.state.value}
                            onChange={this.handleChange}
                            className="form-control mousetrap"
                            style={remove_outline}
                            ref={this.textbox}
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

    componentDidMount() {
        this.textbox.current.focus()
    }
}
