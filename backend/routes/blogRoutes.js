const express = require("express");
const { getAllBlogs, createBlog, likeBlog } = require("../controllers/blogController");

const router = express.Router();

router.get("/", getAllBlogs);
router.post("/", createBlog);
router.put("/:id/like", likeBlog);

module.exports = router;
