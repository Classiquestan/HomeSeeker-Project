import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();



// Function to generate JWT token
export const generateToken = (user) => {
  return jwt.sign(
    {
      userId: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET, // Use your JWT secret from the environment
    { expiresIn: "1h" } // Set token expiration time (1 day in this case)
  );
};

// Middleware to verify the JWT token
export const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Get token from Authorization header

  if (!token) {
    return res.status(401).json({ message: "Authorization token required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    req.user = decoded; // Attach decoded user info to the request object
    next(); // Continue to the next middleware/route handler
  } catch (error) {
    res.status(400).json({ message: "Invalid or expired token" });
  }
};

export default { generateToken, verifyToken };
