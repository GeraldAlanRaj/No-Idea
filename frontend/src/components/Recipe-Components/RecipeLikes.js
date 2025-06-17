const RecipeLikes = ({ recipe, onBack, onLike }) => {
    return (
      <div>
        <h2>{recipe.title}</h2>
        <img src={`${process.env.REACT_APP_API_URL}/uploads/${recipe.imageUrl}`} alt={recipe.title} />
        <pre>{recipe.content}</pre>
        <p>Likes: {blog.likes}</p>
        <button onClick={() => onLike(recipe._id)}>Like</button>
        <button onClick={onBack}>Back</button>
      </div>
    );
  };
  
  export default RecipeLikes;
  