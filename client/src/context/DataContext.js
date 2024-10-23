import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import Swal from 'sweetalert2'; // Import SweetAlert

// إنشاء Context جديد
export const DataContext = createContext();


export const DataProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  
 
  function saveUserData() {
    if (localStorage.getItem("token")) {
      let encodeToken = localStorage.getItem("token");
      let decodeToken = jwtDecode(encodeToken);
      setUserData(decodeToken); 
    }
  }

  function logout() {
    localStorage.removeItem("token");
    setUserData(null);
    navigate("/login");
  }

  const addToCart = (product, quantity = 1) => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const productExists = cartItems.find(item => item.id === product.id);

    if (productExists) {
      productExists.quantity += quantity;
    } else {
      cartItems.push({
        ...product,
        quantity,
      });
    }
    Swal.fire({
      icon: 'success',
      title: 'Item added to Cart Successful',
      text: `Item added to Cart Successful`,
    });
    localStorage.setItem("cart", JSON.stringify(cartItems));

    // Trigger a custom event to update cart count
    const event = new Event("cartUpdated");
    window.dispatchEvent(event);
  };

  const addToWishlist = (product) => {
    const wishlistItems = JSON.parse(localStorage.getItem("wishlist")) || [];
    const productExists = wishlistItems.find(item => item.id === product.id);

    if (!productExists) {
      wishlistItems.push(product);
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
  };

  return (
    <DataContext.Provider
      value={{ userData, logout, setUserData, addToWishlist, addToCart }}
    >
      {children}
    </DataContext.Provider>
  );
};
