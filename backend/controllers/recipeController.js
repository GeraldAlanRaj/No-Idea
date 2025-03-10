const Recipe = require("../models/Recipe");

// Get all Recipe
exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Like a Recipe
exports.likeRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ error: "Recipe not found" });
    
    recipe.likes += 1;
    await recipe.save();
    
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
