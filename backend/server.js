require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");
const recipeRoutes = require("./routes/recipeRoutes");
const profileRoutes = require("./routes/profileRoutes");
const foodTrackingRoutes = require("./routes/foodtrackingRoutes");
const foodSearchRoutes = require("./routes/foodsearchRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("public/uploads"));

connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/foodtrack", foodTrackingRoutes);
app.use("/api/foods", foodSearchRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

