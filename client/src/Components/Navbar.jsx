import { Link } from "react-router-dom";
import homelogo from "../assets/homelogo1.jpg";
import signlogo from "../assets/signinlogo1.png";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo-container">
        {/* <img className="logo" src={homelogo} alt="HomeSeeker logo" />
        <h1 className="title">HomeSeeker</h1> */}
        <Link to="/" className="logo-container">
          <img className="logo" src={homelogo} alt="HomeSeeker logo" />
          <h1 className="title">HomeSeeker</h1>
        </Link>
      </div>

      <div className="nav-link">
        <ul>
          <li>
            <Link to="/buy" target="_blank" rel="noopener noreferrer">
              Buy
            </Link>
          </li>

          <li>
            <Link to="/sell">Sell</Link>
          </li>

          <li>
            <Link to="/rent">Rent</Link>
          </li>

          <li className="signin-container">
            <Link to="/signin">
              <img className="signin" src={signlogo} alt="Sign In" /> Sign In
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
