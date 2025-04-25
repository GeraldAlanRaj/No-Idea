import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import CalorieMacroCalculator from "../components/Calorie-Macro_Calculator";
import jwtDecoder from "../components/JWT_Decoder";
import "../styles/pages/Home.css";
import FoodHistory from "../components/food-tracking/foodHistory";
import FoodTracking from "./FoodTracking";

const Home = () => {
  const [foods, setFoods] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const userId = jwtDecoder.getUserIdFromToken();
  const location = useLocation();
  const navigate = useNavigate();

  const today = new Date().toISOString().split("T")[0]; 

  const setFood = (data) => {
    setFoods(data);
  };

  const triggerNutritionRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const handleAddFoodClick = () => {
    navigate("/foodtracking");
  };

  // Render FoodTracking if we're on that route
  if (location.pathname === "/foodtracking") {
    return <FoodTracking setFood={setFood} />;
  }

  return (
    <div>
      <Navbar triggerNutritionRefresh={triggerNutritionRefresh} />
      <CalorieMacroCalculator userId={userId} refreshTrigger={refreshTrigger} />
      
      <div className="add-food-button">
        <button onClick={handleAddFoodClick} className="Add-Food-Button">
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
