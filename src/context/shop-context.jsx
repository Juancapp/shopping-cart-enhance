import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const ShopContext = createContext(null);

export const ShopContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [fetched, setFetched] = useState(false);
  const url = "https://fakestoreapi.com/products";

  useEffect(() => {
    const getProducts = async () => {
      const result = await axios.get(url);
      setProducts(result.data);
      setFetched(true);
    };
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let cart = {};
    for (let i = 1; i < products.length + 1; i++) {
      cart[i] = 0;
    }
    setCartItems(cart);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const updateCartItemCount = (newAmount, itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
  };

  const resetCount = () => {
    setCartItems((prev) => {
      for (let i = 1; i < products.length + 1; i++) {
        prev[i] = 0;
      }
    });
  };

  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    updateCartItemCount,
    resetCount,
    products,
    fetched,
  };

  return (
    <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>
  );
};
