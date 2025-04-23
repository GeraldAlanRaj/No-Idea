const Blog = require("../models/Blog");
const mongoose = require("mongoose");

// Get top 30 most liked blogs
exports.getTopBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ likes: -1 }).limit(30);
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Search blogs by title
exports.searchBlogs = async (req, res) => {
  try {
    const { q } = req.query;
    const blogs = await Blog.find({ title: { $regex: q, $options: "i" } });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Like a blog (only once per user)
exports.likeBlog = async (req, res) => {
  try {
    const userId = req.user.id;
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });

    if (blog.likedBy.includes(userId)) {
      return res.status(403).json({ error: "User already liked this blog" });
    }

    blog.likes += 1;
    blog.likedBy.push(userId);
    await blog.save();

    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get blog by ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });

    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
