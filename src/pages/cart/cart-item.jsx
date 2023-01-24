import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import { XCircle } from "phosphor-react";

export const CartItem = (props) => {
  const { id, title, price, image } = props.data;
  const { addToCart, cartItems, removeFromCart, updateCartItemCount } =
    useContext(ShopContext);
  const cartItemAmount = cartItems[id];

  return (
    <div className="cartItem">
      <img src={image} alt={title} />
      <div className="description">
        <button
          className="deleteItem"
          onClick={() => updateCartItemCount(0, id)}
        >
          <XCircle size={28} />
        </button>
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
