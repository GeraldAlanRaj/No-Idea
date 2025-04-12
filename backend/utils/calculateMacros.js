function calculateCaloriesAndMacros({ age, gender, weight, height, activity, goal }) {
    // BMR Calculation (Mifflin-St Jeor formula)
    const bmr = gender === "male"
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;
  
    const activityMap = {
      "BMR": 1,
      "Sedentary": 1.2,
      "Light": 1.375,
      "Moderate": 1.55,
      "Active": 1.725,
      "Very Active": 1.9,
      "Extra Active": 2.0
    };
  
    let calories = bmr * (activityMap[activity] || 1);
  
    const goalAdjustment = {
      "Maintain Weight": 0,
      "Mild Weight Loss": -250,
      "Moderate Weight Loss": -500,
      "Extreme Weight Loss": -1000,
      "Mild Weight Gain": 250,
      "Moderate Weight Gain": 500,
      "Extreme Weight Gain": 1000
    };
  
    calories += goalAdjustment[goal] || 0;
  
    const macros = {
      carbs: { percentage: 0.5, kcalPerGram: 4 },
      protein: { percentage: 0.2, kcalPerGram: 4 },
      fat: { percentage: 0.3, kcalPerGram: 9 }
    };
  
    const macroGrams = {};
    for (const [macro, { percentage, kcalPerGram }] of Object.entries(macros)) {
      const kcal = calories * percentage;
      macroGrams[macro] = Math.round(kcal / kcalPerGram);
    }
  
    // Add fiber inside macros based on age and gender
    macroGrams.fiber = gender === "male"
      ? age >= 51 ? 30 : 38
      : age >= 51 ? 21 : 25;
  
    return {
      calories: Math.round(calories),
      macros: macroGrams
    };
  }
  
  module.exports = calculateCaloriesAndMacros;
  