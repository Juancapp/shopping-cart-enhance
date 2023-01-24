import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../../context/shop-context";
import { CartItem } from "./cart-item";
import "./cart.css";

export const Cart = () => {
  const [products, setProducts] = useState([]);
  const url = "https://fakestoreapi.com/products";
  const { cartItems } = useContext(ShopContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [fetched, setFetched] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(url).then((response) => {
      setProducts(response.data);
      setFetched(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTotalPrice(0);
    for (let i = 1; i < products.length + 1; i++) {
      if (cartItems[i] !== 0) {
        const product = products.find((product) => product.id === i);
        setTotalPrice((price) => (price += product.price * cartItems[i]));
      }
    }
  }, [cartItems, products]);

  return (
    <div className="cart">
      <div>
        <h1>Cart Items</h1>
      </div>
      {fetched === true ? (
        <>
          <div className="cartItems">
            {products.map((product) => {
              if (cartItems[product.id] !== 0) {
                return <CartItem data={product} />;
              } else {
                return null;
              }
            })}
          </div>
          {totalPrice > 0 ? (
            <div className="checkout">
              <p>Subtotal ${totalPrice}</p>
              <button onClick={() => navigate("/")}>Continue Shopping</button>
              <button>Checkout</button>
            </div>
          ) : (
            <h2>Your Cart is empty</h2>
          )}
        </>
      ) : (
        <div className="spinner"></div>
      )}
    </div>
  );
};
