import React from "react";
import pf from "petfinder-client";
import Pet from "./Pet";
import { SearchConsumer } from "./SearchContext";
import SearchBox from "./SearchBox";

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

class Results extends React.Component {
  state = {
    pets: []
  };

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
    this.search();
  }
  search = () => {
    petfinder.pet
      .find({
        output: "full",
        location: this.props.searchParams.location,
        animal: this.props.searchParams.animal,
        breed: this.props.searchParams.breed
      })
      .then(data => {
        let pets = [];

        if (data.petfinder.pets && data.petfinder.pets.pet) {
          // at least one pet is found
          if (Array.isArray(data.petfinder.pets.pet)) {
            // more than 1 pet : array
            // assign that array to pets
            pets = data.petfinder.pets.pet;
          } else {
            // only one pet : object
            // wrap it in an array
            // assign the array to pets
            pets = [data.petfinder.pets.pet];
          }
        }

        this.setState(
          {
            // ES6 object literal shorthand
            pets
          }
          /* the arrow function is IMPORTANT here
          () =>
            console.log(
              `Search complete and state updated with ${
                this.state.pets.length
              } pets`
            )
          */
        );
      });
  };

  render() {
    return (
      <div className="search">
        <SearchBox search={this.search} />
        {this.state.pets.map(pet => {
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

export default function ResultsWithContext(props) {
  return (
    <SearchConsumer>
      {/*
    Create a new component which pass the context along to Results.
    Results, therefore, can use context in its implementation above.
    {...props} is the `path` prop and specific Router props 
    which was passed by App to Results
    Intercept it and pass it along with context to Results

    Normally we would use the consumer inside the render method,
    but in this case we need to reference context inside lifecycle hooks
    hence the use of a new component (namely ResultsWithContext).
    */}
      {context => <Results {...props} searchParams={context} />}
    </SearchConsumer>
  );
}
