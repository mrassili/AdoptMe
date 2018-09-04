import React, { Component } from "react";
import { render } from "react-dom";
import { Router, Link } from "@reach/router";
import Results from "./Results";
import Details from "./Details";

class App extends Component {
  render() {
    return (
      <div>
        <header>
          <Link to="/">AdoptMe</Link>
        </header>
        {/* 
        Depending on the route i.e. / or /details/:id
        React renders one of those components
        */}
        <Router>
          <Results path="/" />
          <Details path="/details/:id" />
        </Router>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
