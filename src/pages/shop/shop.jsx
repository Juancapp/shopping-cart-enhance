import React, { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "./product";
import "./shop.css";

export const Shop = () => {
  const [products, setProducts] = useState([]);
  const url = "https://fakestoreapi.com/products";

  useEffect(() => {
    axios.get(url).then((response) => {
      setProducts(response.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="shop">
      <div className="shopTitle">
        <h1>Juan Andrés Shop</h1>
      </div>
      <div className="products">
        {products.length ? (
          products.map((product) => (
            <Product
              id={product.id}
              title={product.title}
              price={product.price}
              image={product.image}
              description={product.description}
            />
          ))
        ) : (
          <div className="spinner"></div>
        )}
      </div>
    </div>
  );
};
