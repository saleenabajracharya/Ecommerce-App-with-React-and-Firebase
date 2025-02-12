import React from "react";
import { SearchBar } from "../searchBar/SearchBar";
import { NavLink } from 'react-router-dom';
export const Navbar = () => {
  const navList = (
    <ul className="navbar-nav mr-auto  d-flex gap-2 ">
      <li className="nav-item">
        <NavLink className="nav-link text-decoration-none" to="/">Home </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link text-decoration-none " to="/all-products">All Products</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link text-decoration-none " to="/sign-up">Sign up</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link text-decoration-none " to="/">Salina</NavLink>
        
      </li>
      <li className="nav-item">
        <NavLink className="nav-link text-decoration-none " to="/cart">Cart(0) </NavLink>
        
      </li>
    </ul>
  )

  return (
    <nav className="navbar navbar-expand-lg text-uppercase fixed-top  ">
  <NavLink className="navbar-brand fs-3 ps-3" to="/">Navbar</NavLink>
  <SearchBar className="search-bar" />
  <button className="navbar-toggler me-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse nav-menu" id="navbarSupportedContent ">
      {navList}

  </div>
</nav>
  );
};
