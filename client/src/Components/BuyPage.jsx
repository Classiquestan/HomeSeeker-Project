import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./BuyPage.css"; // Ensure this includes styles for .card and .cardContainer

const BuyPage = () => {
  const [buyHomes, setBuyHomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBuyHomes = async () => {
      setLoading(true); // Set loading true at the start
      setError(null); // Clear previous errors
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/api/homes/buy`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBuyHomes(data);
      } catch (err) {
        console.error("Failed to fetch homes for sale:", err); // Log error
        setError(err.message || "Failed to load homes. Please try again."); // Set user-friendly error message
      } finally {
        setLoading(false);
      }
    };

    fetchBuyHomes();
  }, []);

  if (loading)
    return (
      <div className="loading-container">
        {/* <LoadingSpinner /> */} <p>Loading Homes...</p>
      </div>
    );
  if (error) return <p className="error-message">Error: {error}</p>; // Style error messages

  return (
    <div className="buyPage">
      <h1>Homes for Sale</h1>
      {buyHomes.length === 0 ? (
        <p>No homes for sale found at the moment.</p>
      ) : (
        <div className="cardContainer">
          {buyHomes.map((home) => (
            <Link to={`/homes/${home._id}`} className="card" key={home._id}>
              <div className="card-content">
                <h3>{home.street}</h3>
                <p>
                  {home.city}, {home.state} {home.zip_code}
                </p>
                <p>
                  <strong>Price:</strong> ${home.price?.toLocaleString()}
                </p>
                <p>
                  <strong>{home.bed}</strong> beds |{" "}
                  <strong>{home.bath}</strong> baths
                </p>
                {home.house_size && (
                  <p>
                    <strong>Size:</strong> {home.house_size} sqft
                  </p>
                )}
                {/* Removed acre_lot for brevity, add back if needed */}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default BuyPage;
