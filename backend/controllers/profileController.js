const User = require("../models/User");

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
