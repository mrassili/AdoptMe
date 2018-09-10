import React from "react";
import { ANIMALS } from "petfinder-client";
import { SearchConsumer } from "./SearchContext";

class SearchBox extends React.Component {
  handleFormSubmit = event => {
    event.preventDefault();
    this.props.search();
  };
  render() {
    return (
      <SearchConsumer>
        {context => (
          <div className="search-params">
            <form onSubmit={this.handleFormSubmit}>
              {/*
              Put onSubmit at the form level instead of using
              onClick on the submit button, to make it easy for the user
              to just press Enter as well as click Submit for the results
              to show up
              */}
              <label htmlFor="location">
                Location
                <input
                  onChange={context.handleLocationChange}
                  id="location"
                  value={context.location}
                  placeholder="Location"
                />
              </label>
              <label htmlFor="animal">
                Animal
                <select
                  id="animal"
                  value={context.animal}
                  onChange={context.handleAnimalChange}
                  onBlur={context.handleAnimalChange}
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
                  value={context.breed}
                  onChange={context.handleBreedChange}
                  onBlur={context.handleBreedChange}
                  disabled={!context.breeds.length}
                >
                  <option />
                  {context.breeds.map(breed => (
                    <option key={breed} value={breed}>
                      {breed}
                    </option>
                  ))}
                </select>
              </label>
              <button>Submit</button>
            </form>
          </div>
        )}
      </SearchConsumer>
    );
  }
}

export default SearchBox;
