import express from "express";
import userController from "../controllers/User_controller.js";

const router = express.Router();

// Register route
router.post("/register", userController.registerUser);

// Login route
router.post("/login", userController.loginUser);

// Logout route
router.get("/logout", userController.logoutUser);

export default router;
