import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./WishList.css";
import { Info } from "lucide-react";
import Navbar from "../../components/Header/Header";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import Footer from "../../components/Footer/Footer";
import { motion } from 'framer-motion';

const Wishlist = (userData,logout) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlistItems(wishlist);
  }, []);
 const toggleWishlistItem = (productId) => {
   let updatedWishlist = wishlistItems.filter((item) => item.id !== productId);
   setWishlistItems(updatedWishlist);
   localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };
  
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
    <>
      <div  className="wishlist-page container mt-5">
        <Navbar />
        <motion.div  variants={containerVariants}
      initial="hidden"
      animate="visible" className="pt-5">
          <div className="seven">
            <h1>Your Wishlist</h1>
          </div>
          <div className="row ">
            {wishlistItems.length === 0 ? (
              <div className="no-items d-flex justify-content-center align-items-center">
                <h2
                  className="text-center mt-2"
                  style={{ color: "var(--main-color)" }}
                >
                  <span className="me-1">
                    <Info size={20} />
                  </span>
                  No items in your wishlist !
                </h2>
              </div>
            ) : (
              wishlistItems.map((product, index) => (
                <div key={index} className="col-md-4">
                  <div className="card">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="card-img-top"
                    />
                    <div className="card-body">
                      <p
                        className="text-truncate mb-1"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title={product.title}
                        data-bs-custom-class="custom-tooltip"
                      >
                        {product.title}
                      </p>
                      <p className="card-text">${product.price}</p>
                      <Link
                        to={`/productDetails/${product.id}`}
                        className="btn wishlist-btn"
                      >
                        View Product
                      </Link>
                      <div className="d-flex justify-content-between align-items-center mt-2">
                        <div className="shop-cart">
                          <FaShoppingCart />
                        </div>
                        <div className="wishlist-heart">
                          <FaHeart
                            onClick={() => toggleWishlistItem(product.id)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default Wishlist;
