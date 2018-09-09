import React from "react";
import { ANIMALS } from "petfinder-client";

class SearchParams extends React.Component {
  render() {
    return (
      <div className="search-params">
        <label htmlFor="location">
          Location
          <input
            onChange={this.props.handleLocationChange}
            id="location"
            value={this.props.sharedState.location}
            placeholder="Location"
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={this.props.sharedState.animal}
            onChange={this.props.handleAnimalChange}
            onBlur={this.props.handleAnimalChange}
          >
            <option />
            {ANIMALS.map(animal => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
            id="breed"
            value={this.props.sharedState.breed}
            onChange={this.props.handleBreedChange}
            onBlur={this.props.handleBreedChange}
            disabled={!this.props.sharedState.breeds.length}
          >
            <option />
            {this.props.sharedState.breeds.map(breed => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <button>Submit</button>
      </div>
    );
  }
}

export default SearchParams;
