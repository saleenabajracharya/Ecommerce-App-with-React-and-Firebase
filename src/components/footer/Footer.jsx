import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div>
      <footer class="text-secondary py-3">
        <div class="container px-3 d-flex flex-column flex-md-row align-items-center justify-content-between">
          <Link
            to="/"
            className="d-flex align-items-center text-white fw-medium text-decoration-none"
          >
            <span className="fs-5 text-white text-decoration-none text-uppercase fw-bold">
              Navbar
            </span>
          </Link>

          <div class="text-center my-2">
            <small className="text-white">
              © Navbar {currentYear}
              <span id="year"></span>
            </small>
          </div>

          <div class="d-flex flex-column align-items-center align-items-md-end mt-3 mt-md-0">
            <h6 class="fs-6 text-white text-center text-md-end mb-2">
              Follow Us
            </h6>
            <div class="d-flex gap-2">
              <a href="#" class="text-white text-decoration-none fs-6">
                <FaFacebookF />
              </a>
              <a href="#" class="text-white text-decoration-none fs-6">
                <FaTwitter />
              </a>
              <a href="#" class="text-white text-decoration-none fs-6">
                <FaInstagram />
              </a>
              <a href="#" class="text-white text-decoration-none fs-6">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
