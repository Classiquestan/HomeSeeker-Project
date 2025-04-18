import express from "express";
import auth from "../middleware/auth.js";
import homeController from "../controllers/Home_controller.js";
const router = express.Router();
import multer from "multer";
import path from "path";

// Fetch all homes for the logged-in user
//router.get("/", auth.verifyToken, homeController.getUserBooks); // remove verifyToken

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, uniqueSuffix);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });

// Fetch all homes
router.get("/all", homeController.getAllHomes);

router.get("/buy", homeController.getSaleHomes);

router.get("/rent", homeController.getRentHomes);

// Add a new home
//router.post("/add", homeController.addHome); // remove verifyToken

// Fetch detailed home information
router.get("/details/:id", homeController.getHomeDetails);

// Edit an existing book
router.put("/edit/:id", homeController.editHome); // remove verifyToken

// Delete a book
router.delete("/delete/:id", homeController.deleteHome); // remove verifyToken

router.post("/add", upload.single("image"), homeController.addHome);

export default router;
