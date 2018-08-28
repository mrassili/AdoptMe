import React, { Component } from "react";
import { render } from "react-dom";
import Pet from "./Pet";

class App extends Component {
  constructor(props) {
    super(props);
  }

  handleTitleClick() {
    alert("You just clicked the title!");
  }

  render() {
    return (
      <div>
        <h1 onClick={this.handleTitleClick}>AdoptMe</h1>
        <Pet name="Gohan" animal="Dog" breed="Husky" />
        <Pet name="Pepper" animal="Bird" breed="Cockatiel" />
        <Pet name="Luna" animal="Cat" breed="Siamese" />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
