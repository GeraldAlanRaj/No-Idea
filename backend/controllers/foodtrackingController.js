const Food = require('../models/Food');
const TrackedFood = require('../models/Track_Food');
const dayjs = require('dayjs');

//Add food to tracking
exports.addFood = async (req, res) => {
    const { userId, foodId, quantity, method, mealType } = req.body;
    const food = await Food.findById(foodId);
    const multiplier = method === 'serving' ? quantity : quantity / 100;
  
    const entry = {
      userId,
      foodId,
      quantity,
      method,
      mealType,
      date: dayjs().format('YYYY-MM-DD'),
      calories: food.per100g.calories * multiplier,
      protein: food.per100g.protein * multiplier,
      carbs: food.per100g.carbs * multiplier,
      fat: food.per100g.fat * multiplier,
      fiber: food.per100g.fiber * multiplier,
    };
  
    await TrackedFood.create(entry);
    res.json({ message: 'Tracked successfully' });
  };

  
// Get food history for a specific date
exports.getFoodHistory = async (req, res) => {
    const { userId, date } = req.query;
    const tracked = await TrackedFood.find({ userId, date }).populate('foodId');
  
    const history = tracked.map(t => ({
      foodName: t.foodId.name,
      calories: t.calories,
      protein: t.protein,
      carbs: t.carbs,
      fat: t.fat,
      fiber: t.fiber,
      mealType: t.mealType
    }));
  
    res.json(history);
  }
  
//Calculate the total calories and macros for the day
exports.calculateDailyTotals = async (req, res) => {
    const today = dayjs().format('YYYY-MM-DD');
    const trackedFoods = await TrackedFood.find({ date: today }).populate('foodId');
  
    const total = trackedFoods.reduce((acc, tf) => {
      acc.calories += tf.calories;
      acc.protein += tf.protein;
      acc.carbs += tf.carbs;
      acc.fat += tf.fat;
      acc.fiber += tf.fiber;
      return acc;
    }, { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 });
  
    res.json(total);
  };