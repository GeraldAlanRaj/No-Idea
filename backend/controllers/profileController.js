const User = require("../models/User");
const calculateCaloriesAndMacros = require("../utils/calculateMacros");
/*
// Update user details using ID from request params
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { age, height, weight, gender, activity, goal } = req.body;

    if (!age && !height && !weight && !gender && !activity && !goal) {
      return res.status(400).json({ message: "At least one field must be updated" });
    }

    // Find user by ID first
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update only the provided fields
    if (age !== undefined) user.age = age;
    if (height !== undefined) user.height = height;
    if (weight !== undefined) user.weight = weight;
    if (gender !== undefined) user.gender = gender;
    if (activity !== undefined) user.activity = activity;
    if (goal !== undefined) user.goal = goal;

    // Save to trigger `__v` increment
    const updatedUser = await user.save();

    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error: error.message });
  }
};
*/
exports.getDetails = async (req, res) => {
  try {
      const { id } = req.params; // Ensure it matches the route parameter
      const user = await User.findById(id); // Fetch user details based on ID

      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      res.json(user);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};
/*
// Get user details and calculate nutrition (calories, macros, fiber)
exports.getDetailsWithCalories = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { age, gender, weight, height, activity, goal } = user;

    // Ensure necessary data is available
    if (!age || !gender || !weight || !height || !activity || !goal) {
      return res.status(400).json({ message: "Incomplete profile to calculate calories/macros." });
    }

    // Calculate calories, macros, and fiber
    const calcResult = calculateCaloriesAndMacros({
      age,
      gender,
      weight,
      height,
      activity,
      goal
    });

    res.json({
      user,
      nutrition: calcResult
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
*/
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { age, height, weight, gender, activity, goal } = req.body;

    if (!age && !height && !weight && !gender && !activity && !goal) {
      return res.status(400).json({ message: "At least one field must be updated" });
    }

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Update provided fields
    if (age !== undefined) user.age = age;
    if (height !== undefined) user.height = height;
    if (weight !== undefined) user.weight = weight;
    if (gender !== undefined) user.gender = gender;
    if (activity !== undefined) user.activity = activity;
    if (goal !== undefined) user.goal = goal;

    // Calculate and update nutrition if all values are present
    if (user.age && user.gender && user.weight && user.height && user.activity && user.goal) {
      const nutrition = calculateCaloriesAndMacros({
        age: user.age,
        gender: user.gender,
        weight: user.weight,
        height: user.height,
        activity: user.activity,
        goal: user.goal
      });
      user.nutrition = nutrition;
    }

    const updatedUser = await user.save();
    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error: error.message });
  }
};

exports.getDetailsWithCalories = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.nutrition || !user.nutrition.calories) {
      return res.status(400).json({ message: "Nutrition data not available. Update profile first." });
    }

    res.json({
      user,
      nutrition: user.nutrition
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};