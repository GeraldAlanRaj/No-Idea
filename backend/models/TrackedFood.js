const mongoose = require('mongoose');

const trackedFoodSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    foodId: { type: mongoose.Schema.Types.ObjectId, ref: 'Food' },
    date: String,
    quantity: Number,
    method: String,
    mealType: String,
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number,
    fiber: Number,
  });

module.exports = mongoose.model('TrackedFood', trackedFoodSchema);
