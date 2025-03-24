import { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";

const AnimeList = () => {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchAnime = async (query = "") => {
    setLoading(true);
    try {
      const url = query
        ? `https://api.jikan.moe/v4/anime?q=${query}&page=1`
        : "https://api.jikan.moe/v4/top/anime";
      const response = await axios.get(url);
      setAnimeList(response.data.data); // Jikan API returns anime inside `data`
    } catch (err) {
      setError("Failed to load anime. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    fetchAnime(query);
  };

  useEffect(() => {
    fetchAnime();
  }, []);

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <SearchBar onSearch={handleSearch} />
      <h2 className="text-2xl font-bold text-center mb-4">
        {searchQuery ? `Search Results for "${searchQuery}"` : "Top Anime"}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {animeList.map((anime) => (
          <div key={anime.mal_id} className="border rounded-lg overflow-hidden shadow-md">
            <img src={anime.images.jpg.image_url} alt={anime.title} className="w-full h-48 object-cover" />
            <div className="p-2">
              <h3 className="text-lg font-semibold">{anime.title}</h3>
              <p className="text-sm">Score: {anime.score}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimeList;
