import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Joi from "joi";
export default function ForgetPassword() {
  let [data, setData] = useState({
    email: "",
  });

  let [errors, setErrors] = useState("");
  let [validationErrors, setValidationErrors] = useState([]);

  let navigate = useNavigate();
  function getData(e) {
    let newData = { ...data };
    newData[e.target.name] = e.target.value;
    const { name, value, type } = e.target;
    setData(newData);
  }
  function handleValidation() {
    const schema = Joi.object({
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .required()
        .messages({
          "any.required": "Email Can't be empty",
          "string.empty": "Email Can't be empty",
        }),
    });
    return schema.validate(data, { abortEarly: false });
  }

  function handleForgetPassword(e) {
    e.preventDefault();
    let checkErrors = handleValidation();
    if (checkErrors?.error) {
      setValidationErrors(checkErrors.error.details);
    } else {
      // استرجاع قائمة المستخدمين المسجلين من Local Storage
      const registeredUsers =
        JSON.parse(localStorage.getItem("registeredUsers")) || [];
      // البحث عن البريد الإلكتروني
      const userExists = registeredUsers.some(
        (user) => user.email === data.email
      );
      if (userExists) {
        // إذا كان البريد الإلكتروني مسجل بالفعل
        navigate("/confirmCode");
      } else {
        // إذا لم يكن البريد الإلكتروني مسجل
        setErrors("This email is not registered. Please sign up first.");
      }
    }
  }
  return (
    <div className="container-content">
      <div className="brand  ms-5 mt-2">
        <div className="d-flex align-items-center">
          <i className="fa-solid fa-cart-shopping"></i>
          <h4 className="custom-font mt-3 fw-bold">BuyItAll</h4>
        </div>
      </div>
      <div className="content d-flex justify-content-center align-items-center">
        <div className="main-dev bg-light p-3  w-50">
          <h3 className="text-center custom-font fw-bold text-dark">
            Confirm Your ACCount
          </h3>
          <form onSubmit={handleForgetPassword}>
            {/* if error string  */}
            {errors ? (
              <div className="d-flex text-danger mt-2 justify-content-center">
                <i className="fa-solid fa-circle-exclamation mt-1 me-2"></i>
                <p>{errors}</p>
              </div>
            ) : null}
            {validationErrors.length > 0
              ? validationErrors.map((err, index) => (
                  <div
                    key={index}
                    className="d-flex text-danger mt-2 justify-content-center"
                  >
                    <i className="fa-solid fa-circle-exclamation mt-1 me-2"></i>
                    <p>{err.message}</p>
                  </div>
                ))
              : null}
            <div className="container">
              <div className="row">
                <div className="col-md-8 mb-3 m-auto">
                  <label htmlFor="email" className="form-label fw-bold">
                    Email :
                  </label>
                  <div className="input-group mb-2">
                    <span className="input-group-text bg-transparent">
                      <i className="fas fa-envelope"></i>
                    </span>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control bg-transparent"
                      placeholder="Enter Your Email Here"
                      onChange={getData}
                    />
                  </div>
                </div>
                <button
                  className="w-50 m-auto mt-2 mb-3"
                  type="submit"
                  onClick={handleForgetPassword}
                >
                  Next
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
