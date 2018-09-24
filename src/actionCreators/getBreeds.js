import petfinder from "petfinder-client";

export default function getBreedsThunk() {
  // A thunk is function that returns a function
  // it allows to create async actions
  // that are evaluated at runtime instead of compile time
  return function getBreeds(dispatch, getState) {
    const { animal } = getState();

    if (animal) {
      petfinder.breed.list({ animal }).then(data => {
        if (
          data.petfinder &&
          data.petfinder.breeds &&
          Array.isArray(data.petfinder.breeds.breed)
        ) {
          dispatch({
            type: "SET_BREEDS",
            payload: data.petfinder.breeds.breed
          });
        } else {
          dispatch({
            type: "SET_BREEDS",
            payload: []
          });
        }
      });
    } else {
      // no animal selected
      dispatch({
        type: "SET_BREEDS",
        payload: []
      });
    }
  };
}
