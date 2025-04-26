import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import instance from "../utils/axiosInterceptor";
import FoodDetail from "../components/food-tracking/foodDetails";

const FoodTracking = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = async () => {
    try {
      const res = await instance.get(`/foods/search?name=${search}`);
      setResults(res.data);
    } catch (error) {
      console.error("Error searching recipes:", error);
    }
  };

  // Match dynamic food detail route
  if (/^\/food\/[a-zA-Z0-9]+$/.test(location.pathname)) {
    return <FoodDetail />;
  }

  return (
    <div className="FoodTracking-Container">
      <Navbar />
      <div className="Search-Bar">
        <SearchBar search={search} setSearch={setSearch} handleSearch={handleSearch} />
      </div>
      <ul>
        {results.map((result) => (
          <li
            key={result._id}
            onClick={() => navigate(`/food/${result._id}`)}
            style={{ cursor: "pointer" }}
          >
            {result.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FoodTracking;
