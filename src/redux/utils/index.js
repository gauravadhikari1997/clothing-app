export const addItemToCart = (cartItems, cartItemToAdd) => {
  const cartItemExists = cartItems.find(
    (cartItem) => cartItem.id === cartItemToAdd.id
  );

  if (cartItemExists) {
    return cartItems.map((cartItem) =>
      cartItem.id === cartItemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : { ...cartItem }
    );
  }

  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};

export const decreseItemFromCart = (cartItems, cartItemToDecrease) => {
  const cartItemExists = cartItems.find(
    (item) => item.id === cartItemToDecrease.id
  );

  if (cartItemExists.quantity === 1) {
    return cartItems.filter(
      (cartItem) => cartItem.id !== cartItemToDecrease.id
    );
  }

  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToDecrease.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : { ...cartItem }
  );
};

export const increaseItemFromCart = (cartItems, cartItemToIncrease) => {
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToIncrease.id
      ? { ...cartItem, quantity: cartItem.quantity + 1 }
      : { ...cartItem }
  );
};
