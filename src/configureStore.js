import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./reducers"; /* eslint-disable-line */
import { composeWithDevTools } from "redux-devtools-extension";

export default function configureStore(preloadedState) {
  const middlewares = [thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(
    ...middlewares
  ); /* the enhancer (applyMiddleware) is what we actually pass to createStore */

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = composeWithDevTools(
    ...enhancers
  ); /* You can only pass one enhancer to createStore */

  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  return store;
}
