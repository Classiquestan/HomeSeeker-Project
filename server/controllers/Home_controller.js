import Home from "../models/Home.js";

// GET /api/homes with optional search and filters
const getAllHomes = async (req, res) => {
  try {
    // Extract query parameters from the URL
    const { query, minPrice, maxPrice, beds, baths, propertyType, status } =
      req.query;
    let filters = {};

    // If a search query is provided, search by address, city, or zip_code (case-insensitive)
    if (query) {
      filters.$or = [
        { address: { $regex: query, $options: "i" } },
        { city: { $regex: query, $options: "i" } },
        { zip_code: { $regex: query, $options: "i" } },
      ];
    }

    // Add a minimum price filter if provided.
    if (minPrice) {
      filters.price = { ...(filters.price || {}), $gte: Number(minPrice) };
    }

    // Add a maximum price filter if provided.
    if (maxPrice) {
      filters.price = { ...(filters.price || {}), $lte: Number(maxPrice) };
    }

    // If beds are provided, filter homes having at least that many beds.
    if (beds) {
      filters.beds = { $gte: Number(beds) };
    }

    // If baths are provided, filter homes having at least that many baths.
    if (baths) {
      filters.baths = { $gte: Number(baths) };
    }

    // If a property type is provided, filter by it.
    if (propertyType) {
      // Optional: Use a case-insensitive regular expression if needed
      filters.propertyType = new RegExp(`^${propertyType}$`, "i");
    }
    if (status) {
      if (status.toLowerCase() === "rent") {
        filters.status = "for_rent";
      } else if (status.toLowerCase() === "buy") {
        filters.status = "for_sale";
      }
    }

    console.log("Applied Filters:", filters);

    // Query the database for homes using the built filters
    const homes = await Home.find(filters);
    res.json(homes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching homes", error });
  }
};

// Fetch details for a specific home
const getHomeDetails = async (req, res) => {
  try {
    const home = await Home.findById(req.params.id);
    if (!home) {
      return res.status(404).json({ message: "Home not found" });
    }
    res.json(home);
  } catch (error) {
    res.status(500).json({ message: "Error fetching home details", error });
  }
};

const getRentHomes = async (req, res) => {
  try {
    // Filter for rental homes using the "status" field
    const rentHomes = await Home.find({ status: "for_rent" });
    res.json(rentHomes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching rental homes", error });
  }
};

// Get homes for sale
const getSaleHomes = async (req, res) => {
  try {
    // Filter for sale homes using the "status" field
    const saleHomes = await Home.find({ status: "for_sale" });
    res.json(saleHomes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching sale homes", error });
  }
};

// Add a new home
const addHome = async (req, res) => {
  try {
    const {
      id,
      address,
      city,
      state,
      zip_code,
      price,
      beds,
      baths,
      description,
      status,
      propertyType,
      //imageUrl,
    } = req.body;

    const imageUrl = req.file ? req.file.path : null;

    const newHome = new Home({
      id,
      address,
      city,
      state,
      zip_code,
      price,
      beds,
      baths,
      description,
      imageUrl: imageUrl || "https://via.placeholder.com/400x300?text=No+Image",
      status: status || "for_sale",
      propertyType,
    });

    await newHome.save();
    res.status(201).json(newHome);
  } catch (error) {
    console.error("Error adding home:", error);
    res.status(400).json({ message: "Error adding home", error });
  }
};

// Edit an existing home
const editHome = async (req, res) => {
  try {
    const {
      address,
      city,
      state,
      zip_code,
      price,
      beds,
      baths,
      description,
      imageUrl,
    } = req.body;
    const updatedHome = await Home.findByIdAndUpdate(
      req.params.id,
      {
        address,
        city,
        state,
        zip_code,
        price,
        beds,
        baths,
        description,
        imageUrl,
      },
      { new: true }
    );
    if (!updatedHome) {
      return res.status(404).json({ message: "Home not found" });
    }
    res.json(updatedHome);
  } catch (error) {
    res.status(400).json({ message: "Error updating home", error });
  }
};

// Delete a home
const deleteHome = async (req, res) => {
  try {
    const home = await Home.findById(req.params.id);
    if (!home) {
      return res.status(404).json({ message: "Home not found" });
    }

    await Home.findByIdAndDelete(req.params.id);
    res.json({ message: "Home deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting home", error });
  }
};

export default {
  getAllHomes,
  getRentHomes,
  getSaleHomes,
  getHomeDetails,
  addHome,
  editHome,
  deleteHome,
};
