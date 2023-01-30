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
  const { products, getProductsByCategory, errorMessage } =
    useContext(ShopContext);
  const [productsToDisplay, setProductsToDisplay] = useState([]);
  const search = useRef("");
  const category = useRef("all");
  const [orderItem, setOrderItem] = useState("default");
  const [item, setItem] = useState("rate");

  useEffect(() => {
    setProductsToDisplay(
      products.filter((product) => {
        return product.title
          .toString()
          .toLowerCase()
          .includes(search.current.toLowerCase());
      })
    );
  }, [products]);

  function orderProducts() {
    const orderedProducts = productsToDisplay.sort((a, b) => {
      if (orderItem === "ascending") {
        if (item === "price") {
          return a.price - b.price;
        }
        if (item === "rate") {
          return a.rating.rate - b.rating.rate;
        }
      }
      if (orderItem === "descending") {
        if (item === "price") {
          return b.price - a.price;
        }
        if (item === "rate") {
          return b.rating.rate - a.rating.rate;
        }
      }
      return a.id - b.id;
    });
    return orderedProducts;
  }

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

  const handleSelectItem = (e) => {
    setItem(e.target.value);
  };

  const handleSelectOrderItem = (e) => {
    setOrderItem(e.target.value);
  };

  const handleSelectCategory = (e) => {
    category.current = e.target.value;
    getProductsByCategory(category.current);
  };

  return (
    <div className="shop">
      {errorMessage && <p>An error has ocurred: {errorMessage}</p>}
      <div className="shopTitle">
        <h4>Offers! {`(Work in progress)`}</h4>
      </div>
      <div className="inputs">
        <div className="searchBar">
          <input
            type="text"
            className="modern-input"
            onChange={handleChange}
            placeholder="Search product..."
          />
          <button onClick={onClickSearchBttn}>
            {" "}
            <MagnifyingGlass size={24} />
          </button>{" "}
        </div>
        <label for="selectCategory">
          Category:
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
        </label>
        <label for="item">
          Select Order
          <select
            name="item"
            id="item"
            onChange={(e) => handleSelectOrderItem(e)}
          >
            <option value="default">Default</option>
            <option value="ascending">Ascending</option>
            <option value="descending">Descending</option>
          </select>
        </label>
        <div>
          <p>Order by:</p>
          <label for="rate">
            Rate:
            <input
              type="radio"
              name="orderItem"
              id="rate"
              value="rate"
              onChange={(e) => handleSelectItem(e)}
            ></input>
          </label>
          <label for="price">
            Price:
            <input
              type="radio"
              name="orderItem"
              id="price"
              value="price"
              onChange={(e) => handleSelectItem(e)}
            ></input>
          </label>
        </div>
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
                rate={product.rating.rate}
                key={product.id}
                category={product.category}
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
