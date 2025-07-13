import React, { useState } from 'react';
import './MainMid.css';
import { FaSearch } from 'react-icons/fa';

const TMDB_API_KEY = 'bc6cd267bda41ac572699460729a4b8f';

export default function MainMid() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setResults([]);

    try {
      const searchRes = await fetch(
        `https://api.themoviedb.org/3/search/tv?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`
      );
      const searchData = await searchRes.json();
      const firstShow = searchData.results?.[0];
      if (!firstShow) {
        setLoading(false);
        return;
      }

      const recRes = await fetch(
        `https://api.themoviedb.org/3/tv/${firstShow.id}/recommendations?api_key=${TMDB_API_KEY}`
      );
      const recData = await recRes.json();

      const topFive = recData.results.slice(0, 5).map(show => ({
        id: show.id,
        name: show.name,
        image: show.poster_path
          ? `https://image.tmdb.org/t/p/w200${show.poster_path}`
          : 'https://via.placeholder.com/64?text=No+Img',
        rating: show.vote_average,
        firstAirDate: show.first_air_date,
      }));

      setResults(topFive);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section style={{backgroundColor:'#F9FAFB', color:'#111827'}} className="how-it-works">
      <div className="container">
        <h2>Discover TV Shows</h2>
        <p>Search a TV show you enjoyed. We’ll help you find something very similar and entertaining.</p>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for a TV show..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">
            <FaSearch />
          </button>
        </div>

        {loading && <p>Loading recommendations...</p>}

        {results.length > 0 && (
          <div className="results-list">
            {results.map(({ id, name, image, rating, firstAirDate }) => (
              <div key={id} className="result-item">
                <img src={image} alt={name} />
                <div>
                  <span>{name}</span>
                  <p>
                    {firstAirDate && `Release Date: ${new Date(firstAirDate).getFullYear()}`}<br />
                    Rating: {rating}/10
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
