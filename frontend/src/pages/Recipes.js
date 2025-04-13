import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import Navbar from "../components/Navbar";
import RecipeList from "../components/Recipe-Components/RecipeList";
import "../styles/pages/Blogs.css"

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/recipes");
        setRecipes(res.data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };
  
    fetchRecipes();
  }, []);
  
  const handleLike = async (id) => {
    try {
      const res = await axios.put(`http://localhost:5001/api/recipes/${id}/like`);
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

  const filteredRecipes = recipes.filter((recipe) => recipe.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="Recipes-Container">
      <Navbar />
      <div className="Recipes">
      <div className="Title">
      <h1> Recipes </h1>
      </div>
      <div className="Search-Bar">
      <SearchBar search={search} setSearch={setSearch} />
      </div>
      <div className="Recipe-List">
      <RecipeList recipes={filteredRecipes} onReadMore={(recipe) => navigate(`/recipes/${recipe._id}`)} onLike={handleLike} />
      </div>
      </div>
    </div>
  );
};

export default Recipes;
