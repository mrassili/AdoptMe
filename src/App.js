import React from "react";
import { render } from "react-dom";
import { Router } from "@reach/router";
import NavBar from "./NavBar";
import Loadable from "react-loadable";
import configureStore from "./configureStore";
import { Provider } from "react-redux";

const store = configureStore();

// react-loadable takes the hustle of fulfilling import promises for you
// all you need to do is replace Details component with the new LoadableDetails
const LoadableDetails = Loadable({
  // import() returns a promise
  loader: () => import("./Details"),
  loading() {
    return <h1>Loading split out code</h1>;
  }
});

const LoadableResults = Loadable({
  // import() returns a promise
  loader: () => import("./Results"),
  loading() {
    return <h1>Loading split out code</h1>;
  }
});

const LoadableSearchParams = Loadable({
  // import() returns a promise
  loader: () => import("./SearchParams"),
  loading() {
    return <h1>Loading split out code</h1>;
  }
});

class App extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        {/* 
        Depending on the route i.e. / or /details/:id
        React renders one of those components
        */}
        <Provider store={store}>
          <Router>
            <LoadableResults path="/" />
            <LoadableDetails path="/details/:id" />
            <LoadableSearchParams path="/search-params" />
          </Router>
        </Provider>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
