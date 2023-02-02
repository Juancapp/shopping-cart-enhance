import React, { useContext, useEffect, useRef } from "react";
import { ShopContext } from "../../context/shop-context";
import { Product } from "./product";
import {
  mensClothing,
  womensClothing,
  jewelery,
  electronics,
} from "../../category";
import "./shop.css";
import { Select } from "../../component/Select/Select";

export const Shop = () => {
  const {
    products,
    getProductsByCategory,
    errorMessage,
    productsToDisplay,
    setProductsToDisplay,
    setOrderItem,
    setItem,
    orderProducts,
  } = useContext(ShopContext);
  const search = useRef("");
  const category = useRef("all");

  useEffect(() => {
    setProductsToDisplay(
      products.filter((product) => {
        return product.title
          .toString()
          .toLowerCase()
          .includes(search.current.toLowerCase());
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  useEffect(() => {
    setProductsToDisplay(orderProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderProducts()]);

  const handleSelectItem = (e) => {
    setItem(e.target.value);
  };

  const handleSelectOrderItem = (e) => {
    setOrderItem(e.target.value);
  };

  const handleSelectCategory = (e) => {
    category.current = e.target.value;
    console.log(category.current);
    getProductsByCategory(category.current);
  };

  return (
    <div className="shop">
      {errorMessage && <p>An error has ocurred: {errorMessage}</p>}
      <div className="inputs">
        <Select
          name="selectCategory"
          labelTitle="Category:"
          optionLabel={[
            "All",
            `Men's Clothing`,
            `Women's Clothing`,
            "Jewelery",
            "Electronics",
          ]}
          values={["all", mensClothing, womensClothing, jewelery, electronics]}
          handleChange={(e) => handleSelectCategory(e)}
        />
        <Select
          name="item"
          labelTitle="Order:"
          optionLabel={["Default", "Ascending", "Descending"]}
          values={["default", "ascending", "descending"]}
          handleChange={(e) => handleSelectOrderItem(e)}
        />
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
      <div className="shopTitle">
        <h4>Offers! {`(Work in progress)`}</h4>
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
