const express = require("express");
const { getAllBlogs, getBlogById, likeBlog } = require("../controllers/blogController");

const router = express.Router();

router.get("/", getAllBlogs);
router.put("/:id/like", likeBlog);
router.get("/:id", getBlogById);


module.exports = router;
