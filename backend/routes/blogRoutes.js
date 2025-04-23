const express = require("express");
const {
  getTopBlogs,
  getBlogById,
  likeBlog,
  searchBlogs,
} = require("../controllers/blogController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, getTopBlogs); // Top 30 blogs
router.get("/search", authMiddleware, searchBlogs); // Search
router.get("/:id", authMiddleware, getBlogById); // Blog details
router.put("/:id/like", authMiddleware, likeBlog); // Like a blog

module.exports = router;
