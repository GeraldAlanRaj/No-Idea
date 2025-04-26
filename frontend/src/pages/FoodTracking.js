import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import instance from "../utils/axiosInterceptor";

const FoodTracking = ({setFood, refreshTrigger, foods, userId, date}) => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();


  const handleSearch = async () => {
    try {
      const res = await instance.get(`/foods/search?name=${search}`);
      setResults(res.data);
    } catch (error) {
      console.error("Error searching recipes:", error);
    }
  };

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
