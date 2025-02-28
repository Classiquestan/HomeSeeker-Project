import { useState, useEffect } from "react";
import "./BuyPage.css";

const BuyPage = () => {
  const [homes, setHomes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/homes")
      .then((response) => response.json())
      .then((data) => setHomes(data));
  }, []);

  return (
    <div className="buyPage">
      <h2>Homes for Sale</h2>
      <ul>
        {homes.map((home) => (
          <li key={home.id}>
            {/* {home.address}, {home.city}, {home.state} - ${home.price} */}
            <div>
              <strong>Address:</strong> {home.address}, {home.city},{" "}
              {homes.state} {home.zip}
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
  );
};

export default BuyPage;
