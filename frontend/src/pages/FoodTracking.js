import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import instance from "../utils/axiosInterceptor";
import NutritionVisualization from "../components/Nutrition_Visulaization";
import jwtDecoder from "../components/JWT_Decoder";

const FoodTracking = () => {
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const userId = jwtDecoder.getUserIdFromToken();
  const date = new Date().toISOString().split("T")[0]; 

  const handleSearch = async () => {
    try {
      const res = await instance.get(`/foods/search?name=${search}`);
      setFoods(res.data);
    } catch (error) {
      console.error("Error searching recipes:", error);
    }
  };

  return (
    <div className="FoodTracking-Container">
      <Navbar />
      <div className="max-w-4xl mx-auto mt-10">
      <NutritionVisualization userId={userId} date={date} food={foods}/>
    </div>
      <div className="Search-Bar">
        <SearchBar search={search} setSearch={setSearch} handleSearch={handleSearch} />
      </div>
      <ul>
        {foods.map((food) => (
          <li
            key={food._id}
            onClick={() => navigate(`/food/${food._id}`)}
            style={{ cursor: "pointer" }}
          >
            {food.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FoodTracking;
