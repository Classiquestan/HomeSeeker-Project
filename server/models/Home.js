import mongoose from "mongoose";

const homeSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: [true, "A home must have an ID"],
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: String,
    required: true,
    trim: true,
  },
  zip_code: {
    type: String,
    required: true,
    trim: true,
    match: [/^[a-zA-Z0-9]+$/, "Zip code must be alphanumeric"],
  },
  price: {
    type: Number,
    required: true,
    min: [0, "Price cannot be negative"],
  },
  beds: {
    type: Number,
    required: true,
    trim: true,
    min: [0, "Price cannot be negative"],
  },
  baths: {
    type: Number,
    required: true,
    trim: true,
    min: [0, "Price cannot be negative"],
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  imageUrl: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    //    required: true,
    enum: ["for_rent", "for_sale"],
    trim: true,
    default: "for_sale",
  },
  propertyType: {
    type: String,
    trim: true,
    required: [true, "Property type is required"],
  },
});

const Home = mongoose.model("Home", homeSchema);

export default Home;
