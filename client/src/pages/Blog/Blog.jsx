import React, { useEffect, useState } from "react";
import "./Blog.css";
import defaultImage from "../../images/Blog-default.jfif";
import Navbar from "../../components/Header/Header";
import Spinner from "../../components/spinner/index";
import { motion } from "framer-motion";
import Footer from '../../components/Footer/Footer'
const TechBlog = (logout, userData) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTechBlogs = async () => {
      try {
        const response = await fetch(
          "https://newsapi.org/v2/top-headlines?category=technology&apikey=f2f3a3d9db104c22a5b2182cfc5623aa"
        );
        const data = await response.json();
        setArticles(data.articles);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching the blog data:", error);
        setLoading(false);
      }
    };

    fetchTechBlogs();
  }, []);

  if (loading) {
    return <Spinner />
  }
  const blogCardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
    hover: { scale: 1.02, transition: { duration: 0.3 } },
  };

  return (
<>


<div className="container blog-cont">

  <Navbar userData={userData} logout={logout} />
  <motion.div
    className="blog-container"
    initial="hidden"
    animate="visible"
    transition={{ staggerChildren: 0.15 }}
  >
    {articles.map((article, index) => (
      <motion.div
        key={index}
        className="blog-card"
        variants={blogCardVariants}
        whileHover="hover"
      >
        <img
          src={article.urlToImage || defaultImage}
          alt={article.title}
          className="blog-image"
        />
        <div className="blog-content">
          <h2 className="blog-title">
            {article.title
                ? article.title.split(" ").slice(0, 10).join(" ")
              : "No title available"}
          </h2>
          <p className="blog-description">{article.description}</p>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="blog-link"
          >
            Read more
          </a>
        </div>
      </motion.div>
    ))}
  </motion.div>
</div>
<Footer />
</>
  );
};

export default TechBlog;
