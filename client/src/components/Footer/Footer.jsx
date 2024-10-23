import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer className="footer text-light text-center">
      {/* Section: Social media */}
      <section className="social-media d-flex justify-content-between">
        <div className="left">
          <span>Get connected with us on social networks:</span>
        </div>

        <div className="right">
          <Link to="#" className="social-link">
            <i className="fab fa-facebook-f"></i>
          </Link>
          <Link to="#" className="social-link">
            <i className="fab fa-twitter"></i>
          </Link>
          <Link to="#" className="social-link">
            <i className="fab fa-google"></i>
          </Link>
          <Link to="#" className="social-link">
            <i className="fab fa-instagram"></i>
          </Link>
          <Link to="#" className="social-link">
            <i className="fab fa-linkedin"></i>
          </Link>
          <Link to="#" className="social-link">
            <i className="fab fa-github"></i>
          </Link>
        </div>
      </section>

      {/* Section: Links */}
      <section className="links-section">
        <div className="container footer-cont d-flex justify-content-around">
          <div className="row">
            <div className="column">
              <h6>Buy It All</h6>
              <hr />
              <p>
                Explore the latest electronics, gadgets, and accessories with
                unbeatable prices and fast, reliable delivery worldwide.
              </p>
            </div>

            <div className="column">
              <h6>Products</h6>
              <hr />
              <p>
                <Link to="/product" className="footer-link">
                  TV
                </Link>
              </p>
              <p>
                <Link to="/product" className="footer-link">
                  Mobile
                </Link>
              </p>
              <p>
                <Link to="/product" className="footer-link">
                  Laptop
                </Link>
              </p>
              <p>
                <Link to="/product" className="footer-link">
                  gaming
                </Link>
              </p>
            </div>

            <div className="column">
              <h6>Useful links</h6>
              <hr />
              <p>
                <Link to="/FAQ" className="footer-link">
                  FAQ
                </Link>
              </p>
              <p>
                <Link to="/privacy" className="footer-link">
                  privacy
                </Link>
              </p>
              <p>
                <Link to="/UsingPrivacy" className="footer-link">
                  UsingPrivacy
                </Link>
              </p>
              <p>
                <Link to="/ItellectualProperty" className="footer-link">
                  ItellectualProperty
                </Link>
              </p>
            </div>

            <div className="column">
              <h6>Contact</h6>
              <hr />
              <p>
                <i className="fas fa-home"></i> Cairo, NY 10012, EG
              </p>
              <p>
                <i className="fas fa-envelope"></i> BuyItAll@example.com
              </p>
              <p>
                <i className="fas fa-phone"></i> +2 01 234 567 88
              </p>
              <p>
                <i className="fas fa-print"></i> +2 01 234 567 89
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Copyright */}
      <div className="footer-copyright">
        © 2024 Copyright:{" "}
        <Link to="/home">BuyItAll.com</Link>
      </div>
    </footer>
  );
}
