import { SearchOutlined } from "@material-ui/icons";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import './Css/Search.css'
function Search({setSearched}) {
  const [keyword, setKeyword] = useState("");
  const history = useHistory();
  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!keyword)return;
    searchProduct(keyword);
    setSearched(true)
  };
  const searchProduct = async (keyword) => {
    if (!keyword) history.push("/home");

    history.push(`/searchpage/${keyword}`);
  };
  return (
    <div className="search">
      <form onSubmit={handleSubmit} className="search_form">
        <input
        placeholder="Search here..."
        autoFocus={true}
        className="search_text"
          type="text"
          value={keyword}
          onChange={handleChange}
         
        />
        <button className="search_button" type="submit"> <SearchOutlined/> </button>
      </form>
    </div>
  );
}

export default Search;
