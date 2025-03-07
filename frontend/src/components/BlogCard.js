import { useNavigate } from "react-router-dom";
import "../styles/BlogCard.css";

const BlogCard = ({ blog, onReadMore, onLike }) => {
  const navigate = useNavigate();

  return (
    <div className="blog-card">
      <h3>{blog.title}</h3>
      <img
        src={`http://localhost:5001/uploads/${blog.imageUrl}`}
        alt={blog.title}
        className="blog-image"
      />
      <p>{blog.description}</p>
      <p>Likes: {blog.likes}</p>
      <button onClick={() => navigate(`/blogs/${blog._id}`)} className="read-more-btn">
        Read More
      </button>
      <button onClick={() => onLike(blog._id)} className="like-btn">
        Like
      </button>
    </div>
  );
};

export default BlogCard;
