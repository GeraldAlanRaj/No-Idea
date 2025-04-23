const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    name: String,
    category: String,
    perServing: {
      servingSize: Number,
      unit: String,
      calories: Number,
      protein: Number,
      carbs: Number,
      fat: Number,
      fiber: Number,
    },
    per100g: {
      calories: Number,
      protein: Number,
      carbs: Number,
      fat: Number,
      fiber: Number,
    }
  });
module.exports = mongoose.model('Food', foodSchema);