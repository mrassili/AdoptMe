import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./reducers"; /* eslint-disable-line */
import { composeWithDevtools } from "redux-devtools-extension";

const configureStore = preloadedState => {
  const middlewares = [thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(
    ...middlewares
  ); /* the enhancer is what we actually pass to createStore */

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = composeWithDevtools(
    ...enhancers
  ); /* You can only pass one enhancer to createStore */

  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  return store;
};

export default configureStore;
