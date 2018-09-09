import React from "react";
import { render } from "react-dom";
import { Router, Link } from "@reach/router";
import Results from "./Results";
import Details from "./Details";
import SearchParams from "./SearchParams";
import pf from "petfinder-client";
import { SearchProvider } from "./SearchContext";

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: "Los Angeles, CA",
      animal: "",
      breed: "",
      breeds: "",
      handleAnimalChange: this.handleAnimalChange,
      handleBreedChange: this.handleBreedChange,
      handleLocationChange: this.handleLocationChange,
      getBreeds: this.getBreeds
    };
  }
  handleLocationChange = event => {
    // when you change the location in the input
    // a Change event is fired and this event bubbles all the way up
    // to the root div which is listening to changes for us
    // when that happens, React detects a change and re-renders
    // the input value is thus reset to state.location default value
    // hence the "inability" to type in the input
    // solution is to two-way bind the state to the input like so :
    this.setState({
      location: event.target.value
    });
  };
  handleAnimalChange = event => {
    this.setState(
      {
        animal: event.target.value,
        breed: ""
      },
      this.getBreeds
    );
  };
  getBreeds() {
    if (this.state.animal) {
      petfinder.breed.list({ animal: this.state.animal }).then(data => {
        if (
          data.petfinder &&
          data.petfinder.breeds &&
          Array.isArray(data.petfinder.breeds.breed)
        ) {
          this.setState({ breeds: data.petfinder.breeds.breed });
        } else {
          this.setState({ breeds: [] });
        }
      });
    } else {
      // no animal selected
      this.setState({ breeds: [] });
    }
  }
  handleBreedChange = event => {
    this.setState({
      breed: event.target.value
    });
  };
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
        <SearchProvider value={this.state}>
          {/* Anything under SearchProvider will have access to this.state and can update it */}
          <Router>
            <Results path="/" />
            <Details path="/details/:id" />
            <SearchParams path="/search-params" />
          </Router>
        </SearchProvider>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
