import { combineReducers } from "redux";
import location from "./location";
import animal from "./animal";
import breed from "./breed";
import breeds from "./breeds";
import pets from "./pets";

export default combineReducers({
  location,
  animal,
  breed,
  breeds,
  pets
});
