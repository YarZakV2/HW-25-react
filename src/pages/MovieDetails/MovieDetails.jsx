import { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { getMovieDetails } from "../../services/tmdb-api";

import css from "./MovieDetails.module.css";

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    getMovieDetails(movieId).then(setMovie);
  }, [movieId]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className={css.container}>
      <Link className={css.backLink} to="/movies">
        ← Back to movies
      </Link>

      <div className={css.movie}>
        {movie.poster_path && (
          <img
            className={css.poster}
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
        )}

        <div className={css.info}>
          <h1>{movie.title}</h1>

          <p>{movie.overview}</p>

          <p>User score: {Math.round(movie.vote_average * 10)}%</p>

          <h2>Genres</h2>

          <ul>
            {movie.genres.map(genre => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className={css.additional}>
        <h2>Additional information</h2>

        <nav>
          <Link to="cast">Cast</Link>
          <Link to="reviews">Reviews</Link>
        </nav>
      </div>

      <Outlet />
    </div>
  );
};

export default MovieDetails;