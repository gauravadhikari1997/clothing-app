import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

//importing a utility function to add/update quantity of item
import { addItemToCart } from "../utils";

const initialState = {
  currentUser: null,
  cartHidden: true,
  cartItems: [],
};

const reducer = (state = initialState, action) => {
  if (action.type === "SET_CURRENT_USER") {
    return { ...state, currentUser: action.payload };
  }
  if (action.type === "TOGGLE_CART_HIDDEN") {
    return { ...state, cartHidden: !state.cartHidden };
  }
  if (action.type === "ADD_ITEM") {
    return {
      ...state,
      cartItems: addItemToCart(state.cartItems, action.payload),
    };
  }
  return state;
};

const middlewares = [logger];

const store = createStore(reducer, applyMiddleware(...middlewares));

export default store;
