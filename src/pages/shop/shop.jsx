import React, { useContext, useEffect, useRef, useState } from "react";
import { ShopContext } from "../../context/shop-context";
import { Product } from "./product";
import { MagnifyingGlass } from "phosphor-react";
import "./shop.css";

export const Shop = () => {
  const { products } = useContext(ShopContext);
  const productsProcessed = useRef([]);
  const [productsDisplayed, setProductDisplayed] = useState([]);
  const search = useRef();

  useEffect(() => {
    productsProcessed.current = products;
  }, [products]);

  useEffect(() => {
    setProductDisplayed(productsProcessed.current);
  }, [productsProcessed]);

  const handleChange = (e) => {
    search.current = e.target.value;
    let productFiltered = productsProcessed.current.filter((product) =>
      product.title
        .toString()
        .toLowerCase()
        .includes(search.current.toLowerCase())
    );
    setProductDisplayed(productFiltered);
  };

  return (
    <div className="shop">
      <div className="shopTitle">
        <h4>Offers!</h4>
      </div>
      <div className="products">
      <div className="searchBar">
      <MagnifyingGlass size={24} />
      <input
        type="text"
        className="modern-input"
        onChange={handleChange}
        ref={search}
        placeholder="Search product..."
      />
      </div>
        {products.length ? (
          productsDisplayed.length ? productsDisplayed.map((product) => (
            <Product
              id={product.id}
              title={product.title}
              price={product.price}
              image={product.image}
              description={product.description}
            />
          )) : <h3>No product matches the searched name</h3>
        ) : (
          <div className="spinner"></div>
        )}
      </div>
    </div>
  );
};
