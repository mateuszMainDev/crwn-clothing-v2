import { createContext, useEffect, useState } from 'react';

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

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  subtractItemFromCart: () => {},
  removeItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const count = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    setCartCount(count);
  }, [cartItems]);

  useEffect(() => {
    const price = cartItems.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
    setCartTotal(price);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const subtractItemFromCart = (productToSubtract) => {
    setCartItems(subtractCartItem(cartItems, productToSubtract));
  };

  const removeItemFromCart = (itemToRemove) => {
    setCartItems(removeCartItem(cartItems, itemToRemove));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    subtractItemFromCart,
    removeItemFromCart,
    cartItems,
    cartCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
