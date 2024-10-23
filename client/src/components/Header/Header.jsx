import { useState, useEffect ,useContext  } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import { DataContext } from "../../context/DataContext";
import { BiHeart } from "react-icons/bi";

export default function Navbar() {
    const { userData, logout } = useContext(DataContext);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true); 
  const location = useLocation(); 
  const [activeLink, setActiveLink] = useState(location.pathname); 
 const [cartCount, setCartCount] = useState(0);

  const updateCartCount = () => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(totalCount);
  };
  useEffect(() => {
    setActiveLink(location.pathname); 
  }, [location.pathname]);

   useEffect(() => {
     // Update cart count on page load
     updateCartCount();

     // Listen for cart updates
     window.addEventListener("cartUpdated", updateCartCount);

     return () => {
       window.removeEventListener("cartUpdated", updateCartCount);
     };
   }, []);

  const toggleNavCollapse = () => {
    setIsNavCollapsed(!isNavCollapsed); // فتح أو غلق القائمة عند الضغط على زر القائمة
  };

  return (
    <nav className="navbar navbar-expand-lg fixed-top shadow">
      <div className="container-fluid">
        <Link className="navbar-brand fs-1 fw-bold d-flex me-4" to="/home">
          <i className="fa-solid fa-cart-shopping"></i>
          <h4 className="custom-font mt-3 fw-bold">BuyItAll</h4>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          aria-controls="navbarSupportedContent"
          aria-expanded={!isNavCollapsed ? true : false}
          aria-label="Toggle navigation"
          onClick={toggleNavCollapse}
        >
          <div className="icon d-flex justify-content-center align-items-center">
            <i
              className={`fa-solid ${
                isNavCollapsed ? "fa-bars" : "fa-xmark"
              }  fs-3`}
            ></i>
          </div>
        </button>
        <div
          className={`navbar-collapse ${!isNavCollapsed ? "active" : ""}`}
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto mb-1 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${activeLink === "/home" ? "active" : ""}`}
                aria-current="page"
                to="/home"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  activeLink === "/product" ? "active" : ""
                }`}
                aria-current="page"
                to="/product"
              >
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${activeLink === "/blog" ? "active" : ""}`}
                aria-current="page"
                to="/blog"
              >
                Blog
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  activeLink === "/about" ? "active" : ""
                }`}
                aria-current="page"
                to="/about"
              >
                About us
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto mb-1 mb-lg-0 align-items-baseline">
            <li className="nav-item nav-heart">
              <Link className="nav-link  fav-link" to="/WishList">
                <BiHeart size={20} />
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                <i className="fa-solid fa-cart-shopping"></i> ({cartCount})
              </Link>
            </li>
            <span className="me-2 fw-bold" onClick={logout}>
              Logout
            </span>
          </ul>
        </div>
      </div>
    </nav>
  );
}