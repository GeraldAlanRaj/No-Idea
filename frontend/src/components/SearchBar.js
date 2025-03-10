import searchIcon from "../assets/search-icon.png";
import "../styles/components/SearchBar.css"

//Optimize the Search Bar to Handle Large Dataset

const SearchBar = ({ search, setSearch, handleSearch }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button className="search-btn" onClick={handleSearch}>
        <img src={searchIcon} alt="Search" />
      </button>
    </div>
  );
};

export default SearchBar;
