import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/pages/Home.css";
import FoodHistory from "../components/food-tracking/foodHistory";
import FoodTracking from "./FoodTracking";
import JWT_Decoder from "../components/JWT_Decoder";
import CalorieVisualization from "../components/visualization/calorie_visualization";
import MacrosVisualization from "../components/visualization/macros_visualization";

const Home = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const userId = JWT_Decoder.getUserIdFromToken();
  const location = useLocation();
  const navigate = useNavigate();
  const date = new Date().toISOString().split("T")[0];

  const triggerNutritionRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const handleAddFoodClick = () => {
    navigate("/foodtracking");
  };

  if (location.pathname === "/foodtracking") {
    return <FoodTracking />;
  }

  return (
    <div>
      <Navbar triggerNutritionRefresh={triggerNutritionRefresh} />

      <div className="add-food-button">
        <button onClick={handleAddFoodClick} className="Add-Food-Button">
          +
        </button>

        <div className="visualization">
          <div className="max-w-4xl mx-auto mt-10">
            <CalorieVisualization userId={userId} date={date} refreshTrigger={refreshTrigger} />
          </div>
          <div>
            <MacrosVisualization userId={userId} date={date}refreshTrigger={refreshTrigger} />
          </div>
        </div>
      </div>

      <div className="food-history">
        <FoodHistory />
      </div>
    </div>
  );
};

export default Home;
