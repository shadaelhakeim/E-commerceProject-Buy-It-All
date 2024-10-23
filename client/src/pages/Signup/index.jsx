import React, { useState } from "react";
import "./style.css";
import facebook from "../../images/icons8-facebook-50.png";
import google from "../../images/icons8-google-50.png";
import apple from "../../images/icons8-apple-50.png";
import Joi from "joi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function SignUp() {
  let [data, setData] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    RePassword: "",
    terms: false,
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
    const { name, value, type, checked } = e.target;

    // تحديث checkbox أو الحقول النصية
    newData[name] = type === "checkbox" ? checked : value;

    // إذا تم تغيير firstName أو lastName، قم بتحديث userName تلقائيًا
    if (name === "firstName" || name === "lastName") {
      newData.userName = `${newData.firstName}${newData.lastName}`.trim(); // دمج الاسم الأول والاسم الأخير
    }

    setData(newData);
  }
  function handleValidation() {
    const schema = Joi.object({
      userName: Joi.string().required(),
      firstName: Joi.string().alphanum().min(3).max(15).required().messages({
        "any.required": "First Name Can't be empty",
        "string.empty": "First Name Can't be empty",
      }),
      lastName: Joi.string().alphanum().min(3).max(15).required().messages({
        "any.required": "Last Name Can't be empty",
        "string.empty": "Last Name Can't be empty",
      }),
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
      RePassword: Joi.string().valid(Joi.ref("password")).required().messages({
        "any.required": "Confirm Password Can't be empty",
        "string.empty": "Confirm Password Can't be empty",
        "any.only": "Passwords do not match", // رسالة الخطأ عند عدم تطابق القيمتين
      }),
      phoneNumber: Joi.string().required().messages({
        "any.required": "Phone Number Can't be empty",
        "string.empty": "Phone Number Can't be empty",
      }),
      terms: Joi.boolean().valid(true).required().messages({
        "any.required": "You Must Accept Terms & Conditions",
        "any.only": "You Must Accept Terms & Conditions",
      }),
    });

    return schema.validate(data, { abortEarly: false });
  }
  function handleRegister(e) {
    e.preventDefault();
    const newUser = { email: data.email };
    const registeredUsers =
      JSON.parse(localStorage.getItem("registeredUsers")) || [];
    registeredUsers.push(newUser);
    localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
    let checkErros = handleValidation();
    if (checkErros?.error) {
      setValidationErrors(checkErros.error.details);
    } else {
      axios
        .post(`http://hawas.runasp.net/api/v1/Register`, data)
        .then((res) => {
          setValidationErrors([]);
          setErrors("");
          // if success redirect to login
          navigate("/login");
        })
        .catch((err) => {
          setErrors(err.response.data);
          setValidationErrors([]);
        });
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
      <div className="content d-flex justify-content-center align-items-center ">
        <div className="main-dev bg-light p-3  w-50 mt-4">
          <h3 className="text-center custom-font fw-bold text-dark">
            Be A Member !
          </h3>
          <form onSubmit={handleRegister}>
            {/* if error string  */}
            {errors ? (
              <div className="d-flex text-danger mt-2 ">
                <i className="fa-solid fa-circle-exclamation mt-1 me-2"></i>
                <p className="mb-1">{errors}</p>
              </div>
            ) : null}
            {validationErrors.length > 0
              ? validationErrors.map((err, index) => (
                  <div key={index} className="d-flex text-danger mt-2">
                    <i className="fa-solid fa-circle-exclamation mt-1 me-2"></i>
                    <p className="mb-1">{err.message}</p>
                  </div>
                ))
              : null}
            <div className="container">
              <div className="row">
                <div className=" col-md-6 mb-3">
                  <label htmlFor="firstname" className="form-label fw-bold">
                    First Name :
                  </label>
                  <div className="input-group mb-2">
                    <span className="input-group-text bg-transparent">
                      <i className="fas fa-user"></i>
                    </span>
                    <input
                      type="text"
                      id="firstname"
                      name="firstName"
                      className="form-control bg-transparent"
                      placeholder="Enter First Name"
                      onChange={getData}
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="lastname" className="form-label fw-bold">
                    Last Name :
                  </label>
                  <div className="input-group mb-2">
                    <span className="input-group-text bg-transparent">
                      <i className="fas fa-user"></i>
                    </span>
                    <input
                      type="text"
                      id="lastname"
                      name="lastName"
                      className="form-control bg-transparent"
                      placeholder="Enter Last Name"
                      onChange={getData}
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-3">
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
                      placeholder="Enter Email"
                      onChange={getData}
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="phonenumber" className="form-label fw-bold">
                    Phone Number :
                  </label>
                  <div className="input-group mb-2">
                    <span className="input-group-text bg-transparent">
                      <i className="fas fa-phone"></i>
                    </span>
                    <input
                      type="number"
                      id="phonenumber"
                      name="phoneNumber"
                      className="form-control bg-transparent"
                      placeholder="Enter Phone Number"
                      onChange={getData}
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="password" className="form-label fw-bold">
                    Password :
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
                      onChange={(e) => {
                        getData(e);
                        setShowPassword(e.target.value);
                      }}
                    />
                    <span
                      className="input-group-text bg-transparent"
                      onClick={togglePasswordVisibility}
                    >
                      <i
                        style={{ color: "var(--color-primary)" }}
                        className={`far ${
                          showPassword ? "fa-eye-slash" : "fa-eye"
                        }`}
                        id="togglePassword"
                      ></i>
                    </span>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <label
                    htmlFor="passwordconfirm"
                    className="form-label fw-bold"
                  >
                    Password Confirm :
                  </label>
                  <div className="input-group mb-2">
                    <span className="input-group-text bg-transparent">
                      <i className="fas fa-lock"></i>
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="passwordconfirm"
                      name="RePassword"
                      className="form-control bg-transparent"
                      placeholder="Cofirm Password"
                      onChange={(e) => {
                        getData(e);
                        setShowPassword(e.target.value);
                      }}
                    />
                    <span
                      className="input-group-text bg-transparent"
                      onClick={togglePasswordVisibility}
                    >
                      <i
                        style={{ color: "var(--color-primary)" }}
                        className={`far ${
                          showPassword ? "fa-eye-slash" : "fa-eye"
                        }`}
                        id="togglePassword"
                      ></i>
                    </span>
                  </div>
                </div>
                <div className="check ">
                  <input
                    type="checkbox"
                    id="checkbox"
                    name="terms"
                    checked={data.terms} // قيمة checkbox تعتمد على data.terms
                    onChange={getData} // استدعاء getData لتحديث checkbox
                  />
                  <label htmlFor="checkbox" className="form-label ms-2">
                    Accept All Terms & Conditions
                  </label>
                </div>
                <button type="submit" onClick={handleRegister}>
                  Create Account
                </button>
                <div className="socials d-flex justify-content-between mt-4 ">
                  <div className="social mb-2">
                    <img src={facebook} alt="" />
                    <span className="">Sign up with Facebook</span>
                  </div>
                  <div className="social mb-2">
                    <img src={google} alt="" />
                    <span className="">Sign up with Google</span>
                  </div>
                  <div className="social mb-2">
                    <img src={apple} alt="" />
                    <span className="">Sign up with Apple</span>
                  </div>
                </div>
                <p className="text-center mt-4">
                  Already have an account?
                  <Link
                    to="/login"
                    className="ms-2 text-decoration-none"
                    style={{ color: "var(--main-color)" }}
                  >
                    Login
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
