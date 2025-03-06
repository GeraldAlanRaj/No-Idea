const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: String,
    description: String,
    content: String,
    likes: { type: Number, default: 0 },
    imageUrl: String,
  });

module.exports = mongoose.model("Blog", blogSchema);