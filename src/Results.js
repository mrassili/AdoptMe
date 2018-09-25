import React from "react";
import Pet from "./Pet";
import SearchBox from "./SearchBox";
import { connect } from "react-redux";
import getPets from "./actionCreators/getPets";

class Results extends React.Component {
  componentDidMount() {
    // console.log(`Results mount with ${this.state.pets.length} pets`);
    /*
  As soon as a user changes the location, animal or breed on the form (at search-params route)
  the event handlers (handleLocationChange,...) are fired calling setState.
  the App's state changes to meet the search parameters specified by the user
  that state is then passed as context to ResultsWithContext then to Results
  In the root path ('/'), componentDidMount fires and this.search() is called
  which uses the context (searchParams) to search for pets and assign the resulting
  array of pets to Results' state. this.search() itself calls setState which results
  in 2 renders but the intermediate state (where pets are not the ones that meet searchParams)
  doesn't show up to users and only when the setState is complete that the render is visually done.
  *We would have called this.search() in the constructor but it's absurd to call setState there*
  */
    this.props.search();
  }

  render() {
    return (
      <div className="search">
        <SearchBox search={this.props.search} />
        {this.props.pets.map(pet => {
          let breed = "";
          // check if pet has more than one breed
          if (Array.isArray(pet.breeds.breed)) {
            // pet has more than one breed
            // join them with a comma
            breed = pet.breeds.breed.join(", ");
          } else {
            // pet has only one breed
            breed = pet.breeds.breed;
          }
          return (
            <Pet
              key={pet.id} // key isn't passed to React!! You can't use it inside your Pet component.
              name={pet.name}
              animal={pet.animal}
              breed={breed}
              media={pet.media}
              location={`${pet.contact.city}, ${pet.contact.state}`}
              id={pet.id}
            />
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = ({ location, animal, breed, pets }) => ({
  /*
  instead of passing state, we can pass 
  only the state slice concerned which is { location } (object destructuring).
  so when the mapStateToProps receives the full state object
  it only retrieve location from it
  */
  location,
  animal,
  breed,
  pets
});

const mapDispatchToProps = dispatch => ({
  search() {
    dispatch(getPets());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Results);
