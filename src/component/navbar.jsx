import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MagnifyingGlass, ShoppingCart, Storefront } from "phosphor-react";
import { ShopContext } from "../context/shop-context";
import "./navbar.css";

export const Navbar = () => {
  const { cartItems, getProductsNavBar, handleSearch, onClickSearchBttn } =
    useContext(ShopContext);
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
      <div className="links">
        <div className="logo">
          <Storefront size={32} color="white" />
          <Link to="/" onClick={getProductsNavBar}>
            <p>Cocoa</p>
          </Link>
        </div>
        <div className="shopAndCart">
          <Link to="/cart">
            <ShoppingCart size={32} />
          </Link>
          {totalCartItems > 0 && <p className="circle">{totalCartItems}</p>}
        </div>
      </div>
      <div className="searchBar">
        <input
          type="text"
          className="modern-input"
          onChange={(e) => handleSearch(e)}
          placeholder="Search product..."
        />
        <button onClick={() => onClickSearchBttn()}>
          <MagnifyingGlass size={24} className="searchBarBttn" />
        </button>
      </div>
    </div>
  );
};
