import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const ShopContext = createContext(null);
const url = "https://fakestoreapi.com/products";

const getProducts = async (
  setProducts,
  setFetched,
  setInitialProductsLength
) => {
  try {
    setProducts([]);
    setFetched(false);
    const result = await axios.get(url);
    setProducts(result.data);
    if (result.data.length > 0) {
      setFetched(true);
    }
    setInitialProductsLength(result.data.length);
  } catch (error) {
    console.log(error);
  }
};

export const ShopContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [productsToCart, setProductsToCart] = useState([]);
  const [initialProductsLength, setInitialProductsLength] = useState([]);

  const getProductsByCategory = async (param) => {
    try {
      setProducts([]);
      setFetched(false);
      const result =
        param !== "all"
          ? await axios.get(
              `https://fakestoreapi.com/products/category/${param}`
            )
          : await axios.get(url);
      setProducts(result.data);
      if (result.data.length > 0) {
        setFetched(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts(setProducts, setFetched, setInitialProductsLength);
  }, []);

  useEffect(() => {
    const cart = {};
    for (let i = 1; i < initialProductsLength + 1; i++) {
      cart[i] = 0;
    }
    setCartItems(cart);
    setProductsToCart(products);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialProductsLength]);

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
    setInitialProductsLength(0);
    getProducts(setProducts, setFetched, setInitialProductsLength);
  };

  const getProductsNavBar = async () => {
    try {
      setProducts([]);
      setFetched(false);
      const result = await axios.get(url);
      setProducts(result.data);
      if (result.data.length > 0) {
        setFetched(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    updateCartItemCount,
    getProducts,
    productsToCart,
    resetCount,
    products,
    fetched,
    getProductsNavBar,
    getProductsByCategory,
  };

  return (
    <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>
  );
};
