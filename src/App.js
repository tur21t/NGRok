import React, { useState, useEffect } from "react";

import ProductCard from "./ProductCard";
import SearchIcon from "./search.svg";
import "./App.css";

const API_URL = "http://www.omdbapi.com?apikey=b6003d8a";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setproducts] = useState([]);

  useEffect(() => {
    searchproducts("Django");
  }, []);

  const searchproducts = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setproducts(data.Search);
  };

  return (
    <div className="app">
      <h1>NGRock</h1>

      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Поиск"
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchproducts(searchTerm)}
        />
      </div>

      {products?.length > 0 ? (
        <div className="container">
          {products.map((product) => (
            <ProductCard product={product} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>Не найдено ни одного объявления</h2>
        </div>
      )}
    </div>
  );
};

export default App;