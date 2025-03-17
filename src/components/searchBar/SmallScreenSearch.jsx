import React, { useContext, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { myContext } from "../../context/myContext";
import { useNavigate } from "react-router-dom";

export const SmallScreenSearch = () => {
  const context = useContext(myContext);
  const { getAllProduct } = context || { getAllProduct: [] };

  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filterSearchData = getAllProduct
    ?.filter((obj) => obj.title.toLowerCase().includes(search.toLowerCase()))
    .slice(0, 8);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (filterSearchData.length > 0) {
      navigate(`/product-info/${filterSearchData[0].id}`);
    }
  };

  return (
    <div className="w-100 mt-5 pt-2 fixed-top">
      <div className="d-md-none d-flex searching">
        <form
          className="form-inline my-2 my-md-1 d-flex position-relative w-100 mx-3"
          onSubmit={handleSubmit}
        >
          {/* Search Input */}
          <input
            className="form-control pe-5 w-md-auto"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              marginRight: "10px",
              paddingRight: "35px", // Space for the icon
            }}
          />

          <FaSearch
            className="position-absolute"
            style={{
              right: "15px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#777",
              pointerEvents: "none", 
            }}
          />
        </form>
      </div>

      {search && filterSearchData.length > 0 && (
        <ul
          className="position-absolute bg-white border mt-1 p-2 shadow rounded dropdown d-md-none d-block"
          style={{
            top: "92%", 
            left: "10px",
            width: "80%", 
            zIndex: "1050",
            listStyleType: "none",
            maxHeight: "200px",
            overflowY: "auto",
          }}
        >
          {filterSearchData.map((item) => (
            <li
              key={item.id}
              className="p-2 border-bottom"
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/product-info/${item.id}`)}
            >
              {item.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
