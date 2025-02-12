import React from 'react'
import { FaSearch } from "react-icons/fa";
export const SmallScreenSearch = () => {
 return (
    <div className='w-100 mt-5 pt-2 fixed-top ' >
     <div className="d-md-none d-flex   searching"><form className="form-inline my-2 my-md-1 d-flex position-relative w-100 mx-3">
     <input className="form-control pe-5  w-md-auto" type="search" placeholder="Search" aria-label="Search" style={{ marginRight: "10px" }} onChange={(e) => setSearch(e.target.value)}/>
<FaSearch className="position-absolute" style={{ right: "20", top: "50%", transform: "translateY(-50%)"}}/>
   </form>
   
   </div>
   </div>
   )
}
