import React, { useState } from "react";
import Navbar from "../components/Navbar";
import CalorieMacroCalculator from "../components/Calorie-Macro_Calculator";
import jwtDecoder from "../components/JWT_Decoder";
import { useNavigate } from "react-router-dom";
import "../styles/pages/Home.css";
import FoodHistory from "../components/food-tracking/foodHistory";

const Home = () => {
  const userId = jwtDecoder.getUserIdFromToken();
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const navigate = useNavigate();
      const addFood = async () => {
          navigate("/foodtracking");
      };

  // This will be passed down to refresh the nutrition info
  const triggerNutritionRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div>
      <Navbar triggerNutritionRefresh={triggerNutritionRefresh} />
      <CalorieMacroCalculator userId={userId} refreshTrigger={refreshTrigger} />
      <div className="add-food-button">
        <button onClick={addFood} className="Add-Food-Button">
          +
        </button>
        </div>
        <div className="food-history">
        <FoodHistory />
        </div>
    </div>
  );
};

export default Home;
