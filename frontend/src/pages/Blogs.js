import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../utils/axiosInterceptor";
import SearchBar from "../components/SearchBar";
import Navbar from "../components/Navbar";
import BlogList from "../components/Blog-Components/BlogList";
import "../styles/pages/Blogs.css"

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await instance.get("http://localhost:5001/api/blogs");
        setBlogs(res.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
  
    fetchBlogs();
  }, []);
  
  const handleLike = async (id) => {
    try {
      const res = await instance.put(`http://localhost:5001/api/blogs/${id}/like`);
      if (res.status === 200) {
        const updatedBlog = res.data;
        setBlogs((prevBlogs) =>
          prevBlogs.map((blog) => (blog._id === id ? updatedBlog : blog))
        );
      }
    } catch (error) {
      console.error("Error liking the blog:", error);
    }
  };

  const filteredBlogs = blogs.filter((blog) => blog.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="Blogs-Container">
      <Navbar />
      <div className="Blogs">
      <div className="Title">
      <h1>
            <span style={{ color: "#454545" }}>Blogs</span>
            <span style={{ color: "white" }}> & </span>
            <span style={{ color: "#454545" }}>Articles</span>
      </h1>
      </div>
      <div className="Search-Bar">
      <SearchBar search={search} setSearch={setSearch} />
      </div>
      <div className="Blog-List">
      <BlogList blogs={filteredBlogs} onReadMore={(blog) => navigate(`/blogs/${blog._id}`)} onLike={handleLike} />
      </div>
      </div>
    </div>
  );
};

export default Blogs;
