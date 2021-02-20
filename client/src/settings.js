import React from "react"
import Modal from "react-modal"
import Mousetrap from "mousetrap"
import { TwitterPicker } from "react-color"


export default class Settings extends React.Component {
    constructor(props) {
        super(props)
        this.state = this.props.settings

        this.handleNicknameChange = this.handleNicknameChange.bind(this)
        this.handleColorChange = this.handleColorChange.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }

    handleNicknameChange(event) {
        this.setState({nickname: event.target.value})
    }

    handleColorChange(color, event) {
        this.setState({color: color.hex})
    }

    handleClose(event) {
        if (event.preventDefault) {
            event.preventDefault()
        }
        this.props.onClose(this.state)
    }

    render() {
        const style = {
            content: {
                top: "20px",
                left: "50%",
                right: "auto",
                bottom: "auto",
                marginRight: "-50%",
                transform: "translate(-50%, 0)",
                zIndex: "1050"
            },
            overlay: {
                zIndex: "1040"
            }
        }

        const flexbox = {
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }

        return (
            <Modal
                isOpen={this.props.show}
                contentLabel="React Chatroom Settings"
                style={style}
            >
                <form onSubmit={this.handleClose}>
                    <div style={flexbox}>
                        <div className="input-group mb3" style={{ marginBottom: "20px" }}>
                            <span className="input-group-text">Nickname</span>
                            <input
                                type="text"
                                value={this.state.nickname}
                                onChange={this.handleNicknameChange}
                                className="form-control mousetrap"
                            />
                        </div>
                        <div style={{ marginBottom: "20px" }}>
                            <TwitterPicker
                                color={this.state.color}
                                onChangeComplete={this.handleColorChange}
                                triangle="hide"
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-outline-primary"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </Modal>
        )
    }

    componentDidMount() {
        Mousetrap.bind("esc", this.handleClose, "keyup")
    }

    componentWillUnmount() {
        Mousetrap.unbind("esc")
    }
}

Modal.setAppElement("#root")
