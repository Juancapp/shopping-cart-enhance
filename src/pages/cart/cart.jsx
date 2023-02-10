import { Spinner } from "../../component/Spinner/Spinner";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../component/Modal/Modal";
import { ShopContext } from "../../context/shop-context";
import { CartItem } from "./cart-item";
import "./cart.css";

export const Cart = () => {
  const { cartItems, resetCount, fetched, productsToCart } =
    useContext(ShopContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isToConfirm, setIsToConfirm] = useState(true);

  const handleConfirm = () => {
    setIsToConfirm(false);
  };

  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, []);

  const handleClose = () => {
    setIsToConfirm(true);
    if (!isToConfirm) {
      resetCount();
      if (fetched === true) {
        navigate("/");
      }
    }
  };

  useEffect(() => {
    setTotalPrice(0);
    for (let i = 1; i < productsToCart.length + 1; i++) {
      if (cartItems[i] !== 0) {
        const product = productsToCart.find(
          (product) => product.productId === i
        );
        setTotalPrice((price) => (price += product.price * cartItems[i]));
      }
    }
  }, [cartItems, productsToCart]);

  return (
    <>
      {isOpen && (
        <Modal
          setIsOpen={setIsOpen}
          handleConfirm={handleConfirm}
          price={Math.round(totalPrice * 100) / 100}
          isToConfirm={isToConfirm}
          handleClose={handleClose}
        />
      )}
      <div className="cart">
        <h1>Cart Items</h1>
        {fetched === true ? (
          <>
            <div className="cartItems">
              {productsToCart.map((product) => {
                if (cartItems[product.productId] !== 0) {
                  return <CartItem key={product.productId} data={product} />;
                } else {
                  return null;
                }
              })}
            </div>
            {totalPrice > 0 ? (
              <div className="checkout">
                <p>Subtotal ${Math.round(totalPrice * 100) / 100}</p>
                <div className="buttons">
                  <button onClick={() => navigate("/")}>
                    Continue Shopping
                  </button>
                  <button onClick={() => setIsOpen(true)}>Checkout</button>
                </div>
              </div>
            ) : (
              <h2>Your Cart is empty</h2>
            )}
          </>
        ) : (
          <Spinner />
        )}
      </div>
    </>
  );
};
