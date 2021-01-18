
/**
 * API url
 */
const TMDB_API_URL = 'https://api.themoviedb.org/3';

/**
 * Image url
 */
const TMDB_IMAGE_URL = 'https://image.tmdb.org/t/p';

const TMDB_API_PARAMS = Object.freeze({
  api_key: process.env.API_KEY,
  language: process.env.API_LANG
});

// ray test touch <
// RE: https://developers.themoviedb.org/3/configuration/get-api-configuration
const BACKDROP_SIZES = Object.freeze({
  W300: 'w300',
  W780: 'w780',
  W1280: 'w1280',
  ORIGINAL: 'original'
});

const POSTER_SIZES = Object.freeze({
  W92: 'w92',
  W154: 'w154',
  W185: 'w185',
  W342: 'w342',
  W500: 'w500',
  W780: 'w780',
  ORIGINAL: 'original'
});
// ray test touch >

export {
  TMDB_API_URL,
  TMDB_IMAGE_URL,
  TMDB_API_PARAMS,
  BACKDROP_SIZES,
  POSTER_SIZES
};
