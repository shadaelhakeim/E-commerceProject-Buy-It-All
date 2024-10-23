import React from "react";
import { motion } from "framer-motion";
import "./style.css";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Header/Header";
const PrivacyPolicy = (userData, logout) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.3,
        ease: "easeInOut",
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
        className="privacy-policy-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 variants={itemVariants} className="privacy-policy-title">
          Privacy Policy
        </motion.h1>

        <motion.div variants={itemVariants} className="privacy-policy-section">
          <h2>1. Information We Collect</h2>
          <p>
            We collect various types of information in order to provide you with
            the best experience possible...
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="privacy-policy-section">
          <h2>2. How We Use Your Information</h2>
          <p>
            We use your information to process orders, improve our services, and
            communicate with you...
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="privacy-policy-section">
          <h2>3. Sharing Your Information</h2>
          <p>
            We do not share your information with third parties, except where
            necessary to complete your orders or comply with the law...
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="privacy-policy-section">
          <h2>4. Data Security</h2>
          <p>
            We take appropriate steps to protect your information using
            encryption and secure servers...
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="privacy-policy-section">
          <h2>5. Your Rights</h2>
          <p>
            You have the right to request access to your data, request
            correction, or delete your data...
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="privacy-policy-section">
          <h2>Contact Us</h2>
          <p>
            If you have any questions regarding our privacy policy, please
            contact us at: <br />
            Email: support@buyitall.com <br />
            Phone: +123 456 7890
          </p>
        </motion.div>
      </motion.div>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
