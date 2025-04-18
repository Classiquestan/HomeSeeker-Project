import { useState, useEffect } from "react";
import "./Rental.css"; // Add this to apply styles

const Rental = () => {
  const [rentHomes, setRentHomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRentHomes = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/api/homes/rent`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setRentHomes(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRentHomes();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="rentalPage">
      <h1>Homes for Rent</h1>
      {rentHomes.length === 0 ? (
        <p>No homes for rent found.</p>
      ) : (
        <div className="cardContainer">
          {rentHomes.map((home) => (
            <div className="card" key={home._id}>
              <h3>{home.street}</h3>
              <p>
                {home.city}, {home.state} {home.zip_code}
              </p>
              <p>
                <strong>Rent:</strong> ${home.price} / month
              </p>
              <p>
                <strong>{home.bed}</strong> beds, <strong>{home.bath}</strong>{" "}
                baths
              </p>
              {home.acre_lot && (
                <p>
                  <strong>Lot:</strong> {home.acre_lot} acres
                </p>
              )}
              {home.house_size && (
                <p>
                  <strong>Size:</strong> {home.house_size} sqft
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Rental;
