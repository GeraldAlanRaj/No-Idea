import React, { useState } from "react";
import Navbar from "../components/Navbar";
import CalorieMacroCalculator from "../components/Calorie-Macro_Calculator";
import jwtDecoder from "../components/JWT_Decoder";

const Home = () => {
  const userId = jwtDecoder.getUserIdFromToken();
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // This will be passed down to refresh the nutrition info
  const triggerNutritionRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div>
      <Navbar triggerNutritionRefresh={triggerNutritionRefresh} />
      <CalorieMacroCalculator userId={userId} refreshTrigger={refreshTrigger} />
    </div>
  );
};

export default Home;
