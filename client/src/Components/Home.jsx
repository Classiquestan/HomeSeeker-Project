//import React from 'react'
import { useState } from "react";
import "./Home.css";

const Home = () => {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    beds: "",
    baths: "",
    propertyType: "",
  });

  const handleSearch = () => {
    console.log("searching for: ", query, filters);
  };

  return (
    <>
      <div className="search-section">
        <h1 className="line">Find Your New Home!</h1>
        <div className="search-box">
          <input
            type="text"
            placeholder="Address, City or Zip"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <button onClick={handleSearch}>Search</button>
        </div>

        <div className="filters">
          <select
            onChange={(e) =>
              setFilters({ ...filters, minPrice: e.target.value })
            }
          >
            <option>Min Price</option>
            <option value="500">$500</option>
            <option value="1000">$1,000</option>
            <option value="1500">$1,500</option>
            <option value="2000">$2,000</option>
            <option value="2500">$2,500</option>
            <option value="3000">$3,000</option>
            <option value="3500">$3,500</option>
            <option value="4000">$4,000</option>
            <option value="4500">$4,500</option>
            <option value="5000">$5,000</option>
          </select>

          <select
            onChange={(e) =>
              setFilters({ ...filters, maxPrice: e.target.value })
            }
          >
            <option>Max Price</option>
            <option value="500">$500</option>
            <option value="1000">$1,000</option>
            <option value="1500">$1,500</option>
            <option value="2000">$2,000</option>
            <option value="2500">$2,500</option>
            <option value="3000">$3,000</option>
            <option value="3500">$3,500</option>
            <option value="4000">$4,000</option>
            <option value="4500">$4,500</option>
            <option value="5000">$5,000</option>
            <option value="5000">$5,000</option>
            <option value="10000">$10,000</option>
            <option value="15000">$15,000</option>
          </select>

          <select
            onChange={(e) => setFilters({ ...filters, beds: e.target.value })}
          >
            <option>Beds</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
            <option value="5">5+</option>
          </select>

          <select
            onChange={(e) => setFilters({ ...filters, baths: e.target.value })}
          >
            <option>Baths</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
            <option value="5">5+</option>
          </select>

          <select
            onChange={(e) =>
              setFilters({ ...filters, propertyType: e.target.value })
            }
          >
            <option>Property Type</option>
            <option value="home">Single Family Home</option>
            <option value="apartment">Condominium/Apartment</option>
            <option value="town">TownHouse/TownHome</option>
            <option value="duplex">Duplex</option>
            <option value="basement">Basement</option>
          </select>
        </div>
      </div>

      <div>
        <h2>Newest homes for sale in Toronto</h2>
        <button>Explore all Homes</button>
      </div>
    </>
  );
};

export default Home;
