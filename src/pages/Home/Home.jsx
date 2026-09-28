import { useEffect, useState } from "react";
import { getTrendingMovies } from "../../services/tmdb-api";
import MovieList from "../../components/MovieList/MovieList";

import css from "./Home.module.css";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);

        const results = await getTrendingMovies();
        setMovies(results);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <main className={css.container}>
      <h1 className={css.title}>Trending today</h1>

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

export default Home;