import React, { useContext, useEffect, useRef, useState } from "react";
import { ShopContext } from "../../context/shop-context";
import { Product } from "./product";
import { MagnifyingGlass } from "phosphor-react";
import {
  mensClothing,
  womensClothing,
  jewelery,
  electronics,
} from "../../category";
import "./shop.css";

export const Shop = () => {
  const { products, getProductsByCategory } = useContext(ShopContext);
  const productsProcessed = useRef([]);
  const [productsDisplayed, setProductDisplayed] = useState([]);
  const search = useRef();
  const category = useRef("all");

  useEffect(() => {
    productsProcessed.current = products;
    setProductDisplayed(productsProcessed.current);
  }, [products, productsProcessed]);

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

  const handleSelect = (e) => {
    category.current = e.target.value;
    getProductsByCategory(category.current);
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
          <select name="selectCategory " id="selectCategory" onChange={(e) => handleSelect(e)}>
            <option value='all' onSelect={() => handleSelect()}>
              All
            </option>
            <option value={mensClothing} onSelect={() => handleSelect()}>
              Men's Clothing
            </option>
            <option value={womensClothing} onSelect={() => handleSelect()}>
              Women's Clothing
            </option>
            <option value={jewelery} onSelect={() => handleSelect()}>
              Jewelery
            </option>
            <option value={electronics} onSelect={() => handleSelect()}>
              Electronics
            </option>
          </select>
        </div>
        {products.length > 0 ? (
          productsDisplayed.length ? (
            productsDisplayed.map((product) => (
              <Product
                id={product.id}
                title={product.title}
                price={product.price}
                image={product.image}
                description={product.description}
              />
            ))
          ) : (
            <h3>No product matches the searched name</h3>
          )
        ) : (
          <div className="spinner"></div>
        )}
      </div>
    </div>
  );
};
