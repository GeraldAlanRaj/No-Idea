const BlogLikes = ({ blog, onBack, onLike }) => {
    return (
      <div>
        <h2>{blog.title}</h2>
        <img src={`http://localhost:5001/uploads/${blog.imageUrl}`} alt={blog.title} />
        <pre>{blog.content}</pre>
        <p>Likes: {blog.likes}</p>
        <button onClick={() => onLike(blog._id)}>Like</button>
        <button onClick={onBack}>Back</button>
      </div>
    );
  };
  
  export default BlogLikes;
  