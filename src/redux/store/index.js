import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

//importing a utility functions
import { addItemToCart } from "../utils";
import { increaseItemFromCart } from "../utils";
import { decreseItemFromCart } from "../utils";

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
  if (action.type === "CLEAR_ITEM_FROM_CART") {
    return {
      ...state,
      cart: {
        ...state.cart,
        cartItems: state.cart.cartItems.filter(
          (item) => item.id !== action.payload.id
        ),
      },
    };
  }
  if (action.type === "INCREMENT_QUANTITY") {
    return {
      ...state,
      cart: {
        ...state.cart,
        cartItems: increaseItemFromCart(state.cart.cartItems, action.payload),
      },
    };
  }
  if (action.type === "DECREMENT_QUANTITY") {
    return {
      ...state,
      cart: {
        ...state.cart,
        cartItems: decreseItemFromCart(state.cart.cartItems, action.payload),
      },
    };
  }
  return state;
};

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};
const pReducer = persistReducer(persistConfig, reducer);

const middlewares = [];

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

const store = createStore(pReducer, applyMiddleware(...middlewares));
const persistor = persistStore(store);

export { persistor, store };
