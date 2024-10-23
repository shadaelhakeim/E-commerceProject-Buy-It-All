import React, { useState, useEffect , useContext } from "react";
import { DataContext } from "../../context/DataContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ProductDetails.css";
import { BiCart, BiHeart } from "react-icons/bi";
import { BadgeCheck } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Header/Header";
import Loading from "../../components/Loading";
import Footer from "../../components/Footer/Footer";
import { motion } from 'framer-motion';
const ProductDetails = () => {
  const { addToCart, addToWishlist } = useContext(DataContext);
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const handleWishlistClick = () => {
    setIsFavorite(!isFavorite);
    addToWishlist(product); 
  };
   const handleAddToCart = () => {
   addToCart(product, quantity); 
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`https://fakestoreapi.in/api/products/${id}`);
      setProduct(res.data.product);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [id]);

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

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center align-self-center  w-100">
           <div className="loading-container">
                <Loading />
              </div>
        </div>
      ) : (
          <>
         <Navbar/>
        <div className="container-fluid product-details ">
          <div className="ms-5">
                <h4 >
                  {product.title
                ? product.title.split(" ").slice(0, 10).join(" ")
                : "No title available"}
            </h4>
             <div className="d-flex mb-2">
              <div className="me-2 iconsD">
                <Link className="d-flex align-items-baseline" to="/">
                      <p>Home</p>
                      <i className="fa-solid fa-chevron-right"></i>
                </Link>
              </div>
              <div className="me-2 iconsD">
                <Link className="d-flex align-items-baseline" to="/product">
                      <p>Shop</p>
                      <i className="fa-solid fa-chevron-right"></i>
                </Link>
              </div>
              <div className="me-2">
                <p className="text-secondary">Product Details</p>
              </div>
            </div>
          </div>
          <span className="span ms-5">General Info</span>
          <span className="span-border"></span>
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="row">
            {/* Product Image */}
            <motion.div variants={itemVariants} initial="hidden" animate="visible" className="col-md-6 col-12">
              <img
                src={product.image}
                alt={product.title}
                className="img-fluid product-image"
              />
            </motion.div>
            {/* Product Details */}
            <div className="col-md-6 col-12 des-details">
              <motion.div variants={itemVariants} initial="hidden" animate="visible">
                <h5>Model</h5>
                <p className="model-t mb-4">{product.model}</p>
              </motion.div>
              <motion.div variants={itemVariants} initial="hidden" animate="visible" className="d-flex">
                <motion.div variants={itemVariants} initial="hidden" animate="visible">
                  <h5>Brand</h5>
                  <p className="text-secondary text-capitalize">
                    {product.brand}
                  </p>
                </motion.div>
                <motion.div variants={itemVariants} initial="hidden" animate="visible" className="color-d">
                  <h5>Color</h5>
                  <p className="text-secondary">{product.color}</p>
                </motion.div>
              </motion.div>
              <motion.p variants={itemVariants} initial="hidden" animate="visible" className="py-3">{product.description}</motion.p>

              {/* Quantity Selector */}
              <div className="d-flex align-items-center mb-4">
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <span className="mx-3">{quantity}</span>
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>

              {/* Add to Cart */}
              <div className="d-flex">
                <button className="btn btn-danger cart btn-lg me-3" onClick={handleAddToCart}>
                  <BiCart size={20} /> Add to cart
                  
                </button>
                <button onClick={handleWishlistClick} className="btn favorites btn-outline-secondary btn-lg">
                  <BiHeart size={20} />
                </button>
              </div>

              {/* Shipping Information */}
              <motion.div  variants={containerVariants} initial="hidden" animate="visible"className="shipping-info ">
                <h6 className="mb-4 fs-5">Shipping options</h6>
                <ul className="list-unstyled ">
                  <li>
                    Pickup from the store:{" "}
                    <span className="text-secondary">Today</span>{" "}
                    <strong>Free</strong>
                  </li>
                  <li>
                    Pickup from postal offices:{" "}
                    <span className="text-secondary">Tomorrow</span>{" "}
                    <strong>$25.00</strong>
                  </li>
                  <li>
                    Delivery by courier:{" "}
                    <span className="ms-5 text-secondary">2-3 days</span>{" "}
                    <strong>$35.00</strong>
                  </li>
                </ul>
              </motion.div>

              {/* Warranty Information */}
              <div className="warranty-info ">
                <div className="d-flex justify-content-between">
                  <h6>Warranty information</h6>
                 <i className="fa-solid fa-angles-down me-2" ></i>
                </div>
                <div>
                  <div className="my-3 info-f">
                    <BadgeCheck size={20} className="me-2" />
                    Warranty: 12 months of official manufacturer's warranty.
                    Exchange/return of the product within 14 days.
                  </div>
                  <p className="text-secondary inf0-fp">
                    Explore the details of our product warranties here,
                    including duration, coverage, and any additional protection
                    plans available. We prioritize your satisfaction, and our
                    warranty information is designed to keep you informed and
                    confident in your purchase.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
            </div>
            <Footer />
            </>
      )}
    </>
  );
};

export default ProductDetails;
