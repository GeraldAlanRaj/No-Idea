const express = require("express");
const {  getAllRecipes,  getRecipeById,  likeRecipe,} = require("../controllers/recipeController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Fetch top 30 or search results
router.get("/", authMiddleware, getAllRecipes);

// Like a recipe (spam protected)
router.put("/:id/like", authMiddleware, likeRecipe);

// Get specific recipe by ID
router.get("/:id", authMiddleware, getRecipeById);

module.exports = router;
