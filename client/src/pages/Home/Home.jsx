import Navbar from "../../components/Header/Header";
import "./style.css";
import Slider from "../../components/Slider/index";
import NewArrival from "../../components/NewArrival/index";
import TrendingProducts from "../../components/TrendingProducts/index";
import axios from "axios";
import React, { useState, useEffect} from "react";
import Footer from "../../components/Footer/Footer";
import Icons from "../../components/Icons";
import Brands from "../../components/Brands";
import News from "../../components/NewsSection";
import Copon from "../../components/Coupon";

export default function Home() {
  let [products, setProducts] = useState([]);
  let [blogs, setBlogs] = useState([]);
  function getProducts() {
    axios
      .get("https://fakestoreapi.in/api/products")
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }
  function getBlog() {
    axios
      .get(
        "https://newsapi.org/v2/top-headlines?category=technology&apikey=f2f3a3d9db104c22a5b2182cfc5623aa"
      )
      .then((res) => {
        setBlogs(res.data.articles);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }
  useEffect(() => {
    getProducts();
    getBlog();
  }, []);
  return (
    <div className="home-content">
      <Navbar />
      <Slider />
      <Icons />
      <NewArrival products={products} />
      <TrendingProducts products={products} />
      <Copon />
      <Brands />
      <News blogs={blogs} />
      <Footer />
    </div>
  );
}
