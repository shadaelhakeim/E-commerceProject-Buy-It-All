import React from "react";
import { motion } from "framer-motion";
import "./style.css";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Header/Header";
const IntellectualProperty = (userData, logout) => {
  return (
    <>
      <Navbar userData={userData} logout={logout} />
      <div className="ip-container">
        <motion.header
          className="ip-header"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1>Intellectual Property</h1>
          <p>Understanding the importance of IP in the modern world</p>
        </motion.header>

        <motion.section
          className="ip-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <h2>What is Intellectual Property?</h2>
          <p>
            Intellectual property (IP) refers to creations of the mind, such as
            inventions, literary and artistic works, designs, symbols, names,
            and images used in commerce.
          </p>
        </motion.section>

        <motion.section
          className="ip-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <h2>Types of Intellectual Property</h2>
          <ul>
            <li>Copyrights</li>
            <li>Trademarks</li>
            <li>Patents</li>
            <li>Trade Secrets</li>
          </ul>
        </motion.section>

        <motion.section
          className="ip-section"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <h2>Why is IP Important?</h2>
          <p>
            Protecting intellectual property is crucial for fostering
            innovation, creativity, and economic growth. It incentivizes
            individuals and businesses to create and invest in new ideas.
          </p>
        </motion.section>

        <motion.footer
          className="ip-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <p>© 2024 Buy It All. All Rights Reserved.</p>
        </motion.footer>
      </div>
      <Footer />
    </>
  );
};

export default IntellectualProperty;
