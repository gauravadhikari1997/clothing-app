import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

//importing a utility function to add/update quantity of item
import { addItemToCart } from "../utils";

const initialState = {
  currentUser: null,
  cart: {
    cartHidden: true,
    cartItems: [],
  },
};

const reducer = (state = initialState, action) => {
  if (action.type === "SET_CURRENT_USER") {
    return { ...state, currentUser: action.payload };
  }
  if (action.type === "TOGGLE_CART_HIDDEN") {
    return {
      ...state,
      cart: { ...state.cart, cartHidden: !state.cart.cartHidden },
    };
  }
  if (action.type === "ADD_ITEM") {
    return {
      ...state,
      cart: {
        ...state.cart,
        cartItems: addItemToCart(state.cart.cartItems, action.payload),
      },
    };
  }
  return state;
};

const middlewares = [logger];

const store = createStore(reducer, applyMiddleware(...middlewares));

export default store;
