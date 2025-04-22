const Food = require('../models/Food');

// GET /api/foods?q=searchQuery
exports.getAllFoods = async (req, res) => {
    try {
      const q = req.query.q || '';
      const foods = await Food.find({ name: { $regex: q, $options: 'i' } });
      res.json(foods);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  // GET /api/foods/search?name=nameQuery
  exports.searchFoodsByName = async (req, res) => {
    try {
      const name = req.query.name || '';
      const results = await Food.find({ name: { $regex: name, $options: 'i' } });
      res.json(results);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  // GET /api/foods/:id
  exports.getFoodById = async (req, res) => {
    try {
      const food = await Food.findById(req.params.id);
      if (!food) {
        return res.status(404).json({ error: 'Food not found' });
      }
      res.json(food);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };