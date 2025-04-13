const express = require("express");
const { updateUser, getDetailsWithCalories, getDetails } = require("../controllers/profileController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.put("/update/:id", authMiddleware, updateUser);
router.get("/:id/details-with-calories", authMiddleware, getDetailsWithCalories);
router.get("/:id", authMiddleware, getDetails);

module.exports = router;
