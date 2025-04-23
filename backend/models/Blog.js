const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: String,
  description: String,
  content: String,
  imageUrl: String,
  likes: { type: Number, default: 0 },
  likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Blog", blogSchema);
