import searchIcon from "../assets/search-icon.png";
import "../styles/components/SearchBar.css";

// Optimized Search Bar with Enter key handling
const SearchBar = ({ search, setSearch, handleSearch }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown} // Trigger search on Enter
      />
      <button className="search-btn" onClick={handleSearch}>
        <img src={searchIcon} alt="Search" />
      </button>
    </div>
  );
};

export default SearchBar;
