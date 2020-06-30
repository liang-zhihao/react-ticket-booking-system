import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, Message } from "semantic-ui-react";
import ReactDOM from "react-dom";
class Alert extends Component {
  defaultProps = {
    header: "",
    content: "",
  };
  state = {
    open: false,
    header: "",
    content: "",
    error: false,
  };
  show = (header, content, error) => {
    if (error === "error") {
      error = true;
    } else {
      error = false;
    }
    this.setState({ open: true, header, content, error });
    setTimeout(() => {
      this.setState({ open: false });
    }, 10000);
  };
  render() {
    const { open, header, content, error } = this.state;
    return (
      <Modal
        size="mini"
        onClose={() => {
          this.setState({ open: false });
        }}
        open={open}
        
      >
        {/* <Modal.Header>{header}</Modal.Header>
        <Modal.Content>{content}</Modal.Content> */}
        <Message error={error} header={header} content={content} />
      </Modal>
    );
  }
}
let div = document.createElement("div");
let props = {};
document.body.appendChild(div);
let Box = ReactDOM.render(React.createElement(Alert, props), div);
export default Box;
