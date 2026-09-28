import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieCredits } from "../../services/tmdb-api";

import css from "./Cast.module.css";

const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    getMovieCredits(movieId).then(setCast);
  }, [movieId]);

  return (
    <div>
      <h2>Cast</h2>

      <ul className={css.list}>
        {cast.map(actor => (
          <li className={css.item} key={actor.id}>
            {actor.profile_path && (
              <img
                className={css.image}
                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                alt={actor.name}
              />
            )}

            <h3 className={css.name}>{actor.name}</h3>

            <p className={css.character}>
              Character: {actor.character}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cast;