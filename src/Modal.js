import React from "react";
import { createPortal } from "react-dom";

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
  }

  componentDidMount() {
    // anything that is browser dependent (document.*) should live in lifecycle hooks
    // so that we don't crash Node
    // Remember : markup is first sent from server to the page, then handlers are attached using `hydrate`
    this.modalRoot = document.getElementById("modal");
    this.modalRoot.appendChild(this.el);
    this.el = document.createElement("div");
  }

  componentWillUnmount() {
    this.modalRoot.removeChild(this.el);
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
