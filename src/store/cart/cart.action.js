import { createAction } from '../../utils/reducer/reducer.utils';
import { CART_ACTION_TYPES } from './cart.types';

const removeCartItem = (cartItems, itemToRemove) => {
  return cartItems.filter((item) => item.id !== itemToRemove.id);
};

const subtractCartItem = (cartItems, productToSubtract) => {
  const foundItem = cartItems.find((item) => item.id === productToSubtract.id);
  if (foundItem) {
    if (foundItem.quantity === 1) {
      return removeCartItem(cartItems, productToSubtract);
    }
    return cartItems.map((item) =>
      item.id === productToSubtract.id
        ? { ...productToSubtract, quantity: item.quantity - 1 }
        : item
    );
  }
  console.log("cart item not found! (Shouldn't happen)");
  return [...cartItems];
};

const addCartItem = (cartItems, productToAdd) => {
  const foundItem = cartItems.find((item) => item.id === productToAdd.id);
  if (foundItem) {
    return cartItems.map((item) =>
      item.id === productToAdd.id
        ? { ...productToAdd, quantity: item.quantity + 1 || 1 }
        : item
    );
  }
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const setIsCartOpen = (isOpen) => {
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isOpen);
};

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const subtractItemFromCart = (cartItems, productToSubtract) => {
  const newCartItems = subtractCartItem(cartItems, productToSubtract);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems, itemToRemove) => {
  const newCartItems = removeCartItem(cartItems, itemToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
