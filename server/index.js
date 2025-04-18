//Import modules
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import homeRouter from "./routers/home_router.js";
import userRouter from "./routers/user_router.js";

//declaration of variables
const app = express();
const PORT = process.env.PORT || 3000;

//middleware
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.use("/api/homes", homeRouter); // Protect book routes with JWT authentication
app.use("/api/users", userRouter);

app.use((req, res) => {
  res.status(404).json({ message: "API route not found" });
});

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

//Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch((error) => console.error("MongoDB connection error:", error));
