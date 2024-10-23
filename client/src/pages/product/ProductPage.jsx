import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../../components/productCard/ProductCard";
import "bootstrap/dist/css/bootstrap.min.css";
import SidebarCategory from "../../components/sidebarCategory/SidebarCategory";
import "./ProductPage.css";
import { BiErrorCircle } from "react-icons/bi";
import Navbar from "../../components/Header/Header";
import { Search } from "lucide-react";
import Loading from "../../components/Loading";
import Footer from "../../components/Footer/Footer";

const ProductPage = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("mobile");
  const [priceRange, setPriceRange] = useState([0, 2000]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://fakestoreapi.in/api/products/category?type=${category}&sort=desc`
      );
      const allProducts = res.data.products;

      const filteredProducts = allProducts.filter(
        (product) =>
          product.price >= priceRange[0] && product.price <= priceRange[1]
      );
      setProducts(filteredProducts);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(priceRange);
  }, [category, priceRange]);

  const addToCart = (product) => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    const productExists = cartItems.find((item) => item.id === product.id);

    if (productExists) {
      productExists.quantity += 1;
    } else {
      cartItems.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cartItems));

    const event = new Event("cartUpdated");
    window.dispatchEvent(event);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const searchTerm = e.target[0].value.toLowerCase();
    const filteredProducts = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm)
    );
    setProducts(filteredProducts);
    e.target[0].value = "";
  };

  return (
    <>
      <Navbar />
      <div className="product-page-container d-flex  ">
        <div className="sidebar">
          <SidebarCategory
            setCategory={setCategory}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
          />
        </div>

        <div className="product-body col-12  col-md-6 p-0">
          <div className="container my-4">
            <div className="row   row-cols-sm-2 row-cols-lg-3 pt-3 product-body-sec">
              {!loading && (
                <div className="input-group search-icon mb-3">
                  <span className="input-group-text d-block" id="basic-addon1">
                    <Search />
                  </span>
                  <form onSubmit={handleSearch} className="form-body">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search Your Favorite Product"
                      aria-label="Search"
                      aria-describedby="basic-addon1"
                    />
                  </form>
                </div>
              )}

              {loading ? (
                <div className="d-flex justify-content-center align-self-center w-100 ">
                  <Loading />
                </div>
              ) : products.length === 0 ? (
                <div className="notfound d-flex">
                  <BiErrorCircle size={24} className="mt-1 me-1" />
                  <p>No products found</p>
                </div>
              ) : (
                products.map((product, id) => (
                  <ProductCard key={id} product={product} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductPage;