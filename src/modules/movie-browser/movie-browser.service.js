require("dotenv").config();
// const MOVIE_DB_API_KEY = process.env.MOVIE_DB_API_KEY;

const MOVIE_DB_API_KEY = "f6506bde0dc46c056b46e925f8307d0e";
const MOVIE_DB_API_TOKEN = process.env.MOVIE_DB_API_TOKEN;

console.log("***KEY***", MOVIE_DB_API_KEY);
const MOVIE_DB_BASE_URL = "https://api.themoviedb.org/3";

const createMovieDbUrl = (relativeUrl, queryParams) => {
  let baseUrl = `${MOVIE_DB_BASE_URL}${relativeUrl}?api_key=${MOVIE_DB_API_KEY}&language=en-US`;
  if (queryParams) {
    Object.keys(queryParams).forEach(
      paramName => (baseUrl += `&${paramName}=${queryParams[paramName]}`)
    );
  }
  return baseUrl;
};

export const getTopMovies = async ({ page }) => {
  const fullUrl = createMovieDbUrl("/movie/top_rated", {
    page
  });
  return fetch(fullUrl);
};

export const searchMovies = async ({ page, query }) => {
  const fullUrl = createMovieDbUrl("/search/movie", {
    page,
    query
  });
  return fetch(fullUrl);
};

export const getMovieDetails = async ({ movieId }) => {
  const fullUrl = createMovieDbUrl(`/movie/${movieId}`);
  console.log('FULL', movieId, fullUrl);
  return fetch(fullUrl);
};
