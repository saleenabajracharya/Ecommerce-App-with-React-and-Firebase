import React from 'react'
import { FaSearch } from "react-icons/fa";

export const SearchBar = () => {

  return (
    <div className="d-none d-md-flex justify-content-center align-items-center w-50 searching"><form className="form-inline my-2 my-lg-1 d-flex position-relative mx-auto search">
    <input className="form-control pe-5  w-md-auto search" type="search" placeholder="Search" aria-label="Search" style={{  marginRight: "10px" }} onChange={(e) => setSearch(e.target.value)}/>
    <button className="position-absolute search btn rounded-end"  style={{ right: "10px", top: "50%", transform: "translateY(-50%)", borderTopLeftRadius: "0", 
            borderBottomLeftRadius: "0" , backgroundColor:"#c3e1bb" }} type="submit"><FaSearch/>
    </button>
  </form>
  
  </div>
  )
}
