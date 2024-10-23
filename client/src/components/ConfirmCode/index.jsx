import React, { useState } from "react";
import InputCode from "./InputCode";
import { useNavigate } from "react-router-dom";

export default function ConfirmCode() {
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  return (
    <div className="container-content">
      <div className="brand  ms-5 mt-2">
        <div className="d-flex align-items-center">
          <i class="fa-solid fa-cart-shopping"></i>
          <h4 className="custom-font mt-3 fw-bold">BuyItAll</h4>
        </div>
      </div>
      <div className="content d-flex justify-content-center align-items-center">
        <div className="main-dev bg-light p-3  w-50">
          <h3 className="text-center custom-font fw-bold text-dark">
            Enter The Code
          </h3>
          <div className="row">
            <div className="col-md-9 mb-3 m-auto">
              <div className="App ">
                <InputCode
                  length={6}
                  loading={loading}
                  onComplete={(code) => {
                    setLoading(true);
                    setTimeout(() => setLoading(false), 10000);
                  }}
                />
              </div>
            </div>
            <button
              className="w-50 mt-4 mb-3 m-auto"
              type="submit"
              onClick={() => {
                navigate("/home");
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
