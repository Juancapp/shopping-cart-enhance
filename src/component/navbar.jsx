import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Storefront } from "phosphor-react";
import { ShopContext } from "../context/shop-context";
import "./navbar.css";

export const Navbar = () => {
  const { cartItems } = useContext(ShopContext);
  const [totalCartItems, setTotalCartItems] = useState(0);

  useEffect(() => {
    let totalCartItemsUseEffect = 0;
    Object.values(cartItems).forEach((cartItem) => {
      totalCartItemsUseEffect += cartItem;
    });
    setTotalCartItems(totalCartItemsUseEffect);
  }, [cartItems]);

  return (
    <div className="navbar">
    <div className="logo">
      <Storefront size={32} color="white"/>
      <p>Cocoa</p>
    </div>
      <div className="links">
        <Link to="/"> Shop </Link>
        <Link to="/cart">
          <ShoppingCart size={32} />
        </Link>
        {totalCartItems > 0 && (
          <p>{`(${totalCartItems})`}</p>
        )}
      </div>
    </div>
  );
};
