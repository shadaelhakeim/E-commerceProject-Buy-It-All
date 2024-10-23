import React, { useContext } from "react";
import { Star, StarHalf } from "lucide-react";
import "./ProductCard.css"; // Custom styles for extra design
import {FaTag, FaShoppingCart} from "react-icons/fa";
import { Link } from "react-router-dom";
import { DataContext } from "../../context/DataContext";
import { motion } from 'framer-motion';
const ProductCard = ({ product}) => {
      const { addToCart} = useContext(DataContext);
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

   const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.2,
        ease: 'easeInOut',
        duration: 0.8,
      },
    },
  };


  return (
    <motion.div  variants={containerVariants} initial="hidden" animate="visible" className="col mb-4 product-page mt-1">
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="card h-100 shadow-sm position-relative">
        {product.discount && (
          <div className="sale">
            <FaTag /> -{product.discount}%
          </div>
        )}
        <Link  to={`/productDetails/${product.id}`} className="img-center">
          <img
            src={product.image || "default-image-url.jpg"} // Fallback for missing image
            className="card-img-top"
            alt={product.title || "No Title"} // Fallback for missing title
          />
        </Link>
        <div className="card-body">
           <div className="d-flex align-items center">
                          <div className="stars d-flex text-warning ">
                            <i className="fas fa-star me-1"></i>
                            <i className="fas fa-star me-1"></i>
                            <i className="fas fa-star me-1"></i>
                            <i className="fas fa-star me-1"></i>
                            <i className="fas fa-star-half-alt me-1"></i>
                          </div>
                          <small>
                            ({product.discount ? product.discount : 0})
                          </small>
                        </div>

          <Link to={`/productDetails/${product.id}`}>
            <h5 className="card-title">
              {product.title
                ? product.title.split(" ").slice(0, 10).join(" ")
                : "No title available"}
            </h5>
          </Link>

          <p className="text-muted">{product.brand || "No brand"}</p>

          <div className="d-flex justify-content-between align-items-center">
            <div>
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
            </div>
              <div className="shop-cart">
                <FaShoppingCart onClick={() => addToCart(product)}/>
              </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProductCard;
