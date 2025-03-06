const Blog = require("../models/Blog");

// Get all blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new blog
exports.createBlog = async (req, res) => {
  try {
    const { title, description, content, imageUrl } = req.body;
    const newBlog = new Blog({ title, description, content, imageUrl });
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Like a blog
exports.likeBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    
    blog.likes += 1;
    await blog.save();
    
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
