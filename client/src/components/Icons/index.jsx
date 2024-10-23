import React from 'react'
import { motion } from 'framer-motion';
export default function Icons() {
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
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="icons">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6 col-lg-3 mb-4">
            <motion.div variants={itemVariants} initial="hidden" animate="visible" className="icon text-center">
              <i className="fa-solid fa-truck mb-5 fs-3"></i>
              <h6>Free Shipping & Returns</h6>
              <p className="text-muted">For all orders over $199.00</p>
            </motion.div>
          </div>
          <div className="col-12 col-md-6 col-lg-3 mb-4">
            <motion.div variants={itemVariants} initial="hidden" animate="visible" className="icon text-center">
              <i className="fa-solid fa-credit-card mb-5 fs-3"></i>
              <h6>Secure Payment</h6>
              <p className="text-muted">We ensure secure payment</p>
            </motion.div>
          </div>
          <div className="col-12 col-md-6 col-lg-3 mb-4">
            <motion.div variants={itemVariants} initial="hidden" animate="visible" className="icon text-center">
              <i className="fa-solid fa-rotate-left mb-5 fs-3"></i>
              <h6>Money Back Guarantee</h6>
              <p className="text-muted">Returning money 30 days</p>
            </motion.div>
          </div>
          <div className="col-12 col-md-6 col-lg-3 mb-4">
            <motion.div variants={itemVariants} initial="hidden" animate="visible" className="icon text-center">
              <i className="fa-regular fa-comments mb-5 fs-3"></i>
              <h6>24/7 Customer Support</h6>
              <p className="text-muted">Friendly customer support</p>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
