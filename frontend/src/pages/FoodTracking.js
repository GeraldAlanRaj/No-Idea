import { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import instance from "../utils/axiosInterceptor";
import FoodCard from "../components/food-tracking/foodCard";
import "../styles/pages/foodTracking.css";
import FoodDetail from "../components/food-tracking/foodDetails"

const FoodTracking = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const location = useLocation();

  const handleSearch = async () => {
    try {
      const res = await instance.get(`/foods/search?name=${search}`);
      setResults(res.data);
    } catch (error) {
      console.error("Error searching foods:", error);
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
            <FoodCard key={result._id} food={result} /> 
          ))
        )}
      </div>
    </div>
  );
};

export default FoodTracking;
