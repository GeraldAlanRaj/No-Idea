import React from "react";
import Navbar from "../components/Navbar";
import CalorieMacroCalculator from "../components/Calorie-Macro_Calculator";
import jwtDecoder from "../components/JWT_Decoder";

const Home = () => {

  const userId = jwtDecoder.getUserIdFromToken();

  return (
    <div>
      <Navbar />
      <CalorieMacroCalculator userId= {userId} />
    </div>
  );
};

export default Home;
