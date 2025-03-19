const express = require("express");
const { updateUser } = require("../controllers/profileController");
const router = express.Router();

// Make sure this route is correctly defined
router.put("/update/:id", updateUser);

module.exports = router;
