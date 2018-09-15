import React from "react";
import { createPortal } from "react-dom";

const modalRoot = document.getElementById("modal");

class Modal extends React.Component {
  /*
    This Modal component is just an *abstraction* around the portal API for every actual modal dialog
    which will be created on whatever route or component and rendered to modalRoot
    this is the power of React Portals
    */
  constructor(props) {
    super(props);

    // create a div that we'll render the modal into
    // which will then be mounted into modalRoot
    this.el = document.createElement("div");
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    return createPortal(
      // We don't know what will be rendered inside 'el'
      // this.props.children refers to an array of components living inside Modal
      this.props.children,
      // DOM element holding the modal
      this.el
    );
  }
}

export default Modal;
