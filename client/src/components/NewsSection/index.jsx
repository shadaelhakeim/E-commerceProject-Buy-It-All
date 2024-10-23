import React, { useState } from "react";
import defaultImage from "../../images/Blog-default.jfif";
import { Link } from "react-router-dom";
import Loading from "../Loading";
export default function News({ blogs }) {
  const [email, setEmail] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState(""); // For success or danger alert
 
  const handleSubscribe = () => {
   // Regular expression to check if email format is valid
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) {
    setAlertMessage("You did not enter an email address!");
    setAlertType("danger");
    setAlertVisible(true);
    setTimeout(() => {
      setAlertVisible(false);
    }, 10000);
  } else if (!emailRegex.test(email)) {
    setAlertMessage("Please enter a valid email address!");
    setAlertType("danger");
    setAlertVisible(true);
    setTimeout(() => {
      setAlertVisible(false);
    }, 10000);
  } else {
    setAlertMessage("You have subscribed to the newsletter successfully!");
    setAlertType("success");
    setAlertVisible(true);
    setTimeout(() => {
      setAlertVisible(false);
    }, 10000);
  }
};
  return (
    <div className="container my-5">
      <div className="row align-items-center">
        <div className="col-12 col-md-6 mb-4">
{alertVisible && (
            <div className={`alert alert-${alertType}`} role="alert">
              {alertMessage}
            </div>
          )}
          <h2 className="mb-3 text-center text-md-start">
            Sign up to our newsletter
          </h2>
          <p> Receive our latest updates about our products & promotions</p>
          <div className="d-flex flex-column align-items-center">
            <input
              type="email"
              value={email}
              className="form-control mb-2 mb-md-0 me-md-2 p-2 "
              placeholder="Enter Your Email"
              onChange={(e) => setEmail(e.target.value)} // Update email state
            />
            <button
              className="button mt-3 me-md-auto"
              onClick={handleSubscribe}
            >
              Subscribe
            </button>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="row">
            {blogs.length > 0 ? (
              blogs.slice(0, 3).map((blog, index) => (
                <div key={index} className="col-12 mb-4">
                  <div className="card d-flex flex-row">
                    <img
                      src={blog.urlToImage || defaultImage}
                      alt={blog.title}
                      className="card-img-left img-fluid"
                      style={{ width: "30%" }}
                    />
                    <div className="card-body w-50">
                      <h6
                        className="text-truncate mb-1"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title={blog.title}
                        data-bs-custom-class="custom-tooltip"
                      >
                        {blog.title}
                      </h6>
                      <p
                        className="card-text text-truncate"
                        style={{ maxHeight: "3em", overflow: "hidden" }}
                      >
                        {blog.description}
                      </p>
                      <Link
                        to="/blog"
                        rel="noopener noreferrer"
                        className="blog-link"
                      >
                        Read more
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12  products d-flex justify-content-center align-items-center">
                <Loading />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
