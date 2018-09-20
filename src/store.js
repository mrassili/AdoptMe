import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducers";

const store = createStore(
  // root reducer
  reducer,
  // initial state
  undefined,
  // middleware and store enhancers
  compose(
    applyMiddleware(thunk),
    typeof window === "object" &&
    typeof window.devToolsExtension !== "undefined"
      ? window.devToolsExtension()
      : f => f
  )
);

export default store;
