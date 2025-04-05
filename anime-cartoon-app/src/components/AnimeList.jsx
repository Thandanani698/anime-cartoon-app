import { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import ParentalControl from "./ParentalControl";

const AnimeList = () => {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isRestricted, setIsRestricted] = useState(true); 

  const restrictedRatings = ["R - 17+", "R+ - Mild Nudity", "Rx - Hentai"];

  const fetchAnime = async (query = "") => {
    setLoading(true);
    try {
      const url = query
        ? `https://api.jikan.moe/v4/anime?q=${query}&page=1`
        : "https://api.jikan.moe/v4/top/anime";
      const response = await axios.get(url);
      setAnimeList(response.data.data);
    } catch (err) {
      setError("Failed to load anime. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnime();
  }, []);

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  const filteredAnime = isRestricted
    ? animeList.filter((anime) => !restrictedRatings.includes(anime.rating))
    : animeList;

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <ParentalControl onSetRestricted={setIsRestricted} />
      <SearchBar onSearch={fetchAnime} />
      <h2 className="text-3xl font-bold text-center mb-6 text-indigo-600">
        {searchQuery ? `Search Results for "${searchQuery}"` : "Top Anime"}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredAnime.map((anime) => (
          <div
            key={anime.mal_id}
            className="border rounded-lg overflow-hidden shadow-lg bg-white transform hover:scale-105 transition-all"
          >
            <img
              src={anime.images.jpg.image_url}
              alt={anime.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">{anime.title}</h3>
              <p className="text-sm text-gray-600">Rating: {anime.rating}</p>
            </div>
            {anime.trailer.youtube_id && (
              <div className="p-4">
                <iframe
                  width="100%"
                  height="200"
                  src={`https://www.youtube.com/embed/${anime.trailer.youtube_id}`}
                  title={anime.title}
                  allowFullScreen
                  className="rounded-lg"
                ></iframe>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimeList;
