const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: String,
    description: String,
    content: String,
    likes: { type: Number, default: 0 },
    likedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
    imageUrl: String,
  });

module.exports = mongoose.model("Recipe", recipeSchema);