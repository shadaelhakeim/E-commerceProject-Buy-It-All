import React from "react";
import "./style.css";
import Navbar from "../../components/Header/Header";
import { motion } from "framer-motion";
import Footer from '../../components/Footer/Footer'
function AboutSection(userData, logout) {
  return (
<>
<div className="about-us-container">
<Navbar userData={userData} logout={logout} />
<motion.div
  className="about-header"
  initial={{ opacity: 0, y: -50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
  <h1 className="about-title">About Buy It All</h1>
  <p className="about-subtitle">
    Your trusted tech hardware supplier since 2001
  </p>
</motion.div>

<div className="about-content">
  <motion.div
    className="about-text"
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, delay: 0.2 }}
  >
    <h2>Who We Are</h2>
    <p>
      Established in 2001, Buy It All has been providing top-quality tech
      hardware to customers across Egypt and beyond. From processors to
      graphic cards and everything in between, we strive to offer the
      latest and best in the tech world. Our dedication to quality and
      customer satisfaction has made us a trusted name in the industry.
    </p>
  </motion.div>

  <motion.div
    className="about-image"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8, delay: 0.4 }}
  >
    <img
      src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      alt="Tech hardware"
      className="about-us-image"
    />
  </motion.div>
</div>

<motion.div
  className="about-info"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.8, delay: 0.6 }}
>
  <div className="info-card">
    <h3>Our Experience</h3>
    <p>
      With over 20 years in the business, we have seen the tech industry
      evolve. Our team has the knowledge and expertise to help you find
      the perfect tech solutions.
    </p>
  </div>
  <div className="info-card">
    <h3>Our Mission</h3>
    <p>
      Our mission is to provide reliable, high-quality tech hardware that
      meets the needs of all users, from hobbyists to professionals.
    </p>
  </div>
  <div className="info-card">
    <h3>Our Location</h3>
    <p>
      We are proudly based in Egypt, serving clients locally and
      internationally with the same passion and attention to detail.
    </p>
  </div>
</motion.div>

</div>
<Footer />
</>
  );
}

export default AboutSection;
