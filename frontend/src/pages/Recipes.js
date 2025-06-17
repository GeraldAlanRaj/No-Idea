import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../utils/axiosInterceptor";
import SearchBar from "../components/SearchBar";
import Navbar from "../components/Navbar";
import RecipeList from "../components/Recipe-Components/RecipeList";
import "../styles/pages/Blogs.css";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopRecipes = async () => {
      try {
        const res = await instance.get("/recipes");
        setRecipes(res.data);
      } catch (error) {
        console.error("Error fetching top recipes:", error);
      }
    };

    fetchTopRecipes();
  }, []);

  const handleLike = async (id) => {
    try {
      const res = await instance.put(`/recipes/${id}/like`);
      if (res.status === 200) {
        const updatedRecipe = res.data;
        setRecipes((prevRecipes) =>
          prevRecipes.map((recipe) => (recipe._id === id ? updatedRecipe : recipe))
        );
      }
    } catch (error) {
      console.error("Error liking the recipe:", error);
    }
  };

  const handleSearch = async () => {
    try {
      const res = await instance.get(`/recipes?search=${search}`);
      setRecipes(res.data);
    } catch (error) {
      console.error("Error searching recipes:", error);
    }
  };

  return (
    <div className="Recipes-Container">
      <div className="navbar">
      <Navbar />
      </div>
      <div className="Recipes">
        <div className="Title">
          <h1>
            <span style={{ color: "#454545" }}>Recipes</span>
          </h1>
        </div>
        <div className="Search-Bar">
          <SearchBar search={search} setSearch={setSearch} handleSearch={handleSearch} />
        </div>
        <div className="Recipe-List">
          <RecipeList
            recipes={recipes}
            onReadMore={(recipe) => navigate(`/recipes/${recipe._id}`)}
            onLike={handleLike}
          />
        </div>
      </div>
    </div>
  );
};

export default Recipes;
