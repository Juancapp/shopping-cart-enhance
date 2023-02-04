import React, { createContext, useEffect, useRef, useState } from "react";
import axios from "axios";

export const ShopContext = createContext(null);


const getProducts = async (
  setProducts,
  setFetched,
  setInitialProductsLength,
  setErrorMessage,
) => {
  try {
    setProducts([]);
    setFetched(false);
    const result = await axios.get(process.env.REACT_APP_API_URL);
    setProducts(result.data.data);
    if (result.data.data.length > 0) {
      setFetched(true);
    }
    setInitialProductsLength(result.data.data.length);
    console.log(result.data.data);
  } catch (error) {
    console.log(error);
    setErrorMessage(error.message);
  }
};

export const ShopContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [productsToCart, setProductsToCart] = useState([]);
  const [initialProductsLength, setInitialProductsLength] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [productsToDisplay, setProductsToDisplay] = useState([]);
  const search = useRef("");
  const [orderItem, setOrderItem] = useState("default");
  const [item, setItem] = useState("rate");

  const handleSearch = (e) => {
    search.current= e.target.value;
    console.log(search.current)
  };

  const getProductsByCategory = async (param) => {
    try {
      setProducts([]);
      setFetched(false);
      const result =
        param !== "all"
          ? await axios.get(
            `${process.env.REACT_APP_API_URL}/category/${param}`
            )
          : await axios.get(process.env.REACT_APP_API_URL);
      setProducts(result.data.data);
      if (result.data.data.length > 0) {
        setFetched(true);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    getProducts(
      setProducts,
      setFetched,
      setInitialProductsLength,
      setErrorMessage
    );
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
    getProducts(
      setProducts,
      setFetched,
      setInitialProductsLength,
      setErrorMessage
    );
  };

  useEffect(() => {
    setProductsToDisplay(
      products.filter((product) => {
        return product.title
          .toString()
          .toLowerCase()
          .includes(search.current.toLowerCase());
      })
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);


  useEffect(() => {
    setProductsToDisplay(orderProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderProducts()]);

  function orderProducts() {
    const orderedProducts = productsToDisplay.sort((a, b) => {
      if (orderItem === "ascending") {
        if (item === "price") {
          return a.price - b.price;
        }
        if (item === "rate") {
          return a.rating.rate - b.rating.rate;
        }
      }
      if (orderItem === "descending") {
        if (item === "price") {
          return b.price - a.price;
        }
        if (item === "rate") {
          return b.rating.rate - a.rating.rate;
        }
      }
      return a.productId - b.productId;
    });
    return orderedProducts;
  }

  const onClickSearchBttn = () => {
    setProductsToDisplay(products);
    orderProducts();
    let productsFiltered = products.filter((product) =>
      product.title
        .toString()
        .toLowerCase()
        .includes(search.current.toLowerCase())
    );
    setProductsToDisplay(productsFiltered);
  };

  const getProductsNavBar = async () => {
    try {
      setProducts([]);
      setFetched(false);
      const result = await axios.get(process.env.REACT_APP_API_URL);
      setProducts(result.data.data);
      if (result.data.data.length > 0) {
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
    errorMessage,
    getProducts,
    productsToCart,
    setProductsToDisplay,
    productsToDisplay,
    orderProducts,
    resetCount,
    setItem,
    setOrderItem,
    orderItem,
    products,
    fetched,
    getProductsNavBar,
    getProductsByCategory,
    handleSearch,
    search,
    onClickSearchBttn
  };

  return (
    <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>
  );
};
