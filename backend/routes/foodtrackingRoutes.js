const express = require("express");
const {  addFood,  getFoodHistory,  calculateDailyTotals,} = require("../controllers/foodtrackingController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", authMiddleware, addFood); // Add food to tracking
router.get("/history", authMiddleware, getFoodHistory); // Get food history by userId and date
router.get("/daily-totals", authMiddleware, calculateDailyTotals); // Get daily total nutrients

module.exports = router;
