import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import Navbar from "../components/Navbar";
import RecipeList from "../components/Recipe-Components/RecipeList";
import "../styles/pages/Blogs.css"

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5001/api/recipes")
      .then((res) => res.json())
      .then((data) => setRecipes(data))
      .catch((error) => console.error("Error fetching recipes:", error));
  }, []);

  const handleLike = async (id) => {
    try {
      const res = await fetch(`http://localhost:5001/api/recipes/${id}/like`, { method: "PUT" });
      if (res.ok) {
        const updatedRecipe = await res.json();
        setRecipes((prevRecipes) => prevRecipes.map((recipe) => (recipe._id === id ? updatedRecipe : recipe)));
      }
    } catch (error) {
      console.error("Error liking the blog:", error);
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
