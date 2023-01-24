import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import { Product } from "./product";
import "./shop.css";

export const Shop = () => {
  const { products } = useContext(ShopContext);

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
