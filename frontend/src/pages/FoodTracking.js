import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import instance from "../utils/axiosInterceptor";
import FoodDetail from "../components/food-tracking/foodDetails";
import '../styles/components/food-tracking/foodTracking.css'

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

  if (/^\/food\/[a-zA-Z0-9]+$/.test(location.pathname)) {
    return <FoodDetail />;
  }

  return (
    <div className="food-tracking-container">
      <Navbar />
      <h1 className="food-tracking-title">
            <span style={{ color: "white" }}>Search by</span>
            <span style={{ color: "#454545" }}> Food Name</span>
      </h1>
      <div className="search-bar">
        <SearchBar search={search} setSearch={setSearch} handleSearch={handleSearch} />
      </div>

      <div className="results-list">
        {results.length === 0 ? (
          <p className="no-results">No results found.</p>
        ) : (
          results.map(result => (
            <div
              key={result._id}
              className="food-item"
              onClick={() => navigate(`/food/${result._id}`)}
            >
              <h3 className="food-name">{result.name}</h3>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FoodTracking;
