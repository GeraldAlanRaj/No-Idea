const express = require("express");
const {  getAllFoods,  searchFoodsByName,  getFoodById,} = require("../controllers/foodsearchController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", authMiddleware, getAllFoods); // /api/foods?q=searchQuery
router.get("/search", authMiddleware, searchFoodsByName); // /api/foods/search?name=nameQuery
router.get("/:id", authMiddleware, getFoodById); // /api/foods/:id

module.exports = router;
