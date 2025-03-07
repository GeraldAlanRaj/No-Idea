import '../styles/BlogList.css';
import BlogCard from "./BlogCard";

const BlogList = ({ blogs, onReadMore, onLike }) => {
  return (
    <div className="blog-list">
      {blogs.map((blog) => (
        <BlogCard key={blog._id} blog={blog} onReadMore={onReadMore} onLike={onLike} />
      ))}
    </div>
  );
};

export default BlogList;
