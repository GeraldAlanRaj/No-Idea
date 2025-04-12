const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  age: { type: Number, default: null },
  height: { type: Number, default: null }, 
  weight: { type: Number, default: null }, 
  gender: { type: String, default: null }, 
  activity: { type: String, default: null }, 
  goal : { type: String, default: null },
  nutrition: {
    calories: { type: Number, default: null },
    macros: {
      carbs: { type: Number, default: null },
      protein: { type: Number, default: null },
      fat: { type: Number, default: null },
      fiber: { type: Number, default: null }
    }
  }
}, { versionKey: false });


module.exports = mongoose.model("User", UserSchema);
