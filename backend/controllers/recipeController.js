// Updated Recipe Controller with Top 30 and Search + Like Spam Prevention
const Recipe = require("../models/Recipe");
const User = require("../models/User");

// Get top 30 recipes or search
exports.getAllRecipes = async (req, res) => {
  try {
    const { search } = req.query;

    let recipes;
    if (search) {
      const regex = new RegExp(search, "i");
      recipes = await Recipe.find({ title: regex });
    } else {
      recipes = await Recipe.find().sort({ likes: -1 }).limit(30);
    }

    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Like a Recipe (with like spam prevention)
exports.likeRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    const userId = req.user._id; // Assume authMiddleware adds req.user

    if (!recipe) return res.status(404).json({ error: "Recipe not found" });

    // Add logic to store likes by users in user model
    const user = await User.findById(userId);
    if (!user) return res.status(403).json({ error: "User not authorized" });

    if (!user.likedRecipes) user.likedRecipes = [];

    if (user.likedRecipes.includes(recipe._id)) {
      return res.status(400).json({ error: "You already liked this recipe" });
    }

    recipe.likes += 1;
    await recipe.save();

    user.likedRecipes.push(recipe._id);
    await user.save();

    res.json(recipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single Recipe by ID
exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ error: "Recipe not found" });

    res.json(recipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
