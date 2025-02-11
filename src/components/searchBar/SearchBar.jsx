import React from 'react'
import { FaSearch } from "react-icons/fa";

export const SearchBar = () => {

  return (
    <div ><form className="form-inline my-2 my-lg-1 d-flex position-relative ">
    <input className="form-control pe-5 w-100 w-md-auto" type="search" placeholder="Search" aria-label="Search" style={{ width: "350px", marginRight: "10px" }} onChange={(e) => setSearch(e.target.value)}/>
    <button className="position-absolute search-bar btn rounded-end"  style={{ right: "10px", top: "50%", transform: "translateY(-50%)", borderTopLeftRadius: "0", 
            borderBottomLeftRadius: "0"  }} type="submit"><FaSearch/>
    </button>
  </form>
  
  </div>
  )
}
