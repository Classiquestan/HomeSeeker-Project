//import React from 'react'
import { Route, Routes } from "react-router-dom";
import Home from "./Components/home.jsx";
import Navbar from "./Components/Navbar.jsx";
import BuyPage from "./Components/BuyPage.jsx";
import SignInPage from "./Components/SignInPage.jsx";

const App = () => {
  return (
    <>
      <Navbar />
      <Home />
      <Routes>
        <Route path="/buy" element={<BuyPage />} />
        <Route path="/signin" element={<SignInPage />} />
      </Routes>
    </>
  );
};

export default App;
