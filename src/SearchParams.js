import React from "react";
import { ANIMALS } from "petfinder-client";

class SearchParams extends React.Component {
  state = {
    location: "Los Angeles, CA",
    animal: "",
    breed: ""
  };
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
    this.setState({
      animal: event.target.value
    });
  };
  render() {
    return (
      <div className="search-params">
        <label htmlFor="location">
          Location
          <input
            onChange={this.handleLocationChange}
            id="location"
            value={this.state.location}
            placeholder="Location"
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={this.state.animal}
            onChange={this.handleAnimalChange}
            onBlur={this.handleAnimalChange}
          >
            <option />
            {ANIMALS.map(animal => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
      </div>
    );
  }
}

export default SearchParams;
