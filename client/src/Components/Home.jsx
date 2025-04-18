//import React from 'react'
import { useState } from "react";
import "./Home.css";

const Home = () => {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    minPrice: "",
    maxPrice: "",
    beds: "",
    baths: "",
    propertyType: "",
  });

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    //    console.log("searching for: ", query, filters);
    // Build query parameters from the search input and selected filters
    const params = new URLSearchParams();
    if (query) params.append("query", query);
    if (filters.status) params.append("status", filters.status);
    if (filters.minPrice) params.append("minPrice", filters.minPrice);
    if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);
    if (filters.beds) params.append("beds", filters.beds);
    if (filters.baths) params.append("baths", filters.baths);
    if (filters.propertyType)
      params.append("propertyType", filters.propertyType);

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/homes/all?${params.toString()}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setResults(data); // Save the search results to state.
      console.log("Search results: ", data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching search results: ", err);
    } finally {
      setLoading(false);
    }
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
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option>Type</option>
            <option value="rent">rent</option>
            <option value="buy">buy</option>
          </select>

          <select
            onChange={(e) =>
              setFilters({ ...filters, minPrice: e.target.value })
            }
          >
            <option>Min Price</option>
            <option value="1000">$1,000</option>
            <option value="2000">$2,000</option>
            <option value="3000">$3,000</option>
            <option value="4000">$4,000</option>
            <option value="4500">$5,000</option>
            <option value="10000">$10,000</option>
          </select>

          <select
            onChange={(e) =>
              setFilters({ ...filters, maxPrice: e.target.value })
            }
          >
            <option>Max Price</option>
            <option value="1000">$1,000</option>
            <option value="2000">$2,000</option>
            <option value="3000">$3,000</option>
            <option value="4000">$4,000</option>
            <option value="4500">$5,000</option>
            <option value="5000">$10,000</option>
            <option value="8000">$50,000</option>
            <option value="10000">$100,000</option>
            <option value="15000">$1,000,000</option>
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
            <option value="home">condos</option>
            <option value="apartment">apartment</option>
            <option value="town">townhome</option>
            <option value="duplex">duplex</option>
            <option value="basement">basement</option>
            <option value="basement">detached</option>
            <option value="basement">semi-detached</option>
          </select>
        </div>
      </div>

      <div className="results-section">
        <h2>Search Results</h2>
        {loading && <p>Loading results...</p>}
        {error && <p className="error">Error: {error}</p>}
        {!loading && !error && results.length === 0 && (
          <p>No homes found matching your criteria.</p>
        )}

        {/* CARD LAYOUT START */}
        <div className="results-grid">
          {results.map((home) => (
            <div key={home._id} className="home-card">
              <img
                src={home.imageUrl}
                alt={home.address}
                className="home-card__image"
              />
              <div className="home-card__details">
                <h3 className="home-card__address">
                  {home.address} {home.city}
                </h3>
                <p className="home-card__price">
                  ${home.price.toLocaleString()}
                </p>
                <p className="home-card__meta">
                  {home.beds} bd • {home.baths} ba • {home.propertyType}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* <div>
        <h2>Newest homes for sale</h2>
        <button>Explore all Homes</button>
      </div> */}
    </>
  );
};

export default Home;
