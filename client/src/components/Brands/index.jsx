import React from 'react'
import apple from "../../images/apple-light-mode.svg";
import canon from "../../images/canon-light-mode.svg";
import motorola from "../../images/motorola-light-mode.svg";
import samsung from "../../images/samsung-light-mode.svg";
import sony from "../../images/sony-light-mode.svg";
export default function Brands() {
  return (
    <div className="brands">
      <div className="container ">
        <div className="row g-4 justify-content-center ">
          <div className="col-6 col-sm-4 col-md-3 col-lg-2 mb-4 brand">
            <div className="inner m-1 p-1 d-flex justify-content-center">
              <img
                src={apple}
                alt="brand pic"
                className="img-fluid brand-image"
              />
            </div>
          </div>
          <div className="col-6 col-sm-4 col-md-3 col-lg-2 mb-4 brand">
            <div className="inner m-1 p-1 d-flex justify-content-center">
              <img
                src={canon}
                alt="brand pic"
                className="img-fluid brand-image"
              />
            </div>
          </div>
          <div className="col-6 col-sm-4 col-md-3 col-lg-2 mb-4 brand">
            <div className="inner m-1 p-1 d-flex justify-content-center">
              <img
                src={motorola}
                alt="brand pic"
                className="img-fluid brand-image"
              />
            </div>
          </div>
          <div className="col-6 col-sm-4 col-md-3 col-lg-2 mb-4 brand">
            <div className="inner m-1 p-1 d-flex justify-content-center">
              <img
                src={samsung}
                alt="brand pic"
                className="img-fluid brand-image"
              />
            </div>
          </div>
          <div className="col-6 col-sm-4 col-md-3 col-lg-2 mb-4 brand">
            <div className="inner m-1 p-1 d-flex justify-content-center">
              <img
                src={sony}
                alt="brand pic"
                className="img-fluid brand-image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
