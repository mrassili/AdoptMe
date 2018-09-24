export default function breedReducer(state = "", action) {
  if (action.type === "SET_BREED") {
    return action.payload;
  } else if (action.type === "SET_ANIMAL") {
    /*
    Reinitialize breed
    since animal has changed, it doesn't make sense
    to keep the breed of the previous animal
    */
    return ""; /* the new state of breed is empty string */
    // remember: breedReducer is only responsible for the breed state changes
  } else {
    return state;
  }
}
