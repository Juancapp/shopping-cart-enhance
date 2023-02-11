import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Spinner } from "../../component/Spinner/Spinner";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./productDetails.css";
import { ShopContext } from "../../context/shop-context";
import { Star } from "phosphor-react";

export const ProductDetails = () => {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("productId");
  const [product, setProduct] = useState([]);
  const [productAmount, setProductAmount] = useState(1);
  const { addAmountToCart } = useContext(ShopContext);
  const navigate = useNavigate();
  const [magnifyDisplay, setMagnifyDisplay] = useState(false);

  async function getProductById() {
    try {
      const response = await axios.get(
        `https://shopping-enhance-server.vercel.app/${productId}`
      );
      setProduct(response.data.data[0]);
    } catch (error) {
      console.error(error);
    }
  }

  const handleChange = (e) => {
    e.target.value >= 1 && setProductAmount(parseInt(e.target.value));
  };

  const addToCart = () => {
    addAmountToCart(productAmount, productId);
    setProductAmount(1);
  };

  useEffect(() => {
    getProductById();
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="productDetails">
      {Object.keys(product).length > 0 ? (
        <>
          <img
            className={`magnifyImgDisplayNone ${
              magnifyDisplay && `magnifyImg`
            }`}
            src={product.image}
            alt={product.title}
          />
          <div className="productContainer">
            <img
              src={product.image}
              alt={product.title}
              onMouseOver={() => setMagnifyDisplay(true)}
              onMouseLeave={() => setMagnifyDisplay(false)}
            />
            <div className="productDescriptionContainer">
              <h2 id="title">{product.title}</h2>
              <div className="rate">
                <Star size={18} weight="fill" />
                <p>{product.rating.rate}</p>
              </div>
              <p className="price">${product.price}</p>
              <p>{product.description}</p>
              <div className="inputProductContainer">
                <p>Quantity:</p>
                <button
                  className="changeAmountBttn"
                  onClick={() =>
                    productAmount > 1 &&
                    setProductAmount(parseInt(productAmount) - 1)
                  }
                >
                  -
                </button>
                <input
                  type="number"
                  value={productAmount}
                  onChange={handleChange}
                />
                <button
                  className="changeAmountBttn"
                  onClick={() => setProductAmount(parseInt(productAmount) + 1)}
                >
                  +
                </button>
              </div>
              <div className="buyButtonsContainer">
                <button
                  className="buyDetailsBttn"
                  onClick={() => {
                    addToCart();
                    navigate("/cart");
                  }}
                >
                  Buy
                </button>
                <button className="addToCartDetailsBttn" onClick={addToCart}>
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
};
