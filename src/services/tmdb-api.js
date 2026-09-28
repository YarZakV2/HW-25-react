import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const tmdbApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: API_KEY,
    language: "en-US",
  },
});

export const getTrendingMovies = async () => {
  const response = await tmdbApi.get("/trending/movie/day");

  return response.data.results;
};

export const searchMovies = async query => {
  const response = await tmdbApi.get("/search/movie", {
    params: {
      query,
    },
  });

  return response.data.results;
};
export const getMovieDetails = async movieId => {
  const response = await tmdbApi.get(`/movie/${movieId}`);

  return response.data;
};
export const getMovieCredits = async movieId => {
  const response = await tmdbApi.get(`/movie/${movieId}/credits`);

  return response.data.cast;
};
export const getMovieReviews = async movieId => {
  const response = await tmdbApi.get(`/movie/${movieId}/reviews`);

  return response.data.results;
};