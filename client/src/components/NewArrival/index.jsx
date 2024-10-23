import React from "react";
import laptop from "../../images/laptop.png";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Loading from "../Loading";
export default function NewArrival({ products }) {
  let navigate = useNavigate();
  const animationVariants = {
    initial: { top: "38%" },
    animate: {
      top: "45%",
      transition: {
        duration: 1.5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
  };
  return (
    <div className="new-arrival mt-5 mb-5">
      <div className="container mt-2 mb-5">
        <div className="seven">
          <h1>New Arrival</h1>
        </div>
        <div className="row  justify-content-around ">
          <div className="col-12 col-lg-4 mt-3 ">
            <div className="img-card">
              <motion.div
                initial="initial"
                animate="animate"
                variants={animationVariants}
                style={{
                  position: "absolute",
                  top: "38%",
                  left: "50%",
                  width: "290px",
                  height: "auto",
                  transform: "translate(-50%, -50%)",
                  zIndex: 2,
                }}
              >
                <img
                  src={laptop}
                  style={{
                    width: "100%",
                    height: "auto",
                  }}
                  alt="laptop img"
                />
              </motion.div>

              <div className="description ">
                <h2 className="text-light">MacBook</h2>
                <p className="text-light text-center">Be Pro Anywhere</p>
                <button
                  onClick={() => {
                    navigate("/products");
                  }}
                >
                  From $1.199
                </button>
              </div>
            </div>
          </div>
          {products.length > 0 ? (
            <div className="col-12 col-lg-7 products d-flex justify-content-center align-items-center">
              <div className="row justify-content-around g-3 w-100 w-sm-90">
                {products.slice(21, 27).map((product) => (
                  <div key={product.id} className="col-12 col-md-6">
                    <div className="card d-flex flex-row">
                      <img
                        src={product.image}
                        className="card-img-left img-fluid"
                        alt="product img"
                        style={{ width: "30%" }}
                      />
                      <div className="card-body w-50">
                        <p
                          className="text-truncate mb-1"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title={product.title}
                          data-bs-custom-class="custom-tooltip"
                        >
                          {product.title}
                        </p>
                        <h5 className="fw-bold mt-3">${product.price}</h5>
                        <div className="d-flex align-items center">
                          <div className="stars d-flex text-warning ">
                            <i className="fas fa-star me-1"></i>
                            <i className="fas fa-star me-1"></i>
                            <i className="fas fa-star me-1"></i>
                            <i className="fas fa-star me-1"></i>
                            <i className="fas fa-star-half-alt me-1"></i>
                          </div>
                          <small>
                            ({product.discount ? product.discount : 0})
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className=" col-12 col-lg-7 d-flex justify-content-center align-self-center">
              <Loading />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
