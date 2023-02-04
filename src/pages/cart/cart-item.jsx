import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import { XCircle } from "phosphor-react";

export const CartItem = (prop) => {
  const { productId, title, price, image } = prop.data;
  const { addToCart, cartItems, removeFromCart, updateCartItemCount } =
    useContext(ShopContext);
  const cartItemAmount = cartItems[productId];

  return (
    <div className="cartItem">
      <img src={image} alt={title} />
      <div className="description">
        <XCircle
          className="deleteItem"
          size={28}
          onClick={() => updateCartItemCount(0, productId)}
        />
        <p>
          <b>{title}</b>
        </p>
        <p>${price}</p>
        <div className="countHandler">
          <button className="cartButton" onClick={() => removeFromCart(productId)}>
            -
          </button>
          <input
            onChange={(e) => updateCartItemCount(Number(e.target.value), productId)}
            value={cartItemAmount}
            type="number"
          />
          <button className="cartButton" onClick={() => addToCart(productId)}>
            +
          </button>
        </div>
      </div>
    </div>
  );
};
