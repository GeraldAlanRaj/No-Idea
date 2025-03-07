import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import BlogList from "../components/BlogList";

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
      <SearchBar search={search} setSearch={setSearch} />
      <BlogList blogs={filteredBlogs} onReadMore={(blog) => navigate(`/blogs/${blog._id}`)} onLike={handleLike} />
    </div>
  );
};

export default Blogs;
