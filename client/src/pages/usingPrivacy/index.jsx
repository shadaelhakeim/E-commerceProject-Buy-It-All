import React from 'react';
import { motion } from 'framer-motion';
import './style.css';
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Header/Header";
const HowToUse = (userData, logout) => {
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
    <Navbar userData={userData} logout={logout} />
    <motion.div
      className="how-to-use-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1 variants={itemVariants} className="how-to-use-title">
        How to Use Buy It All
      </motion.h1>

      <motion.div variants={itemVariants} className="how-to-use-section">
        <h2>1. Create an Account</h2>
        <p>
          Start by creating an account to enjoy a personalized shopping
          experience. Simply click on the "Sign Up" button at the top-right
          corner and fill in your details.
        </p>
      </motion.div>

      <motion.div variants={itemVariants} className="how-to-use-section">
        <h2>2. Browsing Products</h2>
        <p>
          Use the navigation menu or search bar to browse through our wide range
          of tech hardware products. Each category is neatly organized to help
          you find exactly what you need.
        </p>
      </motion.div>

      <motion.div variants={itemVariants} className="how-to-use-section">
        <h2>3. Adding Items to Cart</h2>
        <p>
          When you find a product you like, simply click the "Add to Cart"
          button. You can view your selected items by clicking on the shopping
          cart icon at the top-right corner of the page.
        </p>
      </motion.div>

      <motion.div variants={itemVariants} className="how-to-use-section">
        <h2>4. Checking Out</h2>
        <p>
          Once you're ready to purchase, click the cart icon and proceed to the
          checkout. Enter your shipping and payment information, and place your
          order. You’ll receive a confirmation email shortly after.
        </p>
      </motion.div>

      <motion.div variants={itemVariants} className="how-to-use-section">
        <h2>5. Tracking Your Order</h2>
        <p>
          After placing an order, you can track its progress in the "My Orders"
          section of your account. We'll also send you email updates with the
          latest status.
        </p>
      </motion.div>

      <motion.div variants={itemVariants} className="how-to-use-section">
        <h2>6. Contact Support</h2>
        <p>
          If you need any assistance, our support team is here to help. Use the
          "Contact Us" form on our website, or reach out via email or phone.
        </p>
      </motion.div>
    </motion.div>
    <Footer />
    </>
  );
};

export default HowToUse;
