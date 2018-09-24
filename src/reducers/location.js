export default function locationReducer(state = "Seattle, WA", action) {
  if (action.type === "SET_LOCATION") {
    /* only handle the actions that have to do with location,
    return a new state. since the state is just a string
    and a JS string is immutable by default
    we won't need to escape mutability
    */
    return action.payload;
  } else {
    /* state remains unchanged, return the previous state */
    return state;
  }
}
