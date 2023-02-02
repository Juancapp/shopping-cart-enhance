import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import { XCircle } from "phosphor-react";

export const CartItem = (prop) => {
  const { id, title, price, image } = prop.data;
  const { addToCart, cartItems, removeFromCart, updateCartItemCount } =
    useContext(ShopContext);
  const cartItemAmount = cartItems[id];

  return (
    <div className="cartItem">
      <img src={image} alt={title} />
      <div className="description">
        <XCircle
          className="deleteItem"
          size={28}
          onClick={() => updateCartItemCount(0, id)}
        />
        <p>
          <b>{title}</b>
        </p>
        <p>${price}</p>
        <div className="countHandler">
          <button onClick={() => removeFromCart(id)}> - </button>
          <input
            onChange={(e) => updateCartItemCount(Number(e.target.value), id)}
            value={cartItemAmount}
            type="number"
          />
          <button onClick={() => addToCart(id)}> + </button>
        </div>
      </div>
    </div>
  );
};
