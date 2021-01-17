
/**
 * API url
 */
const TMDB_API_URL = 'https://api.themoviedb.org/3';

/**
 * Image url
 */
const TMDB_IMAGE_URL = 'https://image.tmdb.org/t/p';

const TMDB_API_PARAMS = {
  api_key: process.env.API_KEY,
  language: process.env.API_LANG
};

export {
  TMDB_API_URL,
  TMDB_IMAGE_URL,
  TMDB_API_PARAMS
};
