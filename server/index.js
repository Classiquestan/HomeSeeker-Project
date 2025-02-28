const express = require("express");
const multer = require("multer");
const open = require("open");
const cors = require("cors");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./uploads");
//   },
//   filename: function (req, file, cb) {
//     const uniquePrefix = Date.now();
//     cb(null, uniquePrefix + file.fieldname);
//   },
// });

// const upload = multer({ storage: storage });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
// app.use("/uploads", express.static("uploads"));

const homesForSale = [
  {
    id: 1,
    address: "123 Maple Street",
    city: "Springfield",
    state: "IL",
    zip: "62704",
    price: 250000,
    bedrooms: 3,
    bathrooms: 2,
    area: 1500,
    description:
      "Charming family home with a spacious backyard and modern kitchen.",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    address: "456 Oak Avenue",
    city: "Greenville",
    state: "SC",
    zip: "29601",
    price: 320000,
    bedrooms: 4,
    bathrooms: 3,
    area: 2100,
    description: "Spacious home in a quiet neighborhood, perfect for families.",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    address: "789 Pine Lane",
    city: "Madison",
    state: "WI",
    zip: "53703",
    price: 195000,
    bedrooms: 2,
    bathrooms: 1,
    area: 1200,
    description: "Cozy bungalow with modern updates and a beautiful garden.",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    address: "321 Birch Boulevard",
    city: "Austin",
    state: "TX",
    zip: "73301",
    price: 450000,
    bedrooms: 5,
    bathrooms: 4,
    area: 3000,
    description:
      "Luxury home with a pool and large backyard in a prestigious neighborhood.",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 5,
    address: "654 Cedar Road",
    city: "Denver",
    state: "CO",
    zip: "80203",
    price: 350000,
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    description: "Modern condo with great city views and convenient location.",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 6,
    address: "987 Spruce Court",
    city: "Portland",
    state: "OR",
    zip: "97205",
    price: 275000,
    bedrooms: 3,
    bathrooms: 2,
    area: 1600,
    description:
      "Charming cottage in a friendly neighborhood, close to parks and shops.",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 7,
    address: "159 Elm Street",
    city: "Boston",
    state: "MA",
    zip: "02108",
    price: 525000,
    bedrooms: 4,
    bathrooms: 3,
    area: 2400,
    description:
      "Historic home with modern renovations in a prime downtown location.",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 8,
    address: "753 Willow Way",
    city: "Seattle",
    state: "WA",
    zip: "98101",
    price: 400000,
    bedrooms: 3,
    bathrooms: 2,
    area: 2000,
    description:
      "Contemporary home with an open floor plan and scenic city views.",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 9,
    address: "852 Aspen Drive",
    city: "Boulder",
    state: "CO",
    zip: "80302",
    price: 375000,
    bedrooms: 3,
    bathrooms: 2,
    area: 1700,
    description:
      "Cozy home located near outdoor recreation areas and local amenities.",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 10,
    address: "246 Walnut Avenue",
    city: "San Francisco",
    state: "CA",
    zip: "94103",
    price: 850000,
    bedrooms: 2,
    bathrooms: 2,
    area: 1400,
    description:
      "Stylish condo in the heart of the city with modern finishes and excellent views.",
    imageUrl: "https://via.placeholder.com/150",
  },
];

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.get("/data", (req, res) => {
  res.json({
    name: "Stan",
    password: "password123",
    username: "StanMan",
  });
});

app.post("/login", (req, res) => {
  console.log(req.body);
  res.json("I got your information");
});

app.get("/api/homes", (req, res) => {
  res.json(homesForSale);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  open(`http://localhost:${PORT}`);
});
