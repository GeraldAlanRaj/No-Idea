const express = require("express");
const { updateUser, getDetails } = require("../controllers/profileController");
const router = express.Router();

// Make sure this route is correctly defined
router.put("/update/:id", updateUser);
router.get("/:id", getDetails);

module.exports = router;
