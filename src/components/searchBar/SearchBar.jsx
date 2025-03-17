import { useContext, useState } from 'react';
import { myContext } from '../../context/myContext';
import { FaSearch } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

export const SearchBar = () => {
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
    <div className="d-none d-md-flex justify-content-center align-items-center w-50 searching"><form className="form-inline my-2 my-lg-1 d-flex position-relative mx-auto search"
          onSubmit={handleSubmit}
        >
           <input className="form-control pe-5  w-md-auto search" type="search" placeholder="Search" aria-label="Search" style={{  marginRight: "10px" }} onChange={(e) => setSearch(e.target.value)}/>
    <button className="position-absolute search btn rounded-end"  style={{ right: "10px", top: "50%", transform: "translateY(-50%)", borderTopLeftRadius: "0", 
            borderBottomLeftRadius: "0" , backgroundColor:"#c3e1bb" }} type="submit"><FaSearch/>
    </button>
        </form>

        {search && filterSearchData.length > 0 && (
          <ul
            className="position-absolute bg-white border mt-1 p-2 shadow rounded d-none d-md-block "
            style={{
              top: "100%", 
              left: 0,
              width: "100%", 
              zIndex: "1050", 
              listStyleType: "none",
              maxHeight: "200px",
              overflowY: "auto",
            }}
          >
            {filterSearchData.map((item) => (
              <li
                key={item.id}
                className="p-2 border-bottom cursor-pointer"
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
