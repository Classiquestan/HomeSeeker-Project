// src/pages/SellPage.js
import { useState } from "react";
//import { useNavigate } from "react-router-dom";
import "./SellPage.css"; // Create a corresponding CSS file for styling

const SellPage = () => {
  // const navigate = useNavigate();
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    state: "", 
    zip_code: "",
    price: "",
    beds: "",
    baths: "",
    house_size: "", // Optional field
    description: "",
    status: "for_sale", // Pre-set for this page
    propertyType: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(""); // For showing image preview
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  // Handles changes in text/number inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handles file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Create a preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    } else {
      setImageFile(null);
      setImagePreview("");
    }
  };

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage("");

    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("You must be logged in to list a home.");
      setLoading(false);

      return;
    }

    if (!imageFile) {
      setError("Please upload an image for the property.");
      setLoading(false);
      return;
    }

    // Use FormData because we are sending a file
    const dataToSubmit = new FormData();

    // Append all text/number fields from state
    Object.keys(formData).forEach((key) => {
      dataToSubmit.append(key, formData[key]);
    });

    dataToSubmit.append("image", imageFile);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/homes/add`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: dataToSubmit, // Send FormData object
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to add home.");
      }

      setSuccessMessage(`Home listed successfully! ID: ${result._id}`);
      // Clear form optionally
      setFormData({
        /* Reset fields */
      });
      setImageFile(null);
      setImagePreview("");
    } catch (err) {
      console.error("Error listing home:", err);
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useState(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  return (
    <div className="sell-page-container">
      <h1>List Your Home for Sale</h1>
      <form onSubmit={handleSubmit} className="sell-form">
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        {/* Address Fields */}
        <label htmlFor="address">Street Address*</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />

        <div className="form-row">
          <div>
            <label htmlFor="city">City*</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="state">Province/State*</label>
            {/* Make this a dropdown for better UX if needed */}
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="zip_code">Postal/Zip Code*</label>
            <input
              type="text"
              id="zip_code"
              name="zip_code"
              value={formData.zip_code}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Price and Details */}
        <div className="form-row">
          <div>
            <label htmlFor="price">Price ($)*</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
            />
          </div>
          <div>
            <label htmlFor="beds">Bedrooms*</label>
            <input
              type="number"
              id="beds"
              name="beds"
              value={formData.beds}
              onChange={handleChange}
              required
              min="0"
            />
          </div>
          <div>
            <label htmlFor="baths">Bathrooms*</label>
            <input
              type="number"
              id="baths"
              name="baths"
              value={formData.baths}
              onChange={handleChange}
              required
              min="0"
            />
          </div>
          <div>
            <label htmlFor="propertyType">Property Type*</label>
            <select
              id="propertyType"
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
              required
            >
              <option value="">Select a type</option>
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="condo">Condo</option>
              <option value="townhouse">Townhouse</option>
              {/* Add more types if needed */}
            </select>
          </div>
          <div>
            <label htmlFor="house_size">Size (sqft)</label>
            <input
              type="number"
              id="house_size"
              name="house_size"
              value={formData.house_size}
              onChange={handleChange}
              min="0"
            />
          </div>
        </div>

        {/* Description */}
        <label htmlFor="description">Description*</label>
        <textarea
          id="description"
          name="description"
          rows="4"
          value={formData.description}
          onChange={handleChange}
          required
        ></textarea>

        {/* Image Upload */}
        <label htmlFor="image">Property Image*</label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/png, image/jpeg, image/jpg" // Specify accepted file types
          onChange={handleFileChange}
          required
        />
        {imagePreview && (
          <div className="image-preview">
            <p>Image Preview:</p>
            <img
              src={imagePreview}
              alt="Preview"
              style={{ maxWidth: "200px", maxHeight: "200px" }}
            />
          </div>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Listing..." : "List My Home"}
        </button>
      </form>
    </div>
  );
};

export default SellPage;
