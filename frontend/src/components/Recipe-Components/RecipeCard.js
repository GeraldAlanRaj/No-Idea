import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../../styles/components/Recipe-Components/RecipeCard.css"

const RecipeCard = ({ recipe, onLike }) => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);

  const handleCardClick = () => {
    navigate(`/recipes/${recipe._id}`);
  };

  const handleLike = (e) => {
    e.stopPropagation();
    setLiked(true);
    onLike(recipe._id);
  };

  return (
    <div className="recipe-card" onClick={handleCardClick} style={{ cursor: "pointer" }}>
      <h3 className="recipe-title">{recipe.title}</h3>
      <img
        src={`http://localhost:5001/uploads/${recipe.imageUrl}`}
        alt={recipe.title}
        className="recipe-image"
      />
      <p className="recipe-description">{recipe.description}</p>
      <p className="recipe-likes">Likes : {recipe.likes}</p>

      {/* Like Button */}
      <div className="like-content">
        <button
          className={`btn-secondary like-review ${liked ? "animate-like" : ""}`}
          onClick={handleLike}
          disabled={liked}
        >
          <i className="fa fa-heart" aria-hidden="true"></i> {liked ? "You have already liked this" : "Like"}
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
