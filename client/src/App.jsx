// App.js or HomePage.js
import React, { useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import SignUp from "./pages/Signup/index";
import Login from "./pages/Signin/index";
import ForgetPassword from "./components/ForgetPassword/index";
import ConfirmCode from "./components/ConfirmCode";
import TechBlog from "./pages/Blog/Blog";
import AboutSection from "./pages/customerInformation";
import ProductPage from "./pages/product/ProductPage";
import ProductDetails from "./pages/productDetails/ProductDetails";
import CartPage from "./pages/cartPage/CartPage";
import PaymentPage from './pages/PaymentPage/PaymentPage';  // Adjust the path for PaymentPage component
import Wishlist from "./pages/wishList page/WishList";
import { DataContext } from "./context/DataContext";
import { jwtDecode } from "jwt-decode";
import FAQ from "./pages/FAQ/FAQ";
import PrivacyPolicy from "./pages/privacyPolicy/index";
import HowToUse from "./pages/usingPrivacy/index";
import ItellectualProperty from "./pages/itellectualProperty";
import { loadStripe } from '@stripe/stripe-js'; // LoadStripe function
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(
  "pk_test_51Q9Vk62M98qASWQqc6u7n5Br3p6QrHcc1lwFHR4Z8AdGs6vbE3QBdE55uFgTxpnLY3D6xvlgYw6A8DrlqWynFMFL00OoSAg4i0"
);
const App = () => {
  const { setUserData } = useContext(DataContext); // تأكد من أنك جلبت setUserData هنا
 
  // دالة حفظ بيانات المستخدم
  function saveUserData() {
    if (localStorage.getItem("token")) {
      let encodeToken = localStorage.getItem("token");
      let decodeToken = jwtDecode(encodeToken);
      setUserData(decodeToken);
    }
  }

  useEffect(() => {
    saveUserData();
  }, []);

  function ProtectRoute(props) {
    if (localStorage.getItem("token")) {
      return props.children;
    } else {
      return <Navigate to={"/login"} />;
    }
  }
  return (
    <Elements stripe={stripePromise} >
    <Routes>
      {localStorage.getItem("token") ? (
        <Route path="/" element={<Home />} />
      ) : (
        <Route path="/" element={<Navigate to="/signup" />} />
      )}
      {/* هنا جعلنا SignUp هي الصفحة الرئيسية */}
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login saveUserData={saveUserData} />} />
      <Route
        path="/home"
        element={
          <ProtectRoute>
            <Home />
          </ProtectRoute>
        }
      />
      <Route path="/forgetPassword" element={<ForgetPassword />} />
      <Route path="/confirmCode" element={<ConfirmCode />} />
      <Route
        path="/blog"
        element={
          <ProtectRoute>
            <TechBlog />
          </ProtectRoute>
        }
      />
      <Route
        path="/about"
        element={
          <ProtectRoute>
            <AboutSection />
          </ProtectRoute>
        }
      />
      <Route
        path="/product"
        element={
          <ProtectRoute>
            <ProductPage />
          </ProtectRoute>
        }
      />
      <Route
        path="/productDetails/:id"
        element={
          <ProtectRoute>
            <ProductDetails />
          </ProtectRoute>
        }
      />
      <Route
        path="/WishList"
        element={
          <ProtectRoute>
            <Wishlist />
          </ProtectRoute>
        }
      />
      <Route
        path="/Cart"
        element={
          <ProtectRoute>
            <CartPage />
          </ProtectRoute>
        }
      />
 
       <Route path="/payment" element={ 
          <ProtectRoute>
          <PaymentPage /> 
          </ProtectRoute>
        } 
        />
      <Route
        path="/FAQ"
        element={
          <ProtectRoute>
            <FAQ />
          </ProtectRoute>
        }
      />
      <Route
        path="/privacy"
        element={
          <ProtectRoute>
            <PrivacyPolicy />
          </ProtectRoute>
        }
      />{" "}
      <Route
        path="/UsingPrivacy"
        element={
          <ProtectRoute>
            <HowToUse />
          </ProtectRoute>
        }
      />
      <Route
        path="/ItellectualProperty"
        element={
          <ProtectRoute>
            <ItellectualProperty />
          </ProtectRoute>
        }
      />
      <Route
        path="*"
        element={<h1 className=" mt-5 text-center text-danger">NOT FOUND !</h1>}
      />
    </Routes>
    </Elements>

  );
};

export default App;
/*
  This is the main application file for the React project.

  Libraries used in this project:

  1. **React Router** (`react-router-dom`):
     - Used for managing navigation and routing in the application, allowing us to create a single-page application with multiple views.

  2. **Axios**:
     - A promise-based HTTP client for making API requests. It simplifies the process of sending GET, POST, PUT, DELETE requests to remote servers.


  4. **React Hook Form**:
     - A library for handling forms in React applications. It provides an easy way to manage form state and validation, reducing boilerplate code.

  5. **React Icons**:
     - A collection of popular icons that can be easily included in your React components. This helps in adding icons without needing to manage SVG files manually.


  8. **Redux (or Zustand)** (optional):
     - State management libraries that help in managing the application's global state. Redux is widely used, while Zustand is a simpler alternative.

  9. **Framer Motion** (optional):
     - A library for creating animations and transitions in React applications. It allows for smooth animations and provides an easy API for managing them.


  11. **React Query** (optional):
      - A library for managing server state, caching, and fetching data from APIs. It simplifies data-fetching logic and improves performance.
       طلبات الجماهير 
      12. **Bootstrap** 
      13. fortawesome 
      14. lucide-react  
      15. joi
      16. jwt




  This setup provides a robust foundation for building a modern web application with React, ensuring a great user experience and maintainable code.
*/
