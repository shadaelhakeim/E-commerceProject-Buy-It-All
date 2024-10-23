import React, { useState, useEffect } from "react";
import { ListFilterIcon } from "lucide-react";
import { BsCoin } from "react-icons/bs";
import "./SidebarCategory.css";

const SidebarCategory = ({ setCategory, priceRange, setPriceRange }) => {
  // State to handle sidebar toggle on small screens
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // to handle category filtration
  const handleCategoryProducts = (e) => {
    const selectedCategory = e.target.getAttribute("data-value");
    setCategory(selectedCategory);
  };

  // to handle price filtration
  const handlePriceChange = (e) => {
    const priceRange = JSON.parse(e.target.value); // Parse the array string
    setPriceRange(priceRange);
  };
  useEffect(() => {
    // Effect to handle state persistence
    console.log("priceRange updated", priceRange);
  }, [priceRange]);
  return (
    <div>
      {/* Filter Button for Small Screens */}
      <div className="d-sm-block d-md-none mb-3 side">
        <button
          className="btn btn-outline-primary side-btn"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <ListFilterIcon size={20} className="me-2" />
          Filters
        </button>
      </div>

      {/* Sidebar Content */}
      <div
        className={`sidebar-body ${
          isSidebarOpen ? "d-block" : "d-none d-md-block"
        }`}
      >
        <div className="flex m-side">
          <div className="d-flex title">
            <ListFilterIcon size={24} className="d-flex align-self-center" />
            <p>Categories</p>
          </div>
          <div className="m-main">
            <p data-value="tv" onClick={handleCategoryProducts}>
              TV
            </p>
            <p data-value="audio" onClick={handleCategoryProducts}>
              Audio
            </p>
            <p data-value="laptop" onClick={handleCategoryProducts}>
              Laptop
            </p>
            <p data-value="mobile" onClick={handleCategoryProducts}>
              Mobile
            </p>
            <p data-value="gaming" onClick={handleCategoryProducts}>
              Gaming
            </p>
            <p data-value="appliances" onClick={handleCategoryProducts}>
              Appliances
            </p>
          </div>

          {/* Price Filter */}
          <div className="d-flex title">
            <BsCoin size={16} className="d-flex align-self-center" />
            <p className="p-title">Prices</p>
          </div>
          <div className="m-main">
            <div className="d-flex mb-3">
              <input
                className="form-check-input"
                checked={
                  JSON.stringify(priceRange) === JSON.stringify([0, 2000])
                }
                type="radio"
                name="price"
                value="[0,2000]"
                onChange={handlePriceChange}
              />
              <label className="ms-3">All</label>
            </div>
            <div className="d-flex mb-3">
              <input
                className="form-check-input"
                type="radio"
                name="price"
                value="[0,500]"
                checked={
                  JSON.stringify(priceRange) === JSON.stringify([0, 500])
                }
                onChange={handlePriceChange}
              />
              <label className="ms-3">$0 - $500</label>
            </div>
            <div className="d-flex mb-3">
              <input
                className="form-check-input"
                type="radio"
                name="price"
                value="[500,1000]"
                checked={JSON.stringify(priceRange) === JSON.stringify([500, 1000])}
                onChange={handlePriceChange}
              />
              <label className="ms-3">$500 - $1000</label>
            </div>
            <div className="d-flex mb-3">
              <input
                className="form-check-input"
                type="radio"
                name="price"
                value="[1000,5000]"
                checked={
                  JSON.stringify(priceRange) === JSON.stringify([1000, 5000])
                }
                onChange={handlePriceChange}
              />
              <label className="ms-3">$1000 - $2000</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarCategory;