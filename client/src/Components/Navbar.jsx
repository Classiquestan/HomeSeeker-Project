//import React from 'react'
//import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import homelogo from "../assets/homelogo1.jpg";
import signlogo from "../assets/signinlogo1.png";
import "./Navbar.css";

const Navbar = () => {
  const [homes, setHomes] = useState([]);
  // const [showHomes, setShowHomes] = useState(false);
  const navigate = useNavigate();

  const homeList = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/homes");
      const data = await response.json();
      setHomes(data);
      // setShowHomes(true);
      // navigate("/buy");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="navbar">
      <div className="logo-container">
        <img className="logo" src={homelogo} />
        <h1 className="title">HomeSeeker</h1>
      </div>

      <div className="nav-link">
        <ul>
          <li>
            <Link to="/buy">Buy</Link>

            {/* <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                homeList();
              }}
            >
              Buy
            </a> */}
          </li>

          <li>
            <a href="/">Sell</a>
          </li>
          <li>
            <a href="/">Rent</a>
          </li>
          <li className="signin-container">
            <Link to="/signin">
              <img className="signin" src={signlogo} /> Sign In
            </Link>
          </li>
        </ul>
      </div>

      {/* {showHomes && (
        <div>
          <h2>Homes</h2>
          <ul>
            {homes.map((home) => (
              <li key={home.id}>
                <div>
                  <strong>Address:</strong> {home.address}, {home.city},{" "}
                  {home.state} {home.zip}
                </div>
                <div>
                  <strong>Price:</strong> ${home.price}
                </div>
                <div>
                  <strong>Bedrooms:</strong> {home.bedrooms},{" "}
                  <strong>Bathrooms:</strong> {home.bathrooms}
                </div>
                <div>
                  <strong>Area:</strong> {home.area} sq ft
                </div>
                <div>
                  <strong>Description:</strong> {home.description}
                </div>
                <img src={home.imageUrl} alt="Home" />
                
              </li>
            ))}
          </ul>
        </div>
      )} */}
    </nav>
  );
};

export default Navbar;
