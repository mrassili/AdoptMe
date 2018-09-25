import pf from "petfinder-client";

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

export default function getPetsThunk() {
  return function getPets(dispatch, getState) {
    const { location, animal, breed } = getState();

    petfinder.pet
      .find({
        output: "full",
        location: location,
        animal: animal,
        breed: breed
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

        dispatch({
          type: "SET_PETS",
          payload: pets
        });
        /* the arrow function is IMPORTANT here
          () =>
            console.log(
              `Search complete and state updated with ${
                this.state.pets.length
              } pets`
            )
          */
      });
  };
}
