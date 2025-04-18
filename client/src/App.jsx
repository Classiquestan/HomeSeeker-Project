//import React from 'react'
//import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home.jsx";
import Navbar from "./Components/Navbar.jsx";
import BuyPage from "./Components/BuyPage.jsx";
import SignInPage from "./Components/SignInPage.jsx";
import RegisterPage from "./Components/RegisterPage.jsx";
import Rental from "./Components/Rental.jsx";
import SellPage from "./Components/SellPage.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buy" element={<BuyPage />} />
        <Route path="/rent" element={<Rental />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="sell" element={<SellPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
