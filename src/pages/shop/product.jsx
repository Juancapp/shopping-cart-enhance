import { XCircle } from "phosphor-react";
import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";

export const Product = ({ id, title, price, image, rate, category }) => {
  const { addToCart, cartItems, updateCartItemCount } = useContext(ShopContext);
  const cartItemAmount = cartItems[id];
  return (
    <div className="product">
      <img src={image} alt={title} />
      <div className="description">
        <p>
          <b>{title}</b>
        </p>
        <p>
          <b>${price}</b>
        </p>
        <p>Rate: {rate}</p>
        <p>Category: {category.charAt(0).toUpperCase() + category.slice(1)}</p>
      </div>
      <div className="buttonsContainer">
        {cartItemAmount > 0 && (
          <XCircle
            className="deleteBttn"
            size={20}
            onClick={() => updateCartItemCount(0, id)}
          />
        )}
        <button className="addToCartBttn" onClick={() => addToCart(id)}>
          Add to Cart {cartItemAmount > 0 && `(${cartItemAmount})`}
        </button>
      </div>
    </div>
  );
};
