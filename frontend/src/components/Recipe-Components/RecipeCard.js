import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../../styles/components/Recipe-Components/RecipeCard.css"

const BlogCard = ({ blog, onLike }) => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);

  const handleCardClick = () => {
    navigate(`/blogs/${blog._id}`);
  };

  const handleLike = (e) => {
    e.stopPropagation();
    setLiked(true);
    onLike(blog._id);
  };

  return (
    <div className="blog-card" onClick={handleCardClick} style={{ cursor: "pointer" }}>
      <h3 className="blog-title">{blog.title}</h3>
      <img
        src={`http://localhost:5001/uploads/${blog.imageUrl}`}
        alt={blog.title}
        className="blog-image"
      />
      <p className="blog-description">{blog.description}</p>
      <p className="blog-likes">Likes : {blog.likes}</p>

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

export default BlogCard;
