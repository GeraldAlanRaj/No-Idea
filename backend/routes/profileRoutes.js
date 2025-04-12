const express = require("express");
const { updateUser, getDetailsWithCalories, getDetails } = require("../controllers/profileController");
const router = express.Router();

// Update user details
router.put("/update/:id", updateUser);

// Get user details along with calculated nutrition (calories, macros)
router.get("/:id/details-with-calories", getDetailsWithCalories);

// Get user details
router.get("/:id", getDetails);

module.exports = router;
