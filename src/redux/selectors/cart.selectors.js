import { createSelector } from "reselect";

export const selectCartItems = (state) => state.cartItems;
// cartItems is input selector

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce(
      (accumulator, currentElement) => accumulator + currentElement.quantity,
      0
    )
);
//selectCartItemsCount is output selector which takes input selectors as
//arguments separated by commas or in array, and second arg is callback fn
//which is use to perform momoised code

//array.reduce takes two input, one callback fn and other initial value (sum)
