import "../../styles/components/Recipe-Components/RecipeList.css"
import RecipeCard from "./RecipeCard";

const RecipeList = ({ recipes, onReadMore, onLike }) => {
  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe._id} recipe={recipe} onReadMore={onReadMore} onLike={onLike} />
      ))}
    </div>
  );
};

export default RecipeList;
