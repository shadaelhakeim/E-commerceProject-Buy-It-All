import React, { useState } from "react";
import Joi from "joi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import facebook from "../../images/icons8-facebook-50.png";
import google from "../../images/icons8-google-50.png";
import apple from "../../images/icons8-apple-50.png";


export default function Login({saveUserData}) {
  let [data, setData] = useState({
    email: "",
    password: "",
  });
  let [showPassword, setShowPassword] = useState(false);
  let [errors, setErrors] = useState("");
  let [validationErrors, setValidationErrors] = useState([]);
  let togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  let navigate = useNavigate();
  function getData(e) {
    let newData = { ...data };
    newData[e.target.name] = e.target.value;
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
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{2,}[!@#$%^&*]{1,}$"))
        .required()
        .messages({
          "any.required": "Password Can't be empty",
          "string.empty": "Password Can't be empty",
          "string.pattern.base":
            "The password must be between 3 to 30 characters & contain at least one special character",
        }),
    });

    return schema.validate(data, { abortEarly: false });
  }
 function handleLogin(e) {
   e.preventDefault();
   let checkErrors = handleValidation();

   if (checkErrors?.error) {
     setValidationErrors(checkErrors.error.details);
   } else {
     axios
       .post(`http://hawas.runasp.net/api/v1/Login`, data)
       .then((res) => {
         localStorage.setItem("token", res.data.jwt);
         saveUserData();
         setValidationErrors([]);
         setErrors("");
         navigate("/home");
       })
       .catch((err) => {
         console.log("error: ", err);

         if (err.response) {
           // إذا كان هناك استجابة، أعد تعيين الرسالة
           setErrors(err.response.data);
         } else {
           // إذا لم يكن هناك استجابة، قم بإعداد رسالة خطأ عامة
           setErrors("Something went wrong. Please try again.");
         }

         setValidationErrors([]);
       });
   }
 }

return (
  <div className="container-content">
    <div className="brand ms-5 mt-2">
      <div className="d-flex align-items-center">
        <i className="fa-solid fa-cart-shopping"></i>
        <h4 className="custom-font mt-3 fw-bold">BuyItAll</h4>
      </div>
    </div>
    <div className="content d-flex justify-content-center align-items-center">
      <div className="main-dev bg-light p-3 w-50">
        <h3 className="text-center custom-font fw-bold mb-2 text-dark">
          Welcome Again! <br /> Login Now
        </h3>
        <form onSubmit={handleLogin}>
          {/* Display errors */}
          {errors && (
            <div className="d-flex text-danger mt-1">
              <i className="fa-solid fa-circle-exclamation mt-1 me-2"></i>
              <p className="mb-1">{errors}</p>
            </div>
          )}
          {validationErrors.length > 0 &&
            validationErrors.map((err, index) => (
              <div key={index} className="d-flex text-danger mt-1">
                <i className="fa-solid fa-circle-exclamation mt-1 me-2"></i>
                <p className="mb-1">{err.message}</p>
              </div>
            ))}
          <div className="container">
            <div className="row">
              <div className="col-md-8 mb-3 m-auto">
                <label htmlFor="email" className="form-label fw-bold mt-2">
                  Email:
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
                    placeholder="Enter Email"
                    onChange={getData}
                  />
                </div>
              </div>
              <div className="col-md-8 mb-3 m-auto">
                <label htmlFor="password" className="form-label fw-bold">
                  Password:
                </label>
                <div className="input-group mb-2">
                  <span className="input-group-text bg-transparent">
                    <i className="fas fa-lock"></i>
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    className="form-control bg-transparent"
                    placeholder="Enter Password"
                    onChange={getData}
                  />
                  <span
                    className="input-group-text bg-transparent"
                    onClick={togglePasswordVisibility}
                  >
                    <i
                      style={{ color: "var(--color-primary)" }}
                      className={`far ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                      id="togglePassword"
                    ></i>
                  </span>
                </div>
              </div>
              <Link
                to="/forgetPassword"
                className="ms-2 text-decoration-none text-center mt-4"
                style={{ color: "var(--main-color)" }}
              >
                Forget Your Password?
              </Link>
              <button
                type="submit"
                className="w-50 m-auto mt-4"
              >
                Login
              </button>
              <div className="socials d-flex gap-4 justify-content-center mt-4">
                <div className="social mb-2">
                  <img src={facebook} alt="" />
                </div>
                <div className="social mb-2">
                  <img src={google} alt="" />
                </div>
                <div className="social mb-2">
                  <img src={apple} alt="" />
                </div>
              </div>
              <p className="text-center mt-4">
                Don't have an account?
                <Link
                  to="/signup"
                  className="ms-2 text-decoration-none"
                  style={{ color: "var(--main-color)" }}
                >
                  SingUp
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
);

}
