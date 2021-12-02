import axios from "axios";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Search from "./Search";
import SingleItem from "./SingleItem";
import "./Css/SearchPaage.css";
import { FavoriteRounded } from "@material-ui/icons";
import Spinner from "./Spinner";

function Searchpage() {
  const { keyword } = useParams();

  const [filteredProduct, setFilteredProduct] = useState([]);
  const [isloading, setIsloading] = useState("");
  const [searchSuggest] = useState(["Noodles", "pizza", "cake", "burger"]);
  const [clickSuggest, setClickSuggest] = useState(-1);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);
  const filtered = async (keyword) => {
    try {
      setIsloading(true);

      const { data } = await axios.get(
        `http://localhost:2000/products/${keyword}`
      );

      await setFilteredProduct(data);
      await setIsloading(false);
    } catch (error) {
      if (error) setError(`Sorry,Something went wrong `);
    }
    setIsloading(false);
  };

  useEffect(() => {
    if(keyword)filtered(keyword);
  }, [keyword]);

  const filterBySuggestion = (suggest, index) => {
    filtered(suggest);
    setClickSuggest(index);
  };

  return (
    <div>
      <div className="search_wrapper">
        <Search setSearched={setSearched} />
        <div className="search_suggestion_container">
          <b>Popular: </b>
          {searchSuggest.map((suggest, index) => (
            <div
              className="suggest"
              style={{
                background:
                  clickSuggest === index &&
                  "linear-gradient(to right,pink,rgb(247, 73, 110))",
              }}
              onClick={() => filterBySuggestion(suggest, index)}
            >
              {suggest}
            </div>
          ))}
        </div>
      </div>
      <div className="search_result_container">
        {isloading ? (
          <Spinner />
        ) : filteredProduct.length === 0 ? (
          <div className="search_blank">
            {error ? (
              <p className="search_message"> {error} </p>
            ) : (
              <p className="search_message">
                {searched ? (
                  <p>Sorry no such products</p>
                ) : (
                  <p className="search_message">
                    
                    search your favourite food here.. <FavoriteRounded className="fav_icon" />
                  </p>
                )}
              </p>
            )}
          </div>
        ) : (
          <div className="search_result">
            <div className="filter_container">
              <div className="products_number">
                {" "}
                {filteredProduct.length} Results for "
                <b> {keyword || searchSuggest[clickSuggest]}</b>"{" "}
              </div>
              <div className="price_filter_buttons">
                {" "}
                <button
                  className="filter_button"
                  onClick={() =>
                    setFilteredProduct([
                      ...filteredProduct.sort((a, b) => {
                        return a.price - b.price;
                      }),
                    ])
                  }
                >
                  price ascending
                </button>
                <button
                  className="filter_button"
                  onClick={() =>
                    setFilteredProduct([
                      ...filteredProduct.sort((a, b) => {
                        return b.price - a.price;
                      }),
                    ])
                  }
                >
                  price desending
                </button>
              </div>
            </div>
            <div className="searched_products">
              {filteredProduct.map((el, index) => (
                <SingleItem product={el} key={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Searchpage;
