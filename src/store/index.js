import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

const initialState = {
  currentUser: null,
};

const reducer = (state = initialState, action) => {
  if (action.type === "SET_CURRENT_USER") {
    return { ...state, currentUser: action.payload };
  }
  return state;
};

const middlewares = [logger];

const store = createStore(reducer, applyMiddleware(...middlewares));

export default store;
