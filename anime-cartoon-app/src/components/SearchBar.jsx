import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSearch} className="flex justify-center items-center space-x-2">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for an anime..."
          className="p-2 border border-gray-300 rounded-md"
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
