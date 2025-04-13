const express = require("express");
const { getAllBlogs, getBlogById, likeBlog } = require("../controllers/blogController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, getAllBlogs);
router.put("/:id/like", authMiddleware, likeBlog);
router.get("/:id", authMiddleware, getBlogById);

module.exports = router;
