import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/pages/Home.css";
import FoodHistory from "../components/food-tracking/foodHistory";
import FoodTracking from "./FoodTracking";
import JWT_Decoder from "../components/JWT_Decoder";
import CalorieVisualization from "../components/visualization/calorie_visualization";
import MacrosVisualization from "../components/visualization/macros_visualization";
import HomeImage from "../assets/home.jpg";

const Home = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [historyDate, setHistoryDate] = useState(null);
  const userId = JWT_Decoder.getUserIdFromToken();
  const location = useLocation();
  const navigate = useNavigate();

  const today = new Date().toISOString().split('T')[0];

  const triggerNutritionRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const handleAddFoodClick = () => {
    navigate("/foodtracking");
  };

  // Format date for API call (YYYY-MM-DD)
  //const formattedDate = (historyDate ?? new Date()).toISOString().split("T")[0];

  if (location.pathname === "/foodtracking") {
    return <FoodTracking />;
  }

  return (
    <div className="Home-Container">
      <Navbar triggerNutritionRefresh={triggerNutritionRefresh} />
      <h1 className="title">
        <span style={{ color: "white" }}>Today's</span>
        <span style={{ color: "#454545" }}> Progress</span>
      </h1>
      <div className="home-body">
        <div className="home-header">
          <div className="left">
            <div className="top">
              <div className="top-left">
                <CalorieVisualization
                  userId={userId}
                  date={today}
                  refreshTrigger={refreshTrigger}
                  historyDate={historyDate}
                />
              </div>
              <div className="top-right">
                <button onClick={handleAddFoodClick} className="Add-Food-Button" aria-label="Add food">
                  +
                </button>
              </div>
            </div>
            <div className="bottom">
              <MacrosVisualization
                userId={userId}
                date={today}
                refreshTrigger={refreshTrigger}
                historyDate={historyDate}
              />
            </div>
          </div>
          <div className="right">
            <img src={HomeImage} alt="home" />
          </div>
        </div>
        <div className="home-footer">
          <FoodHistory
            userId={userId}
            refreshTrigger={refreshTrigger}
            setRefreshTrigger={setRefreshTrigger}
            setHistoryDate={setHistoryDate}
            history_date={historyDate}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
