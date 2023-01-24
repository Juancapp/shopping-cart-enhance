import React, { createContext, useState } from "react";
import axios from "axios";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let products = [];
  let cart = {};
  axios.get("https://fakestoreapi.com/products").then((response) => {
    products = response.data;
    for (let i = 1; i < products.length + 1; i++) {
      cart[i] = 0;
    }
  });
  return cart;
};

export const ShopContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const updateCartItemCount = (newAmount, itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
  };

  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    updateCartItemCount,
  };

  return (
    <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>
  );
};
