import { useState, useEffect } from "react";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5001/api/blogs")
      .then((res) => res.json())
      .then((data) => setBlogs(data));
  }, []);

  const handleLike = async (id) => {
    try {
      const res = await fetch(`http://localhost:5001/api/blogs/${id}/like`, {
        method: "PUT",
      });
      if (res.ok) {
        const updatedBlog = await res.json();
        setBlogs((prevBlogs) =>
          prevBlogs.map((blog) => (blog._id === id ? updatedBlog : blog))
        );
      }
    } catch (error) {
      console.error("Error liking the blog:", error);
    }
  };

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {!selectedBlog && (
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      )}

      {selectedBlog ? (
        <div>
          <h2>{selectedBlog.title}</h2>
          <img src={`http://localhost:5001/uploads/${selectedBlog.imageUrl}`} alt={selectedBlog.title} />
          <pre>{selectedBlog.content}</pre>
          <p>Likes: {selectedBlog.likes}</p>
          <button onClick={() => handleLike(selectedBlog._id)}>Like</button>
          <button onClick={() => setSelectedBlog(null)}>Back</button>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
          {filteredBlogs.map((blog) => (
            <div key={blog._id} style={{ border: "1px solid #ddd", padding: "10px" }}>
              <h3>{blog.title}</h3>
              <img
                src={`http://localhost:5001/uploads/${blog.imageUrl}`}
                alt={blog.title}
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
              />
              <p>{blog.description}</p>
              <p>Likes: {blog.likes}</p>
              <button onClick={() => setSelectedBlog(blog)}>Read More</button>
              <button onClick={() => handleLike(blog._id)}>Like</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blogs;