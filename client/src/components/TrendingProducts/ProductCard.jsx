import React, { useState, useContext  } from "react";
import { FaHeart, FaTag, FaShoppingCart } from "react-icons/fa";
import "./style.css";
import { DataContext } from "../../context/DataContext";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const { addToCart, addToWishlist } = useContext(DataContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const handleWishlistClick = () => {
    setIsFavorite(!isFavorite);
    addToWishlist(product); 
  };
   const handleAddToCart = () => {
    addToCart(product); 
   
  };

    // Check if product is defined before trying to use its properties
  if (!product || !product.price) {
    return;
  }

  // Function to calculate the discounted price
  const calculateDiscountedPrice = (price, discount) => {
    return discount
      ? (price - (price * discount) / 100).toFixed(2)
      : price.toFixed(2);
  };

  const discountedPrice = calculateDiscountedPrice(
    product.price,
    product.discount
  );

  return (
    <div className="col-12 col-md-6 col-lg-4 mb-4 p-0">
      <div className="product-card">
        <img src={product.image} alt={product.title} />
        {product.discount && (
          <div className="sale">
            <FaTag /> {product.discount}%
          </div>
        )}
        <div
          className="heart"
          onClick={handleWishlistClick}
          style={{ color: isFavorite ? "red" : "black" }}
        >
          <FaHeart />
        </div>
        <div style={{ padding: "15px" }}>
          <Link to={`/productDetails/${product.id}`}>
          <h5
            className="text-truncate"
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {product.title}
            </h5>
            </Link>
          {/* Discounted Price */}
              <span className="c-price fs-5">
                <span className="text-danger">$</span> {discountedPrice}
              </span>

          {/* Original Price */}
              {product.discount && (
                <span className="text-muted text-decoration-line-through fs-6 ms-2">
                  <span className="text-danger">$</span>{" "}
                  {product.price.toFixed(2)}
                </span>
          )}
          <div >
          <span>Color : {product.color} </span>
          <br />
          <span>Model : {product.model} </span>
          </div>
        </div>

        <div className="shop-cart" onClick={handleAddToCart}>
          <FaShoppingCart />
        </div>
      </div>
    </div>
  );
}
