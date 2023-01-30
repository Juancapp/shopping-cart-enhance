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
  const [productsToDisplay, setProductsToDisplay] = useState([]);
  const search = useRef("");
  const category = useRef("all");
  const [orderPrice, setOrderPrice] = useState("default");

  useEffect(() => {
    setProductsToDisplay(products);
  }, [products]);

  const orderProducts = () => {
    const orderedProducts = productsToDisplay.sort((a, b) => {
      if (orderPrice === "ascending") return a.price - b.price;
      if (orderPrice === "descending") return b.price - a.price;
      return a.id - b.id;
    });
    return orderedProducts;
  };

  useEffect(() => {
    setProductsToDisplay(orderProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderProducts()]);

  const handleChange = (e) => {
    search.current = e.target.value;
  };

  const onClickSearchBttn = () => {
    setProductsToDisplay(products);
    orderProducts();
    let productsFiltered = products.filter((product) =>
      product.title
        .toString()
        .toLowerCase()
        .includes(search.current.toLowerCase())
    );
    setProductsToDisplay(productsFiltered);
  };

  const handleSelectOrderPrice = (e) => {
    setOrderPrice(e.target.value);
  };

  const handleSelectCategory = (e) => {
    category.current = e.target.value;
    getProductsByCategory(category.current);
  };

  return (
    <div className="shop">
      <div className="shopTitle">
        <h4>Offers! {`(Work in progress)`}</h4>
      </div>
      <div className="inputs">
        <div className="searchBar">
          <MagnifyingGlass size={24} />
          <input
            type="text"
            className="modern-input"
            onChange={handleChange}
            ref={search}
            placeholder="Search product..."
          />
          <button onClick={onClickSearchBttn}>Search</button>{" "}
        </div>
        <select
          name="selectCategory "
          id="selectCategory"
          onChange={(e) => handleSelectCategory(e)}
        >
          <option value="all">All</option>
          <option value={mensClothing}>Men's Clothing</option>
          <option value={womensClothing}>Women's Clothing</option>
          <option value={jewelery}>Jewelery</option>
          <option value={electronics}>Electronics</option>
        </select>
        <select
          name="orderPrice "
          id="orderPrice"
          onChange={(e) => handleSelectOrderPrice(e)}
        >
          <option value="default">Default</option>
          <option value="ascending">Ascending</option>
          <option value="descending">Descending</option>
        </select>
      </div>
      <div className="products">
        {products.length > 0 ? (
          productsToDisplay.length > 0 ? (
            productsToDisplay.map((product) => (
              <Product
                id={product.id}
                title={product.title}
                price={product.price}
                image={product.image}
                description={product.description}
                key={product.id}
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
