import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import Navbar from "../components/Navbar";
import BlogList from "../components/Blog-Components/BlogList";
import "../styles/pages/Blogs.css"

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5001/api/blogs")
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((error) => console.error("Error fetching blogs:", error));
  }, []);

  const handleLike = async (id) => {
    try {
      const res = await fetch(`http://localhost:5001/api/blogs/${id}/like`, { method: "PUT" });
      if (res.ok) {
        const updatedBlog = await res.json();
        setBlogs((prevBlogs) => prevBlogs.map((blog) => (blog._id === id ? updatedBlog : blog)));
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
