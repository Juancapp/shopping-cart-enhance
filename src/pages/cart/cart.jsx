import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../component/Modal/Modal";
import { ShopContext } from "../../context/shop-context";
import { CartItem } from "./cart-item";
import "./cart.css";

export const Cart = () => {
  const { cartItems, products, resetCount, fetched } = useContext(ShopContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isToConfirm, setIsToConfirm] = useState(true);

  const handleConfirm = () => {
    setIsToConfirm(false);
  };

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
    for (let i = 1; i < products.length + 1; i++) {
      if (cartItems[i] !== 0) {
        const product = products.find((product) => product.id === i);
        setTotalPrice((price) => (price += product.price * cartItems[i]));
      }
    }
  }, [cartItems, products]);

  return (
    <>
      {isOpen && (
        <Modal
          setIsOpen={setIsOpen}
          handleConfirm={handleConfirm}
          price={totalPrice}
          isToConfirm={isToConfirm}
          handleClose={handleClose}
        />
      )}
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
                <button onClick={() => setIsOpen(true)}>Checkout</button>
              </div>
            ) : (
              <h2>Your Cart is empty</h2>
            )}
          </>
        ) : (
          <div className="spinner"></div>
        )}
      </div>
    </>
  );
};
