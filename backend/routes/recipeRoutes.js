const express = require("express");
const { getAllRecipes, getRecipeById, likeRecipe } = require("../controllers/recipeController");

const router = express.Router();

router.get("/", getAllRecipes);
router.put("/:id/like", likeRecipe);
router.get("/:id", getRecipeById);


module.exports = router;
