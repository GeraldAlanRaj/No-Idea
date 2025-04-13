const express = require("express");
const { getAllRecipes, getRecipeById, likeRecipe } = require("../controllers/recipeController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, getAllRecipes);
router.put("/:id/like", authMiddleware, likeRecipe);
router.get("/:id", authMiddleware, getRecipeById);

module.exports = router;
