import { useState } from "react";
import { searchMovies } from "../../services/tmdb-api";
import SearchBar from "../../components/SearchBar/SearchBar";
import MovieList from "../../components/MovieList/MovieList";

import css from "./Movies.module.css";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async query => {
    try {
      setLoading(true);
      setError(false);

      const results = await searchMovies(query);
      setMovies(results);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={css.container}>
      <h1 className={css.title}>Search movies</h1>

      <SearchBar onSubmit={handleSearch} />

      {loading && <p className={css.message}>Loading...</p>}

      {error && (
        <p className={css.error}>
          Something went wrong. Please try again.
        </p>
      )}

      <MovieList movies={movies} />
    </main>
  );
};

export default Movies;