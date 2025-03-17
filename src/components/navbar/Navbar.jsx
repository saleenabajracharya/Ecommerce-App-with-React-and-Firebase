import React from "react";
import { SearchBar } from "../searchBar/SearchBar";
import { NavLink, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";

export const Navbar = () => {
  debugger;
  const user = JSON.parse(localStorage.getItem('users'));
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear('users');
    navigate("/login")
}

const cartItems = useSelector((state) => state.cart.cartItems) || [];
  const navList = (
    <ul className="navbar-nav mr-auto  d-flex gap-2 ">
      <li className="nav-item">
        <NavLink className="nav-link text-decoration-none" to="/">Home </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link text-decoration-none " to="/all-products">All Products</NavLink>
      </li>
      {!user ? <li className="nav-item">
        <NavLink className="nav-link text-decoration-none " to="/sign-up">Sign up</NavLink>
      </li> : ""}
      {!user ? <li className="nav-item">
        <NavLink className="nav-link text-decoration-none " to="/login">Login</NavLink>
      </li> : ""}
      {user?.role === "user" && <li className="nav-item">
        <NavLink className="nav-link text-decoration-none " to="/user-dashboard">{user?.fullName}</NavLink>
        
      </li>}
      {user?.role === "admin" && <li className="nav-item">
        <NavLink className="nav-link text-decoration-none " to="/admin-dashboard">Admin</NavLink>
        
      </li>}
      {user && <li className="nav-item text-decoration-none" style={{color:"White", paddingTop:"8px", cursor:"pointer"}} onClick={logout}>
        Logout
      </li>}
      <li className="nav-item position-relative">
        <NavLink className="nav-link text-decoration-none position-relative" to="/cart">
          <FaShoppingCart className="fs-4" />
          {cartItems.length > 0 && (
            <span className="position-absolute top-2 start-100 translate-middle badge rounded-pill bg-success">
              {cartItems.length}
            </span>
          )}
        </NavLink>
      </li>

    </ul>
  )

  return (
    <nav className="navbar navbar-expand-lg text-uppercase fixed-top  ">
  <NavLink className="navbar-brand fs-3 ps-4" to="/"><img src="/images/logo.jpg" style={{height:"50px", width:"50px"}} alt="" srcset="" /></NavLink>
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
