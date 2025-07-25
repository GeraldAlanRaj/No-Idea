import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar";
import instance from "../../utils/axiosInterceptor";
import "../../styles/components/Blog-Components/BlogDetails.css"

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await instance.get(`/blogs/${id}`);
        setBlog(res.data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };
  
    fetchBlog();
  }, [id]);

  if (!blog) return <p>Loading...</p>;

  return (
    <div className="blog-detail-container">
    <div className="Navbar">
        <Navbar />
    </div>
    <div className="blog-details">
    <div className="blog-title">
      <h2>{blog.title}</h2>
    </div>
    <div className="blog-details-image">
      <img src={`${process.env.REACT_APP_API_URL}/uploads/${blog.imageUrl}`} alt={blog.title} className="blog-image" />
    </div>
    <div className="blog-content">
      <pre>{blog.content}</pre>
    </div>
      </div>
    </div>
  );
};

export default BlogDetails;
