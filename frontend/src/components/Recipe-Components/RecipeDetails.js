import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar";
import instance from "../../utils/axiosInterceptor";
import "../../styles/components/Recipe-Components/RecipeDetails.css"

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await instance.get(`http://localhost:5001/api/recipes/${id}`);
        setRecipe(res.data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };
  
    fetchRecipe();
  }, [id]);
  
  if (!recipe) return <p>Loading...</p>;

  return (
    <div className="recipe-detail-container">
    <div className="Navbar">
        <Navbar />
    </div>
    <div className="recipe-details">
    <div className="recipe-title">
      <h2>{recipe.title}</h2>
    </div>
    <div className="recipe-details-image">
      <img src={`http://localhost:5001/uploads/${recipe.imageUrl}`} alt={recipe.title} className="recipe-image" />
    </div>
    <div className="recipe-content">
      <pre>{recipe.content}</pre>
    </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
