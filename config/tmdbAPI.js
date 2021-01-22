
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

// RE: https://developers.themoviedb.org/3/configuration/get-api-configuration
const BACKDROP_SIZES = Object.freeze({
  W300: 'w300',
  W780: 'w780',
  W1280: 'w1280',
  ORIGINAL: 'original'
});

const LOGO_SIZES = Object.freeze({
  W45: 'w45',
  W92: 'w92',
  W154: 'w154',
  W185: 'w185',
  W300: 'w300',
  W500: 'w500',
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

const PROFILE_SIZES = Object.freeze({
  W45: 'w45',
  W185: 'w185',
  H632: 'h632',
  ORIGINAL: 'original'
});

const STILL_SIZES = Object.freeze({
  W92: 'w92',
  W185: 'w185',
  W300: 'w300',
  ORIGINAL: 'original'
});

const OTHER_SIZES = Object.freeze({
  W370_AND_H556_BESTV2: 'w370_and_h556_bestv2',
  W533_AND_H300_BESTV2: 'w533_and_h300_bestv2',
  W400: 'w400'
});

export {
  TMDB_API_URL,
  TMDB_IMAGE_URL,
  TMDB_API_PARAMS,
  BACKDROP_SIZES,
  LOGO_SIZES,
  POSTER_SIZES,
  PROFILE_SIZES,
  STILL_SIZES,
  OTHER_SIZES
};
